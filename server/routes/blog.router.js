const express = require("express");
const {
  createPost,
  readAll,
  read,
  update,
  newComment,
  filterById,
  like,
} = require("../controller/blog.controller");

const blogRouter = express.Router();

blogRouter.get("/", readAll);
blogRouter.get("/read/:blogID", read);
blogRouter.post("/filterByUserId", filterById);
blogRouter.post("/like", like);
blogRouter.post("/create", createPost);
blogRouter.post("/comment", newComment);
blogRouter.patch("/update/:blogID", update);
// blogRouter.delete('/:blogID', deleteBlog);
// blogRouter.delete('/:comment', deleteComment);

// export = blogRouter;
module.exports = blogRouter;
