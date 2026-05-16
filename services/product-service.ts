import { apiClient } from '@/lib/http/api-client';
import { ProductDetail, ProductSummary, ProductFilters, PaginatedResponse } from '@/types/product';

// Helper para simular latencia de red (opcional, se puede remover si se usa API real)
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  /**
   * Obtiene todos los productos con filtros opcionales
   */
  getAll: async (params?: ProductFilters): Promise<PaginatedResponse<ProductSummary>> => {
    // Realizamos la petición al API real usando el apiClient

    const response = await apiClient.get<PaginatedResponse<ProductSummary>>('/products', { params: params as undefined });
    return response;
  },

  /**
   * Obtiene un producto por su ID
   */
  getById: async (id: string): Promise<ProductDetail> => {
    return apiClient.get<ProductDetail>(`/products/${id}`);
  },

  /**
   * Crea un nuevo producto
   */
  create: async (data: Omit<ProductDetail, '_id'>): Promise<ProductDetail> => {
    return apiClient.post<ProductDetail>('/products', data);
  },

  /**
   * Actualiza un producto existente
   */
  update: async (id: string, data: Partial<ProductDetail>): Promise<ProductDetail> => {
    return apiClient.patch<ProductDetail>(`/products/${id}`, data);
  },

  /**
   * Elimina un producto por ID
   */
  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/products/${id}`);
  }
};
