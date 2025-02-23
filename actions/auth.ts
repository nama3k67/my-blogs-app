"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { handleAsyncAction } from "@/lib/async";
import { storeCookies } from "@/lib/cookie";
import { login, signup } from "@/services/actions/auth.action";
import { ROUTES, TOKEN } from "@/shared/constants";
import { LoginData } from "@/shared/types/auth/login.type";
import { SignupData } from "@/shared/types/auth/signup.type";

export async function handleLogin(data: LoginData) {
  return handleAsyncAction(async () => {
    const { accessToken, refreshToken } = await login(data);

    await storeCookies(accessToken, refreshToken);
    redirect(ROUTES.PUBLIC.BLOG_LIST);
  });
}

export async function handleSignUp(data: SignupData) {
  return handleAsyncAction(async () => {
    const { accessToken, refreshToken } = await signup(data);

    await storeCookies(accessToken, refreshToken);
    redirect(ROUTES.PUBLIC.BLOG_LIST);
  });
}

export async function handleLogout() {
  return handleAsyncAction(async () => {
    const cookieStore = await cookies();
    cookieStore.delete(TOKEN.ACCESS).delete(TOKEN.REFRESH);
    redirect(ROUTES.PUBLIC.LOGIN);
  });
}
