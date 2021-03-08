const express = require("express");
const router = express.Router();
const validate = require("./validation");
const usersControllers = require("../../../controllers/users");

// router
//   .get("/", usersControllers.getAll)
//   .post("/", validate.createContact, usersControllers.create);

// router
//   .get("/:id", usersControllers.getById)
//   .put("/:id", validate.updateContact, usersControllers.update)
//   .delete("/:id", usersControllers.remove);

module.exports = router;
