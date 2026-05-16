"use client";

import React from "react";
import type { CartItem } from "@/types/cart";
import { useCart } from "./CartProvider";
import Image from "next/image";

interface CartItemRowProps {
  item: CartItem;
  dict: Record<string, unknown> & {
    partNo?: string;
    removeItem?: string;
  };
}

const CartItemRow = ({ item, dict }: CartItemRowProps) => {
  const { incrementQuantity, decrementQuantity, removeItem } = useCart();

  return (
    <div className="bg-white p-8 flex gap-8 border border-outline-variant/10 group relative">
      <div className="w-40 h-40 bg-surface-container-low flex items-center justify-center overflow-hidden flex-shrink-0">
        <Image  
          src={item.image}
          alt={item.name}
          className="w-4/5 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>

      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[10px] font-black tracking-widest text-primary uppercase">
              {dict.partNo}: {item.sku}
            </p>
            <h3 className="text-xl font-headline font-black uppercase tracking-tighter text-on-surface leading-tight">
              {item.name}
            </h3>
            <p className="text-tertiary text-xs font-medium max-w-md">
              {item.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="text-tertiary hover:text-error transition-colors p-2"
            aria-label={typeof dict.removeItem === "string" ? dict.removeItem : "Remove"}
          >
            <span className="material-symbols-outlined text-xl">delete</span>
          </button>
        </div>

        <div className="flex justify-between items-end pt-4">
          <div className="flex border border-outline-variant/30">
            <button
              type="button"
              onClick={() => decrementQuantity(item.id)}
              className="px-3 py-1 hover:bg-surface-variant transition-colors border-r border-outline-variant/30 font-black"
              aria-label="−"
            >
              −
            </button>
            <span className="px-5 py-1 font-black text-sm">{item.quantity}</span>
            <button
              type="button"
              onClick={() => incrementQuantity(item.id)}
              className="px-3 py-1 hover:bg-surface-variant transition-colors border-l border-outline-variant/30 font-black"
              aria-label="+"
            >
              +
            </button>
          </div>
          <p className="text-2xl font-headline font-black text-on-surface">
            $
            {(item.price * item.quantity).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;
