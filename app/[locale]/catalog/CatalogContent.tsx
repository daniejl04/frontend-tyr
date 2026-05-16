"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ProductCard from "../../components/ProductCard";
import CatalogSidebar from "../../components/CatalogSidebar";
import CatalogPagination from "../../components/CatalogPagination";
import { useProducts } from "@/hooks/use-products";
import { parseProductPrice } from "@/lib/utils/parse-price";

interface CatalogContentProps {
  dict: any;
  locale: string;
}

const CatalogContent = ({ dict, locale }: CatalogContentProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const q = searchParams.get("q") || "";
  
  const { products, loading, error, pagination, filters, updateFilters } = useProducts({
    q,
    brand: searchParams.get("brand") || undefined,
    category: searchParams.get("category") || undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    sortBy: searchParams.get("sortBy") || undefined,
    sortOrder: (searchParams.get("sortOrder") as 'asc' | 'desc') || undefined,
    page: Number(searchParams.get("page")) || 1,
    limit: 12,
  });

  useEffect(() => {
    updateFilters({ 
      q,
      brand: searchParams.get("brand") || undefined,
      category: searchParams.get("category") || undefined,
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      sortBy: searchParams.get("sortBy") || undefined,
      sortOrder: (searchParams.get("sortOrder") as 'asc' | 'desc') || undefined,
    });
  }, [q, searchParams.toString()]);

  const handleFilterChange = (newFilters: any) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === undefined || value === "" || value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    // Reset page when filters change, unless page itself is being updated
    if (!newFilters.page) {
      params.set("page", "1");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-error font-bold uppercase tracking-widest text-xs">
          {dict.catalogPage.error || "Error al cargar productos"}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col lg:flex-row gap-12">
      {/* Sidebar */}
      <CatalogSidebar 
        dict={dict.catalogPage} 
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      {/* Main Content */}
      <div className="flex-1 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-[10px] font-black tracking-widest text-tertiary uppercase">
            {loading 
              ? "Cargando..." 
              : `${dict.catalogPage.results.showing.split(' ')[0]} ${pagination?.total || 0} PIEZAS DE PRECISIÓN`}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black tracking-widest text-tertiary uppercase">
              {dict.catalogPage.results.sortBy}
            </span>
            <select 
              className="bg-transparent border-none text-[10px] font-black tracking-widest uppercase outline-none cursor-pointer"
              value={filters.sortBy ? `${filters.sortBy}-${filters.sortOrder}` : ""}
              onChange={(e) => {
                const value = e.target.value;
                if (!value) {
                  handleFilterChange({ sortBy: undefined, sortOrder: undefined });
                  return;
                }
                const [sortBy, sortOrder] = value.split('-');
                handleFilterChange({ sortBy, sortOrder });
              }}
            >
              <option value="">{dict.catalogPage.results.sortOptions.performance}</option>
              <option value="price-asc">{dict.catalogPage.results.sortOptions.priceLow}</option>
              <option value="price-desc">{dict.catalogPage.results.sortOptions.priceHigh}</option>
              <option value="name-asc">{dict.catalogPage.results.sortOptions.nameAsc}</option>
              <option value="name-desc">{dict.catalogPage.results.sortOptions.nameDesc}</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-surface-container h-80 rounded-DEFAULT"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard 
                key={p._id} 
                id={p._id}
                title={p.name} 
                model={p.sku} 
                price={`${p.price} ${p.currency ?? ""}`.trim()}
                priceAmount={parseProductPrice(String(p.price))}
                description={p.description ?? ""}
                image={p.images?.[0] || "/placeholder-product.png"} 
                inStock={p.status === "IN STOCK"}
                dict={dict.catalog} 
                locale={locale} 
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-tertiary font-bold uppercase tracking-widest text-xs">
              {dict.catalogPage.results.noResults || "No se encontraron productos"}
            </p>
          </div>
        )}
        
        {pagination && pagination.totalPages > 1 && (
          <CatalogPagination 
            currentPage={pagination.page} 
            totalPages={pagination.totalPages}
            onPageChange={(page) => updateFilters({ page })}
          />
        )}
      </div>
    </div>
  );
};

export default CatalogContent;
