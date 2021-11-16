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

const getAllByTheme = async (lang, theme) => getQuestionModel(lang).findOne({ theme });

const create = async (lang, theme, question) => {
  return getQuestionModel(lang).findOneAndUpdate({ theme }, {
    $push: { data: question }
  });
};

const fillThemesCollections = async () => {
  const languages = ['ru', 'en'];
  const themes = ['javascript', 'html', 'css', 'vue', 'react', 'python'];
  for (let i = 0, len = languages.length; i < len; i++) {
    const model = getQuestionModel(languages[i]);
    for (let j = 0, len = themes.length; j < len; j++) {
      const result = await model.findOne({ theme: themes[j] });
      if (!result) {
        await model.create({
          theme: themes[j],
          data: [],
        });
      }
    }
  }
}

module.exports = {
  getAll,
  getAllByTheme,
  create,
  fillThemesCollections,
};
