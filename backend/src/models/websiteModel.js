const { Schema, model, SchemaTypes } = require("mongoose");

const websiteSchema = Schema({
  resource: {
    type: SchemaTypes.ObjectId,
    ref: "resource",
    default: {},
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  link: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: SchemaTypes.ObjectId,
      ref: "comment",
      default: [],
    },
  ],
});

module.exports = model("website", websiteSchema);
