import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { prisma } from "../../prisma";
import { RegisterDto, LoginDto } from "../../dto/auth";

const login = async ({ email, password }: LoginDto): Promise<User | null> => {
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;

  return user;
};

const register = async ({
  email,
  password,
}: RegisterDto): Promise<User | null> => {
  const userExists = await prisma.user.findFirst({ where: { email } });
  if (userExists) return null;

  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: { email, password: hashedPassword },
  });
};

export default { login, register };
