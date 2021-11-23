const { getUser } = require("../database");
const { updateUserLastActivity, updateUser } = require("../database");
const { user } = require("../common/state");
const { settingsKeyboard } = require("../keyboard");
const { getThemeText, clearPrototype } = require("../common/helpers");
const { MIN_SCORE_FOR_DOWNLOAD_CERT } = require('./../common/config');

const checkUserService = async (chatId, firstName, username) => {
  const data = Object.keys(user.data).length
    ? await updateUserLastActivity({ chatId })
    : await getUser({ chatId, firstName, username });
  user.setData(data);
};

const calculateUserExp = (isCorrect, { reward, theme }) => {
  let exp = user.data.levels[theme].totalExp;
  return isCorrect ? exp + reward : exp;
};

const toggleUserSetting = async (userData, prop, value, bot, messageId) => {
  switch (prop) {
    case 'language': {
      const newValue = value === 'ru' ? 'en' : 'ru';
      const updatedUser = await updateUser(userData._id, { $set: { [`settings.${prop}`]: newValue }});
      await bot.editMessageReplyMarkup(settingsKeyboard(updatedUser.settings), {
        message_id: messageId,
        chat_id: userData._id
      });
      break;
    }
    case 'arcadeMode': {
      const updatedUser = await updateUser(userData._id, { $set: { [`settings.${prop}`]: !value }});
      await bot.editMessageReplyMarkup(settingsKeyboard(updatedUser.settings), {
        message_id: messageId,
        chat_id: userData._id
      });
      break;
    }
    default:
      console.log(prop, 'not found. profile not edited');
      break;
  }
};

const setUserSetting = async (userData, prop, bot) => {
  const { value } = user.botNextStep || {};
  switch (prop) {
    case 'complexity': {
      if (!value) {
        await bot.sendMessage(userData._id, 'Укажите сложность присылаемых вопросов по шкале от 1 до 10. Где 1 - легкие вопросы, а 10 - сложные. \n*Используется в режиме "Тесты".');
        user.setBotNextStep({
          action: 'set-settings-complexity',
          value: null,
        });
      } else {
        const updatedUser = await updateUser(userData._id, { $set: { [`settings.${prop}`]: value }});
        await bot.sendMessage(userData._id, 'Настройки сложности успешно обновлены!', {
          parse_mode: 'HTML',
          reply_markup: settingsKeyboard(updatedUser.settings)
        });
        user.setBotNextStep(null);
      }
      break;
    }
    default:
      console.log(prop, 'not found. profile not edited');
      break;
  }
};

const getUserAchievements = () => {
  const { levels } = user.data;
  return Object.keys(clearPrototype(levels)).map(theme => {
    const { totalExp, levelName } = levels[theme];
    const themeName = getThemeText(theme);
    return `${ totalExp >= MIN_SCORE_FOR_DOWNLOAD_CERT ? '✅ ' : '👀 ' }<b>${themeName}</b>\n Набрано очков (exp): ${totalExp}\n Ваш уровень: ${levelName}\n`;
  }).join('\n');
}

module.exports = {
  checkUserService,
  calculateUserExp,
  toggleUserSetting,
  setUserSetting,
  getUserAchievements,
};
