const express = require("express");
const router = express.Router();
// const validate = require("./validation");
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

module.exports = router;
