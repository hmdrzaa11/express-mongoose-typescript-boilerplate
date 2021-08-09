import Post from "../models/post.model";
import { catchAsync } from "../utils/catchAsync";

export let createPost = catchAsync(async (req, res, next) => {
  let { title, content } = req.body;
  let post = await Post.create({ title, content, userId: req.user?._id });
  res.status(201).json({
    status: "success",
    post,
  });
});
