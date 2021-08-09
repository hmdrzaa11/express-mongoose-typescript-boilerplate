import { Router } from "express";
import * as postController from "../controllers/post.controller";
import * as userController from "../controllers/user.controller";
import { requestValidator } from "../middleware/requestValidator";
import { createPostSchema } from "../validators/createPostSchema";

let postRouter = Router();

postRouter.post(
  "/",
  userController.protectRoutes,
  requestValidator(createPostSchema),
  postController.createPost
);

export default postRouter;
