module.exports = {
  inline_keyboard: [
    [
      {
        text: 'История ответов',
        callback_data: 'answer-history'
      },
    ],
    [
      {
        text: 'Достижения',
        callback_data: 'achievements'
      },
      {
        text: 'Получить сертификат',
        callback_data: 'get-certificate'
      },
    ],
    [
      {
        text: 'Настройки',
        callback_data: 'settings'
      },
      {
        text: 'Удалить аккаунт',
        callback_data: 'delete-account'
      },
    ]
  ]
}
