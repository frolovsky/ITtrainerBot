const repository = require('./questions.repository');

const getAll = async () => await repository.getAll();
const create = async (question) => await repository.create(question);

module.exports = { getAll, create };
