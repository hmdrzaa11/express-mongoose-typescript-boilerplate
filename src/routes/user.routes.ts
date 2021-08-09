import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { requestValidator } from "../middleware/requestValidator";
import { signinSchema } from "../validators/signinSchema";
import { signupSchema } from "../validators/signupSchema";

let userRouter = Router();

userRouter.post(
  "/signup",
  requestValidator(signupSchema),
  userController.signup
);

userRouter.post(
  "/signin",
  requestValidator(signinSchema),
  userController.signin
);

export default userRouter;
