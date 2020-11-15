const { API_TOKEN } = require('./common/config');
const TelegramBot = require('node-telegram-bot-api');
const { action, command } = require('./core');
const db = require('./database');

const bot = new TelegramBot(API_TOKEN, {
  polling: true
});

bot.on('text', (message, meta) => {
  const chatId = message.chat.id;
  const text = message.text;

  if (text.startsWith('/')) {
    command.commandHandler(bot, chatId, text)
  }
});

bot.on('callback_query', (callbackQuery) => {
  const { data, message } = callbackQuery;
  const options = {
    chatId: message.chat.id,
    messageId: message.message_id,
  };

  action.actionHandler(bot, data, options);
});

db.init();

