const { user } = require("./../common/state");

const getPoll = (questions) => {
  return questions.data[0];
};

module.exports = {
  getPoll,
};
