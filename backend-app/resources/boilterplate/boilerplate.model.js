const { v4 } = require('uuid');
const mongoose = require('mongoose');
const { themesEnum, languages } = require('./../../common/state');

const BoilerplateSchema = new mongoose.Schema({
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
});

const Boilerplate = new mongoose.model('boilerplate', BoilerplateSchema, 'boilerplate');

module.exports = { Boilerplate };
