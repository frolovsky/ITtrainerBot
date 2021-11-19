const { API_TOKEN } = require('./common/config');
const TelegramBot = require('node-telegram-bot-api');
const { action, router } = require('./core');
const { init, updateUserAnswerByPollId, updateUser } = require('./database');
const { checkUserService, calculateUserExp } = require('./services/user.services');
const { checkPollCorrect } = require('./services/poll.serivces');
const { userAnswersCache, user, questionsCache } = require('./common/state');
const { materialsKeyboard } = require("./keyboard");

const bot = new TelegramBot(API_TOKEN, {
  polling: true
});

bot.on('message', async (message) => {
  const chatId = message.chat.id;
  const text = message.text;
  await checkUserService(chatId, message.from.first_name, message.from.username);

  if (text && text.startsWith('/')) {
    await router(bot, chatId, text, message.message_id)
  }
});

bot.on('callback_query', async (callbackQuery) => {
  const { data, message } = callbackQuery;
  const userData = user.getData();
  const options = {
    chatId: message.chat.id,
    messageId: message.message_id,
    lang: Object.keys(userData).length ? userData.settings.language : 'ru',
  };
  await checkUserService(message.chat.id, message.from.first_name, message.from.username);
  await action.actionHandler(bot, data, options);
});

bot.on('poll', async (message) => {
  const { id } = message;
  const userData = user.getData();
  const isCorrect = checkPollCorrect(message);
  const updatedUserAnswer = await updateUserAnswerByPollId(id, isCorrect);
  userAnswersCache.updateData(updatedUserAnswer);
  const { reward, theme, materials } = questionsCache.getData(updatedUserAnswer.questionId);
  const exp = calculateUserExp(isCorrect, { reward, theme });
  await updateUser(userData._id, {
    $push: { answers: updatedUserAnswer._id },
    $set: { [`levels.${theme}.totalExp`]: exp },
  });

  if (materials && !isCorrect) {
    await bot.sendMessage(userData._id, `Неправильно! Ознакомьтесь с учебными материалами, чтобы узнать правильный ответ:\n\n ${materials}`, {
      parse_mode: 'HTML',
      reply_markup: materialsKeyboard(theme)
    });
  }
});

init();

