const { Schema, model, SchemaTypes } = require("mongoose");

const categorySchema = Schema({
  name: {
    type: String,
    required: true,
  },
  resources: [
    {
      type: SchemaTypes.ObjectId,
      ref: "resource",
      default: [],
    },
  ],
});

module.exports = model("category", categorySchema);
