const mongoose = require("mongoose");
const blogSchema = require("../schema/blog.schema");

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
