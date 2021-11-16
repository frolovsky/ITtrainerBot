const { API_TOKEN } = require('./common/config');
const TelegramBot = require('node-telegram-bot-api');
const { action, router } = require('./core');
const db = require('./database');
const { checkUserService } = require('./services/user.services');

const bot = new TelegramBot(API_TOKEN, {
  polling: true
});

let user = null;

bot.on('message', async (message) => {
  const chatId = message.chat.id;
  const text = message.text;
  await checkUserService(chatId, message.from.first_name, message.from.username);

  if (text.startsWith('/')) {
    await router(bot, chatId, text, message.message_id)
  }
});

bot.on('callback_query', async (callbackQuery) => {
  const { data, message } = callbackQuery;
  const options = {
    chatId: message.chat.id,
    messageId: message.message_id,
    lang: user ? user.settings.language : 'ru',
  };
  const promiseTasks = [];
  promiseTasks.push(checkUserService(message.chat.id, message.from.first_name, message.from.username));
  promiseTasks.push(action.actionHandler(bot, data, options))
  await Promise.all(promiseTasks)
});

db.init();

