const { getUser } = require("../database");
const { updateUserLastActivity, updateUser } = require("../database");
const { users, themes} = require("../common/state");
const { settingsKeyboard } = require("../keyboard");
const { getThemeText, clearPrototype } = require("../common/helpers");
const { MIN_SCORE_FOR_DOWNLOAD_CERT } = require('./../common/config');

const checkUserService = async (chatId, firstName, username) => {
  const data = (users.state[chatId] && Object.keys(users.state[chatId]).length)
    ? await updateUserLastActivity({ chatId })
    : await getUser({ chatId, firstName, username });
  users.setData(chatId, data);
};

const calculateUserExp = (isCorrect, userId, { reward, theme }) => {
  let exp = users.state[userId].levels[theme].totalExp;
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
      users.setData(userData._id, updatedUser);
      break;
    }
    case 'arcadeMode': {
      const updatedUser = await updateUser(userData._id, { $set: { [`settings.${prop}`]: !value }});
      await bot.editMessageReplyMarkup(settingsKeyboard(updatedUser.settings), {
        message_id: messageId,
        chat_id: userData._id
      });
      users.setData(userData._id, updatedUser);
      break;
    }
    default:
      console.log(prop, 'not found. profile not edited');
      break;
  }
};

const setUserSetting = async (userData, prop, bot) => {
  const { value } = userData.nextStep || {};
  switch (prop) {
    case 'complexity': {
      if (!value) {
        await bot.sendMessage(userData._id, 'Укажите сложность присылаемых вопросов по шкале от 1 до 10. Где 1 - легкие вопросы, а 10 - сложные. \n*Используется в режиме "Тесты".');
        users.setNextStep(userData._id, {
          action: 'set-settings-complexity',
          value: null,
        });
      } else {
        const updatedUser = await updateUser(userData._id, { $set: { [`settings.${prop}`]: value }});
        await bot.sendMessage(userData._id, 'Настройки сложности успешно обновлены!', {
          parse_mode: 'HTML',
          reply_markup: settingsKeyboard(updatedUser.settings)
        });
        users.setData(userData._id, { ...updatedUser, nextStep: null });
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
    const themeName = getThemeText(theme, themes);
    return `${ totalExp >= MIN_SCORE_FOR_DOWNLOAD_CERT ? '✅ ' : '👀 ' }<b>${themeName}</b>\n Набрано очков (exp): ${totalExp}\n Ваш уровень: ${levelName}\n`;
  }).join('\n');
}

const sendUserCert = async (theme, bot) => {
  const { totalExp } = user.data.levels[theme];
  const message = totalExp >= MIN_SCORE_FOR_DOWNLOAD_CERT
    ? `✅ Ваш сертификат по ${getThemeText(theme, themes)} формируется и будет готов в течение 30 минут и будет выслан вам в личном сообщении.`
    : `❌ Не хватает очков для получения сертификата по ${getThemeText(theme, themes)}: ${totalExp}/${MIN_SCORE_FOR_DOWNLOAD_CERT - totalExp}`;

  await bot.sendMessage(user.data._id, message);
}

const getUserAnswersHistory = (theme) => {
  const { answers, settings } = user.data;
  const lang = settings.language;
};

module.exports = {
  checkUserService,
  calculateUserExp,
  toggleUserSetting,
  setUserSetting,
  getUserAchievements,
  sendUserCert,
  getUserAnswersHistory,
};
