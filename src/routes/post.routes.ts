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

postRouter.get("/", postController.gerPosts);

postRouter.get("/:id", postController.getSinglePost);

postRouter.delete(
  "/:id",
  userController.protectRoutes,
  postController.deletePost
);
postRouter.patch(
  "/:id",
  userController.protectRoutes,
  postController.updatePost
);

export default postRouter;
