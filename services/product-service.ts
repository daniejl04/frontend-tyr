import { apiClient } from '@/lib/api-client';
import { ProductDetail, ProductSummary } from '@/types/product';

// --- DATA SIMULADA (MOCKS) ---
// Ajusta el delay para probar estados de carga (loading states)
const MOCK_DELAY = 800; 

const MOCK_PRODUCTS: ProductDetail[] = [
  {
    id: "gtx3584rs",
    name: "GTX3584RS GEN II",
    sku: "HS-TURBO-856881-5068S",
    price: "$2,450.00",
    currency: "USD",
    status: "IN STOCK",
    description: "Precision engineered for high-performance applications. The Gen II compressor aerodynamics increase horsepower range significantly over previous models, providing the ultimate boost for industrial and racing engines.",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmEcMnyw0vxbAmcarr450_ix0YifB-RI1zlAqz4pgdbbrctWwR83BRXcSezqy66DcDDr42WLZ7ROG-Q4gNxbP13o6b-JdmDjsLDRwYzaSYb6c_Fno1gsl5MNwb-6SLrT2dJi_fC6b2CKJOqGHU6iUrSeJaerdAew099wO8XX9iZ4uLw6xLIArQM1wgl3B3RkmLQLhWr38FOMQE8PkdZAPu2V7wt94Pcx67hTrwJs3dM5tBwyS13l-JkL4YxYxOwwHflSGf3jnUqOtJ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUqUNiazADuOY7oG7iCRMjfd10jakt303Hv5KeGnFA2yoqikz85Zhr-7VSI_BiyR2LbHh9l9M4fi4TI1Kst-ltiay0DCRFEH_7bAVsP-u29TUVDGwXUpd2s_0HzyOHwMaqESI4KpFwdtA1VaIxds5Tg9wwmGeC9SHIiFr8jaDxRZ5-CtYbvMtxGV6mYDeJIHizB1Ytmp8vkmzskQ7GLBeH7yTL5fA99XSGdl364KziHe8Hb42oAGvBkrs6KeUHaiUz7xrGSE7a4UOz"
    ],
    specs: [
      { label: "COMPRESSOR INDUCER", value: "67mm" },
      { label: "COMPRESSOR EXDUCER", value: "84mm" },
      { label: "TURBINE INDUCER", value: "68mm" },
      { label: "BEARING TYPE", value: "Dual Ceramic Ball Bearing" }
    ],
    compatibility: [
      { title: "Caterpillar C-Series", desc: "Industrial engines C15, C18 (2015-2023)" },
      { title: "Cummins ISX", desc: "Heavy Duty Trucking 15L Platforms" }
    ]
  },
  {
    id: "s300sxe",
    name: "S300SX-E 64.5MM",
    sku: "BW-13009097056",
    price: "$1,150.00",
    currency: "USD",
    status: "LOW STOCK",
    description: "The S300SX-E series offers the latest in compressor aerodynamics for heavy-duty applications. Designed for reliability and power density.",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUqUNiazADuOY7oG7iCRMjfd10jakt303Hv5KeGnFA2yoqikz85Zhr-7VSI_BiyR2LbHh9l9M4fi4TI1Kst-ltiay0DCRFEH_7bAVsP-u29TUVDGwXUpd2s_0HzyOHwMaqESI4KpFwdtA1VaIxds5Tg9wwmGeC9SHIiFr8jaDxRZ5-CtYbvMtxGV6mYDeJIHizB1Ytmp8vkmzskQ7GLBeH7yTL5fA99XSGdl364KziHe8Hb42oAGvBkrs6KeUHaiUz7xrGSE7a4UOz"
    ],
    specs: [
      { label: "TURBINE INDUCER", value: "68mm" },
      { label: "MAX HORSEPOWER", value: "850 HP" }
    ],
    compatibility: [
      { title: "Cummins ISX", desc: "Heavy Duty 15L" },
      { title: "Volvo D13", desc: "Industrial and Marine applications" }
    ]
  }
];

// Helper para simular latencia de red
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  /**
   * Obtiene todos los productos (Simulado con Fallback a API)
   */
  getAll: async (params?: Record<string, string | number>): Promise<ProductSummary[]> => {
    // 1. Simular latencia de red
    await sleep(MOCK_DELAY);

    // 2. Lógica de conmutación:
    // Si quieres usar la API real, descomenta la línea de abajo y comenta el return de los mocks
    // return apiClient.get<ProductSummary[]>('/products', { params });

    return MOCK_PRODUCTS.map(({ id, name, sku, price, currency, status, images }) => ({
      id, name, sku, price, currency, status, images
    }));
  },

  /**
   * Obtiene un producto por su ID (Simulado)
   */
  getById: async (id: string): Promise<ProductDetail> => {
    await sleep(MOCK_DELAY);

    // Intento de API real
    // return apiClient.get<ProductDetail>(`/products/${id}`);

    const product = MOCK_PRODUCTS.find(p => p.id === id);
    if (!product) throw new Error("Producto no encontrado en los mocks");
    return product;
  },

  /**
   * Crea un nuevo producto
   */
  create: async (data: Omit<ProductDetail, 'id'>): Promise<ProductDetail> => {
    await sleep(MOCK_DELAY);
    console.log("[Mock API] Creando producto:", data);
    return { id: Math.random().toString(36).substr(2, 9), ...data };
  },

  /**
   * Actualiza un producto existente
   */
  update: async (id: string, data: Partial<ProductDetail>): Promise<ProductDetail> => {
    await sleep(MOCK_DELAY);
    console.log(`[Mock API] Actualizando producto ${id}:`, data);
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    return { ...MOCK_PRODUCTS[0], ...data, id };
  },

  /**
   * Elimina un producto por ID
   */
  delete: async (id: string): Promise<void> => {
    await sleep(MOCK_DELAY);
    console.log(`[Mock API] Eliminando producto ${id}`);
    return;
  }
};
