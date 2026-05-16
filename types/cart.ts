export interface CartItem {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export type CartLineInput = Omit<CartItem, "quantity"> & { quantity?: number };
