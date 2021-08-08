import { Request, Response, NextFunction } from "express";
type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
export function catchAsync(handler: Handler) {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch((err) => next(err));
  };
}
