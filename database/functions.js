const User = require('../models/User');
const { BuilderQuiz } = require('../models/Quiz');

const getUser = async (data) => {
  let user = await User.findById(data.chatId);
  if (!user) {
    user = await createUser(data)
  }
  return user;
}

const createUser = async (data) => {
  const user = await User.create({ 
    _id: data.chatId,
    lastActivitiy: Date.now(),
    name: `${data.firstName}`,
    username: data.username
  });
  return user;
}

const getBuilderQuiz = async () => {
  const builderQuizes = await BuilderQuiz.find();

  if (builderQuizes.length === 0) {
    const builderQuiz = await BuilderQuiz.create({ });
    return builderQuiz;
  } else {
    const builderQuiz = await BuilderQuiz.findOne({}, {}, { sort: { 'created_at' : 1 } });
    return builderQuiz;
  }
}

module.exports = {
  getUser, createUser, getBuilderQuiz
}