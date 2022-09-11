const { request, response } = require("express");
const { isMongoId } = require("../helpers/mongo-id");

const validateCategory = (req = request, res = response, next) => {
  const category = req.body.category || null;
  if (!category) {
    return res.status(400).json({
      ok: false,
      msg: "Must provide a category",
    });
  }
  if (!isMongoId(category)) {
    return res.status(400).json({
      ok: false,
      msg: "Must provide a valid mongo id",
    });
  }
  next();
};

module.exports = {
  validateCategory,
};
