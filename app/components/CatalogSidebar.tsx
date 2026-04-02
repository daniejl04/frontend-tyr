import React from "react";

const CatalogSidebar = ({ dict }: { dict: any }) => {
  return (
    <aside className="w-full lg:w-64 space-y-12">
      <div className="space-y-6">
        <h2 className="text-sm font-black tracking-widest uppercase border-b-2 border-primary pb-4">
          {dict.filters.title}
        </h2>
        
        {/* Manufacturer */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-tertiary uppercase tracking-wider">{dict.filters.manufacturer}</h3>
          <div className="space-y-2">
            {['Garrett Motion', 'BorgWarner', 'Holset / Cummins', 'IHI Turbo'].map((m) => (
              <label key={m} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 border-2 border-outline rounded-sm checked:bg-primary transition-colors cursor-pointer" />
                <span className="text-xs font-bold text-on-surface/80 group-hover:text-primary transition-colors uppercase">{m}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Year Range */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-tertiary uppercase tracking-wider">{dict.filters.yearRange}</h3>
          <select className="w-full bg-surface-container-high border-none rounded-DEFAULT px-4 py-2 text-xs font-bold uppercase outline-none focus:ring-1 focus:ring-primary">
            <option>2020 - 2024</option>
            <option>2015 - 2019</option>
            <option>Older Models</option>
          </select>
        </div>

        {/* Component Type */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-tertiary uppercase tracking-wider">{dict.filters.componentType}</h3>
          <div className="flex flex-wrap gap-2">
            {['Complete Assembly', 'Core / CHRA', 'Actuators', 'Gasket Kits'].map((t) => (
              <button key={t} className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition-colors ${t === 'Complete Assembly' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-tertiary hover:bg-surface-variant'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-tertiary uppercase tracking-wider">{dict.filters.priceRange}</h3>
          <div className="flex items-center gap-2">
            <input type="text" placeholder="Min" className="w-1/2 bg-surface-container-high border-none px-4 py-2 text-xs font-bold uppercase outline-none" />
            <span className="text-tertiary">—</span>
            <input type="text" placeholder="Max" className="w-1/2 bg-surface-container-high border-none px-4 py-2 text-xs font-bold uppercase outline-none" />
          </div>
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
