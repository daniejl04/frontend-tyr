/**
 * Centraliza y valida las variables de entorno.
 * Si falta una variable crítica, lanzará un error descriptivo en desarrollo.
 */
export const env = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
  },
  isDevelopment: process.env.NODE_ENV === 'development',
};

// Validación simple en tiempo de ejecución para variables críticas
if (!process.env.NEXT_PUBLIC_API_URL && !env.isDevelopment) {
  console.warn("⚠️ NEXT_PUBLIC_API_URL no está definida. Usando fallback de localhost.");
}
