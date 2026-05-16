import React, { Suspense } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CatalogHeader from "../../components/CatalogHeader";
import CatalogContent from "./CatalogContent";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "es");

  return (
    <>
      <Navbar dict={dict.navbar} />
      <main className="pt-20 bg-surface">
        <CatalogHeader dict={dict.catalogPage} />
        
        <Suspense fallback={
          <div className="max-w-7xl mx-auto px-8 py-12 flex justify-center">
            <div className="animate-pulse text-xs font-black uppercase tracking-widest text-tertiary">
              Cargando catálogo...
            </div>
          </div>
        }>
          <CatalogContent dict={dict} locale={locale} />
        </Suspense>
      </main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}
