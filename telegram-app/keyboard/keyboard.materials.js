module.exports = (theme) => ({
  inline_keyboard: [
    [
      {
        text: 'Следующий вопрос',
        callback_data: `${theme}-getpoll`
      },
    ],
  ]
});
