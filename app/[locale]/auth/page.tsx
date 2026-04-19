import React from "react";
import Link from "next/link";
import { getDictionary } from "../../../lib/get-dictionary";

export default async function LoginPage({
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
          {dict.auth.loginTitle}
        </h1>
        <p className="text-tertiary text-sm font-body font-medium leading-relaxed max-w-xs mx-auto lg:mx-0">
          {dict.auth.loginSubtitle}
        </p>
      </div>

      <div className="space-y-6">
        <button className="w-full border border-outline-variant/30 py-4 flex items-center justify-center gap-4 text-xs font-black uppercase tracking-widest hover:bg-surface-container transition-all">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          {dict.auth.googleSignIn}
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-outline-variant/30"></span>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-white px-4 text-tertiary font-black tracking-widest">{dict.auth.orEmail}</span>
          </div>
        </div>

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
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black tracking-widest uppercase text-tertiary">
                {dict.auth.securityKey}
              </label>
              <button className="text-[8px] font-black tracking-widest uppercase text-tertiary hover:text-primary underline">
                {dict.auth.forgot}
              </button>
            </div>
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
              {dict.auth.keepSession}
            </span>
          </div>

          <button className="w-full bg-primary-container text-on-primary-container py-5 text-xs font-black uppercase tracking-[0.2em] hover:bg-primary-fixed-dim transition-all">
            {dict.auth.authenticate}
          </button>
        </form>
      </div>

      <div className="text-center space-y-8">
        <p className="text-[10px] font-black tracking-widest uppercase text-tertiary">
          {dict.auth.newPartner} <Link href={`/${locale}/auth/register`} className="text-on-surface hover:text-primary transition-colors border-b border-outline-variant">{dict.auth.requestRegistration}</Link>
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
