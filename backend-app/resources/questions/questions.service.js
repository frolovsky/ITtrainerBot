const questionsRepo = require('./questions.repository');

const getAll = async (lang) => await questionsRepo.getAll(lang);
const create = async (lang, question) => await questionsRepo.create(lang, question);

module.exports = { getAll, create };
