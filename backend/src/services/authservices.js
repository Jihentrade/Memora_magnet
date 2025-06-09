const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/adminmodel");
//***************************************************************************** */
async function loginUserWithEmailAndPassword(email, password) {
  try {
    console.log(email);
    const user = await User.findOne({ email: email });

    const payload = { userID: user._id };
    const token = jwt.sign(payload, process.env.SECRET);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
      throw new Error("Incorrect email or password");
    }
    return { user, tokens: token };
  } catch (err) {
    throw new Error(err);
  }
}
module.exports = {
  loginUserWithEmailAndPassword,
};
