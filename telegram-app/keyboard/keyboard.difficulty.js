module.exports = { 
  inline_keyboard: [
    [
      {
        text: 'Легкий',
        callback_data: 'level_easy'
      },
    ],
    [
      {
        text: 'Средний',
        callback_data: 'level_medium'
      },
    ],
    [
      {
        text: 'Сложный',
        callback_data: 'level_high'
      },
    ],
    [
      {
        text: 'Всё подряд',
        callback_data: 'level_any'
      },
    ],
  ]
}