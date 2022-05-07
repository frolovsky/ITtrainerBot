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
  getAnsweredQuestions,
} = require('./functions')

const init = () => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, err => {
    if (err) {
      console.log(err)
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
  getAnsweredQuestions,
}
