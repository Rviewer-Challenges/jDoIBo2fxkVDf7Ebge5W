const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Website = require("../models/websiteModel");
const { generateJWT } = require("../utils/jwt");

const createUser = async (req = request, res = response) => {
  try {
    const { password, email } = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        ok: false,
        msg: "email has already been registered",
      });
    }
    const newUser = new User({ email });
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);
    const userSaved = await newUser.save();
    const [token, userData] = await Promise.all([
      generateJWT(userSaved.id),
      User.findById(userSaved.id, "-password"),
    ]);
    res.status(201).json({
      ok: true,
      user: userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Something went wrong",
    });
  }
};

const changeTheme = async (req = request, res = response) => {
  try {
    const { id: userId } = req;
    const { darkMode = false } = req.body;
    const userDB = await User.findById(userId);
    if (!userDB) {
      return res.json({
        ok: false,
        msg: "user not found, try again",
      });
    }
    userDB.darkMode = darkMode;
    await userDB.save();
    res.status(200).json({
      ok: true,
      msg: "theme updated correctly",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Something went wrong",
    });
  }
};

const changeVisibleTour = async (req = request, res = response) => {
  try {
    const { id: userId } = req;
    const userDB = await User.findById(userId);
    if (!userDB) {
      return res.json({
        ok: false,
        msg: "user not found, try again",
      });
    }
    res.status(200).json({
      ok: true,
      msg: "show tour updated correctly",
    });
    userDB.tour = false;
    await userDB.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Something went wrong",
    });
  }
};

const modifyPreferences = async (req = request, res = response) => {
  const { id: userId } = req;
  try {
    const user = await User.findById(userId).populate({
      path: "websitesSaved",
      select: "_id name",
    });
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "user not found",
      });
    }
    const { id: websiteId } = req.params;
    const websiteFound = await Website.findById(websiteId);
    if (!websiteFound) {
      return res.status(404).json({
        ok: false,
        msg: "website not found",
      });
    }

    const websiteSavedBefore = user.websitesSaved.find(
      (website) => website._id.toString() === websiteId
    );
    if (websiteSavedBefore) {
      user.websitesSaved = user.websitesSaved.filter(
        (website) => website._id.toString() !== websiteId
      );
    } else {
      user.websitesSaved.push(websiteId);
    }
    await user.save();

    res.status(200).json({
      msg: "preferece modified correctly",
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Something went wrong",
    });
  }
};

module.exports = {
  createUser,
  changeTheme,
  changeVisibleTour,
  modifyPreferences,
};
