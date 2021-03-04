const Contact = require("./schemas/contact");

const getAll = async () => {
  const result = await Contact.find({});
  return result;
};

const getById = async (id) => {
  const result = await Contact.findOne({ _id: id });
  return result;
};

const create = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const update = async (id, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
  return result;
};

const remove = async (id) => {
  const result = await Contact.findByIdAndDelete({
    _id: id,
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
