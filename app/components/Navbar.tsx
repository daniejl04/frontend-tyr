"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCart } from "./Cart/CartProvider";
import { useUserProfile } from "@/hooks/use-user-profile";

function NavbarInner({ dict }: { dict: any }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const { itemCount } = useCart();
  const { profile } = useUserProfile();
  const isAdmin =
    profile &&
    (profile.role === "admin" ||
      profile.role === "super_admin" ||
      profile.role === "super-admin");

  const getLocaleUrl = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const currentLocale = pathname.split("/")[1] || "es";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }
    router.push(`/${currentLocale}/catalog?${params.toString()}`);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20">
      <div className="flex justify-between items-center px-8 h-20 w-full max-w-full">
        <Link
          href={`/${currentLocale}`}
          className="text-2xl font-black uppercase text-on-surface tracking-tighter font-headline"
        >
          Turbos y Repuestos
        </Link>
        <div className="hidden md:flex items-center space-x-8 font-bold tracking-tight">
          <Link
            className="text-secondary hover:text-on-surface transition-colors"
            href={`/`}
          >
            {dict.home}
          </Link>
          <Link
            className="text-secondary hover:text-on-surface transition-colors"
            href={`/${currentLocale}/catalog`}
          >
            {dict.spareParts}
          </Link>
          <Link className="text-secondary hover:text-on-surface transition-colors" href="#">
            {dict.services}
          </Link>
          <Link
            className="text-secondary hover:text-on-surface transition-colors"
            href={`/${currentLocale}/about`}
          >
            {dict.about}
          </Link>
          {isAdmin && (
            <Link
              className="text-primary hover:text-primary-fixed-dim transition-colors font-bold uppercase tracking-wide border-b-2 border-primary"
              href={`/${currentLocale}/admin`}
            >
              {dict.admin || "Panel Admin"}
            </Link>
          )}
        </div>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden lg:block">
            <input
              className="bg-surface-container-high border-none rounded-DEFAULT px-4 py-2 w-64 focus:ring-2 focus:ring-primary outline-none transition-all text-xs"
              placeholder={dict.searchPlaceholder}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="material-symbols-outlined absolute right-3 top-2 text-tertiary text-sm"
            >
              search
            </button>
          </form>

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
            className={`relative p-2 hover:bg-surface-container transition-all duration-200 rounded-DEFAULT ${pathname.includes("/cart") ? "text-primary" : ""}`}
          >
            <span className="material-symbols-outlined text-lg">shopping_cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[1.125rem] h-[1.125rem] px-1 flex items-center justify-center rounded-full bg-error text-white text-[9px] font-black leading-none">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>
          <Link
            href={`/${currentLocale}/account`}
            title={dict.myAccount}
            className={`p-2 hover:bg-surface-container transition-all duration-200 rounded-DEFAULT ${pathname.includes("/account") ? "text-primary" : ""}`}
          >
            <span className="material-symbols-outlined text-lg">account_circle</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavbarFallback() {
  return (
    <nav
      className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 h-20"
      aria-hidden
    />
  );
}

export default function Navbar({ dict }: { dict: any }) {
  return (
    <Suspense fallback={<NavbarFallback />}>
      <NavbarInner dict={dict} />
    </Suspense>
  );
}
