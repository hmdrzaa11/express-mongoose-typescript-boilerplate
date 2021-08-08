import User from "../models/user.model";
import { catchAsync } from "../utils/catchAsync";
import { sendJwt } from "../utils/sendJwt";

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
  let isPasswordMatch = user.comparePassword(password);
  if (!isPasswordMatch)
    return res.status(404).json({ error: "invalid email or password" });

  sendJwt(req, res, 201, user);
});
