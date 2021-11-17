module.exports = (quiz) => {
  return {
    inline_keyboard: [
      [
        {
          text: 'Пропустить',
          callback_data: `skip-quiz-${quiz}`
        },
        {
          text: 'Теория',
          callback_data: `get-theory-quiz-${quiz}`
        },
      ],
      [
        {
          text: 'Ошибка в вопросе',
          callback_data: `report-quiz-${quiz}`
        },
      ],
    ]
  }
}
