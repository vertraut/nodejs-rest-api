const Contacts = require("../model/contacts");
const { HttpCode } = require("../helpers/constats");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await Contacts.getAll(userId);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: { contacts },
    });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const contact = await Contacts.getById(req.params.id, userId);

    if (contact) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: { message: "Not Found" },
      });
    }
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.create({ ...req.body, owner: userId });
    return res.status(201).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { contact },
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.remove(req.params.id, userId);

    if (contact) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: { message: "Not Found" },
      });
    }
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.update(req.params.id, req.body, userId);

    if (contact) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: { message: "Not Found" },
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { getAll, getById, create, update, remove };
