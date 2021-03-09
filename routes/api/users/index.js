const express = require("express");
const router = express.Router();
// const validate = require("./validation");
const userControllers = require("../../../controllers/user");
// const guard = require("../../../helpers/guard");

router.get("/current", userControllers.current);

module.exports = router;
