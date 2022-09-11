const mongoose = require("mongoose");

const isMongoId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

module.exports = {
  isMongoId,
};
