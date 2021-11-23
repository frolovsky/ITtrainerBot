const {
  quizKeyboard,
  themesKeyboard,
  startKeyboard,
  profileKeyboard,
  settingsKeyboard,
  achievementsKeyboard,
} = require('../../keyboard');
const { getQuestions, saveUserAnswer } = require('../../database');
const { getQuestion } = require('../../services/poll.serivces');
const { toggleUserSetting, setUserSetting, getUserAchievements } = require('../../services/user.services');
const { user, userAnswersCache } = require('./../../common/state');
const { getThemeText, clearPrototype } = require('./../../common/helpers');
const { MIN_SCORE_FOR_DOWNLOAD_CERT } = require('./../../common/config');

module.exports = async (bot, data, options) => {
  const userData = user.data;
  const { settings } = userData;
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
          lang: settings.language
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
    case (/^toggle-settings-\D+$/).test(data): {
      const prop = String(data).split('-').pop();
      const val = settings[prop];
      await toggleUserSetting(userData, prop, val, bot, options.messageId);
      break;
    }
    case (/^set-settings-\D+$/).test(data): {
      const prop = String(data).split('-').pop();
      await setUserSetting(userData, prop, bot);
      break;
    }
    case data === 'my-profile':
      await bot.sendMessage(options.chatId, 'Профиль', {
        parse_mode: 'HTML',
        reply_markup: profileKeyboard
      });
      break;
    case data === 'settings':
      await bot.sendMessage(options.chatId, 'Настройки профиля', {
        parse_mode: 'HTML',
        reply_markup: settingsKeyboard(settings)
      });
      break;
    case data === 'achievements':
      await bot.sendMessage(options.chatId, `Минимальное количество очков для выгрузки сертификата: ${MIN_SCORE_FOR_DOWNLOAD_CERT}. \n\n ${getUserAchievements()}`, {
        parse_mode: 'HTML',
        reply_markup: achievementsKeyboard
      });
      break;
    default:
      await bot.sendMessage(options.chatId, 'Unknown command.');
      console.log('unknown command')
      break;
  }
}
