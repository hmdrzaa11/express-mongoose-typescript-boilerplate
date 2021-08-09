import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { requestValidator } from "../middleware/requestValidator";
import { signinSchema } from "../validators/signinSchema";
import { signupSchema } from "../validators/signupSchema";
import { updateSchema } from "../validators/updateProfileSchema";

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

userRouter.patch(
  "/users/:id",
  requestValidator(updateSchema),
  userController.protectRoutes,
  userController.updateProfile
);

export default userRouter;
