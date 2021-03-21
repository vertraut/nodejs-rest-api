const User = require("./schemas/auth");

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatar });
};

module.exports = { updateAvatar };
