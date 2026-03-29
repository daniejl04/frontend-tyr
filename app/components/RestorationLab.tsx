import React from "react";

const RestorationLab = ({ dict }: { dict: any }) => {
  return (
    <section className="py-24 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-16">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -left-10 -top-10 w-full h-full border-t-8 border-l-8 border-primary/20"></div>
          <img 
            alt="Repair Center" 
            className="relative z-10 w-full shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbQoWTQGMeLkRXAi0dKyOgD0KskMAFQxBaJ--lfrNTmRmBbYAypDO_NQXdM26oWvvIkmGE4sy-s0tJEey_hrUTS5UEY2avBvLGnMLTmGPykk7R1WtKM-OimXupT2M9M3zaO_-Oede9oOBHU20EiH9liRntvUmtV6rp1EaBWSLFMSKzBe676xZ_Kl_onFARLjBgCWWu91PaPGDHsgfFcE0TF68jc546JyG560356zGc24hDCTDS52TEIH8x0w1KiCEvsHqQbtTtxCho"
          />
          <div className="absolute -bottom-6 -right-6 bg-on-background text-white p-8 z-20 hidden md:block">
            <p className="text-5xl font-headline font-black leading-none text-primary">{dict.turnaround}</p>
            <p className="text-xs uppercase font-black tracking-widest mt-1">{dict.turnaroundLabel.split(' ')[0]} <br/> {dict.turnaroundLabel.split(' ')[1]}</p>
          </div>
        </div>
        <div className="space-y-8 order-1 lg:order-2">
          <h2 className="text-5xl md:text-6xl font-headline font-black tracking-tighter leading-none uppercase">{dict.title} <br/><span className="text-primary">{dict.titleSpan}</span> {dict.titleSuffix}</h2>
          <p className="text-tertiary font-medium text-lg leading-relaxed">
            {dict.description}
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-4 border-b border-surface-container-high pb-4">
              <span className="material-symbols-outlined text-primary font-bold">check_circle</span>
              <span className="font-headline font-black uppercase text-sm tracking-widest">{dict.feature1}</span>
            </li>
            <li className="flex items-center gap-4 border-b border-surface-container-high pb-4">
              <span className="material-symbols-outlined text-primary font-bold">check_circle</span>
              <span className="font-headline font-black uppercase text-sm tracking-widest">{dict.feature2}</span>
            </li>
            <li className="flex items-center gap-4 border-b border-surface-container-high pb-4">
              <span className="material-symbols-outlined text-primary font-bold">check_circle</span>
              <span className="font-headline font-black uppercase text-sm tracking-widest">{dict.feature3}</span>
            </li>
          </ul>
          <button className="bg-on-background text-white px-12 py-5 font-headline font-black uppercase tracking-[0.2em] flex items-center gap-4 group">
            {dict.diagnosticCTA}
            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">calendar_today</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default RestorationLab;
