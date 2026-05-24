"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/use-user-profile";

interface AdminSidebarProps {
  locale: string;
  dict: any;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export default function AdminSidebar({
  locale,
  dict,
  activeSection = "inventory",
  onSectionChange,
}: AdminSidebarProps) {
  const router = useRouter();
  const { profile, loading } = useUserProfile();
  const [logoutLoading, setLogoutLoading] = useState(false);

  async function handleLogout(e: React.MouseEvent) {
    e.preventDefault();
    setLogoutLoading(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });
      router.push(`/${locale}`);
      router.refresh();
    } catch (err) {
      console.error("Error signing out:", err);
    } finally {
      setLogoutLoading(false);
    }
  }

  const handleNavClick = (section: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  // Extract display details
  const userName = profile
    ? `${profile.username} ${profile.lastname}`
    : loading
    ? "Cargando..."
    : "Administrador";

  const userRole = profile
    ? profile.role === "super_admin" || profile.role === "super-admin"
      ? "Super Admin"
      : "Industrial Admin"
    : "Admin";

  const avatarUrl = profile?.photoUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuA7ZZJaWHyG4DP-gIfLSyBz33zNxq9dWEQsoR1wFnlIoBM4uPwGcb1uJ-bqPunRT_w-HObv1vLkOefHBA8vqehMnEEZN5qTi8yzHDfmGD0HqmKIFhJ2hYlgxJjYyv6OMjf_CQPl_F6YYc8sp8LlSkewGkbRF2pdoNztaPXWKdYZzkzaehJF_CnxgqxtYvlWcY_GUXVwPKQvOoH5hW6CNSrH6bNVXHXvmqwJO9-cRcACZUm-aIC_7-cdb_aRJpN6bl_oIibHZME0MRzf";

  return (
    <aside className="fixed left-0 top-0 flex flex-col z-40 bg-stone-100 dark:bg-stone-900 h-screen w-64 border-r border-outline-variant/10 font-headline font-medium tracking-tight">
      {/* Brand Header */}
      <div className="px-8 py-8">
        <span className="text-xl font-black uppercase text-stone-900 dark:text-stone-50 select-none">
          T&T Industrial
        </span>
      </div>

      {/* Main Sidebar Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {/* Inventory Tab */}
        <a
          href="#inventory"
          onClick={(e) => handleNavClick("inventory", e)}
          className={`flex items-center gap-3 px-4 py-3 transition-all duration-150 ${
            activeSection === "inventory"
              ? "text-primary dark:text-primary-fixed-dim font-bold border-r-4 border-primary"
              : "text-secondary dark:text-stone-400 hover:text-on-surface dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800/50"
          }`}
        >
          <span className="material-symbols-outlined text-lg">inventory_2</span>
          <span>{dict.catalog?.title ? "Inventario" : "Inventory"}</span>
        </a>

        {/* Orders Tab */}
        <a
          href="#orders"
          onClick={(e) => handleNavClick("orders", e)}
          className={`flex items-center gap-3 px-4 py-3 transition-all duration-150 ${
            activeSection === "orders"
              ? "text-primary dark:text-primary-fixed-dim font-bold border-r-4 border-primary"
              : "text-secondary dark:text-stone-400 hover:text-on-surface dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800/50"
          }`}
        >
          <span className="material-symbols-outlined text-lg">shopping_cart</span>
          <span>{dict.cart?.summary ? "Pedidos" : "Orders"}</span>
        </a>

        {/* Services Tab */}
        <a
          href="#services"
          onClick={(e) => handleNavClick("services", e)}
          className={`flex items-center gap-3 px-4 py-3 transition-all duration-150 ${
            activeSection === "services"
              ? "text-primary dark:text-primary-fixed-dim font-bold border-r-4 border-primary"
              : "text-secondary dark:text-stone-400 hover:text-on-surface dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800/50"
          }`}
        >
          <span className="material-symbols-outlined text-lg">build</span>
          <span>{dict.navbar?.services || "Servicios"}</span>
        </a>

        {/* Analytics Tab */}
        <a
          href="#analytics"
          onClick={(e) => handleNavClick("analytics", e)}
          className={`flex items-center gap-3 px-4 py-3 transition-all duration-150 ${
            activeSection === "analytics"
              ? "text-primary dark:text-primary-fixed-dim font-bold border-r-4 border-primary"
              : "text-secondary dark:text-stone-400 hover:text-on-surface dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800/50"
          }`}
        >
          <span className="material-symbols-outlined text-lg">analytics</span>
          <span>{dict.stats?.expertise ? "Métricas" : "Analytics"}</span>
        </a>
      </nav>

      {/* Sidebar Footer User Section */}
      <div className="mt-auto p-4 space-y-4">
        {/* User Card */}
        <div className="flex items-center gap-3 px-4 py-4 bg-stone-200 dark:bg-stone-850 rounded-lg">
          <img
            alt="Admin profile"
            className="w-10 h-10 rounded-full object-cover shrink-0 border border-outline-variant/20"
            src={avatarUrl}
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-on-surface leading-none truncate">
              {userName}
            </p>
            <p className="text-xs text-stone-500 mt-1 truncate">
              {userRole}
            </p>
          </div>
        </div>

        {/* Portal Action */}
        <button
          type="button"
          onClick={() => router.push(`/${locale}`)}
          className="w-full bg-primary text-on-primary py-2 font-bold text-sm tracking-widest uppercase hover:bg-amber-800 hover:shadow-md transition-all active:scale-[0.98]"
        >
          {locale === "es" ? "PORTAL PRINCIPAL" : "MAIN PORTAL"}
        </button>

        {/* Action Links */}
        <div className="space-y-1">
          <a
            href="#settings"
            onClick={(e) => handleNavClick("settings", e)}
            className="flex items-center gap-3 px-4 py-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors text-sm"
          >
            <span className="material-symbols-outlined text-sm">settings</span>
            <span>{locale === "es" ? "Ajustes" : "Settings"}</span>
          </a>
          <a
            href="#logout"
            onClick={handleLogout}
            className={`flex items-center gap-3 px-4 py-2 text-stone-600 dark:text-stone-400 hover:text-error transition-colors text-sm ${
              logoutLoading ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span>
              {logoutLoading
                ? locale === "es"
                  ? "Saliendo..."
                  : "Logging out..."
                : locale === "es"
                ? "Cerrar sesión"
                : "Logout"}
            </span>
          </a>
        </div>
      </div>
    </aside>
  );
}
