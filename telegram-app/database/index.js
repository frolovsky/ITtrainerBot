const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const {
  getUser,
  updateUserLastActivity,
  updateUser,
  getQuestions,
  getUserAnswers,
  createUser,
  saveUserAnswer,
  getUserAnswerByPollId,
  updateUserAnswerByPollId,
} = require('./functions')

const init = () => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }, err => {
    if (err) {
      throw new Error('Mongo connection failed')
    }
    console.log('Mongo success connected')
  })
}

module.exports = {
  init,
  getUser,
  updateUser,
  getQuestions,
  getUserAnswers,
  createUser,
  updateUserLastActivity,
  saveUserAnswer,
  getUserAnswerByPollId,
  updateUserAnswerByPollId,
}
