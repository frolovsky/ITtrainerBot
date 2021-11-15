const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

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
  answers: [{
    id: String,
    date: Date,
    isCorrect: Boolean,
    answerId: Number,
    attempts: [{
      id: String,
      date: Date,
      isCorrect: Boolean,
      answerId: Number,
    }]
  }],
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
  isAdmin: {
    type: Boolean,
    default: false
  },
  settings: {
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
      enum: ['RU', 'EN'],
      default: 'RU'
    }
  }
});

const User = mongoose.model('User', userSchema)

module.exports = User;
