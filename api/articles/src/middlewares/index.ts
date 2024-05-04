import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { response } from "../utils";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return response(res, 401, {
      error: true,
      message: "Token not provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    if (!decoded) {
      return response(res, 401, {
        error: true,
        message: "Invalid token",
      });
    }

    next();
  } catch {
    return response(res, 401, {
      error: true,
      message: "Invalid token",
    });
  }
};

export default { verifyToken };
