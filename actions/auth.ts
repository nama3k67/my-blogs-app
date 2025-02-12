"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { login, signup } from "@/services/actions/auth.action";
import { ROUTES } from "@/shared/constants";
import { LoginData } from "@/shared/types/auth/login.type";
import { SignupData } from "@/shared/types/auth/signup.type";

async function storeCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function handleLogin(data: LoginData) {
  try {
    const { accessToken, refreshToken } = await login(data);

    await storeCookies(accessToken, refreshToken);
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      success: false,
      message: errorMessage,
      errors: {},
    };
  }
  redirect(ROUTES.HOME);
}

export async function handleSignUp(data: SignupData) {
  try {
    const { accessToken, refreshToken } = await signup(data);

    await storeCookies(accessToken, refreshToken);
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      success: false,
      message: errorMessage,
      errors: {},
    };
  }
  redirect(ROUTES.HOME);
}

export async function handleLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken").delete("refreshToken");
  redirect(ROUTES.LOGIN);
}
