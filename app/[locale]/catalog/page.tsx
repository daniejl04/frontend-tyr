import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CatalogHeader from "../../components/CatalogHeader";
import CatalogSidebar from "../../components/CatalogSidebar";
import CatalogPagination from "../../components/CatalogPagination";
import ProductCard from "../../components/ProductCard";
import { getDictionary } from "../../../lib/get-dictionary";

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "es");

  const products = [
    {
      id: "gtx3584rs",
      ...dict.catalogPage.products[0],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmEcMnyw0vxbAmcarr450_ix0YifB-RI1zlAqz4pgdbbrctWwR83BRXcSezqy66DcDDr42WLZ7ROG-Q4gNxbP13o6b-JdmDjsLDRwYzaSYb6c_Fno1gsl5MNwb-6SLrT2dJi_fC6b2CKJOqGHU6iUrSeJaerdAew099wO8XX9iZ4uLw6xLIArQM1wgl3B3RkmLQLhWr38FOMQE8PkdZAPu2V7wt94Pcx67hTrwJs3dM5tBwyS13l-JkL4YxYxOwwHflSGf3jnUqOtJ"
    },
    {
      id: "gtx3584rs",
      ...dict.catalogPage.products[1],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUqUNiazADuOY7oG7iCRMjfd10jakt303Hv5KeGnFA2yoqikz85Zhr-7VSI_BiyR2LbHh9l9M4fi4TI1Kst-ltiay0DCRFEH_7bAVsP-u29TUVDGwXUpd2s_0HzyOHwMaqESI4KpFwdtA1VaIxds5Tg9wwmGeC9SHIiFr8jaDxRZ5-CtYbvMtxGV6mYDeJIHizB1Ytmp8vkmzskQ7GLBeH7yTL5fA99XSGdl364KziHe8Hb42oAGvBkrs6KeUHaiUz7xrGSE7a4UOz"
    },
    {
      id: "gtx3584rs",
      ...dict.catalogPage.products[2],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaE1ZDZer4TMcWdjLlfo18iXxnqIJ4ufUI5m8d3BwpXAhc4J9Sj_G_92lYOo--Sj_kspVpA8USkLuoS2vz42HZ-ZgQL3AXOPBRPath7vkvF2CocQoAhS7vEbqqDfvLuh8q7ZUawkQV1L9O7QLGKWAxxdTHpogIXQrdt7gf-FSXjvES_dj_FUeIqb8Om00Cfp-2dE-EzhIQHlR2Og2hnSSkWSdrHMKb_9IyC949iuf4gFXTXBXle67xKHERj4FnSBJi3J40ej0zIZkj"
    },
    {
      id: "gtx3584rs",
      ...dict.catalogPage.products[3],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmEcMnyw0vxbAmcarr450_ix0YifB-RI1zlAqz4pgdbbrctWwR83BRXcSezqy66DcDDr42WLZ7ROG-Q4gNxbP13o6b-JdmDjsLDRwYzaSYb6c_Fno1gsl5MNwb-6SLrT2dJi_fC6b2CKJOqGHU6iUrSeJaerdAew099wO8XX9iZ4uLw6xLIArQM1wgl3B3RkmLQLhWr38FOMQE8PkdZAPu2V7wt94Pcx67hTrwJs3dM5tBwyS13l-JkL4YxYxOwwHflSGf3jnUqOtJ"
    },
    {
      id: "gtx3584rs",
      ...dict.catalogPage.products[4],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmEcMnyw0vxbAmcarr450_ix0YifB-RI1zlAqz4pgdbbrctWwR83BRXcSezqy66DcDDr42WLZ7ROG-Q4gNxbP13o6b-JdmDjsLDRwYzaSYb6c_Fno1gsl5MNwb-6SLrT2dJi_fC6b2CKJOqGHU6iUrSeJaerdAew099wO8XX9iZ4uLw6xLIArQM1wgl3B3RkmLQLhWr38FOMQE8PkdZAPu2V7wt94Pcx67hTrwJs3dM5tBwyS13l-JkL4YxYxOwwHflSGf3jnUqOtJ"
    },
    {
      id: "gtx3584rs",
      ...dict.catalogPage.products[5],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmEcMnyw0vxbAmcarr450_ix0YifB-RI1zlAqz4pgdbbrctWwR83BRXcSezqy66DcDDr42WLZ7ROG-Q4gNxbP13o6b-JdmDjsLDRwYzaSYb6c_Fno1gsl5MNwb-6SLrT2dJi_fC6b2CKJOqGHU6iUrSeJaerdAew099wO8XX9iZ4uLw6xLIArQM1wgl3B3RkmLQLhWr38FOMQE8PkdZAPu2V7wt94Pcx67hTrwJs3dM5tBwyS13l-JkL4YxYxOwwHflSGf3jnUqOtJ"
    }
  ];

  return (
    <>
      <Navbar dict={dict.navbar} />
      <main className="pt-20 bg-surface">
        <CatalogHeader dict={dict.catalogPage} />
        
        <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <CatalogSidebar dict={dict.catalogPage} />
          
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-[10px] font-black tracking-widest text-tertiary uppercase">
                {dict.catalogPage.results.showing}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-widest text-tertiary uppercase">
                  {dict.catalogPage.results.sortBy}
                </span>
                <select className="bg-transparent border-none text-[10px] font-black tracking-widest uppercase outline-none cursor-pointer">
                  <option>{dict.catalogPage.results.sortOptions.performance}</option>
                  <option>{dict.catalogPage.results.sortOptions.priceLow}</option>
                  <option>{dict.catalogPage.results.sortOptions.priceHigh}</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((p, i) => (
                <ProductCard key={i} {...p} dict={dict.catalog} locale={locale} />
              ))}
            </div>
            
            <CatalogPagination />
          </div>
        </div>
      </main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}
