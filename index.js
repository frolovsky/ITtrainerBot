const { API_TOKEN } = require('./common/config');
const TelegramBot = require('node-telegram-bot-api');
const { action, router } = require('./core');
const db = require('./database');

const bot = new TelegramBot(API_TOKEN, {
  polling: true
});

let user = null;

bot.on('text', async message => {
  const chatId = message.chat.id;
  const text = message.text;
  if (!user || user === null) {
    const data = {
      chatId,
      firstName: message.from.first_name,
      username: message.from.username
    }
    user = db.getUser(data)
  }
  if (text.startsWith('/')) {
    router(bot, chatId, text, message.message_id)
  }
});

bot.on('callback_query', callbackQuery => {
  const { data, message } = callbackQuery;
  const options = {
    chatId: message.chat.id,
    messageId: message.message_id,
  };

  action.actionHandler(bot, data, options);
});

db.init();

