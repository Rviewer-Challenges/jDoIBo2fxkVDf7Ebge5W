const { SchemaTypes, Schema, model } = require("mongoose");
const { defaultImageUser } = require("../constants/images");

const userSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
    default: defaultImageUser,
  },
  active: {
    type: Boolean,
    default: true,
  },
  darkMode: {
    type: Boolean,
    default: false,
  },
  tour: {
    type: Boolean,
    default: true,
  },
  websitesSaved: [
    {
      type: SchemaTypes.ObjectId,
      ref: "website",
      default: [],
    },
  ],
  websitesCommented: [
    {
      type: SchemaTypes.ObjectId,
      ref: "website",
      default: [],
    },
  ],
});

module.exports = model("user", userSchema);
