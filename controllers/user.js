// const Contacts = require("../model/auth");
const { HttpCode } = require("../helpers/constats");

const current = async (req, res, next) => {
  try {
    const userEmail = req.user.email;
    const userSubscription = req.user.subscription;

    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { email: userEmail, subscription: userSubscription },
    });
  } catch (e) {
    next(e);
  }
};
module.exports = { current };
