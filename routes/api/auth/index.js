const express = require("express");
const router = express.Router();
const validate = require("./validation");
const authControllers = require("../../../controllers/auth");
const guard = require("../../../helpers/guard");

router.post("/register", validate.createUser, authControllers.reg);
router.post("/login", authControllers.login);
router.post("/logout", guard, authControllers.logout);

module.exports = router;
