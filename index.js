const { API_TOKEN } = require('./common/config');
const TelegramBot = require('node-telegram-bot-api');
const { action, command } = require('./core');
const db = require('./database');

const bot = new TelegramBot(API_TOKEN, {
  polling: true
});

// bot.onText(/\/editable/, function onEditableText(msg) {
//   const opts = {
//     reply_markup: {
      
//     }
//   };
//   bot.sendMessage(msg.from.id, 'Original Text', opts);
// });



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
  // const user = {
  //   autoSendQuizStatus: 'on'
  // }
  action.actionHandler(bot, data, options);
});



db.init();


// bot.start( async (ctx) => {
//   chatId = await ctx.update.message.chat.id;
//   console.log(`Chat id: ${chatId}`)
//   await telegram.sendPoll(chatId, 'Салам кидал маме?', ['Yes', 'No'], {
//     type: 'quiz',
//     correct_option_id: 0
//   });
//   await telegram.sendMessage(chatId, 'Hello bro');
// });
