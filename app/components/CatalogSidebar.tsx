import React, { useState, useEffect } from "react";
import { ProductFilters } from "@/types/product";

interface CatalogSidebarProps {
  dict: any;
  filters: ProductFilters;
  onFilterChange: (newFilters: Partial<ProductFilters>) => void;
}

const CatalogSidebar = ({ dict, filters, onFilterChange }: CatalogSidebarProps) => {
  const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() || "");

  // Update local state when filters prop changes (e.g. from URL)
  useEffect(() => {
    setMinPrice(filters.minPrice?.toString() || "");
    setMaxPrice(filters.maxPrice?.toString() || "");
  }, [filters.minPrice, filters.maxPrice]);

  const manufacturers = [
    { name: 'Garrett Motion', value: 'garret' },
    { name: 'BorgWarner', value: 'borgwarner' },
    { name: 'Holset / Cummins', value: 'holset' },
    { name: 'IHI Turbo', value: 'ihi' }
  ];

  const categories = [
    { name: 'Complete Assembly', value: 'complete' },
    { name: 'Core / CHRA', value: 'core' },
    { name: 'Actuators', value: 'actuators' },
    { name: 'Gasket Kits', value: 'gaskets' },
    { name: 'Toyota', value: 'toyota' } // Added as per user example
  ];

  const handleBrandChange = (brandValue: string) => {
    const currentBrand = filters.brand;
    // If it's already selected, we might want to unselect it, 
    // but the UI uses checkboxes. For now, let's treat it as a single select 
    // or just toggle it. The user example showed brand=garret (singular).
    onFilterChange({ brand: currentBrand === brandValue ? undefined : brandValue });
  };

  const handleCategoryChange = (categoryValue: string) => {
    const currentCategory = filters.category;
    onFilterChange({ category: currentCategory === categoryValue ? undefined : categoryValue });
  };

  const handlePriceApply = () => {
    onFilterChange({
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  };

  const handlePriceKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePriceApply();
    }
  };

  return (
    <aside className="w-full lg:w-64 space-y-12">
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b-2 border-primary pb-4">
          <h2 className="text-sm font-black tracking-widest uppercase">
            {dict.filters.title}
          </h2>
          {(filters.brand || filters.category || filters.minPrice || filters.maxPrice) && (
            <button 
              onClick={() => onFilterChange({ brand: undefined, category: undefined, minPrice: undefined, maxPrice: undefined })}
              className="text-[10px] font-black text-primary uppercase tracking-widest hover:text-primary/80 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        
        {/* Manufacturer */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-tertiary uppercase tracking-wider">{dict.filters.manufacturer}</h3>
          <div className="space-y-2">
            {manufacturers.map((m) => (
              <label key={m.value} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={filters.brand === m.value}
                  onChange={() => handleBrandChange(m.value)}
                  className="w-4 h-4 border-2 border-outline rounded-sm checked:bg-primary transition-colors cursor-pointer" 
                />
                <span className={`text-xs font-bold transition-colors uppercase ${filters.brand === m.value ? 'text-primary' : 'text-on-surface/80 group-hover:text-primary'}`}>
                  {m.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Component Type (Category) */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-tertiary uppercase tracking-wider">{dict.filters.componentType}</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button 
                key={c.value} 
                onClick={() => handleCategoryChange(c.value)}
                className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition-colors ${filters.category === c.value ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-tertiary hover:bg-surface-variant'}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-tertiary uppercase tracking-wider">{dict.filters.priceRange}</h3>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              placeholder="Min" 
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onKeyDown={handlePriceKeyDown}
              className="w-1/2 bg-surface-container-high border-none px-4 py-2 text-xs font-bold uppercase outline-none" 
            />
            <span className="text-tertiary">—</span>
            <input 
              type="number" 
              placeholder="Max" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onKeyDown={handlePriceKeyDown}
              className="w-1/2 bg-surface-container-high border-none px-4 py-2 text-xs font-bold uppercase outline-none" 
            />
          </div>
          <button 
            onClick={handlePriceApply}
            className="w-full mt-2 py-2 bg-surface-variant text-[10px] font-black uppercase tracking-widest hover:bg-primary-container transition-colors"
          >
            Apply Price
          </button>
        </div>
      </div>

      {/* Custom Engineering Ad */}
      <div className="bg-on-background p-6 text-white space-y-4">
        <h3 className="text-sm font-black tracking-tighter uppercase leading-tight italic">
          {dict.customEngineering.title}
        </h3>
        <p className="text-xs text-surface-container-high/80 font-medium">
          {dict.customEngineering.description}
        </p>
        <button className="w-full bg-primary-container text-on-primary-container py-3 text-[10px] font-black uppercase tracking-widest hover:bg-primary-fixed-dim transition-all">
          {dict.customEngineering.cta}
        </button>
      </div>
    </aside>
  );
};

export default CatalogSidebar;
