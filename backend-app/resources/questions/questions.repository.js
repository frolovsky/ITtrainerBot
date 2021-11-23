const { Question } = require('./questions.model');

const getAll = async () => Question.find({});

const getAllByTheme = async (lang, theme) => Question.findOne({ lang, theme });

const create = async (question) => {
  return Question.create(question);
};

module.exports = {
  getAll,
  getAllByTheme,
  create,
};
