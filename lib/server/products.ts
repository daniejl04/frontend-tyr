import { productService } from "@/services/product-service";
import type { ProductDetail } from "@/types/product";

export type { ProductDetail };

/**
 * Obtiene un producto por su ID (delegado al servicio de productos).
 */
export async function getProductById(
  id: string
): Promise<ProductDetail | undefined> {
  try {
    return await productService.getById(id);
  } catch (error) {
    console.error(`[lib/server/products] Error obteniendo producto ${id}:`, error);
    return undefined;
  }
}

/**
 * Obtiene todos los productos (respuesta paginada → solo datos).
 */
export async function getAllProducts(): Promise<ProductDetail[]> {
  try {
    const response = await productService.getAll();
    return response.data as ProductDetail[];
  } catch (error) {
    console.error("[lib/server/products] Error obteniendo todos los productos:", error);
    return [];
  }
}
