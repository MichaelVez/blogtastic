const Blog = require("../database/models/blog.model");
const mongoose = require("mongoose");
const createPost = async (req, res) => {
  console.log("create new blog");
  let {
    author,
    title,
    content,
    headline,
    //  picture
  } = req.body;
  try {
    const blog = new Blog({
      // _id: new mongoose.Types.ObjectId(),
      author,
      title,
      content,
      headline,
      // picture,
    });
    const newBlog = await blog.save();
    return res.status(200).send(newBlog);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send("error has occurred creating blog post:" + err.message);
  }
};
//read one // get one blog post info
const read = async (req, res, next) => {
  console.log("reading blog");
  const _id = req.params.blogID;
  try {
    const blogById = await Blog.find({ _id: _id });

    console.log(blogById);
    if (blogById[0]) res.status(200).send(blogById);
    else return res.status(401).send("blog not found");
  } catch (err) {
    console.log(err);
    res.status(400).send("blog not found : " + err.message);
  }
};

const readAll = async (req, res, next) => {
  try {
    const allBlogs = await Blog.find();
    res.status(200).send({ blogs: allBlogs, blogsCount: allBlogs.length });
  } catch (err) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

// const query = (req, res, next) => {
//   logging.info("Query route called");

//   Blog.find(req.body)
//     .populate("author")
//     .exec()
//     .then((blogs) => {
//       return res.status(200).json({
//         count: blogs.length,
//         blogs: blogs,
//       });
//     })
//     .catch((error) => {
//       logging.error(error.message);

//       return res.status(500).json({
//         message: error.message,
//       });
//     });
// };

const update = async (req, res, next) => {
  console.log("update route");
  const _id = req.params.blogID;
  try {
    const result = await Blog.findById(_id);
    result.title = req.body.titleState;
    result.headline = req.body.headlineState;
    result.content = req.body.content;
    const savedPost = await result.save();
    res.status(200).send(savedPost);
  } catch (err) {
    console.log(err);

    res.status(400).send(err);
  }
};

// const deleteBlog = (req, res, next) => {
//   logging.warn("Delete route called");

//   const _id = req.params.blogID;

//   Blog.findByIdAndDelete(_id)
//     .exec()
//     .then(() => {
//       return res.status(201).json({
//         message: "Blog deleted",
//       });
//     })
//     .catch((error) => {
//       logging.error(error.message);

//       return res.status(500).json({
//         message: error.message,
//       });
//     });
// };
module.exports = { createPost, readAll, read, update };
