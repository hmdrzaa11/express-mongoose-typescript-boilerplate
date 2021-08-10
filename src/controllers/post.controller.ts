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

export let getSinglePost = catchAsync(async (req, res, next) => {
  let id = req.params.id;
  let post = await Post.findOne({ _id: id });
  if (!post)
    return res
      .status(404)
      .send({ status: "failed", message: "post not found" });

  res.send({ post });
});
