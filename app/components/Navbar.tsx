"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({ dict }: { dict: any }) => {
  const pathname = usePathname();

  // Función para generar la URL con el nuevo locale manteniendo la ruta actual
  const getLocaleUrl = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale; // Reemplazamos el primer segmento que es el locale
    return segments.join("/");
  };

  const currentLocale = pathname.split("/")[1] || "es";

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20">
      <div className="flex justify-between items-center px-8 h-20 w-full max-w-full">
        <Link href={`/${currentLocale}`} className="text-2xl font-black uppercase text-on-surface tracking-tighter font-headline">
          Turbos y Repuestos
        </Link>
        <div className="hidden md:flex items-center space-x-8 font-bold tracking-tight">
          <Link 
          className="text-secondary hover:text-on-surface transition-colors" 
          href={`/`}
          >
            {dict.turbochargers}
          </Link>
          <Link 
          className="text-secondary hover:text-on-surface transition-colors" 
          href={`/${currentLocale}/catalog`}>{dict.spareParts}</Link>
          <Link className="text-secondary hover:text-on-surface transition-colors" href="#">{dict.services}</Link>
          <Link className="text-secondary hover:text-on-surface transition-colors" href="#">{dict.about}</Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <input 
              className="bg-surface-container-high border-none rounded-DEFAULT px-4 py-2 w-64 focus:ring-2 focus:ring-primary outline-none transition-all text-xs" 
              placeholder={dict.searchPlaceholder}
              type="text"
            />
            <span className="material-symbols-outlined absolute right-3 top-2 text-tertiary text-sm">search</span>
          </div>
          
          {/* Language Switcher */}
          <div className="flex items-center bg-surface-container-low rounded-full px-1 py-1 border border-outline-variant/20">
            <Link 
              href={getLocaleUrl("es")}
              className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest transition-all ${currentLocale === "es" ? "bg-primary text-on-primary" : "text-tertiary hover:text-on-surface"}`}
            >
              ES
            </Link>
            <Link 
              href={getLocaleUrl("en")}
              className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest transition-all ${currentLocale === "en" ? "bg-primary text-on-primary" : "text-tertiary hover:text-on-surface"}`}
            >
              EN
            </Link>
          </div>

          <Link 
            href={`/${currentLocale}/cart`}
            className={`p-2 hover:bg-surface-container transition-all duration-200 rounded-DEFAULT ${pathname.includes('/cart') ? 'text-primary' : ''}`}
          >
            <span className="material-symbols-outlined text-lg">shopping_cart</span>
          </Link>
          <Link 
            href={`/${currentLocale}/auth`}
            className={`p-2 hover:bg-surface-container transition-all duration-200 rounded-DEFAULT ${pathname.includes('/auth') ? 'text-primary' : ''}`}
          >
            <span className="material-symbols-outlined text-lg">account_circle</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
