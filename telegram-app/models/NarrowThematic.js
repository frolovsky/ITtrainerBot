const mongoose = require('mongoose');
const { v4 } = require('uuid');
const { themesEnum, languages } = require("../common/state");

const NarrowThematicSchema = new mongoose.Schema({
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
  title: String,
  questions: [String],
  reward: Number,
  complexity: Number,
  order: Number,
  materials: String,
  images: [{
    data: Buffer,
    contentType: String,
  }],
});

const NarrowThematic = new mongoose.model('narrowThematic', NarrowThematicSchema, 'narrow-thematic');

module.exports = {
  NarrowThematic
}
