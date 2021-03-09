const express = require("express");
const router = express.Router();
// const validate = require("./validation");
const usersControllers = require("../../../controllers/users");
const guard = require("../../../helpers/guard");

router.post("/registration", usersControllers.reg);
router.post("/login", usersControllers.login);
router.post("/logout", guard, usersControllers.logout);

module.exports = router;
