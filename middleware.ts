import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

import { i18n } from "./i18n-config";

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

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`,
        request.nextUrl
      )
    );
  }

  const response = NextResponse.next();
  response.headers.set("x-current-url", request.nextUrl.toString());
  return response;
}

export const config = {
  matcher: [
    // This regex excludes API routes, Next.js static files, favicon, and all common image file types
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg)$).*)",
  ],
};
