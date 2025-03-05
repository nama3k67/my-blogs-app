"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { TOKEN } from "@/shared/constants";
import prisma from "@/shared/libs/prisma";
import { TokenPayload, Tokens } from "@/shared/types/auth";
import { storeCookies } from "./cookie";

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

if (!jwtSecret || !jwtRefreshSecret) {
  throw new Error("Missing JWT configuration in environment variables.");
}

const ACCESS_TOKEN_EXPIRATION = "1h";
const REFRESH_TOKEN_EXPIRATION = "7d";
const REFRESH_TOKEN_MS = 7 * 24 * 60 * 60 * 1000; // seven days in milliseconds

// Helper to verify token with error handling
function verifyToken(token: string, secret: string): TokenPayload | null {
  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    console.error("Error verifying token", error);
    return null;
  }
}

export async function generateTokens(
  payload: TokenPayload,
  oldRefreshToken?: string
): Promise<Tokens> {
  const accessToken = jwt.sign(payload, jwtSecret as string, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
  const refreshToken = jwt.sign(payload, jwtRefreshSecret as string, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_MS);

  if (oldRefreshToken) {
    await prisma.userToken.update({
      where: { token: oldRefreshToken },
      data: { token: refreshToken, userid: payload.userId, expiresAt },
    });
  } else {
    await prisma.userToken.create({
      data: {
        token: refreshToken,
        userid: payload.userId,
        expiresAt,
      },
    });
  }

  return { accessToken, refreshToken };
}
// Keep the original verify function but make it not refresh tokens
export const verify = async () => {
  try {
    const cookieStore = await cookies();

    // Check access token first
    const accessCookie = cookieStore.get(TOKEN.ACCESS);
    if (accessCookie) {
      const payload = verifyToken(accessCookie.value, jwtSecret);
      if (payload) {
        return { isAuth: true, userId: payload.userId };
      }
    }

    // Then check refresh token
    const refreshCookie = cookieStore.get(TOKEN.REFRESH);
    if (refreshCookie) {
      const payload = verifyToken(refreshCookie.value, jwtRefreshSecret);
      if (payload) {
        const tokenRecord = await prisma.userToken.findUnique({
          where: { token: refreshCookie.value },
        });

        if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
          console.log("Refresh token expired");
          return { isAuth: false, userId: null };
        }

        // Don't refresh tokens here, just return auth status
        return {
          isAuth: true,
          userId: payload.userId,
          needsRefresh: true,
          email: payload.email,
        };
      }
    }

    return { isAuth: false, userId: null };
  } catch (error) {
    console.error("Error verifying token", error);
    return { isAuth: false, userId: null };
  }
};

// Add a dedicated token refresh action
export const refreshTokens = async (
  userId: number,
  email: string,
  currentRefreshToken: string
) => {
  const { accessToken, refreshToken: newRefreshToken } = await generateTokens(
    { userId, email },
    currentRefreshToken
  );

  await storeCookies(accessToken, newRefreshToken);
  return true;
};
