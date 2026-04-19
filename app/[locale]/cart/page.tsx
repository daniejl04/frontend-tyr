import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getDictionary } from "../../../lib/get-dictionary";
import { getCartItems } from "../../../lib/cart";
import CartItemRow from "../../components/Cart/CartItemRow";
import OrderSummary from "../../components/Cart/OrderSummary";

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "es");
  const items = await getCartItems();

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      <Navbar dict={dict.navbar} />
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

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Cart Items List */}
            <div className="flex-1 space-y-12">
              <div className="space-y-6">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} dict={dict.cart} />
                ))}
              </div>

              {/* Technical Advisory Box */}
              <div className="bg-surface-container p-10 border-l-8 border-primary/20 space-y-6 flex flex-col md:flex-row gap-8 items-start">
                <div className="p-3 bg-on-background text-primary rounded-sm flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">engineering</span>
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-sm font-black tracking-widest uppercase text-on-surface">
                    {dict.cart.advisory.title}
                  </h3>
                  <p className="text-tertiary text-xs font-medium leading-relaxed max-w-lg">
                    {dict.cart.advisory.description.replace('{sku}', items[0]?.sku || 'HS-9920-GTX')}
                  </p>
                  <button className="text-[10px] font-black tracking-widest uppercase border-b-2 border-primary pb-1 hover:text-primary transition-colors inline-block">
                    {dict.cart.advisory.cta}
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <OrderSummary subtotal={subtotal} dict={dict.cart} locale={locale} />
          </div>
        </div>
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
