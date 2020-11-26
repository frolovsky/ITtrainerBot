const { themesKeyboard, startKeyboard, studyKeyboard } = require('../../keyboard');
const commandListString = require('./commands.list');
const User = require('../../models/User'); 
const { createEmptyQuizBuilder } = require('./commands.helpers');

let quizBuilder;

const router = async (bot, chatId, command, messageId) => {
  if (command === '/start') {
    return bot.sendMessage(chatId, `Привет! Я бот в котором ты можешь проверять свои знания и узнавать новое. Список команд бота: ${commandListString}`, {
      parse_mode: 'HTML',
      reply_markup: startKeyboard,
    });
  } 
  if (command === '/quiz') {
    return bot.sendMessage(chatId, 'Выбери язык программирования и приступай к выполнению тестов! После каждого ответа мы будем посылать тебе новый вопрос, отключить эту функцию ты можешь в настройках\n<code>/settings - Настройки бота</code>', {
      parse_mode: 'HTML',
      reply_markup: themesKeyboard
    });
  }
  if (command === '/settings') {
    bot.sendMessage(chatId, 'Выбери язык программирования и приступай к выполнению тестов! После каждого ответа мы будем посылать тебе новый вопрос, отключить эту функцию ты можешь в настройках\n<code>/settings - Настройки бота</code>', {
      parse_mode: 'HTML',
      reply_markup: themesKeyboard
    });
    return;
  }
  if (command === '/study') {
    return bot.sendMessage(chatId, 'Отправь боту сообщение формата: \n <code>язык_программирования тема</code> \n(пример: javascript promise) \n Либо выбери язык программирования ниже', {
      parse_mode: 'HTML',
      reply_markup: studyKeyboard
    });
  }
  if (command.startsWith('/create')) {
    const user = await User.findById({ _id: chatId });
    if (!user || !user.isAdmin) {
      return bot.sendMessage(chatId, 'Отказано в доступе.');
    }
    if (!quizBuilder) {
      quizBuilder = createEmptyQuizBuilder();
    }

    return true;
  }
  return bot.sendMessage(chatId, 'Команда не найдена');
}

const getQuizBuilder = () => {
  if (!quizBuilder) {
    quizBuilder = createEmptyQuizBuilder();
  }
  return quizBuilder;
}


module.exports = { router, getQuizBuilder }