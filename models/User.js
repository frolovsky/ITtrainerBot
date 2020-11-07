const mongoose, { Schema } = require('mongoose');

const userSchema = new Schema({
  id: String,
  date_start: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema)

module.exports = User;