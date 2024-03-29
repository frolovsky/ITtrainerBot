const {
  themesKeyboard,
  startKeyboard,
  studyKeyboard,
  profileKeyboard,
  settingsKeyboard,
  donateKeyboard,
} = require('../../keyboard');
const commandListString = require('./commands.list');
const { users } = require('./../../common/state');

const router = async (bot, chatId, command) => {
  const { settings } = users.state[chatId];
  if (command === '/start') {
    return bot.sendMessage(chatId, `Привет! Я бот в котором ты можешь проверять свои знания и узнавать новое. Список команд бота: ${commandListString}`, {
      parse_mode: 'HTML',
      reply_markup: startKeyboard,
    });
  }
  if (command === '/quiz') {
    return bot.sendMessage(chatId, 'Выбери язык программирования и приступай к выполнению тестов! После каждого ответа мы будем посылать тебе новый вопрос, отключить эту функцию ты можешь в настройках\n<code>/settings - Настройки бота</code>', {
      parse_mode: 'HTML',
      reply_markup: themesKeyboard('getpoll')
    });
  }
  if (command === '/settings') {
    return bot.sendMessage(chatId, 'Настройки профиля', {
      parse_mode: 'HTML',
      reply_markup: settingsKeyboard(settings)
    });
  }
  if (command === '/study') {
    return bot.sendMessage(chatId, 'Отправь боту сообщение формата: \n <code>язык_программирования тема</code> \n(пример: javascript promise) \n Либо выбери язык программирования ниже', {
      parse_mode: 'HTML',
      reply_markup: studyKeyboard
    });
  }
  if (command === '/profile') {
    return bot.sendMessage(chatId, 'Профиль', {
      parse_mode: 'HTML',
      reply_markup: profileKeyboard
    });
  }
  if (command === '/interview') {
    return bot.sendMessage(chatId, 'Профиль', {
      parse_mode: 'HTML',
      reply_markup: profileKeyboard
    });
  }
  if (command === '/donate') {
    return bot.sendMessage(chatId, 'Нравится бот? Поддержи проект - стань его патроном.', {
      parse_mode: 'HTML',
      reply_markup: donateKeyboard
    });
  }
  return bot.sendMessage(chatId, 'Команда не найдена');
}


module.exports = { router }
