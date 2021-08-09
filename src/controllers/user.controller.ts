import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/user.model";
import { catchAsync } from "../utils/catchAsync";
import { sendJwt } from "../utils/sendJwt";

interface JwtPayload extends jwt.JwtPayload {
  id: string;
}

export let signup = catchAsync(async (req, res, next) => {
  let { username, password, email } = req.body;
  let user = await User.create({ username, password, email });
  res.status(201).json({
    status: "success",
    user,
  });
});

export let signin = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ error: "invalid email or password" });
  let isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch)
    return res.status(404).json({ error: "invalid email or password" });

  sendJwt(req, res, 201, user);
});

export let protectRoutes = catchAsync(async (req, res, next) => {
  let token = "";

  //we check the headers
  if (
    req.headers["authorization"] &&
    req.headers["authorization"].startsWith("Bearer")
  ) {
    token = req.headers["authorization"].split(" ")[1];
  }

  if (!token) return next("unauthorized you need to login");

  let data = jwt.verify(token, config.jwtSecret) as JwtPayload;

  let user = await User.findOne({ _id: data.id });

  if (!user) return next("invalid token please login again");

  //check to see if user did not changed his password after issuing the token
  if (user.isPasswordChanged(data.iat!))
    return next("invalid token : user changed password recently");

  req.user = user;

  next();
});

export let updateProfile = catchAsync(async (req, res, next) => {
  let { password, passwordConfirm } = req.body;
  if (password || passwordConfirm)
    return res
      .status(400)
      .json({ error: "for updating password use update password route" });

  let user = await User.findByIdAndUpdate(req.user?._id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!user)
    return res.status(404).json({ status: "failed", error: "user not found" });

  res.status(200).json({
    user,
  });
});

export let updatePassword = catchAsync(async (req, res, next) => {
  let { password, newPassword } = req.body;
  let user = await User.findById(req.user?._id);
  let isPasswordMatch = await user?.comparePassword(password);
  if (!isPasswordMatch)
    return res.status(400).json({ error: "wrong password" });

  user!.password = newPassword;
  await user?.save({ validateBeforeSave: false });

  res.status(200).json({
    user,
  });
});
