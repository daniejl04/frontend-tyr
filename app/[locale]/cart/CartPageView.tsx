"use client";

import React from "react";
import Link from "next/link";
import Footer from "../../components/Footer";
import CartItemRow from "../../components/Cart/CartItemRow";
import OrderSummary from "../../components/Cart/OrderSummary";
import { useCart } from "../../components/Cart/CartProvider";

type Dict = {
  cart: {
    title: string;
    subtitle: string;
    advisory: { title: string; description: string; cta: string };
    empty?: string;
    emptyHint?: string;
    browseCatalog?: string;
    [key: string]: unknown;
  };
  footer: Record<string, unknown>;
};

export default function CartPageView({
  dict,
  locale,
}: {
  dict: Dict;
  locale: string;
}) {
  const { items, subtotal, hydrated } = useCart();

  const advisorySku =
    items.length > 0 ? items[0].sku : "HS-9920-GTX";
  const advisoryDescription = dict.cart.advisory.description.replace(
    /\{sku\}/g,
    advisorySku
  );

  return (
    <>
      <main className="pt-20 bg-surface min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <header className="mb-16 space-y-4">
            <h1 className="text-6xl font-headline font-black tracking-tighter uppercase leading-none text-on-surface">
              {dict.cart.title}
            </h1>
            <p className="text-[10px] font-black tracking-[0.3em] text-tertiary uppercase">
              {dict.cart.subtitle}
            </p>
          </header>

          {!hydrated ? (
            <p className="text-tertiary text-sm uppercase tracking-widest">
              …
            </p>
          ) : items.length === 0 ? (
            <div className="py-24 text-center space-y-6 max-w-lg mx-auto">
              <p className="text-2xl font-headline font-black uppercase">
                {dict.cart.empty}
              </p>
              <p className="text-tertiary text-sm">{dict.cart.emptyHint}</p>
              <Link
                href={`/${locale}/catalog`}
                className="inline-block bg-primary-container text-on-primary-container px-8 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-primary-fixed-dim transition-all"
              >
                {dict.cart.browseCatalog}
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="flex-1 space-y-12">
                <div className="space-y-6">
                  {items.map((item) => (
                    <CartItemRow key={item.id} item={item} dict={dict.cart} />
                  ))}
                </div>

                <div className="bg-surface-container p-10 border-l-8 border-primary/20 space-y-6 flex flex-col md:flex-row gap-8 items-start">
                  <div className="p-3 bg-on-background text-primary rounded-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">
                      engineering
                    </span>
                  </div>
                  <div className="space-y-4 flex-1">
                    <h3 className="text-sm font-black tracking-widest uppercase text-on-surface">
                      {dict.cart.advisory.title}
                    </h3>
                    <p className="text-tertiary text-xs font-medium leading-relaxed max-w-lg">
                      {advisoryDescription}
                    </p>
                    <button
                      type="button"
                      className="text-[10px] font-black tracking-widest uppercase border-b-2 border-primary pb-1 hover:text-primary transition-colors inline-block"
                    >
                      {dict.cart.advisory.cta}
                    </button>
                  </div>
                </div>
              </div>
              <OrderSummary
                items={items}
                subtotal={subtotal}
                dict={dict.cart as Record<string, string>}
                locale={locale}
              />
            </div>
          )}
        </div>
      </main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}
