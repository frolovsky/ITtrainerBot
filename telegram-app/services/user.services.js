const { getUser } = require("../database");
const { updateUserLastActivity } = require("../database");
const { user, questionsCache } = require("../common/state");

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

module.exports = { checkUserService, calculateUserExp };
