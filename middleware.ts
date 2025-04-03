import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

import { i18n, Locale } from "./i18n-config";

function getLocale(request: NextRequest): string | undefined {
  const negotiationHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiationHeaders[key] = value));

  const locales: string[] = i18n.locales.slice();
  const languages: string[] = new Negotiator({
    headers: negotiationHeaders,
  }).languages(locales);

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // First try to get locale from cookies
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    // If cookie locale exists and is valid, use it; otherwise detect from headers
    const locale = i18n.locales.includes(cookieLocale as Locale)
      ? cookieLocale
      : getLocale(request);

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`,
        request.nextUrl
      )
    );
  }

  // Set or update the locale cookie based on the current path
  const response = NextResponse.next();

  // Extract current locale from path
  const currentLocale = i18n.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If we found a locale in the path, set it in the cookie
  if (currentLocale) {
    response.cookies.set("NEXT_LOCALE", currentLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  response.headers.set("x-current-url", request.nextUrl.toString());
  return response;
}

// Update the config at the bottom
export const config = {
  matcher: [
    // This regex excludes API routes, Next.js static files, favicon, PDFs, and all common image file types
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|pdf)$).*)",
  ],
};