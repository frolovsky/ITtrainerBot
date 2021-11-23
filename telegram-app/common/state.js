const themes = [
  {
    theme: 'javascript',
    text: 'JavaScript',
  },
  {
    theme: 'html',
    text: 'HTML',
  },
  {
    theme: 'css',
    text: 'CSS',
  },
  {
    theme: 'vue',
    text: 'Vue',
  },
  {
    theme: 'react',
    text: 'React',
  },
  {
    theme: 'python',
    text: 'Python',
  }
];

const themesEnum = themes.map(theme => theme.theme);

const levelNames = ['low-', 'low', 'low+', 'mid-', 'mid', 'mid+', 'high-', 'high', 'high+', 'pro'];

const languages = ['ru', 'en'];

class UserState {
  constructor(data) {
    this.data = data;
    this.botNextStep = null;
  }

  setData(data) {
    this.data = data;
  }

  setBotNextStep(nextStep) {
    this.botNextStep = nextStep;
  }
}

class CacheParent {
  constructor() {
    this.data = [];
  }
  getData(id) {
    return this.data.find(i => i._id === id);
  }

  pushData(data) {
    this.data.push(data);
  }

  checkAndPush(...params) {
    const data = Object.assign({}, ...params);
    if (!this.getData(data._id)) {
      this.pushData(data);
    }
  }

  updateData(data) {
    const entityIndex = this.data.findIndex(i => i._id === data._id);
    if (entityIndex !== -1) {
      this.data[entityIndex] = { ...this.data[entityIndex], ...data };
    }
  }
}

class QuestionsCache extends CacheParent {
  constructor() {
    super();
  }
}

class UserAnswersCache extends CacheParent {
  constructor() {
    super();
  }
}

const user = new UserState({});
const questionsCache = new QuestionsCache();
const userAnswersCache = new UserAnswersCache();

module.exports = {
  user,
  userAnswersCache,
  questionsCache,
  themes,
  themesEnum,
  languages,
  levelNames
};
