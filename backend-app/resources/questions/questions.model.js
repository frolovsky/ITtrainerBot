const { v4 } = require('uuid');
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4
  },
  text: String,
  options: [String],
  correctOption: Number,
  reward: Number,
  materials: String
});

const QuestionRU = new mongoose.model('question', QuestionSchema, 'questions-ru');
const QuestionEN = new mongoose.model('question-en', QuestionSchema, 'questions-en');

module.exports = { QuestionRU, QuestionEN };
