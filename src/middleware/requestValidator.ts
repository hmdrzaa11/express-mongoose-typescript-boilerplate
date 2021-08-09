import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
export const requestValidator = (schema: AnySchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  };
};
