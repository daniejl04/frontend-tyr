"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/use-products";
import { parseProductPrice } from "@/lib/utils/parse-price";

const ProductCatalog = ({ dict, locale }: { dict: any, locale: string }) => {
  const { products, loading, error } = useProducts({
    category: 'ventiladores',
    limit: 4
  });

  if (error) {
    return (
      <section className="py-24 bg-surface-container-low px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-error font-bold uppercase tracking-widest text-xs">Error al cargar productos</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-surface-container-low px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[2px] w-20 bg-primary"></div>
          <h2 className="text-2xl font-headline font-black uppercase tracking-tighter">{dict.title}</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-surface-container h-80 rounded-DEFAULT"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.name}
                model={product.sku}
                price={`${product.price} ${product.currency}`}
                priceAmount={parseProductPrice(String(product.price))}
                description={product.description ?? ""}
                image={product.images?.[0] || "/images/placeholder.jpg"}
                inStock={product.status === "IN STOCK"}
                dict={dict}
                locale={locale}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;
