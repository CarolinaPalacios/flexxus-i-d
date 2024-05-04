import { Response } from "express";

const response = (res: Response, statusCode: number, data: any) => {
  res.status(statusCode).json({
    data,
  });
};

export default response;
