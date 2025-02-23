"use server";

import { redirect } from "next/navigation";
import { verify } from "./dal";
import { ROUTES } from "@/shared/constants";

export async function handleAsyncAction<T>(
  asyncFunction: () => Promise<T>,
  needsAuth = true
): Promise<
  | T
  | {
      success: false;
      data?: never;
      message: string;
      errors: Record<string, unknown>;
    }
> {
  try {
    if (needsAuth) {
      const { isAuth } = await verify();
      if (!isAuth) redirect(ROUTES.PUBLIC.LOGIN);
    }

    return await asyncFunction();
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
}
