const getThemeText = (theme, themes) => themes.find(t => t.theme === theme).text;
const clearPrototype = (obj) => typeof obj !== 'object' ? obj : JSON.parse(JSON.stringify(obj));

module.exports = {
  getThemeText,
  clearPrototype,
};
