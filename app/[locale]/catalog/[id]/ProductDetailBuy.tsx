"use client";

import React, { useState } from "react";
import { useCart } from "@/app/components/Cart/CartProvider";
import { parseProductPrice } from "@/lib/utils/parse-price";

type ProductBuyPayload = {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  images: string[];
};

export default function ProductDetailBuy({
  product,
  dict,
}: {
  product: ProductBuyPayload;
  dict: {
    quantity: string;
    buyNow: string;
    requestQuote: string;
  };
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const unitPrice = parseProductPrice(product.price);
  const image = product.images?.[0] || "/placeholder-product.png";

  const adjust = (delta: number) => {
    setQuantity((q) => Math.min(99, Math.max(1, q + delta)));
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      sku: product.sku,
      name: product.name,
      description: product.description,
      price: unitPrice,
      image,
      quantity,
    });
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center gap-6">
        <span className="text-[10px] font-black tracking-widest uppercase text-on-surface">
          {dict.quantity}
        </span>
        <div className="flex border border-outline-variant/30">
          <button
            type="button"
            onClick={() => adjust(-1)}
            className="px-4 py-2 hover:bg-surface-variant transition-colors border-r border-outline-variant/30"
          >
            −
          </button>
          <span className="px-6 py-2 font-black text-sm">{quantity}</span>
          <button
            type="button"
            onClick={() => adjust(1)}
            className="px-4 py-2 hover:bg-surface-variant transition-colors border-l border-outline-variant/30"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full bg-primary-container text-on-primary-container py-5 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-primary-fixed-dim transition-all"
        >
          <span className="material-symbols-outlined text-base">shopping_cart</span>
          {dict.buyNow}
        </button>
        <button
          type="button"
          className="w-full border-2 border-outline-variant text-on-surface py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-surface-container transition-all"
        >
          {dict.requestQuote}
        </button>
      </div>
    </div>
  );
}
