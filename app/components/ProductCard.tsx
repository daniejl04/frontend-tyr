"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "./Cart/CartProvider";
import { parseProductPrice } from "@/lib/utils/parse-price";
import Image from "next/image";

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
  isAdminMode?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  stockUnits?: number;
  categoryName?: string;
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
  isAdminMode = false,
  onEdit,
  onDelete,
  stockUnits = 0,
  categoryName,
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

  if (isAdminMode) {
    const units = stockUnits ?? 0;
    const isOutOfStock = units <= 0;
    const isLowStock = units > 0 && units <= 5;

    let statusText = dict.inStock || "In Stock";
    let statusBg = "bg-primary text-white";
    let dotColor = "bg-green-500";

    if (isOutOfStock) {
      statusText = dict.outOfStock || "Sin Stock";
      statusBg = "bg-error text-white";
      dotColor = "bg-red-500";
    } else if (isLowStock) {
      statusText = dict.lowStock || "Bajo Stock";
      statusBg = "bg-tertiary text-white";
      dotColor = "bg-amber-500";
    }

    return (
      <div className="bg-surface-container-lowest group relative transition-all border border-outline-variant/15 shadow-sm">
        <div className="h-48 overflow-hidden bg-surface-variant relative flex items-center justify-center">
          <Image
            alt={title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
            src={image}
            width={500}
            height={500}
          />
          <div className={`absolute top-4 left-4 ${statusBg} px-2 py-1 text-[10px] font-black uppercase tracking-widest`}>
            {statusText}
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2 gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest truncate">
                {categoryName || "Turbo"}
              </p>
              <h4 className="font-headline font-extrabold text-lg leading-tight mt-1 text-on-surface truncate" title={title}>
                {title}
              </h4>
            </div>
            <p className="font-mono font-black text-on-surface text-sm shrink-0">{price}</p>
          </div>
          <p className="text-xs text-secondary font-mono truncate">SKU: {model}</p>
          <div className="mt-4 pt-4 border-t border-outline-variant/10 flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
              <span className="text-xs font-bold text-on-surface">
                {units} {units === 1 ? dict.unit || "Unidad" : dict.units || "Unidades"}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (id && onEdit) onEdit(id);
                }}
                className="w-8 h-8 flex items-center justify-center bg-surface-container text-on-surface hover:bg-primary-container hover:text-on-primary-container transition-all"
                aria-label="Edit product"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (id && onDelete) onDelete(id);
                }}
                className="w-8 h-8 flex items-center justify-center bg-surface-container text-error hover:bg-error-container hover:text-white transition-all"
                aria-label="Delete product"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            className="w-4/5 group-hover:scale-110 transition-transform duration-500 object-contain"
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
