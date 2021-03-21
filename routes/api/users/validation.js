const { HttpCode } = require("../../../helpers/constats");
module.exports.validateUploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: "Image of avatar not found",
    });
  }
  next();
};
