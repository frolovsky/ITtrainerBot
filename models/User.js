const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const userSchema = new Schema({
  _id: String,
  created: {
    type: Date,
    default: Date.now()
  },
  username: String,
  name: String,
  lastActivitiy: Date,
  lastTheme: String
}, { versionKey: false });

const User = mongoose.model('User', userSchema)

module.exports = User;