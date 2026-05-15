/** Claims típicos del access JWT (sin verificar firma en cliente). */
export type JwtPayloadClaims = {
  sub?: string;
  username?: string;
  role?: string;
  email?: string;
  permissions?: unknown;
  exp?: number;
  iat?: number;
};

/**
 * Decodifica el payload del JWT (base64url). Válido en Node y Edge (middleware).
 */
export function decodeJwtPayload(token: string): JwtPayloadClaims | null {
  try {
    const [, raw] = token.split(".");
    if (!raw) return null;
    const pad = raw.length % 4 === 0 ? "" : "=".repeat(4 - (raw.length % 4));
    const b64 = raw.replace(/-/g, "+").replace(/_/g, "/") + pad;
    const json = atob(b64);
    return JSON.parse(json) as JwtPayloadClaims;
  } catch {
    return null;
  }
}
