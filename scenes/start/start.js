// const User = require('../../models/User');
// const navigation = require('../../navigation');


// start.enter( async ctx => {
//   const id = ctx.from.id;
//   const user = await User.findById(id);

//   if (!user) {
//     await User.create({ 
//       _id: id,
//       lastActivitiy: Date.now(),
//       name: `${ctx.from.first_name} ${ctx.from.last_name}`,
//       username: ctx.from.username
//      });
//     await ctx.reply(`Привет! Вижу, ты у нас впервые! Твой ID: ${id}. Проходи тесты, отслеживай свой прогресс и повышай свои скиллы.`);
//   } else {
//     user.lastActivity = Date.now()
//     await ctx.reply('Открой меню', { reply_markup: navigation.startMenu })
//   }

// })

// module.exports = start;