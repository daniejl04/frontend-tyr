export interface ProductDetail {
  id: string;
  name: string;
  sku: string;
  price: string;
  currency: string;
  status: string;
  description: string;
  images: string[];
  specs: { label: string; value: string }[];
  compatibility: { title: string; desc: string }[];
}

export const products: ProductDetail[] = [
  {
    id: "gtx3584rs",
    name: "GTX3584RS GEN II",
    sku: "HS-TURBO-856881-5068S",
    price: "$2,450.00",
    currency: "USD",
    status: "IN STOCK - READY TO SHIP",
    description: "Precision engineered for high-performance applications. The Gen II compressor aerodynamics increase horsepower range significantly over previous models, providing the ultimate boost for industrial and racing engines.",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmEcMnyw0vxbAmcarr450_ix0YifB-RI1zlAqz4pgdbbrctWwR83BRXcSezqy66DcDDr42WLZ7ROG-Q4gNxbP13o6b-JdmDjsLDRwYzaSYb6c_Fno1gsl5MNwb-6SLrT2dJi_fC6b2CKJOqGHU6iUrSeJaerdAew099wO8XX9iZ4uLw6xLIArQM1wgl3B3RkmLQLhWr38FOMQE8PkdZAPu2V7wt94Pcx67hTrwJs3dM5tBwyS13l-JkL4YxYxOwwHflSGf3jnUqOtJ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUqUNiazADuOY7oG7iCRMjfd10jakt303Hv5KeGnFA2yoqikz85Zhr-7VSI_BiyR2LbHh9l9M4fi4TI1Kst-ltiay0DCRFEH_7bAVsP-u29TUVDGwXUpd2s_0HzyOHwMaqESI4KpFwdtA1VaIxds5Tg9wwmGeC9SHIiFr8jaDxRZ5-CtYbvMtxGV6mYDeJIHizB1Ytmp8vkmzskQ7GLBeH7yTL5fA99XSGdl364KziHe8Hb42oAGvBkrs6KeUHaiUz7xrGSE7a4UOz",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCaE1ZDZer4TMcWdjLlfo18iXxnqIJ4ufUI5m8d3BwpXAhc4J9Sj_G_92lYOo--Sj_kspVpA8USkLuoS2vz42HZ-ZgQL3AXOPBRPath7vkvF2CocQoAhS7vEbqqDfvLuh8q7ZUawkQV1L9O7QLGKWAxxdTHpogIXQrdt7gf-FSXjvES_dj_FUeIqb8Om00Cfp-2dE-EzhIQHlR2Og2hnSSkWSdrHMKb_9IyC949iuf4gFXTXBXle67xKHERj4FnSBJi3J40ej0zIZkj"
    ],
    specs: [
      { label: "COMPRESSOR INDUCER", value: "67mm" },
      { label: "COMPRESSOR EXDUCER", value: "84mm" },
      { label: "TURBINE INDUCER", value: "68mm" },
      { label: "BEARING TYPE", "value": "Dual Ceramic Ball Bearing" },
      { label: "COOLING SYSTEM", "value": "Oil & water Cooled" },
      { label: "MAX HORSEPOWER", "value": "1,000 HP" }
    ],
    compatibility: [
      { title: "Caterpillar C-Series", desc: "Industrial engines C15, C18 (2015-2023)" },
      { title: "Cummins ISX", desc: "Heavy Duty Trucking 15L Platforms" },
      { title: "Custom Racing Chassis", desc: "Universal V8 Twin-Turbo Configurations" }
    ]
  }
];

export async function getProductById(id: string): Promise<ProductDetail | undefined> {
  return products.find(p => p.id === id) || products[0]; // Fallback for demo
}
