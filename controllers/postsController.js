const Posts = require("../models/postsModel");
const { createPostSchema } = require("../middlewares/validator");

exports.getPosts = async (req, res) => {
  const { page } = req.query;
  const postsPerPage = 10;
  try {
    let pageNum = 0;
    if (page <= 1) {
      pageNum = 0;
    } else {
      pageNum = page - 1;
    }
    const result = await Posts.find()
      .sort({ createdAt: -1 })
      .skip(pageNum * postsPerPage)
      .limit(postsPerPage)
      .populate({
        path: "userId",
        select: "email",
      });
    res.status(200).json({ success: true, message: "posts", data: result });
  } catch (error) {
    console.log(error);
  }
};

exports.createPosts = async (req, res) => {
  const { title, description, category, tags, imageUrl } = req.body;
  const { userId } = req.user;

  try {
    const { error } = createPostSchema.validate({
      title,
      description,
      category,
      tags,
      imageUrl,
      userId,
    });

    if (error) {
      return res.status(401).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const result = await Posts.create({
      title,
      description,
      category,
      tags,
      imageUrl,
      userId,
    });

    res.status(201).json({ success: true, message: "Created", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.singlePosts = async (req, res) => {
  const { _id } = req.query;

  try {
    const result = await Posts.findOne({ _id }).populate({
      path: "userId",
      select: "email",
    });
    res
      .status(200)
      .json({ success: true, message: "Single posts", data: result });
  } catch (error) {
    console.log(error);
  }
};

exports.updatePosts = async (req, res) => {
  const _id = req.query._id;

  const { title, description, category, tags, imageUrl } = req.body;
  const { userId } = req.user;

  try {
    const { error } = createPostSchema.validate({
      title,
      description,
      category,
      tags,
      imageUrl,
      userId,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const existingPost = await Posts.findOne({ _id });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (existingPost.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    existingPost.title = title;
    existingPost.description = description;
    existingPost.category = category;
    existingPost.tags = tags;
    existingPost.imageUrl = imageUrl;

    const updatedPost = await existingPost.save();

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.deletePosts = async (req, res) => {
  const _id = req.query._id; // or req.body._id
  const { userId } = req.user;

  try {
    // 1. Find post
    const existingPost = await Posts.findOne({ _id });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // 2. Check ownership
    if (existingPost.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // 3. Delete the post
    await Posts.deleteOne({ _id });

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
