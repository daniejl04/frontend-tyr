export interface ProductDetail {
  id: string;
  name: string;
  sku: string;
  price: string;
  currency: string;
  status: string;
  description: string;
  images: string[];
  specs: { label: string; value: string }[];
  compatibility: { title: string; desc: string }[];
}

export type ProductSummary = Pick<ProductDetail, 'id' | 'name' | 'sku' | 'price' | 'currency' | 'status' | 'images'>;
