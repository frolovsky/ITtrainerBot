const { quizKeyboard, themesKeyboard } = require('../../keyboard');
const { getQuestions } = require('../../database/functions');
const { getPoll } = require('./../../services/poll.serivces');


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
      console.log(questions);
      const poll = getPoll(questions);
      await bot.sendPoll(options.chatId, poll.text, poll.options, {
        type: 'quiz',
        correct_option_id: poll.correctOption,
        reply_markup: quizKeyboard(poll._id),
      })
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
