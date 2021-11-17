const { user, questionsCache } = require("../common/state");
const { getUserAnswers } = require("../database");
const { clearPrototype } = require("../common/helpers")

const getQuestion = async (questions, lang, theme) => {
  const answers = await getUserAnswers(user.getData()._id);
  if (!answers) {
    questionsCache.checkAndPush(clearPrototype(questions.data[0]), { lang, theme });
    return questions.data[0];
  }
  const answeredQuestions = answers.map(answer => answer.questionId);
  const question = questions.data.find(question => answeredQuestions.indexOf(question._id) === -1);
  questionsCache.checkAndPush(clearPrototype(question), { lang, theme });
  return question;
};

const checkPollCorrect = ({ options, correct_option_id }) => {
  const voteId = options.findIndex(option => option.voter_count === 1);
  return correct_option_id === voteId;
}

module.exports = {
  getQuestion,
  checkPollCorrect,
};
