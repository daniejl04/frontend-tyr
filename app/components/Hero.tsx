import React from "react";

const Hero = ({ dict }: { dict: any }) => {
  return (
    <section className="relative bg-on-background text-white hero-clip overflow-hidden min-h-[870px] flex items-center">
      <div className="absolute inset-0 opacity-40">
        <img 
          alt="Industrial Machinery" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVYuGPYLyg73AIi5mjveAp0uYl4xuFAWWLwdERWGBHXzR5D5Ay8ho7ljttFF5icKgTkI6cfk2VOrdaX3PE9kx2QidffTU8V6zoIsfmtv9hsMJZCeZvVoUWwyrVpww1CkNtTQELu-ytVHGI2j_g4IONhnaAgrRP_9Ct07KHZsaOEweZCjSW631XcTr9Q2IM7WlVDL1nCl1BPvUCnqia4WblCF0XAmX7Wbw3RRzrNPfk-bZCBJvy5wnDW8KluMYbw1j0bWrS9e4ZP1le"
        />
      </div>
      <div className="container mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter leading-none">
            {dict.titlePrefix} <br/><span className="text-primary-container">{dict.titleSpan}</span> {dict.titleSuffix}
          </h1>
          <p className="text-xl text-surface-container-high max-w-lg font-body font-medium leading-relaxed">
            {dict.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="bg-primary-container text-on-primary-container px-8 py-4 font-headline font-black uppercase tracking-widest rounded-sm hover:bg-primary-fixed-dim transition-all flex items-center justify-center gap-2">
              {dict.ctaExplore}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="border-2 border-surface-variant text-white px-8 py-4 font-headline font-black uppercase tracking-widest rounded-sm hover:bg-white/10 transition-all">
              {dict.ctaQuote}
            </button>
          </div>
        </div>
        
        <div className="hidden lg:block relative">
          <div className="absolute -top-20 -right-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
          <img 
            alt="Premium Turbocharger" 
            className="relative z-10 w-full drop-shadow-[0_20px_40px_rgba(255,193,7,0.2)]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmEcMnyw0vxbAmcarr450_ix0YifB-RI1zlAqz4pgdbbrctWwR83BRXcSezqy66DcDDr42WLZ7ROG-Q4gNxbP13o6b-JdmDjsLDRwYzaSYb6c_Fno1gsl5MNwb-6SLrT2dJi_fC6b2CKJOqGHU6iUrSeJaerdAew099wO8XX9iZ4uLw6xLIArQM1wgl3B3RkmLQLhWr38FOMQE8PkdZAPu2V7wt94Pcx67hTrwJs3dM5tBwyS13l-JkL4YxYxOwwHflSGf3jnUqOtJ"
          />
          <div className="absolute bottom-4 left-4 bg-primary-container/90 backdrop-blur p-6 text-on-primary-container z-20 max-w-xs">
            <p className="font-headline font-bold text-lg leading-tight uppercase">{dict.floatingBadge}</p>
            <p className="text-xs font-mono mt-2 tracking-widest">PN: 998-SEC-2024</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
