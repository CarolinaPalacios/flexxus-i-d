import { Request, Response, NextFunction } from "express";
import { HttpException } from "../utils/errors";

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof HttpException) {
    return res.status(err.status).json({
      error: true,
      message: err.message,
      errors: err.errors,
    });
  }
  res.status(err.statusCode || 500).json({
    error: true,
    message: err.message,
  });
};

export default errorHandler;
