const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');
const { fillThemesCollections } = require('./../resources/questions/questions.repository');

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
    await fillThemesCollections();
    cb();
  });
};

module.exports = { connectToDB };
