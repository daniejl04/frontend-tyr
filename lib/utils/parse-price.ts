/**
 * Convierte un precio mostrado en UI (p. ej. "2.450,50", "2,450.50 USD") a número.
 */
export function parseProductPrice(input: string): number {
  if (!input || typeof input !== "string") return 0;
  const s = input.replace(/[^\d.,-]/g, "").trim();
  if (!s) return 0;
  const lastComma = s.lastIndexOf(",");
  const lastDot = s.lastIndexOf(".");
  let normalized = s;
  if (lastComma > lastDot) {
    normalized = s.replace(/\./g, "").replace(",", ".");
  } else {
    normalized = s.replace(/,/g, "");
  }
  const n = parseFloat(normalized);
  return Number.isFinite(n) ? n : 0;
}
