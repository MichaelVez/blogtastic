const express = require("express");
const {
  createNewUser,
  loginUser,
  findByToken,
  updateUser,
  //   logoutUser,
} = require("../controller/user.controllers");
const fileUpload = require("../middleware/file-upload");
// const authentication = require("../middleware/authentication");

const usersRouter = express.Router();

usersRouter.post("/create", createNewUser);
usersRouter.put("/update", fileUpload.single("image"), updateUser);
usersRouter.post("/login", loginUser);

// usersRouter.post("/logout", authentication, logoutUser);

module.exports = usersRouter;
