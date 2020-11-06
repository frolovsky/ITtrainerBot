const { Telegraf } = require('telegraf');
const { API_TOKEN } = require('./common/config');
const db = require('./database');

db.init();

const bot = new Telegraf(API_TOKEN);
bot.start((ctx) => ctx.reply('Привет! Выбирай тему тестирования и проверь свои знания.'));
bot.hears('js', (ctx) => ctx.reply('JavaScript theme'));
bot.launch();