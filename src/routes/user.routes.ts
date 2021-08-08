import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { requestValidator } from "../middleware/requestValidator";
import { signupSchema } from "../validators/signupSchema";

let userRouter = Router();

userRouter.post(
  "/signup",
  requestValidator(signupSchema),
  userController.signup
);

export default userRouter;
