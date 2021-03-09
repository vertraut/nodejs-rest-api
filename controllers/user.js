// const Contacts = require("../model/auth");
const { HttpCode } = require("../helpers/constats");

const current = async (req, res, next) => {
  try {
    // const userId = req.user.id;
    // const user = await Contacts.getAll(userId);
    return res.status(HttpCode.OK).json({
      status: "success",
      //   code: HttpCode.OK,
      //   data: {},
    });
  } catch (e) {
    next(e);
  }
};
module.exports = { current };
