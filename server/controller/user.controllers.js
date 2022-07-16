const User = require("../database/models/user.model.js");
const bcryptjs = require("bcryptjs");

const createNewUser = async (req, res) => {
  const userBody = req.body;
  try {
    const newUser = new User(userBody);
    const user = await newUser.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // const user = await User.findByCredentials(email, password);
    const user = await User.findOne({ email });
    if (!user) return res.send({ error: "Unable To Login" });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.send({ error: "Unable To Login" });

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.send(err);
  }
};
const getUserWithId = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.findOne({ _id: id });
    const { userName, image } = result;
    res.send({ userName, image });
  } catch (err) {
    res.status(400).send(err);
  }
};
//!
const updateUser = async (req, res) => {
  const reqBody = req.body;
  try {
    const user = await User.findById(reqBody._id);
    if (!user) {
      return res.status(400).send("user not found");
    }
    if (req.file) {
      user.image = req.file.path
        .replace("server\\", "")
        .replace("server/", "")
        .replace("server", "");
    }
    if (
      reqBody.password &&
      reqBody.password.length >= 4 &&
      reqBody.password.length < 50
    ) {
      user.password = reqBody.password;
    }
    if (reqBody.userName && reqBody.userName !== user.userName) {
      //check if uniqe
      const findIfThisUserName = await !User.findOne({
        userName: reqBody.userName,
      });
      if (!findIfThisUserName) {
        // console.log("uniq user");
        user.userName = reqBody.userName;
      } else {
        // console.log("not uniq user");
        return res.status(401).send("user name already exists");
      }
    }
    if (reqBody.email && reqBody.email !== user.email) {
      const findIfThisMailExist = await !User.findOne({
        email: reqBody.email,
      });
      if (!findIfThisMailExist) {
        // console.log("uniq mail");
        user.email = reqBody.email;
      } else {
        // console.log("not uniq mail");
        return res.status(400).send("email already exists");
      }
    }
    if (reqBody.bio) {
      user.bio = reqBody.bio;
    }
    await user.save();
    let { email, image, tokens, userName, _id, bio } = user;
    return res.status(201).send({ bio, email, image, tokens, userName, _id });
  } catch (e) {
    res.send("an error has occoured");
  }
};
//todo
// const logoutUser = async (req, res) => {
//   try {
//     const updatedTokens = req.user.tokens.filter(
//       (objToken) => objToken.token !== req.token
//     );
//     req.user.tokens = updatedTokens;
//     await req.user.save();
//     res.send();
//   } catch (err) {
//     res.send(err);
//   }
// };

module.exports = {
  createNewUser,
  loginUser,
  updateUser,
  // logoutUser
  getUserWithId,
};
