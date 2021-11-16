const { User } = require('../models/User');
const { QuestionRU, QuestionEN } = require('../models/Quiz');

const getQuestionModel = (lang) => {
  switch (lang) {
    case 'ru':
      return QuestionRU;
    case 'en':
      return QuestionEN;
    default:
      return QuestionRU;
  }
}

const getUser = async (data) => {
  let user = await User.findById(data.chatId);
  if (!user) {
    user = await createUser(data)
  } else {
    await updateUserLastActivity(data);
  }
  return user;
}

const updateUserLastActivity = async ({ chatId }) => {
  return await User.findOneAndUpdate({ _id: chatId }, { lastActivity: Date.now() });
}

const createUser = async (data) => {
  return await User.create({
    _id: data.chatId,
    lastActivity: Date.now(),
    name: `${data.firstName}`,
    username: data.username,
    answers: [],
  });
}

const getQuestions = async (lang, theme) => {
  return getQuestionModel(lang).findOne({ theme });
}

module.exports = {
  getUser,
  createUser,
  getQuestions,
  updateUserLastActivity
}
