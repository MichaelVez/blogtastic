const express = require("express");
const {
  createNewUser,
  loginUser,
  updateUser,
  //   logoutUser,
} = require("../controller/user.controllers");
const authentication = require("../middleware/auth");
// const authentication = require("../middleware/auth");
const fileUpload = require("../middleware/file-upload");
// const authentication = require("../middleware/authentication");

const usersRouter = express.Router();
usersRouter.post("/create", createNewUser);
usersRouter.post(
  "/update",
  fileUpload.single("image"),
  updateUser,
  (error, req, res, next) => {
    res.status(400).send(error.message);
  }
);
usersRouter.post("/login", loginUser);

// usersRouter.post("/logout", authentication, logoutUser);

module.exports = usersRouter;
