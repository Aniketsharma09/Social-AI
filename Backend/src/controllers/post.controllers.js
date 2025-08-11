const postModel = require("../models/post.modle");
const generateCaption = require("../services/ai.service");
const uploadImg = require("../services/cloud.service");
const { v4: uuidv4 } = require("uuid");

async function createPostController(req, res) {
  const file = req.file;
  const base64file = Buffer.from(file.buffer).toString("base64");
  const caption = await generateCaption(base64file);
  const imageData = await uploadImg(base64file, uuidv4());
  const post = await postModel.create({
    post: imageData.url,
    caption: caption,
    user: req.user._id,
  });
  res.status(200).json({
    message: "caption generated",
    post,
  });
}
async function getPostsController(req, res) {
  try {
    const posts = await postModel.find();
    res.status(200).json({
      message: "All posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log("Error while fetching the posts:", error);
    res.status(500).json({
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
}
async function updatePostController(req, res) {
  try {
    const { id, caption } = req.body;
    const responce = await postModel.findByIdAndUpdate(id, {
      caption: caption,
    });
    const post = await postModel.findById(id);
    res.status(200).json({
      message: "post is updated succesfull",
      post,
    });
  } catch (error) {
    console.log("error while updating post :", error);
  }
}
async function getUserPostController(req, res) {
  try {
    const { id } = req.query;
    const posts = await postModel.find({ user: id });
    res.status(200).json({
      message: "user posts fetched succesfully",
      posts,
    });
  } catch (error) {
    console.log("error while fetching user post", error);
  }
}

module.exports = {
  createPostController,
  getPostsController,
  updatePostController,
  getUserPostController,
};
