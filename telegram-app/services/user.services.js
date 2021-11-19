const { getUser } = require("../database");
const { updateUserLastActivity, updateUser } = require("../database");
const { user } = require("../common/state");
const { settingsKeyboard } = require("../keyboard");

const checkUserService = async (chatId, firstName, username) => {
  const data = Object.keys(user.getData()).length
    ? await updateUserLastActivity({ chatId })
    : await getUser({ chatId, firstName, username });
  user.setData(data);
};

const calculateUserExp = (isCorrect, { reward, theme }) => {
  let exp = user.getData().levels[theme].totalExp;
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
}

module.exports = {
  checkUserService,
  calculateUserExp,
  toggleUserSetting,
};
