const { themesKeyboard, startKeyboard } = require('../../keyboard');

module.exports = (bot, chatId, command) => {
  switch (command) {
    case '/start': 
      bot.sendMessage(chatId, 'Привет! Выбери язык для прохождения тестов', {
        reply_markup: startKeyboard
      })
      break;
    case '/quiz': 
      bot.sendMessage(chatId, 'Выбери язык программирования и приступай к выполнению тестов! После каждого ответа мы будем посылать тебе новый вопрос, отключить эту функцию ты можешь в настройках <code>/settings</code>', {
        reply_markup: themesKeyboard
      })
      break;
    default:
      bot.sendMessage(chatId, 'Команда не найдена')
      break;
  }
}