const repository = require('./narrow-thematic.repository');
const { readFileSync } = require('fs');
const path = require('path');

const getAll = async () => repository.getAll();
const create = async (files, quizBundle) => {
  const images = files && files.length ? files.map(file => ({
    data: readFileSync(path.join(__dirname + '../../../uploads/' + file.filename)),
    contentType: file.mimetype,
  })) : [];
  return repository.create({ ...quizBundle, images });
};

module.exports = { getAll, create };
