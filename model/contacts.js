const Contact = require("./schemas/contact");

const getAll = async (
  userId,
  { sortBy, sortByDesc, filter, limit = "5", offset = "0" }
) => {
  const result = await Contact.paginate(
    { owner: userId },
    {
      limit,
      offset,
      populate: {
        path: "owner",
        select: "name email",
      },
    }
  );
  const { docs: contacts, totalDocs: total } = result;
  return { total: total.toString(), limit, offset, contacts };
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
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

const remove = async (id, userId) => {
  const result = await Contact.findOneAndRemove({
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
