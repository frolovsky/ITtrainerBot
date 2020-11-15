const User = require('../models/User');

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

module.exports = {
  getUser, createUser
}