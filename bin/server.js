const app = require("../app");
const db = require("../model/db");
const createFilderIsExist = require("../helpers/create-dir");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, async () => {
    const UPLOAD_DIR = process.env.UPLOAD_DIR;
    const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
    await createFilderIsExist(UPLOAD_DIR);
    await createFilderIsExist(AVATARS_OF_USERS);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((e) => {
  console.log(`Server not running. Error message ${e.message}`);
  process.exit(1);
});
