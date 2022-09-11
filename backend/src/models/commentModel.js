const { Schema, model, SchemaTypes } = require("mongoose");

const commentSchema = Schema({
  content: {
    type: String,
    default: null,
  },
  created: {
    type: Date,
    default: new Date(),
    required: true,
  },
  edited: {
    type: Boolean,
    default: false,
  },
  stars: {
    type: Number,
    required: true,
  },
  website: {
    type: SchemaTypes.ObjectId,
    ref: "website",
    required: true,
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = model("comment", commentSchema);
