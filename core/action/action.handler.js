const { quizKeyboard, themesKeyboard } = require('../../keyboard');

module.exports = (bot, data, options) => {
  switch(true) {
    case (/^start-test$/).test(data):
      bot.sendMessage(options.chatId, 'Выбери язык программирования и приступай к выполнению тестов! После каждого ответа мы будем посылать тебе новый вопрос, отключить эту функцию ты можешь в настройках\n<code>/settings - Открыть настройки</code>', {
        parse_mode: 'HTML',
        reply_markup: themesKeyboard
      })
      break;
    case (/^javascript-quiz$/).test(data):
      bot.sendPoll(options.chatId, 'JavaScript simple question', ['Yes', 'No', 'Skip'], {
        type: 'quiz',
        correct_option_id: 0,
        reply_markup: quizKeyboard('339'),
      })
      break;
    
    case (/^python-quiz$/).test(data):
      bot.sendPoll(options.chatId, 'Python simple question', ['Yes', 'No', 'Skip'], {
        type: 'quiz',
        correct_option_id: 0,
        reply_markup: quizKeyboard('30'),
      })
      break;

    case (/^markup-quiz$/).test(data):
      bot.sendPoll(options.chatId, 'HTML & CSS simple question', ['Yes', 'No', 'Skip'], {
        type: 'quiz',
        correct_option_id: 0,
        reply_markup: quizKeyboard('30'),
      })
      break;

    case (/^report-quiz-\d+$/).test(data): 
      console.log(`report quiz: ${data}`)
      break;
    default:
      bot.sendMessage(options.chatId, 'Unknown command.');
      console.log('unknown command')
      break;
  }
}