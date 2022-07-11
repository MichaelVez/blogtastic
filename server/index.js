const app = require("./app.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const URL = `${process.env.MONGODB_URI}`;

mongoose.connect(URL, (error, mongoDBInstance) => {
  if (error) {
    console.log(error.message);
    throw error;
  }
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    const { host, port, name } = mongoDBInstance;
    console.log({ host, port, name });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("listen on port " + PORT);
});
