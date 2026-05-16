import { useState, useEffect, useCallback } from 'react';
import { productService } from '@/services/product-service';
import { ProductSummary, ProductFilters, PaginatedResponse } from '@/types/product';

export const useProducts = (initialFilters: ProductFilters = {}) => {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>(null);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  const fetchProducts = useCallback(async (currentFilters: ProductFilters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getAll(currentFilters);
      setProducts(response.data);
      setPagination({
        total: response.meta.total,
        page: response.meta.page,
        limit: response.meta.limit,
        totalPages: response.meta.totalPages,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(filters);
  }, [filters, fetchProducts]);

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: newFilters.page || 1 }));
  };

  const search = (query: string) => {
    updateFilters({ q: query, page: 1 });
  };

  return {
    products,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    search,
    refresh: () => fetchProducts(filters),
  };
};
