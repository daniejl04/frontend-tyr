import { decodeJwtPayload } from "@/lib/auth/jwt-decode";

/**
 * Lee `exp` del JWT sin verificar firma (solo para calcular maxAge de cookie).
 */
export function jwtExpiryUnix(token: string): number | null {
  const payload = decodeJwtPayload(token);
  return typeof payload?.exp === "number" ? payload.exp : null;
}

/** Segundos hasta expiración para Set-Cookie maxAge; mínimo 60s. */
export function cookieMaxAgeFromJwt(accessToken: string, fallbackSeconds = 3600): number {
  const exp = jwtExpiryUnix(accessToken);
  if (exp == null) return fallbackSeconds;
  const now = Math.floor(Date.now() / 1000);
  return Math.max(60, exp - now);
}
