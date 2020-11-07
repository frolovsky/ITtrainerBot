const { Telegraf, Telegram } = require('telegraf');
const Stage = require('telegraf/stage')
const { API_TOKEN } = require('./common/config');
const db = require('./database');

db.init();

const telegram = new Telegram(API_TOKEN, {});
const bot = new Telegraf(API_TOKEN);
bot.launch();


bot.start( async (ctx) => {
  chatId = await ctx.update.message.chat.id;
  console.log(`Chat id: ${chatId}`)
  await telegram.sendPoll(chatId, 'Салам кидал маме?', ['Yes', 'No'], {
    type: 'quiz',
    correct_option_id: 0
  });
  await telegram.sendMessage(chatId, 'Hello bro');
});