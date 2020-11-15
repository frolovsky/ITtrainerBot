module.exports = (quiz) => {
  return {
    inline_keyboard: [
      [
        {
          text: 'Report quiz',
          callback_data: `report-quiz-${quiz}`
        },
        {
          text: 'Back',
          callback_data: 'start-test'
        },
      ],
    ]
  }
}