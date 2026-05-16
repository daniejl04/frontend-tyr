import React from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function PaymentResponsePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const q = await searchParams;
  const dict = await getDictionary(locale as "en" | "es");
  const pay = dict.paymentResponse as Record<string, string>;

  const raw =
    typeof q.x_cod_response === "string"
      ? q.x_cod_response
      : Array.isArray(q.x_cod_response)
        ? q.x_cod_response[0]
        : undefined;
  const code = raw?.trim() ?? "";
  const isApproved = code === "1";

  return (
    <>
      <Navbar dict={dict.navbar} />
      <main className="pt-20 bg-surface min-h-screen">
        <div className="max-w-xl mx-auto px-8 py-24 text-center space-y-8">
          <h1 className="text-4xl font-headline font-black uppercase tracking-tighter">
            {isApproved ? pay.titleSuccess : pay.titlePending}
          </h1>
          <p className="text-tertiary text-sm font-medium leading-relaxed">
            {isApproved ? pay.descSuccess : pay.descPending}
          </p>
          <Link
            href={`/${locale}/cart`}
            className="inline-block bg-primary-container text-on-primary-container px-8 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-primary-fixed-dim transition-all"
          >
            {pay.backToCart}
          </Link>
        </div>
      </main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}
