const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
// const User = require("../User/user.model");
const validator = require("validator");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    minlength: 4,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 150,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
  },
  img: {
    type: mongoose.Schema.Types.Mixed,
    default: "./default-avatar.png",
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jsonwebtoken.sign({ _id: user._id.toString() }, "michaelVez");

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

async function hashPasswordBeforeSaving(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcryptjs.hash(user.password, 8);
  }

  next();
}

userSchema.pre("save", hashPasswordBeforeSaving);

module.exports = userSchema;
