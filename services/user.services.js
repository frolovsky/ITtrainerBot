const { getUser } = require("./../database");
const { updateUserLastActivity } = require("./../database");
const { user, setUser } = require("./../common/state");

const checkUserService = async (chatId, firstName, username) => {
  const data = user
    ? await updateUserLastActivity({ chatId })
    : await getUser({ chatId, firstName, username });
  setUser(data);
};

module.exports = { checkUserService };
