const User = require("../models/userModel");
const { generateJWT } = require("../utils/jwt");
const bcrypt = require("bcrypt");

const msg = "email or password are incorrect";

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        ok: false,
        msg,
      });
    }
    const validPassword = bcrypt.compareSync(password, userExist.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg,
      });
    }
    const [token, userData] = await Promise.all([
      generateJWT(userExist.id),
      User.findById(userExist.id, "-password").populate({
        path: "websitesCommented",
        select: "name",
      }),
    ]);
    return res.status(200).json({
      ok: true,
      user: userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk to Admin",
    });
  }
};

const renewToken = async (req, res = response) => {
  const id = req.id;
  const token = await generateJWT(id);
  const user = await User.findById(id, "-password").populate({
    path: "websitesCommented",
    select: "name",
  });
  res.json({
    ok: true,
    token,
    user,
  });
};

module.exports = {
  login,
  renewToken,
};
