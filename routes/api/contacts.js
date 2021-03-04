const express = require("express");
const router = express.Router();
const validate = require("./validation");
const contactControllers = require("../../controllers/contacts");

router
  .get("/", contactControllers.getAll)
  .post("/", validate.createContact, contactControllers.create);

router
  .get("/:id", contactControllers.getById)
  .put("/:id", validate.updateContact, contactControllers.update)
  .delete("/:id", contactControllers.remove);

module.exports = router;
