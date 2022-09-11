const { request, response } = require("express");
const {
  validateEmail,
  validatePassword,
  validateStars,
} = require("../utils/regex");
const { isMongoId } = require("../helpers/mongo-id");

const validateCreateUser = (req = request, res = response, next) => {
  const { email = null, password = null } = req.body;
  if (!validateEmail(email) || !validatePassword(password)) {
    return res.status(400).json({
      ok: false,
      msg: "password or email has incorrect format",
    });
  }
  next();
};

const validateCreateComment = (req = request, res = response, next) => {
  const { user, stars, content, website } = req.body;
  if (!user || !stars || !website) {
    return res.status(400).json({
      ok: false,
      msg: "must provide a user, stars and website",
    });
  }
  if (!isMongoId(user) || !isMongoId(website)) {
    return res.status(400).json({
      ok: false,
      msg: "must provide a valid mongo id for user or website",
    });
  }
  if (!Number.isInteger(stars) || !validateStars(stars)) {
    return res.status(400).json({
      ok: false,
      msg: "must provide an integer number between 1 and 5",
    });
  }
  if (content && content.length > 380) {
    return res.status(400).json({
      ok: false,
      msg: "content length must be less than 380 characters",
    });
  }
  next();
};

const validateLogin = (req = request, res = response, next) => {
  const { email = null, password = null } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      msg: "Must provide email and password",
    });
  }
  next();
};

module.exports = {
  validateCreateUser,
  validateCreateComment,
  validateLogin,
};
