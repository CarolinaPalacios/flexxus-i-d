import { Request } from "express";

declare namespace Express {
  interface Request {
    user: {
      email: string;
    };
  }
}
