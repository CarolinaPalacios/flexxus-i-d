import { Request, Response } from "express";
import service from "../../services/auth";
import { response } from "../../utils";
import { LoginDto, RegisterDto } from "../../dto/auth";

const login = async (req: Request, res: Response) => {
  const { email, password }: LoginDto = req.body;

  if (!email || !password)
    return response(res, 400, {
      error: true,
      message: "Email and password are required",
    });

  try {
    const user = await service.login({ email, password });

    if (user) return response(res, 200, user);

    return response(res, 404, {
      error: true,
      message: "Invalid credentials",
    });
  } catch (error) {
    return response(res, 500, {
      error: true,
      message: "Internal server error",
    });
  }
};

const register = async (req: Request, res: Response) => {
  const { email, password }: RegisterDto = req.body;

  if (!email || !password)
    return response(res, 400, {
      error: true,
      message: "Email and password are required",
    });

  try {
    const user = await service.register({ email, password });
    if (user) return response(res, 201, user);

    return response(res, 400, {
      error: true,
      message: "User already exists",
    });
  } catch (error) {
    return response(res, 500, {
      error: true,
      message: "Internal server error",
    });
  }
};

export default { login, register };
