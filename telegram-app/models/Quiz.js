const mongoose = require('mongoose');
const { v4 } = require('uuid');
const { themesEnum, languages } = require("../common/state");

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
  lang: {
    type: String,
    enum: languages,
    required: true
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
});

const Question = new mongoose.model('question', QuestionSchema, 'questions');

module.exports = {
  Question
}
