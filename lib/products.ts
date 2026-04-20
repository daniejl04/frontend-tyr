import { productService } from '@/services/product-service';
import { ProductDetail } from '@/types/product';

// Exportamos los tipos por compatibilidad (aunque ya están en types/product.ts)
export type { ProductDetail };

/**
 * Obtiene un producto por su ID.
 * Este método ahora delega la carga al servicio de productos.
 */
export async function getProductById(id: string): Promise<ProductDetail | undefined> {
  try {
    return await productService.getById(id);
  } catch (error) {
    console.error(`[lib/products] Error obteniendo producto ${id}:`, error);
    // Podrías devolver un objeto por defecto en desarrollo si no quieres errores
    return undefined;
  }
}

/**
 * Obtiene todos los productos (añadido para completar el módulo)
 */
export async function getAllProducts(): Promise<ProductDetail[]> {
  try {
    // Para simplificar, asumimos que getAll devuelve el detalle completo o el tipo base
    return await productService.getAll() as ProductDetail[];
  } catch (error) {
    console.error(`[lib/products] Error obteniendo todos los productos:`, error);
    return [];
  }
}
