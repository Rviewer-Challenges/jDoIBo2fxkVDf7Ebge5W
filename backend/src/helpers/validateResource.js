const Resource = require("../models/resourceModel");

const resourceExist = async (resourceID) => {
  const resourceDB = await Resource.findById(resourceID);
  return resourceDB ? true : false;
};

module.exports = {
  resourceExist,
};
