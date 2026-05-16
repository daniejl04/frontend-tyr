/** Tipos del script oficial https://checkout.epayco.co/checkout.js */

export interface EpaycoCheckoutData {
  name: string;
  description: string;
  invoice: string;
  currency: string;
  amount: string;
  tax_base: string;
  tax: string;
  country: string;
  lang: string;
  external: string;
  confirmation: string;
  response: string;
  [key: string]: string;
}

export interface EpaycoCheckoutHandler {
  open: (data: EpaycoCheckoutData) => void;
}

export interface EpaycoCheckoutConfigure {
  (options: { key: string; test: boolean }): EpaycoCheckoutHandler;
}

export interface EpaycoGlobal {
  checkout: {
    configure: EpaycoCheckoutConfigure;
  };
}

declare global {
  interface Window {
    ePayco?: EpaycoGlobal;
  }
}

export {};
