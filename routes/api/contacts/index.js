const express = require("express");
const router = express.Router();
const validate = require("./validation");
const contactControllers = require("../../../controllers/contacts");
const guard = require("../../../helpers/guard");

router
  .get("/", guard, contactControllers.getAll)
  .post("/", guard, validate.createContact, contactControllers.create);

router
  .get("/:id", guard, contactControllers.getById)
  .put("/:id", guard, validate.updateContact, contactControllers.update)
  .delete("/:id", guard, contactControllers.remove);

module.exports = router;
