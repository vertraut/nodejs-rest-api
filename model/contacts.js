const Contact = require("./schemas/contact");

const getAll = async (userId) => {
  const result = await Contact.find({ owner: userId }).populate({
    path: "owner",
    select: "name email",
  });
  return result;
};

const getById = async (id, userId) => {
  const result = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: "owner",
    select: "name email",
  });
  return result;
};

const create = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const update = async (id, body, userId) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

const remove = async (id, userId) => {
  const result = await Contact.findByIdAndDelete({
    _id: id,
    owner: userId,
  });
  return result;
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
