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

const languages = ['ru', 'en'];

let user = null;
const setUser = (data) => {
  user = data;
}

module.exports = {
  user,
  setUser,
  themes,
  themesEnum,
  languages
};
