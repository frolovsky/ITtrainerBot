const { model, Schema } = require('mongoose');
const { v4 } = require("uuid");
const { languages } = require("../common/state");

const userSchema = new Schema({
  _id: Number,
  created: {
    type: Date,
    default: Date.now()
  },
  username: String,
  name: String,
  lastActivity: Date,
  lastTheme: String,
  answers: [String],
  levels: {
    javascript: {
      totalExp: {
        type: Number,
        default: 0,
      },
      levelName: {
        type: String,
        enum: ['low-', 'low', 'low+', 'mid-', 'mid', 'mid+', 'high-', 'high', 'high+', 'pro'],
        default: 'low-'
      }
    },
    html: {
      totalExp: {
        type: Number,
        default: 0,
      },
      levelName: {
        type: String,
        enum: ['low-', 'low', 'low+', 'mid-', 'mid', 'mid+', 'high-', 'high', 'high+', 'pro'],
        default: 'low-'
      }
    },
    css: {
      totalExp: {
        type: Number,
        default: 0,
      },
      levelName: {
        type: String,
        enum: ['low-', 'low', 'low+', 'mid-', 'mid', 'mid+', 'high-', 'high', 'high+', 'pro'],
        default: 'low-'
      }
    },
    vue: {
      totalExp: {
        type: Number,
        default: 0,
      },
      levelName: {
        type: String,
        enum: ['low-', 'low', 'low+', 'mid-', 'mid', 'mid+', 'high-', 'high', 'high+', 'pro'],
        default: 'low-'
      }
    },
    react: {
      totalExp: {
        type: Number,
        default: 0,
      },
      levelName: {
        type: String,
        enum: ['low-', 'low', 'low+', 'mid-', 'mid', 'mid+', 'high-', 'high', 'high+', 'pro'],
        default: 'low-'
      }
    },
    python: {
      totalExp: {
        type: Number,
        default: 0,
      },
      levelName: {
        type: String,
        enum: ['low-', 'low', 'low+', 'mid-', 'mid', 'mid+', 'high-', 'high', 'high+', 'pro'],
        default: 'low-'
      }
    },
  },
  settings: {
    arcadeMode: {
      type: Boolean,
      default: true,
    },
    notify: {
      type: String,
      enum: ['none', 'day', 'week'],
      default: 'none'
    },
    complexity: {
      type: Number,
      min: 1,
      max: 10,
      default: 1
    },
    language: {
      type: String,
      enum: ['ru', 'en'],
      default: 'ru'
    }
  }
});

const UserAnswerSchema = new Schema({
  _id: {
    type: String,
    default: v4
  },
  userId: String,
  questionId: String,
  date: {
    type: Date,
    default: Date.now()
  },
  isCorrect: Boolean,
  lang: {
    type: String,
    enum: languages,
  }
});

const User = model('User', userSchema);
const UserAnswer = new model('user-answer', UserAnswerSchema, 'user-answers');

module.exports = {
  User,
  UserAnswer,
};
