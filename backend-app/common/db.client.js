const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, err => {
    if (err) {
      console.log('connection error: ', err);
    }
  });

  mongoose.connection.once('open', async () => {
    console.log('Connected to DB');
    cb();
  });
};

module.exports = { connectToDB };
