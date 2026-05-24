import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getProductById } from "@/lib/server/products";
import Link from "next/link";
import ProductDetailBuy from "./ProductDetailBuy";
import Image from "next/image";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const dict = await getDictionary(locale as "en" | "es");
  const product = await getProductById(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Navbar dict={dict.navbar} />
      <main className="pt-20 bg-white">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-8 py-6">
          <nav className="flex text-[10px] font-black tracking-widest uppercase text-tertiary/60">
            <Link href={`/${locale}`} className="hover:text-primary transition-colors">HOME</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/catalog`} className="hover:text-primary transition-colors">TURBOCHARGERS</Link>
            <span className="mx-2">/</span>
            <span className="text-on-surface">{product.name}</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-8 pb-24">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Gallery */}
            <div className="space-y-6">
              <div className="bg-surface-container-low aspect-square flex items-center justify-center overflow-hidden border border-outline-variant/10">
                <Image src={product.images?.[0] || "/images/placeholder.jpg"} alt={product.name} width={600} height={600} className="w-4/5 object-contain" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images?.slice(0, 3).map((img, i) => (
                  <div key={i} className="bg-surface-container-low aspect-square flex items-center justify-center border border-outline-variant/10 cursor-pointer hover:border-primary transition-colors">
                    <Image src={product.images?.[0] || "/images/placeholder.jpg"} alt={`${product.name} thumb ${i}`} width={600} height={600} className="w-4/5 object-contain" />
                  </div>
                ))}
                <div className="bg-surface-container-low aspect-square flex flex-col items-center justify-center border border-outline-variant/10 cursor-pointer hover:border-primary transition-colors">
                  <span className="text-[10px] font-black tracking-widest uppercase">+4 PHOTOS</span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block bg-primary-container text-on-primary-container text-[10px] font-black px-3 py-1 uppercase tracking-widest">
                  {product.status}
                </span>
                <h1 className="text-5xl font-headline font-black tracking-tighter uppercase leading-none">
                  {product.name}
                </h1>
                <p className="text-[10px] font-black tracking-widest text-tertiary uppercase">
                  {dict.productDetail.sku}: {product.sku}
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-headline font-black text-on-surface">
                  {product.price}
                </span>
                <span className="text-xs font-black text-tertiary uppercase tracking-widest">
                  {product.currency}
                </span>
              </div>

              <p className="text-tertiary font-body font-medium leading-relaxed max-w-xl text-sm">
                {product.description}
              </p>

              <ProductDetailBuy
                product={{
                  id: product._id,
                  sku: product.sku,
                  name: product.name,
                  description: product.description,
                  price: product.price,
                  currency: product.currency,
                  images: product.images ?? [],
                }}
                dict={{
                  quantity: dict.productDetail.quantity,
                  buyNow: dict.productDetail.buyNow,
                  requestQuote: dict.productDetail.requestQuote,
                }}
              />

              <div className="flex gap-8 pt-4">
                <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-tertiary">
                  <span className="material-symbols-outlined text-base text-primary">verified</span>
                  {dict.productDetail.certifiedOem}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-tertiary">
                  <span className="material-symbols-outlined text-base text-primary">local_shipping</span>
                  {dict.productDetail.globalShipping}
                </div>
              </div>
            </div>
          </div>

          {/* Specs & Compatibility */}
          <div className="grid lg:grid-cols-5 gap-16 mt-32">
            <div className="lg:col-span-3 space-y-12">
              <h2 className="text-xl font-headline font-black tracking-tighter uppercase border-b-2 border-primary pb-4 inline-block">
                {dict.productDetail.technicalSpecs}
              </h2>
              <div className="space-y-6">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                    <span className="text-[10px] font-black tracking-widest text-tertiary uppercase">{spec.label}</span>
                    <span className="font-mono text-sm font-bold uppercase">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-12">
              <h2 className="text-xl font-headline font-black tracking-tighter uppercase border-b-2 border-primary pb-4 inline-block">
                {dict.productDetail.engineCompatibility}
              </h2>
              <div className="space-y-4">
                {product.compatibility.map((item, i) => (
                  <div key={i} className="bg-surface-container-low p-6 border-l-4 border-primary/20">
                    <h4 className="font-headline font-black uppercase text-sm mb-1">{item.title}</h4>
                    <p className="text-[10px] font-bold text-tertiary uppercase tracking-wider">{item.desc}</p>
                  </div>
                ))}

                <div className="bg-on-background p-8 text-white space-y-4 mt-8">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined">build</span>
                  </div>
                  <h3 className="text-lg font-headline font-black tracking-tight uppercase leading-none italic">
                    {dict.productDetail.needFit}
                  </h3>
                  <p className="text-xs text-surface-container-high/80 font-medium">
                    {dict.productDetail.needFitDesc}
                  </p>
                  <button className="text-[10px] font-black uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-primary transition-colors">
                    {dict.productDetail.consultExpert}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}
