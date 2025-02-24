
import { cookies } from "next/headers";

import { TOKEN } from "@/shared/constants";

export async function storeCookies(accessToken: string, refreshToken: string) {
  "use server";
  const cookieStore = await cookies();
  cookieStore.set(TOKEN.ACCESS, accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
  });

  cookieStore.set(TOKEN.REFRESH, refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
}
