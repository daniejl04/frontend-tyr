export interface CartItem {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export const cartItems: CartItem[] = [
  {
    id: "gtx-performance",
    sku: "HS-9920-GTX",
    name: "GTX SERIES PERFORMANCE TURBOCHARGER",
    description: "High-tolerance nickel-alloy turbine wheel with forged compressor.",
    price: 2450.00,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmEcMnyw0vxbAmcarr450_ix0YifB-RI1zlAqz4pgdbbrctWwR83BRXcSezqy66DcDDr42WLZ7ROG-Q4gNxbP13o6b-JdmDjsLDRwYzaSYb6c_Fno1gsl5MNwb-6SLrT2dJi_fC6b2CKJOqGHU6iUrSeJaerdAew099wO8XX9iZ4uLw6xLIArQM1wgl3B3RkmLQLhWr38FOMQE8PkdZAPu2V7wt94Pcx67hTrwJs3dM5tBwyS13l-JkL4YxYxOwwHflSGf3jnUqOtJ"
  },
  {
    id: "seal-gasket-kit",
    sku: "RK-440-S",
    name: "MASTER SEAL & GASKET REPAIR KIT",
    description: "Full industrial-grade replacement set for S-Series engines.",
    price: 210.00,
    quantity: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaE1ZDZer4TMcWdjLlfo18iXxnqIJ4ufUI5m8d3BwpXAhc4J9Sj_G_92lYOo--Sj_kspVpA8USkLuoS2vz42HZ-ZgQL3AXOPBRPath7vkvF2CocQoAhS7vEbqqDfvLuh8q7ZUawkQV1L9O7QLGKWAxxdTHpogIXQrdt7gf-FSXjvES_dj_FUeIqb8Om00Cfp-2dE-EzhIQHlR2Og2hnSSkWSdrHMKb_9IyC949iuf4gFXTXBXle67xKHERj4FnSBJi3J40ej0zIZkj"
  }
];

export async function getCartItems() {
  return cartItems;
}
