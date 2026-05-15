/**
 * Evita redirecciones abiertas: solo rutas internas con prefijo de locale /en o /es.
 */
export function sanitizeInternalCallbackUrl(
  raw: string | null | undefined,
  locale: string
): string {
  if (!raw || typeof raw !== "string") return `/${locale}`;
  const pathname = raw.split("?")[0].split("#")[0];
  if (!pathname.startsWith("/") || pathname.startsWith("//")) {
    return `/${locale}`;
  }
  if (/^\/(en|es)(\/|$)/.test(pathname)) {
    return pathname;
  }
  return `/${locale}`;
}
