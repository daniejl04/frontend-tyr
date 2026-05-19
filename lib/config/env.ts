/**
 * Centraliza y valida las variables de entorno.
 */
export const env = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/",
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
  },
  /** Base del servicio de auth (sin /api). Ej: http://localhost:3005 */
  auth: {
    baseUrl:
      process.env.AUTH_API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:3005",
  },
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  },
  /** ePayco Web Checkout (clave pública solo en NEXT_PUBLIC_) */
  epayco: {
    publicKey: process.env.NEXT_PUBLIC_EPAYCO_PUBLIC_KEY || "",
    /** "true" = modo pruebas (por defecto en desarrollo) */
    test:
      process.env.NEXT_PUBLIC_EPAYCO_TEST === "true" ||
      (process.env.NEXT_PUBLIC_EPAYCO_TEST !== "false" &&
        process.env.NODE_ENV === "development"),
    currency: process.env.NEXT_PUBLIC_EPAYCO_CURRENCY || "cop",
    country: process.env.NEXT_PUBLIC_EPAYCO_COUNTRY || "co",
    /** URL absoluta del webhook en tu backend (Nest, etc.) */
    confirmationUrl: process.env.NEXT_PUBLIC_EPAYCO_CONFIRMATION_URL || "",
    /**
     * Origen público para armar la URL de respuesta si no defines NEXT_PUBLIC_APP_URL.
     * En producción conviene fijar NEXT_PUBLIC_APP_URL (ej. https://tudominio.com).
     */
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "",
  },
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
};

if (!process.env.NEXT_PUBLIC_API_URL && !env.isDevelopment) {
  console.warn(
    "⚠️ NEXT_PUBLIC_API_URL no está definida. Usando fallback de localhost."
  );
}
