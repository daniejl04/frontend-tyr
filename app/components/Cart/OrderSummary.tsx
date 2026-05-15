"use client";

import React from "react";
import Link from "next/link";
import type { CartItem } from "@/types/cart";
import EpaycoCheckoutButton from "./EpaycoCheckoutButton";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  dict: Record<string, string>;
  locale: string;
}

const OrderSummary = ({ items, subtotal, dict, locale }: OrderSummaryProps) => {
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const bundleName =
    dict.checkoutBundleName?.replace(/\{count\}/g, String(items.length)) ??
    `Order (${items.length} items)`;

  return (
    <aside className="w-full lg:w-96 space-y-8 h-fit">
      <div className="bg-surface-container-low p-10 space-y-8 border border-outline-variant/10">
        <h2 className="text-xl font-headline font-black uppercase tracking-tighter border-b-2 border-primary pb-6">
          {dict.summary}
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase text-tertiary">
            <span>{dict.subtotal}</span>
            <span className="text-on-surface text-sm">
              $
              {subtotal.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between items-start text-[10px] font-black tracking-widest uppercase text-tertiary">
            <div className="space-y-1">
              <span>{dict.shipping}</span>
              <p className="text-[8px] font-bold normal-case italic">
                {dict.shippingDesc}
              </p>
            </div>
            <span className="text-on-surface text-sm">—</span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase text-tertiary">
            <span>{dict.tax}</span>
            <span className="text-on-surface text-sm">
              $
              {tax.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="pt-8 border-t-4 border-on-surface flex justify-between items-center">
          <span className="text-lg font-headline font-black uppercase tracking-tighter">
            {dict.total}
          </span>
          <span className="text-3xl font-headline font-black text-on-surface">
            $
            {total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="space-y-4 pt-4">
          <EpaycoCheckoutButton
            items={items}
            subtotal={subtotal}
            tax={tax}
            total={total}
            locale={locale}
            bundleName={bundleName}
            label={dict.checkout}
            loadingLabel={dict.checkoutLoading}
            notConfiguredLabel={dict.checkoutEpaycoMissing}
            scriptErrorLabel={dict.checkoutEpaycoScriptError}
          />

          <div className="space-y-3 pt-6 border-t border-outline-variant/10">
            <div className="flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-tertiary">
              <span className="material-symbols-outlined text-primary text-base">
                local_shipping
              </span>
              {dict.delivery}
            </div>
            <div className="flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-tertiary">
              <span className="material-symbols-outlined text-primary text-base">
                verified
              </span>
              {dict.warranty}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link
          href={`/${locale}/catalog`}
          className="text-[10px] font-black tracking-widest uppercase text-tertiary hover:text-primary transition-colors border-b border-outline-variant hover:border-primary pb-1"
        >
          {dict.continue}
        </Link>
      </div>
    </aside>
  );
};

export default OrderSummary;
