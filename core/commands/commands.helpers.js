// const commands = require('./commands.handler');

// const createEmptyQuizBuilder = () => {
//   return {
//     question: null,
//     options: null,
//     correctOption: null,
//     programLang: null,
//     themes: null,
//     explanation: null,
//     difficulty: null,
//     reward: null,
//   } 
// }

// const quizBuilderPusher = (bot, chatId, messageId, quizBuilder) => {
//   for (key of quizBuilder) {
//     if (quizBuilder[key] === null) {
//       bot.sendMessage(chatId, `${quizBuilderPlaceholder[key]}`, {
//         parse_mode: 'HTML',
//       });
//     }
//   }
// }

// const arrayToChat = arr => {
//   if (!Array.isArray(arr) || arr.length === 0) {
//     return '';
//   }
//   return arr.map((o, i) => `${i} ${o}`).join('\n');
// }

// const quizBuilderPlaceholder = {
//   question: 'Введите вопрос',
//   options: `Добавить вариант ответа (для изменения варианта введите !edit-o $индекс. Для удаления варианта ответа: !delete-o $индекс). \n Варианты ответов: ${arrayToChat(getQuizBuilder().options)}`,
//   correctOption: `Номер правильного ответа`,
//   programLang: `Укажите язык программирования`,
//   themes: `Добавить тему (для изменения темы !edit-t $индекс. Для удаления темы: !delete-o $индекс). \n Список тем: ${arrayToChat(getQuizBuilder().themes)}`,
//   explanation: `Добавить матеирал для решения (!edit-m $индекс / !delete-m $индекс). \n Список материалов: ${arrayToChat(getQuizBuilder().explanation)}`,
//   reward: `Вознаграждение (EXP), чем сложнее задача - тем больше. (Легкая 1-10, Средняя 11-20, Сложная 21-30)`
// }


// module.exports = {
//   createEmptyQuizBuilder,
//   quizBuilderPusher
// }