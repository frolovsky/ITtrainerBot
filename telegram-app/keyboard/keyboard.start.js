module.exports = {
  inline_keyboard: [
    [
      {
        text: 'Мой профиль',
        callback_data: 'my-profile'
      },
      {
        text: 'Настройки',
        callback_data: 'setting'
      },
    ],
    [
      {
        text: 'Тесты',
        callback_data: 'start-test'
      }
    ],
    [
      {
        text: 'Тренировка перед собеседованием',
        callback_data: 'start-interview'
      }
    ],
    [
      {
        text: 'Учебные материалы',
        callback_data: 'study-materials'
      }
    ],
    [
      {
        text: 'Поддержать проект',
        callback_data: 'donate'
      }
    ]
  ]
}
