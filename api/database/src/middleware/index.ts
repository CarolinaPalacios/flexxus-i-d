import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { HttpException } from "../utils/errors";
import { response } from "../utils";

export const validateDtoMiddleware = (DtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtoInstance = plainToClass(DtoClass, req.body);
      const errors = await validate(dtoInstance);

      if (errors.length > 0) {
        const validationErrors = errors
          .map((error) => Object.values(error.constraints || {}))
          .flat();

        response(res, 400, {
          error: true,
          message: validationErrors,
        });
      }

      next();
    } catch (error) {
      if (error instanceof HttpException) {
        return res.status(error.status).json({
          error: true,
          message: error.message,
          errors: error.errors,
        });
      }
    }
  };
};
