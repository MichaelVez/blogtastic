const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

const usersRouter = require("./routes/user.router");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use("/uploads", express.static(path.join("uploads")));
// app.use("/uploads", express.static(path.resolve(__dirname, "/uploads")));
// app.use("/uploads", express.static(process.cwd() + "/uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/userAuth", usersRouter);
//?check file if error
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
});

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});
module.exports = app;
