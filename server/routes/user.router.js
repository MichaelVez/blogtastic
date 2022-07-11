const express = require("express");
const {
  createNewUser,
  //   loginUser,
  //   logoutUser,
} = require("../controller/user.controllers");
// const authentication = require("../middleware/authentication");

const usersRouter = express.Router();

// POST
usersRouter.post("/create", createNewUser);

// usersRouter.post("/login", loginUser);

// usersRouter.post("/logout", authentication, logoutUser);

module.exports = usersRouter;
