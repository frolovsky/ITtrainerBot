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
  lastActivitiy: Date,
  lastTheme: String,
  scores: {
    javascript: Number,
    python: Number,
    markup: Number,
  },
  totalScore: Number,
  isAdmin: {
    type: Boolean,
    default: false
  }
}, { versionKey: false });

const User = mongoose.model('User', userSchema)

module.exports = User;