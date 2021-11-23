const { themes } = require('../common/state');

module.exports = (postfix) => {
  const keyboard = themes.reduce((acc, item, index) => {
    if (index % 2 === 0) {
      if (!acc[index]) acc.push([]);
    }
    acc[acc.length - 1].push({
      text: item.text,
      callback_data: `${item.theme}-${postfix}`
    });
    return acc;
  }, [[]]);

  return {
    inline_keyboard: keyboard,
  };
}
