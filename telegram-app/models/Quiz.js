const mongoose = require('mongoose');
const { v4 } = require('uuid');
const { themesEnum, languages} = require("../common/state");

const QuestionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4
  },
  theme: {
    type: String,
    enum: themesEnum,
    required: true
  },
  text: String,
  data: [{
    _id: {
      type: String,
      default: v4
    },
    text: String,
    options: [String],
    correctOption: Number,
    reward: Number,
    materials: String,
    images: [{
      data: Buffer,
      contentType: String,
    }],
  }],
});

const QuestionRU = new mongoose.model('question', QuestionSchema, 'questions-ru');
const QuestionEN = new mongoose.model('question-en', QuestionSchema, 'questions-en');

module.exports = {
  QuestionRU,
  QuestionEN,
}
