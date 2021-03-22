const { HttpCode } = require("../helpers/constats");
const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");
const { promisify } = require("util");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const Users = require("../model/user");
const createFolderIsExist = require("../helpers/create-dir");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadCloud = promisify(cloudinary.uploader.upload);

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

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    // const avatarUrl = await saveAvatarToStatic(req);
    const {
      public_id: imgIdCloud,
      secure_url: avatarUrl,
    } = await saveAvatarToCloud(req);

    await Users.updateAvatar(id, avatarUrl, imgIdCloud);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: { avatarUrl },
    });
  } catch (e) {
    next(e);
  }
};
const saveAvatarToStatic = async (req) => {
  const id = req.user.id;
  const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
  const pathFile = req.file.path;
  const newNameAvatar = `${Date.now()}-${req.file.originalname}`;
  const img = await Jimp.read(pathFile);
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);
  await createFolderIsExist(path.join(AVATARS_OF_USERS, id));
  await fs.rename(pathFile, path.join(AVATARS_OF_USERS, id, newNameAvatar));
  const avatarUrl = path.normalize(path.join(id, newNameAvatar));
  try {
    await fs.unlink(
      path.join(process.cwd(), AVATARS_OF_USERS, req.user.avatar)
    );
  } catch (e) {
    console.log(e.message);
  }
  return avatarUrl;
};

const saveAvatarToCloud = async (req) => {
  const pathFile = req.file.path;
  const result = await uploadCloud(pathFile, {
    folder: "avatars",
    transformation: { width: 250, height: 250, crop: "fill" },
  });
  cloudinary.uploader.destroy(req.user.imgIdCloud, (err, result) => {
    console.log(err, result);
  });
  try {
    await fs.unlink(
      path.join(process.cwd(), AVATARS_OF_USERS, req.user.avatar)
    );
  } catch (e) {
    console.log(e.message);
  }
  return result;
};

module.exports = { current, avatars };
