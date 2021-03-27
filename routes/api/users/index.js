const express = require("express");
const router = express.Router();
const userControllers = require("../../../controllers/user");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");
const { validateUploadAvatar } = require("./validation");

router.get("/current", guard, userControllers.current);

router.patch(
  "/avatars",
  [guard, upload.single("avatar"), validateUploadAvatar],
  userControllers.avatars
);

router.get("/verify/:token", userControllers.verify);

module.exports = router;
