import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { catchAsync } from "../utils/catchAsync";

export let signup = catchAsync(async (req, res, next) => {
  let { username, password, email } = req.body;
  let user = await User.create({ username, password, email });
  res.status(201).json({
    status: "success",
    user,
  });
});
