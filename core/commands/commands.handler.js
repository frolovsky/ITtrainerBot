const { themesKeyboard, startKeyboard, studyKeyboard } = require('../../keyboard');
const commandListString = require('./commands.list');

module.exports = (bot, chatId, command) => {
  switch (command) {
    case '/start': 
      bot.sendMessage(chatId, `Привет! Я бот в котором ты можешь проверять свои знания и узнавать новое. Список команд бота: ${commandListString}`, {
        parse_mode: 'HTML',
        reply_markup: startKeyboard,
      })
      break;
    case '/quiz': 
      bot.sendMessage(chatId, 'Выбери язык программирования и приступай к выполнению тестов! После каждого ответа мы будем посылать тебе новый вопрос, отключить эту функцию ты можешь в настройках\n<code>/settings - Настройки бота</code>', {
        parse_mode: 'HTML',
        reply_markup: themesKeyboard
      })
      break;
    case '/settings': 
      bot.sendMessage(chatId, 'Выбери язык программирования и приступай к выполнению тестов! После каждого ответа мы будем посылать тебе новый вопрос, отключить эту функцию ты можешь в настройках\n<code>/settings - Настройки бота</code>', {
        parse_mode: 'HTML',
        reply_markup: themesKeyboard
      })
      break;
    case '/profile': 
      bot.sendMessage(chatId, 'Выбери язык программирования и приступай к выполнению тестов! После каждого ответа мы будем посылать тебе новый вопрос, отключить эту функцию ты можешь в настройках\n<code>/settings - Настройки бота</code>', {
        parse_mode: 'HTML',
        reply_markup: themesKeyboard
      })
      break;
    case '/study': 
      bot.sendMessage(chatId, 'Отрпавь боту сообщение формата: \n <code>язык_программирования тема</code> \n(привет: javascript promise) \n Либо выбери язык программирования ниже', {
        parse_mode: 'HTML',
        reply_markup: studyKeyboard
      })
      break;
    default:
      bot.sendMessage(chatId, 'Команда не найдена')
      break;
  }
}