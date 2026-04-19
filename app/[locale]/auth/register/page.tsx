import React from "react";
import Link from "next/link";
import { getDictionary } from "../../../../lib/get-dictionary";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "es");

  return (
    <div className="space-y-12">
      <div className="space-y-4 text-center lg:text-left">
        <h1 className="text-4xl font-headline font-black tracking-tighter uppercase leading-none">
          {dict.auth.registerTitle}
        </h1>
        <p className="text-tertiary text-sm font-body font-medium leading-relaxed max-w-xs mx-auto lg:mx-0">
          {dict.auth.registerSubtitle}
        </p>
      </div>

      <div className="space-y-6">
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black tracking-widest uppercase text-tertiary">
              {dict.auth.corporateEmail}
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-3 text-tertiary text-lg">mail</span>
              <input 
                type="email" 
                placeholder="name@company.com" 
                className="w-full bg-surface-container-low border-none pl-12 pr-4 py-4 text-xs font-bold focus:ring-1 focus:ring-primary outline-none" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black tracking-widest uppercase text-tertiary">
              {dict.auth.securityKey}
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-3 text-tertiary text-lg">lock</span>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-surface-container-low border-none pl-12 pr-4 py-4 text-xs font-bold focus:ring-1 focus:ring-primary outline-none" 
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 border-2 border-outline rounded-sm checked:bg-primary" />
            <span className="text-[10px] font-black tracking-widest uppercase text-tertiary">
              I agree to the <Link href="#" className="underline text-on-surface">Terms of Service</Link>
            </span>
          </div>

          <button className="w-full bg-primary-container text-on-primary-container py-5 text-xs font-black uppercase tracking-[0.2em] hover:bg-primary-fixed-dim transition-all">
            {dict.auth.register}
          </button>
        </form>
      </div>

      <div className="text-center space-y-8">
        <p className="text-[10px] font-black tracking-widest uppercase text-tertiary">
          {dict.auth.alreadyPartner} <Link href={`/${locale}/auth`} className="text-on-surface hover:text-primary transition-colors border-b border-outline-variant">{dict.auth.signIn}</Link>
        </p>

        <div className="flex justify-center gap-8 pt-4 grayscale opacity-50">
          <div className="flex items-center gap-2 text-[8px] font-black tracking-widest uppercase">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            {dict.auth.sslEncrypted}
          </div>
          <div className="flex items-center gap-2 text-[8px] font-black tracking-widest uppercase">
            <span className="material-symbols-outlined text-sm">security</span>
            {dict.auth.enterpriseGrade}
          </div>
        </div>
      </div>
    </div>
  );
}
