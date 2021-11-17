const { quizKeyboard, themesKeyboard, startKeyboard } = require('../../keyboard');
const { getQuestions, saveUserAnswer } = require('../../database');
const { getQuestion } = require('../../services/poll.serivces');
const { user, userAnswersCache } = require('./../../common/state');
const { getThemeText, clearPrototype } = require('./../../common/helpers');

module.exports = async (bot, data, options) => {
  switch(true) {
    case (/^start-test$/).test(data):
      await bot.sendMessage(options.chatId, 'Выбери язык программирования и приступай к выполнению тестов! После каждого ответа мы будем посылать тебе новый вопрос, отключить эту функцию ты можешь в настройках\n<code>/settings - Открыть настройки</code>', {
        parse_mode: 'HTML',
        reply_markup: themesKeyboard
      })
      break;
    case (/\D+-getpoll$/).test(data):
      const theme = String(data).split('-')[0];
      const questions = await getQuestions(options.lang, theme);
      const question = await getQuestion(questions, options.lang, theme);
      if (question) {
        const { poll } = await bot.sendPoll(options.chatId, question.text, question.options, {
          type: 'quiz',
          correct_option_id: question.correctOption,
          reply_markup: quizKeyboard(question._id),
        });
        const userAnswer = await saveUserAnswer({
          pollId: poll.id,
          userId: options.chatId,
          questionId: question._id,
          isCorrect: 'pending',
          lang: user.getData().settings.language
        });
        userAnswersCache.checkAndPush(clearPrototype(userAnswer));
      } else {
        await bot.sendMessage(options.chatId, `Вы прошли все доступные тесты по ${getThemeText(theme)}.`, {
          parse_mode: 'HTML',
          reply_markup: startKeyboard
        });
      }
      break;

    case (/^report-quiz-\d+$/).test(data):
      console.log(`report quiz: ${data}`)
      break;

    default:
      await bot.sendMessage(options.chatId, 'Unknown command.');
      console.log('unknown command')
      break;
  }
}
