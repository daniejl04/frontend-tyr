import React from "react";

const Navbar = ({ dict }: { dict: any }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20">
      <div className="flex justify-between items-center px-8 h-20 w-full max-w-full">
        <div className="text-2xl font-black uppercase text-on-surface tracking-tighter font-headline">
          Héctor Severino
        </div>
        <div className="hidden md:flex items-center space-x-8 font-bold tracking-tight">
          <a className="text-primary border-b-2 border-primary pb-1" href="#">{dict.turbochargers}</a>
          <a className="text-secondary hover:text-on-surface transition-colors" href="#">{dict.spareParts}</a>
          <a className="text-secondary hover:text-on-surface transition-colors" href="#">{dict.services}</a>
          <a className="text-secondary hover:text-on-surface transition-colors" href="#">{dict.about}</a>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <input 
              className="bg-surface-container-high border-none rounded-DEFAULT px-4 py-2 w-64 focus:ring-2 focus:ring-primary outline-none transition-all" 
              placeholder={dict.searchPlaceholder}
              type="text"
            />
            <span className="material-symbols-outlined absolute right-3 top-2 text-tertiary">search</span>
          </div>
          <button className="p-2 hover:bg-surface-container transition-all duration-200 rounded-DEFAULT">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
          <button className="p-2 hover:bg-surface-container transition-all duration-200 rounded-DEFAULT">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
