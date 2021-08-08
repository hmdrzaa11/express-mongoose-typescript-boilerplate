import { ErrorRequestHandler } from "express";
export let globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req,
  res,
  next
) => {
  res.status(400).json({
    err,
  });
};
