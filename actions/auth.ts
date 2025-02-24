"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { storeCookies } from "@/shared/utils/cookie";
import { login, signup } from "@/services/actions/auth.action";
import { ROUTES, TOKEN } from "@/shared/constants";
import { LoginData } from "@/shared/types/auth/login.type";
import { SignupData } from "@/shared/types/auth/signup.type";

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
  redirect(ROUTES.PUBLIC.BLOG_LIST);
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
  redirect(ROUTES.PUBLIC.HOME);
}

export async function handleLogout() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN.ACCESS).delete(TOKEN.REFRESH);
  redirect(ROUTES.PUBLIC.LOGIN);
}
