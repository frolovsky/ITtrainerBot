const questionsRepo = require('./questions.repository');

const getAll = async () => await questionsRepo.getAll();
const create = async (question) => await questionsRepo.create(question);

module.exports = { getAll, create };
