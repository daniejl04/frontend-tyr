import React from "react";

const CategoryGrid = ({ dict }: { dict: any }) => {
  return (
    <section className="py-24 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl font-headline font-black tracking-tighter uppercase">{dict.title} <span className="text-primary">{dict.titleSpan}</span></h2>
          <p className="text-tertiary max-w-sm border-l-4 border-primary pl-4 font-medium uppercase tracking-wider text-sm">
            {dict.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          <div className="md:col-span-2 bg-surface-container-low group relative overflow-hidden flex items-end p-10 cursor-pointer">
            <img 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 grayscale group-hover:grayscale-0" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUqUNiazADuOY7oG7iCRMjfd10jakt303Hv5KeGnFA2yoqikz85Zhr-7VSI_BiyR2LbHh9l9M4fi4TI1Kst-ltiay0DCRFEH_7bAVsP-u29TUVDGwXUpd2s_0HzyOHwMaqESI4KpFwdtA1VaIxds5Tg9wwmGeC9SHIiFr8jaDxRZ5-CtYbvMtxGV6mYDeJIHizB1Ytmp8vkmzskQ7GLBeH7yTL5fA99XSGdl364KziHe8Hb42oAGvBkrs6KeUHaiUz7xrGSE7a4UOz"
            />
            <div className="relative z-10 w-full">
              <h3 className="text-4xl font-headline font-black text-on-surface tracking-tighter uppercase">{'Turbochargerdefew'}</h3>
              <p className="text-tertiary font-bold mb-6">{dict.turbochargersDesc}</p>
              <span className="inline-block bg-on-background text-white px-6 py-2 text-sm font-black uppercase tracking-widest group-hover:bg-primary transition-colors">{dict.viewSeries}</span>
            </div>
          </div>
          <div className="bg-surface-container-high group relative overflow-hidden flex items-end p-10 cursor-pointer">
            <img 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 grayscale group-hover:grayscale-0" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaE1ZDZer4TMcWdjLlfo18iXxnqIJ4ufUI5m8d3BwpXAhc4J9Sj_G_92lYOo--Sj_kspVpA8USkLuoS2vz42HZ-ZgQL3AXOPBRPath7vkvF2CocQoAhS7vEbqqDfvLuh8q7ZUawkQV1L9O7QLGKWAxxdTHpogIXQrdt7gf-FSXjvES_dj_FUeIqb8Om00Cfp-2dE-EzhIQHlR2Og2hnSSkWSdrHMKb_9IyC949iuf4gFXTXBXle67xKHERj4FnSBJi3J40ej0zIZkj"
            />
            <div className="relative z-10">
              <h3 className="text-3xl font-headline font-black text-on-surface tracking-tighter uppercase">{dict.sparePartsTitle}</h3>
              <p className="text-tertiary font-bold mb-6">{dict.sparePartsDesc}</p>
              <span className="material-symbols-outlined text-4xl group-hover:translate-x-2 transition-transform">arrow_outward</span>
            </div>
          </div>
          <div className="md:col-span-3 bg-primary-container p-10 flex flex-col md:flex-row items-center justify-between group cursor-pointer">
            <div className="max-w-2xl">
              <h3 className="text-4xl font-headline font-black text-on-primary-container tracking-tighter uppercase">{dict.engineeringServices}</h3>
              <p className="text-on-primary-container/80 font-medium mt-2">{dict.engineeringDesc}</p>
            </div>
            <div className="mt-8 md:mt-0 bg-on-primary-container text-primary-container px-10 py-5 font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform">
              {dict.bookService}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
