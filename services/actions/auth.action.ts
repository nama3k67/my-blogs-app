"use server";

import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

import { LoginData } from "@/shared/types/auth/login.type";
import { SignupData } from "@/shared/types/auth/signup.type";
import { PrismaClient } from "@prisma/client";

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

const prisma = new PrismaClient();

// Separate a function to generate tokens
async function generateTokens(userId: number, email: string): Promise<Tokens> {
  const tokenPayload = { userId, email };
  const accessToken = sign(tokenPayload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  const refreshToken = sign(
    tokenPayload,
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );

  await prisma.userToken.create({
    data: {
      token: refreshToken,
      userid: userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    accessToken,
    refreshToken,
  };
}

export async function login(data: LoginData): Promise<Tokens> {
  const user = await prisma.users.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const isValidPassword = await compare(data.password, user.passwordhash);
  if (!isValidPassword) {
    throw new Error("Invalid password");
  }

  return generateTokens(user.id, user.email);
}

export async function signup(data: SignupData): Promise<Tokens> {
  const { email, username, password } = data;

  const user = await prisma.users.findUnique({ where: { email } });
  if (user) {
    throw new Error("User already exists");
  }

  const passwordhash = await hash(password, 12);
  await prisma.users.create({ data: { email, username, passwordhash } });

  const createdUser = await prisma.users.findUnique({ where: { email } });
  if (!createdUser) {
    throw new Error("User not created");
  }

  return generateTokens(createdUser.id, createdUser.email);
}
