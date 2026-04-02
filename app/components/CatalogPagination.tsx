import React from "react";

const CatalogPagination = () => {
  return (
    <div className="flex justify-center items-center gap-2 pt-12 border-t border-outline-variant/10">
      <button className="p-2 border border-outline-variant hover:bg-surface-variant transition-colors">
        <span className="material-symbols-outlined text-sm">chevron_left</span>
      </button>
      
      {[1, 2, 3, '...', 7].map((p, i) => (
        <button 
          key={i} 
          className={`w-10 h-10 flex items-center justify-center text-xs font-black uppercase tracking-widest border border-outline-variant hover:bg-surface-variant transition-colors ${p === 1 ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container-low text-on-surface'}`}
        >
          {p}
        </button>
      ))}

      <button className="p-2 border border-outline-variant hover:bg-surface-variant transition-colors">
        <span className="material-symbols-outlined text-sm">chevron_right</span>
      </button>
    </div>
  );
};

export default CatalogPagination;
