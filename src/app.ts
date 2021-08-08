import express from "express";
import { globalErrorHandler } from "./controllers/error.controller";
import userRouter from "./routes/user.routes";

let app = express();

app.use(express.json());

//api
app.use("/users", userRouter);

app.use(globalErrorHandler);

export default app;
