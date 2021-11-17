const { themes } = require('./state');

const getThemeText = (theme) => themes.find(t => t.theme === theme).text;
const clearPrototype = (obj) => JSON.parse(JSON.stringify(obj));

module.exports = {
  getThemeText,
  clearPrototype,
};
