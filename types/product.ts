export interface ProductDetail {
  _id: string;
  id?: string; // Para compatibilidad si se mapea
  name: string;
  sku: string;
  price: string;
  category?: string;
  quantity?: number;
  currency: string;
  status: string;
  description: string;
  images: string[];
  brand?: string;
  secondBrand?: string[];
  specs: { label: string; value: string; _id?: string }[];
  compatibility: { title: string; desc: string; _id?: string }[];
}

export type ProductSummary = Pick<ProductDetail, '_id' | 'id' | 'name' | 'sku' | 'price' | 'currency' | 'status' | 'images' | 'description'>;

export interface ProductFilters {
  name?: string;
  sku?: string;
  status?: string;
  brand?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  q?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
