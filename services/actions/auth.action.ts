"use server";

import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";

import { Tokens } from "@/shared/types/auth";
import { LoginData } from "@/shared/types/auth/login.type";
import { SignupData } from "@/shared/types/auth/signup.type";
import { generateTokens } from "@/lib/dal";

const prisma = new PrismaClient();

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

  return generateTokens({ userId: user.id, email: user.email });
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

  return generateTokens({ userId: createdUser.id, email: createdUser.email });
}
