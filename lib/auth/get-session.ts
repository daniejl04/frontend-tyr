import "server-only";

import { getAccessTokenFromCookies } from "@/lib/auth/session-server";
import { decodeJwtPayload } from "@/lib/auth/jwt-decode";
import type { SessionUser } from "@/types/session";

export async function getServerSession(): Promise<SessionUser | null> {
  const token = await getAccessTokenFromCookies();
  if (!token) return null;

  const payload = decodeJwtPayload(token);
  if (!payload?.sub) return null;
  if (payload.exp == null || payload.exp * 1000 <= Date.now()) return null;

  let permissions: string[] = [];
  if (Array.isArray(payload.permissions)) {
    permissions = payload.permissions.filter(
      (x): x is string => typeof x === "string"
    );
  }

  return {
    userId: payload.sub,
    username: typeof payload.username === "string" ? payload.username : "—",
    role: typeof payload.role === "string" ? payload.role : "user",
    email: typeof payload.email === "string" ? payload.email : undefined,
    permissions,
    expiresAt: payload.exp,
  };
}
