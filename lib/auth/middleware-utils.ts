import type { NextRequest } from "next/server";
import { AUTH_COOKIE_ACCESS } from "@/lib/auth/constants";
import { decodeJwtPayload } from "@/lib/auth/jwt-decode";

export function getAccessTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get(AUTH_COOKIE_ACCESS)?.value ?? null;
}

/** Sesión basada en cookie: token presente, parseable y no expirado. */
export function isAccessTokenCookieValid(token: string | null): boolean {
  if (!token) return false;
  const payload = decodeJwtPayload(token);
  if (!payload?.sub) return false;
  if (payload.exp == null) return false;
  return payload.exp * 1000 > Date.now();
}
