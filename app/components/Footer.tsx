import React from "react";

const Footer = ({ dict }: { dict: any }) => {
  return (
    <footer className="bg-neutral-950 w-full border-t-4 border-primary-container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-12 py-16 w-full text-white text-sm uppercase tracking-widest">
        <div className="md:col-span-1">
          <div className="text-xl font-black text-white mb-6 uppercase">Héctor Severino</div>
          <p className="text-neutral-500 normal-case tracking-normal mb-8 font-body">
            {dict.description}
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-primary-container cursor-pointer">public</span>
            <span className="material-symbols-outlined text-primary-container cursor-pointer">mail</span>
            <span className="material-symbols-outlined text-primary-container cursor-pointer">call</span>
          </div>
        </div>
        <div>
          <h4 className="text-primary-container font-bold mb-6">{dict.nav}</h4>
          <ul className="space-y-3">
            <li><a className="text-neutral-500 hover:text-white transition-colors hover:underline decoration-2 underline-offset-4" href="#">Turbochargers</a></li>
            <li><a className="text-neutral-500 hover:text-white transition-colors hover:underline decoration-2 underline-offset-4" href="#">Spare Parts</a></li>
            <li><a className="text-neutral-500 hover:text-white transition-colors hover:underline decoration-2 underline-offset-4" href="#">Services</a></li>
            <li><a className="text-neutral-500 hover:text-white transition-colors hover:underline decoration-2 underline-offset-4" href="#">About</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-primary-container font-bold mb-6">{dict.support}</h4>
          <ul className="space-y-3">
            <li><a className="text-neutral-500 hover:text-white transition-colors hover:underline decoration-2 underline-offset-4" href="#">Privacy Policy</a></li>
            <li><a className="text-neutral-500 hover:text-white transition-colors hover:underline decoration-2 underline-offset-4" href="#">Terms of Service</a></li>
            <li><a className="text-neutral-500 hover:text-white transition-colors hover:underline decoration-2 underline-offset-4" href="#">Shipping Info</a></li>
            <li><a className="text-neutral-500 hover:text-white transition-colors hover:underline decoration-2 underline-offset-4" href="#">Contact Support</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-primary-container font-bold mb-6">{dict.join}</h4>
          <p className="text-neutral-500 normal-case mb-4 font-body">{dict.joinDesc}</p>
          <div className="flex">
            <input 
              className="bg-neutral-900 border-none px-4 py-3 text-xs w-full focus:ring-1 focus:ring-primary-container outline-none" 
              placeholder={dict.emailPlaceholder}
              type="email"
            />
            <button className="bg-primary-container px-4 py-3">
              <span className="material-symbols-outlined text-neutral-950 font-bold">send</span>
            </button>
          </div>
        </div>
      </div>
      <div className="px-12 py-8 border-t border-white/5 text-center text-neutral-600 text-[10px] font-black tracking-[0.3em]">
        {dict.copyright}
      </div>
    </footer>
  );
};

export default Footer;
