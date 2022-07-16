const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: { type: String },
    author: { type: String },
    content: { type: String },
    headline: { type: String },
    // picture: { type: String },
    // comments: { type:Array },
  },
  {
    timestamps: true,
  }
);

module.exports = blogSchema;
