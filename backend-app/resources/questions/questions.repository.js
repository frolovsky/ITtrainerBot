const { QuestionRU, QuestionEN } = require('./questions.model');

const getQuestionModel = (lang) => {
  switch (lang) {
    case 'ru':
      return QuestionRU;
    case 'en':
      return QuestionEN;
    default:
      return QuestionRU;
  }
}

const getAll = async (lang) => getQuestionModel(lang).find({});

const create = async (lang, question) => {
  return getQuestionModel(lang).create(question);
};

module.exports = { getAll, create };
