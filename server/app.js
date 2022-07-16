const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

const usersRouter = require("./routes/user.router");
const blogRouter = require("./routes/blog.router");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/userAuth", usersRouter);
app.use("/userAuth/blog", blogRouter);

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});
module.exports = app;
