import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategoryGrid from "../components/CategoryGrid";
import ProductCatalog from "../components/ProductCatalog";
import RestorationLab from "../components/RestorationLab";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "es");

  return (
    <>
      <Navbar dict={dict.navbar} />
      <main className="pt-20">
        <Hero dict={dict.hero} />
        <CategoryGrid dict={dict.categories} />
        <ProductCatalog dict={dict.catalog} locale={locale} />
        <RestorationLab dict={dict.restoration} />
        <Stats dict={dict.stats} />
      </main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}
