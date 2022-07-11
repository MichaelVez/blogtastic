const User = require("../database/models/user.model.js");
const bcryptjs = require("bcryptjs");

const createNewUser = async (req, res) => {
  console.log("hey");
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

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // const user = await User.findByCredentials(email, password);
//     const user = await User.findOne({ email });
//     if (!user) return res.send({ error: "Unable To Login" });

//     const isMatch = await bcryptjs.compare(password, user.password);
//     if (!isMatch) return res.send({ error: "Unable To Login" });

//     const token = await user.generateAuthToken();
//     res.send({ user, token });
//   } catch (err) {
//     res.send(err);
//   }
// };

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
  //  loginUser, logoutUser
};
