const fs = require("fs");

const express = require("express");
const {
  createNewUser,
  loginUser,
  updateUser,
  //   logoutUser,
  getUserWithId,
} = require("../controller/user.controllers");
const authentication = require("../middleware/auth");
// const authentication = require("../middleware/auth");
const fileUpload = require("../middleware/file-upload");

const usersRouter = express.Router();
usersRouter.post("/create", createNewUser);
usersRouter.post(
  "/update",
  fileUpload.single("image"),
  updateUser,
  (error, req, res, next) => {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        console.log(err);
        res.status(401).send(err.message);
      });
    }
    res.status(401).send(error.message);
  }
);
usersRouter.post("/login", loginUser);
usersRouter.get("/user/:id", getUserWithId);
// usersRouter.post("/logout", authentication, logoutUser);

module.exports = usersRouter;
