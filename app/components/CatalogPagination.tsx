import React from "react";

interface CatalogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CatalogPagination = ({ currentPage, totalPages, onPageChange }: CatalogPaginationProps) => {
  const getPages = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 pt-12 border-t border-outline-variant/10">
      <button 
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border border-outline-variant hover:bg-surface-variant transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-sm">chevron_left</span>
      </button>
      
      {getPages().map((p, i) => (
        <button 
          key={i} 
          onClick={() => typeof p === 'number' && onPageChange(p)}
          disabled={typeof p !== 'number'}
          className={`w-10 h-10 flex items-center justify-center text-xs font-black uppercase tracking-widest border border-outline-variant hover:bg-surface-variant transition-colors ${p === currentPage ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container-low text-on-surface'} ${typeof p !== 'number' ? 'cursor-default border-transparent' : ''}`}
        >
          {p}
        </button>
      ))}

      <button 
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border border-outline-variant hover:bg-surface-variant transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-sm">chevron_right</span>
      </button>
    </div>
  );
};

export default CatalogPagination;
