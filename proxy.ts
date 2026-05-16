import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AUTH_COOKIE_ACCESS,
  AUTH_COOKIE_REFRESH,
} from "@/lib/auth/constants";
import {
  getAccessTokenFromRequest,
  isAccessTokenCookieValid,
} from "@/lib/auth/middleware-utils";

const locales = ["en", "es"];
const defaultLocale = "es";

function pathnameHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

function isProtectedAccountPath(pathname: string): boolean {
  return /^\/(en|es)\/account(\/|$)/.test(pathname);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api")) {
    if (
      pathname.startsWith("/api/admin") &&
      !request.headers.get("x-admin-token")
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = pathnameHasLocale(pathname);

  if (hasLocale && isProtectedAccountPath(pathname)) {
    const token = getAccessTokenFromRequest(request);
    if (!isAccessTokenCookieValid(token)) {
      const locale = pathname.split("/")[1] || defaultLocale;
      const loginUrl = new URL(`/${locale}/auth`, request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete(AUTH_COOKIE_ACCESS);
      res.cookies.delete(AUTH_COOKIE_REFRESH);
      return res;
    }
    return NextResponse.next();
  }

  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
