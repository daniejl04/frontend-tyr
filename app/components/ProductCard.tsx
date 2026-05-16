"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "./Cart/CartProvider";
import { parseProductPrice } from "@/lib/utils/parse-price";

export interface ProductCardProps {
  id?: string;
  title: string;
  model: string;
  price: string;
  /** Precio numérico si ya está disponible (evita parsear el string). */
  priceAmount?: number;
  image: string;
  inStock?: boolean;
  bestSeller?: boolean;
  dict: any;
  locale?: string;
  description?: string;
}

const ProductCard = ({
  id,
  title,
  model,
  price,
  priceAmount,
  image,
  inStock,
  bestSeller,
  dict,
  locale = "es",
  description = "",
}: ProductCardProps) => {
  const { addItem } = useCart();
  const detailUrl = id ? `/${locale}/catalog/${id}` : "#";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id) return;
    const unitPrice =
      typeof priceAmount === "number" && Number.isFinite(priceAmount)
        ? priceAmount
        : parseProductPrice(price);
    addItem({
      id,
      sku: model,
      name: title,
      description,
      price: unitPrice,
      image,
      quantity: 1,
    });
  };

  return (
    <div
      className={`bg-surface-container-lowest p-6 flex flex-col group relative ${bestSeller ? "border-4 border-primary-container" : ""}`}
    >
      <Link href={detailUrl} className="flex flex-col flex-1 min-h-0">
        {inStock && (
          <div className="absolute top-4 right-4 bg-error text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">
            {dict.inStock}
          </div>
        )}
        {bestSeller && (
          <div className="absolute top-0 left-0 bg-primary-container text-on-primary-container text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] z-10">
            {dict.bestSeller}
          </div>
        )}
        <div className="mb-8 overflow-hidden aspect-square flex items-center justify-center">
          <img
            alt={title}
            className="w-4/5 group-hover:scale-110 transition-transform duration-500"
            src={image}
          />
        </div>
        <h4 className="font-headline font-black text-lg tracking-tight uppercase leading-none">
          {title}
        </h4>
        <p className="text-tertiary text-xs mt-2 uppercase font-bold tracking-widest">
          {model}
        </p>
      </Link>
      <div className="mt-auto pt-6 flex justify-between items-center border-t border-outline-variant/20">
        <span className="text-2xl font-headline font-black">{price}</span>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!id}
          aria-label={dict.addToCart ?? "Add to cart"}
          className={`p-2 transition-colors disabled:opacity-40 disabled:pointer-events-none ${bestSeller ? "bg-primary-container hover:bg-on-primary-container hover:text-white" : "bg-surface-variant hover:bg-primary-container"}`}
        >
          <span className="material-symbols-outlined">add_shopping_cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
