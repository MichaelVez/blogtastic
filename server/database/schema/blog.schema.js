const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: { type: String },
    author: { type: String },
    content: { type: String },
    headline: { type: String },
    comments: { type: Array },
    likes: { type: Number, default: 0 },
    // picture: { type: String },
    // comments: { type:Array },
  },
  {
    timestamps: true,
  }
);

module.exports = blogSchema;
