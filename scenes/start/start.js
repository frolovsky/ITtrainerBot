const Scene = require('telegraf/scenes/base');
const User = require('../../models/User');

const start = new Scene('start');

start.enter( async ctx => {
  const uid = ctx.from.id;
  const user = await User.findById(uid);
})


module.exports = start;