module.exports = (userSettings) => {
  const { arcadeMode, language, complexity } = userSettings;
  return {
    inline_keyboard: [
      [
        {
          text: `Автоматически присылать новый опрос: ${arcadeMode ? 'Да' : 'Нет'}`,
          callback_data: 'toggle-settings-arcadeMode'
        },
      ],
      [
        {
          text: `Язык: ${language}`,
          callback_data: 'toggle-settings-language'
        },
      ],
      [
        {
          text: `Сложность: ${complexity}`,
          callback_data: 'set-settings-complexity'
        },
      ],
    ]
  };
};
