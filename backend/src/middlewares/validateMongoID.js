const { request, response } = require("express");
const { isMongoId } = require("../helpers/mongo-id");

const validateMongoID = (req = request, res = response, next) => {
  const id = req.params.id;
  if (!id || !isMongoId(id)) {
    return res.status(400).json({
      ok: false,
      msg: "Must provide a valid mongo id",
    });
  }
  next();
};

const validateCategoryID = (req = request, res = response, next) => {
  const { category: categoryID } = req.query;
  if (categoryID && !isMongoId(categoryID)) {
    return res.status(400).json({
      ok: false,
      msg: "Must provide a valid category id",
    });
  }
  next();
};

const validateResourceID = (req = request, res = response, next) => {
  const { resource: resourceID } = req.body;
  if (!resourceID || !isMongoId(resourceID)) {
    return res.status(400).json({
      ok: false,
      msg: "Must provide a valid resource id",
    });
  }
  next();
};

module.exports = {
  validateMongoID,
  validateResourceID,
  validateCategoryID,
};
