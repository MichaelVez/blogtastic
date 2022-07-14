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
//!
const updateUser = async (req, res) => {
  const reqBody = req.body;
  try {
    const user = await User.findById(reqBody._id);
    if (!user) {
      console.log("return with error user not found");
      return res.status(400).send({ error: "user not found" });
    }
    console.log("this is found user");
    console.log(user);
    user.image = req.file.path.replace("server ", "");
    await user.save();
    console.log("user saved");
    res.status(201);
    res.send(user);
    // res.send({ _id, userName, email, image, tokens });
  } catch (err) {
    res.send(err);
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
};
