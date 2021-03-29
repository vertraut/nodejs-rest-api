const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const EmailService = require("../services/email");
require("dotenv").config();

const { HttpCode } = require("../helpers/constats");

const Users = require("../model/user");

const SECRET_KEY = process.env.JWT_SECRET;

const reg = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await Users.findByEmail(email);
    if (user) {
      console.log("юзер есть");
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        data: "Conflict",
        message: "Email is already used",
      });
    }

    const verifyToken = nanoid();

    const emailService = new EmailService(process.env.NODE_ENV);
    await emailService.sendEmail(verifyToken, email, name);

    const newUser = await Users.create({
      ...req.body,
      verify: false,
      verifyToken,
    });
    console.log("🚀 ~ file: auth.js ~ line 38 ~ reg ~ newUser", newUser);

    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        avatar: newUser.avatar,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.validPassword(password);
    if (!user || !isValidPassword || !user.verify) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.CONFLICT,
        data: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await Users.updateToken(id, token);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        token,
      },
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({ message: "Nothing" });
};

module.exports = { reg, login, logout };
