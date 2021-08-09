import Post from "../models/post.model";
import { catchAsync } from "../utils/catchAsync";

export let createPost = catchAsync(async (req, res, next) => {
  let { title, content } = req.body;
  let post = await Post.create({ title, content, user: req.user?._id });
  res.status(201).json({
    status: "success",
    post,
  });
});

export let gerPosts = catchAsync(async (req, res, next) => {
  let posts = await Post.find();
  res.status(200).json({
    status: "success",
    posts,
  });
});
