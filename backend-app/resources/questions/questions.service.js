const questionsRepo = require('./questions.repository');

const getAll = async (lang) => await questionsRepo.getAll(lang);
const create = async (lang, theme, question) => await questionsRepo.create(lang, theme, question);

module.exports = { getAll, create };
