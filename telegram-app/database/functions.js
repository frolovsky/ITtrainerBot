const { User, UserAnswer } = require('../models/User');
const { Question } = require('../models/Quiz');

const getUser = async (data) => {
  let user = await User.findById(data.chatId);
  if (!user) {
    user = await createUser(data)
  } else {
    await updateUserLastActivity(data);
  }
  return user;
};

const updateUserLastActivity = async ({ chatId }) => {
  return User.findOneAndUpdate({ _id: chatId }, { lastActivity: Date.now() });
};

const updateUser = async (id, userData) => User.findOneAndUpdate({ _id: id }, { ...userData }, { new: true });

const createUser = async (data) => {
  return User.create({
    _id: data.chatId,
    lastActivity: Date.now(),
    name: `${data.firstName}`,
    username: data.username,
    answers: [],
  });
};

const getQuestions = async (lang, theme) => {
  return Question.find({ lang, theme });
};

const getUserAnswers = async (userId, theme) => {
  return UserAnswer.find({ userId, isCorrect: { $ne: 'pending' }, theme });
};

const getAnsweredQuestions = async (chatId, theme) => {
  const answers = await getUserAnswers(chatId, theme);
  const answerIds = answers.map(answer => answer.questionId);
  return Question.find({  theme, _id: { $in: answerIds } });
}

const saveUserAnswer = async (data) => {
  return UserAnswer.create(data);
};

const getUserAnswerByPollId = async (pollId) => {
  return UserAnswer.findOne({ pollId });
};

const updateUserAnswerByPollId = async (pollId, isCorrect) => {
  return UserAnswer.findOneAndUpdate({ pollId }, { isCorrect });
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  getUserAnswers,
  getQuestions,
  updateUserLastActivity,
  saveUserAnswer,
  getUserAnswerByPollId,
  updateUserAnswerByPollId,
  getAnsweredQuestions,
}
