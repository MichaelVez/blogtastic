const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const usersRouter = require("./routes/user.router");
// const commentsRouter = require("./routers/comments.router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(cors());

app.use("/userAuth", usersRouter);
// app.use(commentsRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});
module.exports = app;
