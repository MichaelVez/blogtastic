const mongoose = require("mongoose");
const userSchema = require("../schema/user.schema.js");

const User = mongoose.model("users", userSchema);

module.exports = User;
