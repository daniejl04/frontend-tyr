import React from "react";
import { getDictionary } from "../../../lib/get-dictionary";
import Link from "next/link";

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "es");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Hero Section */}
      <div className="hidden lg:flex lg:w-3/5 relative bg-on-background overflow-hidden items-center p-24">
        <div className="absolute inset-0 opacity-40">
           <img 
            alt="Industrial Machinery" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVYuGPYLyg73AIi5mjveAp0uYl4xuFAWWLwdERWGBHXzR5D5Ay8ho7ljttFF5icKgTkI6cfk2VOrdaX3PE9kx2QidffTU8V6zoIsfmtv9hsMJZCeZvVoUWwyrVpww1CkNtTQELu-ytVHGI2j_g4IONhnaAgrRP_9Ct07KHZsaOEweZCjSW631XcTr9Q2IM7WlVDL1nCl1BPvUCnqia4WblCF0XAmX7Wbw3RRzrNPfk-bZCBJvy5wnDW8KluMYbw1j0bWrS9e4ZP1le"
          />
        </div>
        <div className="relative z-10 space-y-12">
           <div className="space-y-4">
              <h1 className="text-8xl font-headline font-black tracking-tighter text-white leading-none">
                HÉCTOR <br/> SEVERINO
              </h1>
              <div className="w-24 h-1 bg-primary"></div>
              <p className="text-2xl font-headline font-black text-primary uppercase max-w-md">
                {dict.auth.heroSubtitle}
              </p>
           </div>
           
           <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/10">
              <div className="space-y-2">
                 <p className="text-[10px] font-black tracking-widest text-surface-container-high uppercase">{dict.auth.sectorFocus}</p>
                 <p className="text-xl font-headline font-black text-white">{dict.auth.turbosSpareParts}</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] font-black tracking-widest text-surface-container-high uppercase">{dict.auth.serviceReliability}</p>
                 <p className="text-xl font-headline font-black text-white">{dict.auth.uptime}</p>
              </div>
           </div>
        </div>
        
        <div className="absolute bottom-12 left-24">
           <p className="text-[10px] font-black tracking-widest text-surface-container-high uppercase">
             © 2024 HÉCTOR SEVERINO - GRUPO TURBOS Y REPUESTOS. PRECISION ENGINEERED.
           </p>
        </div>
      </div>

      {/* Auth Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-24 overflow-y-auto relative">
        <Link 
          href={`/${locale}`}
          className="absolute top-8 left-8 lg:top-12 lg:left-12 flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-tertiary hover:text-primary transition-colors group"
        >
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          {dict.auth.backToHome}
        </Link>
        
        <div className="w-full max-w-sm space-y-12 mt-12 lg:mt-0">
           {children}
        </div>
      </div>
    </div>
  );
}
