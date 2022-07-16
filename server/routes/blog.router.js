const express = require("express");
const {
  createPost,
  readAll,
  read,
  update,
} = require("../controller/blog.controller");

const blogRouter = express.Router();

blogRouter.get("/", readAll);
blogRouter.get("/read/:blogID", read);
blogRouter.post("/create", createPost);
// blogRouter.post('/query', controller.query);
blogRouter.patch("/update/:blogID", update);
// blogRouter.delete('/:blogID', controller.deleteBlog);

// export = blogRouter;
module.exports = blogRouter;
