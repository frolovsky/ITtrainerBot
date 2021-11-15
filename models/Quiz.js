const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const quizSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  options: [String],
  correctOption: {
    type: Number,
    required: true
  },
  attempts: {
    total: Number,
    success: Number
  },
  themes: [String],
  explanation: [String],
  reward: Number,
});

const answerSchema = new Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  isCorrect: Boolean,
  answerId: Number,
  attempts: [{
    date: {
      type: Date,
      default: Date.now(),
    },
    isCorrect: Boolean,
    answerId: Number
  }]
});

const JSQuiz = mongoose.model('javascript-quiz', quizSchema);
const PythonQuiz = mongoose.model('python-quiz', quizSchema);
const MarkupQuiz = mongoose.model('markup-quiz', quizSchema);

module.exports = {
  JSQuiz,
  PythonQuiz,
  MarkupQuiz
}