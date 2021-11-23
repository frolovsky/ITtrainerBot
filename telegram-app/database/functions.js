const { User, UserAnswer } = require('../models/User');
const { QuestionRU, QuestionEN } = require('../models/Quiz');
const { user } = require('../common/state');

const getQuestionModel = (lang) => {
  switch (lang) {
    case 'ru':
      return QuestionRU;
    case 'en':
      return QuestionEN;
    default:
      return QuestionRU;
  }
};

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

const updateUser = async (id, userData) => {
  const data = await User.findOneAndUpdate({ _id: id }, { ...userData }, { new: true });
  user.setData(data);
  return data;
};

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
  return getQuestionModel(lang).findOne({ theme });
};

const getUserAnswers = async (chatId, theme) => {
  return UserAnswer.find({ userId: chatId, isCorrect: { $ne: 'pending' }, theme });
};

const getAnsweredQuestions = async (chatId, theme) => {
  const result = [];
  const answers = await getUserAnswers(chatId, theme);
  const [answersRu, answersEn] = answers.reduce((acc, item) => {
    item.lang === 'ru' ? acc[0].push(item) : acc[1].push(item);
    return acc;
  }, [[], []]);
  const answersRuQIds = answersRu.map(answer => answer.questionId);
  const answersEnQIds = answersEn.map(answer => answer.questionId);
  if (answersRu.length) {
    const questions = await getQuestionModel('ru').findOne({ theme });
    const filteredQuestions = questions.data.filter(question => question._id.includes(answersRuQIds));
    result.push(...filteredQuestions);
  }
  if (answersEn.length) {
    const questions = await getQuestionModel('en').findOne({ theme });
    const filteredQuestions = questions.data.filter(question => question._id.includes(answersEnQIds));
    result.push(...filteredQuestions);
  }
  return result;
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
