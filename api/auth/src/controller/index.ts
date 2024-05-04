import axios, { AxiosError } from "axios";
import { Request, Response } from "express";
import { response } from "../utils";
import jwt from "jsonwebtoken";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { data, status } = await axios.post(
      "http://database:3003/auth/login",
      {
        email,
        password,
      }
    );

    if (status === 200) {
      const token = jwt.sign(
        { userId: data.data.id },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "7d" }
      );

      return response(res, 200, {
        user: { ...data.data, token },
      });
    } else {
      return response(res, status, data.data);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return response(res, error.response?.status || 500, error.response?.data);
    }
  }
};

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const axiosRes = await axios.post("http://database:3003/auth/register", {
      email,
      password,
    });

    const { status, data } = axiosRes;

    return response(res, status, data.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return response(
        res,
        error.response?.status || 500,
        error.response?.data.data
      );
    }
  }
};

export default { login, register };
