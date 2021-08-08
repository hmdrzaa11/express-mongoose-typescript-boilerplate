import { Request, Response } from "express";
import { UserDoc } from "../models/user.model";
import { generateJwt } from "./generateJwt";

export let sendJwt = (
  req: Request,
  res: Response,
  statusCode: number,
  user: UserDoc
) => {
  let token = generateJwt(user._id);
  res.status(statusCode).json({
    user,
    token,
  });
};
