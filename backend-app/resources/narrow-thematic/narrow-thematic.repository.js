const { NarrowThematic } = require('./narrow-thematic.model');

const getAll = async () => NarrowThematic.find({});
const create = async (quizBundle) => NarrowThematic.create(quizBundle);

module.exports = { getAll, create };
