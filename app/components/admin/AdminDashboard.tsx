"use client";

import React, { useState, useEffect, useCallback } from "react";
import { productService } from "@/services/product-service";
import { ProductDetail } from "@/types/product";
import ProductCard from "../ProductCard";

interface AdminDashboardProps {
  locale: string;
  dict: any;
  activeSection: string;
}

export default function AdminDashboard({
  locale,
  dict,
  activeSection,
}: AdminDashboardProps) {
  // Products listing states
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // CRUD Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("Turbo");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [image, setImage] = useState("");

  // Tech Specs States
  const [compInducer, setCompInducer] = useState("");
  const [compExducer, setCompExducer] = useState("");
  const [turbineInducer, setTurbineInducer] = useState("");
  const [bearingType, setBearingType] = useState("");
  const [coolingSystem, setCoolingSystem] = useState("");
  const [maxHorsepower, setMaxHorsepower] = useState("");

  // Engine Compatibility
  const [compatibleEngines, setCompatibleEngines] = useState<string[]>([
    "V8 Cummins",
    "Powerstroke 6.7L",
  ]);
  const [newEngineInput, setNewEngineInput] = useState("");
  const [showAddEngineInput, setShowAddEngineInput] = useState(false);

  // Sync Timer
  const [lastSynced, setLastSynced] = useState("Justo ahora");
  const [syncSeconds, setSyncSeconds] = useState(0);

  // Form submission feedback
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getAll();
      // Map basic ProductSummary to full ProductDetail structures if necessary
      const details = await Promise.all(
        response.data.map(async (p) => {
          try {
            return await productService.getById(p._id);
          } catch {
            return {
              _id: p._id,
              name: p.name,
              sku: p.sku,
              price: p.price,
              currency: p.currency || "USD",
              status: p.status,
              images: p.images || [],
              description: p.description || "",
              specs: [],
              compatibility: [],
              quantity: 0,
            } as ProductDetail;
          }
        })
      );
      setProducts(details);
      setSyncSeconds(0);
      setLastSynced(locale === "es" ? "Hace instantes" : "Just synced");
    } catch (err) {
      console.error(err);
      setError(locale === "es" ? "Error al cargar productos" : "Error loading products");
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Sync Timer incrementer
  useEffect(() => {
    const timer = setInterval(() => {
      setSyncSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (syncSeconds === 0) return;
    if (syncSeconds < 60) {
      setLastSynced(
        locale === "es"
          ? `Hace ${syncSeconds} seg`
          : `${syncSeconds}s ago`
      );
    } else {
      const mins = Math.floor(syncSeconds / 60);
      setLastSynced(
        locale === "es"
          ? `Hace ${mins} min`
          : `${mins}m ago`
      );
    }
  }, [syncSeconds, locale]);

  // Handle Form Cleanup / Reset
  const resetForm = () => {
    setEditingId(null);
    setName("");
    setSku("");
    setCategory("Turbo");
    setPrice("");
    setQuantity("0");
    setImage("");
    setCompInducer("");
    setCompExducer("");
    setTurbineInducer("");
    setBearingType("");
    setCoolingSystem("");
    setMaxHorsepower("");
    setCompatibleEngines(["V8 Cummins", "Powerstroke 6.7L"]);
    setFormSuccess(null);
    setFormError(null);
  };

  // Image upload base64 converter
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Engine tags control
  const handleAddEngine = () => {
    const val = newEngineInput.trim();
    if (val && !compatibleEngines.includes(val)) {
      setCompatibleEngines([...compatibleEngines, val]);
      setNewEngineInput("");
      setShowAddEngineInput(false);
    }
  };

  const handleRemoveEngine = (eng: string) => {
    setCompatibleEngines(compatibleEngines.filter((x) => x !== eng));
  };

  // Edit action
  const handleEditClick = (id: string) => {
    const prod = products.find((p) => p._id === id);
    if (!prod) return;

    setEditingId(prod._id);
    setName(prod.name);
    setSku(prod.sku);
    setCategory(prod.category || "Turbo");

    // Parse numeric fields cleanly
    const numPrice = typeof prod.price === "number"
      ? String(prod.price)
      : (prod.price || "").replace(/[^0-9.]/g, "");
    setPrice(numPrice);
    setQuantity(String(prod.quantity ?? 0));
    setImage(prod.images?.[0] || "");

    // Extract specs safely
    const specsMap = new Map(prod.specs?.map((s) => [s.label, s.value]) || []);
    setCompInducer(specsMap.get("Comp Inducer (mm)") || "");
    setCompExducer(specsMap.get("Comp Exducer (mm)") || "");
    setTurbineInducer(specsMap.get("Turbine Inducer (mm)") || "");
    setBearingType(specsMap.get("Bearing Type") || "");
    setCoolingSystem(specsMap.get("Cooling System") || "");
    setMaxHorsepower(specsMap.get("Max Horsepower") || "");

    // Extract compatibility safely
    const compatList = prod.compatibility?.map((c) => c.title) || [];
    setCompatibleEngines(compatList.length > 0 ? compatList : ["V8 Cummins", "Powerstroke 6.7L"]);

    // Clear feedback errors and scroll to top smoothly
    setFormSuccess(null);
    setFormError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete product action
  const handleDeleteClick = async (id: string) => {
    const confirmation = window.confirm(
      locale === "es"
        ? "¿Está seguro que desea eliminar este repuesto del catálogo?"
        : "Are you sure you want to delete this part from the catalog?"
    );
    if (!confirmation) return;

    try {
      await productService.delete(id);
      setProducts(products.filter((p) => p._id !== id));
      alert(locale === "es" ? "Producto eliminado con éxito" : "Product deleted successfully");
    } catch (err) {
      console.error(err);
      alert(locale === "es" ? "Error al eliminar producto" : "Error deleting product");
    }
  };

  // Submit Handler: Create or Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess(null);
    setFormError(null);

    if (!name.trim() || !sku.trim() || !price || !quantity) {
      setFormError(locale === "es" ? "Por favor completa todos los campos requeridos." : "Please fill out all required fields.");
      return;
    }

    setSubmitting(true);

    // Build specs array
    const specsArray = [
      { label: "Comp Inducer (mm)", value: compInducer || "—" },
      { label: "Comp Exducer (mm)", value: compExducer || "—" },
      { label: "Turbine Inducer (mm)", value: turbineInducer || "—" },
      { label: "Bearing Type", value: bearingType || "—" },
      { label: "Cooling System", value: coolingSystem || "—" },
      { label: "Max Horsepower", value: maxHorsepower || "—" },
    ];

    // Build compatibility array
    const compatibilityArray = compatibleEngines.map((title) => ({
      title,
      desc: "Compatible Engine",
    }));

    // Build payload
    const stockVal = Number(quantity) || 0;
    const finalStatus = stockVal <= 0 ? "OUT OF STOCK" : stockVal <= 5 ? "LOW STOCK" : "IN STOCK";

    const payload: Omit<ProductDetail, "_id"> = {
      name: name.trim(),
      sku: sku.trim(),
      price: `$${parseFloat(price).toFixed(2)}`,
      category: category,
      quantity: stockVal,
      currency: "USD",
      status: finalStatus,
      description: `Componente de ingeniería de precisión de tipo ${category}. SKU: ${sku}`,
      images: [image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDtVbOZ3Tj_2HwxOdAMXIGtZTHlEgRrwjlB4hQG-u-4FS7bJumvwMlEVXN24k8UJr4lLyQTPG7QGENgWCktdQzd9Hh0QXZD1_b_dDCMTBcHGNjNiCUrXOH_MH8PUh2MckysjYI_6qTf0EaWk46pvrgzL_6pI6QFipx8EM_aQ4gwoLmAB6FzqxKxrC6D2pee6eTPTNU-JAvMJBiHEyN3YPqrsJ5yKz2Y6j1F7YNeP-fNbSC8Kx_-fn4aFsW9ypk3xlu-JktUAkuAnzcZ"],
      specs: specsArray,
      compatibility: compatibilityArray,
    };

    try {
      if (editingId) {
        // Update product
        const updated = await productService.update(editingId, payload);
        setProducts(products.map((p) => (p._id === editingId ? updated : p)));
        setFormSuccess(locale === "es" ? "Producto actualizado con éxito" : "Product updated successfully");
      } else {
        // Create product
        const created = await productService.create(payload);
        setProducts([created, ...products]);
        setFormSuccess(locale === "es" ? "Producto registrado con éxito" : "Product created successfully");
      }
      resetForm();
    } catch (err) {
      console.error(err);
      setFormError(locale === "es" ? "Error al guardar el producto. Verifica la conexión." : "Error saving product. Check connection.");
    } finally {
      setSubmitting(false);
    }
  };

  // CSV Export utility
  const handleExportCSV = () => {
    if (products.length === 0) return;

    // Build CSV Content
    const headers = ["ID", "Name", "SKU", "Category", "Price", "Stock", "Status"];
    const rows = products.map((p) => [
      p._id,
      `"${p.name.replace(/"/g, '""')}"`,
      p.sku,
      p.category || "Turbo",
      p.price,
      p.quantity ?? 0,
      p.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `catalogo_inventario_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Statistics summaries
  const totalSkuCount = products.length;
  const totalStockCount = products.reduce((acc, curr) => acc + (curr.quantity ?? 0), 0);
  const totalValueSum = products.reduce((acc, curr) => {
    const val = typeof curr.price === "number"
      ? curr.price
      : parseFloat(String(curr.price || "").replace(/[^0-9.]/g, "")) || 0;
    return acc + val * (curr.quantity ?? 1);
  }, 0);

  const formattedTotalValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(totalValueSum);

  // Live filter query
  const filteredProducts = products.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query) ||
      (p.category || "").toLowerCase().includes(query)
    );
  });

  // Render other tabs
  if (activeSection !== "inventory") {
    return (
      <main className="ml-64 min-h-screen bg-surface p-8 font-headline flex items-center justify-center">
        <div className="text-center max-w-md bg-white border border-outline-variant/10 p-8 shadow-sm">
          <span className="material-symbols-outlined text-4xl text-primary mb-4">construction</span>
          <h2 className="text-xl font-black uppercase text-on-surface">
            {locale === "es" ? "Sección en Construcción" : "Section Under Construction"}
          </h2>
          <p className="text-secondary text-sm mt-2 font-medium">
            {locale === "es"
              ? `La sección "${activeSection}" está programada para la siguiente fase. Utilice la pestaña "Inventario" para gestionar el catálogo.`
              : `The "${activeSection}" section is scheduled for next release. Use the "Inventory" tab to manage the catalog.`}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="ml-64 min-h-screen pb-20 bg-surface">
      {/* Top Navbar Section */}
      <header className="sticky top-0 right-0 w-full z-30 flex justify-between items-center px-8 py-4 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-850 font-headline font-semibold">
        <div className="flex items-center gap-8 flex-1">
          <h1 className="text-xl font-black text-stone-900 dark:text-stone-50 tracking-tighter uppercase select-none">
            TORQUE & TREADS
          </h1>
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">
              search
            </span>
            <input
              type="text"
              placeholder={locale === "es" ? "Buscar por componentes, SKUs, categorías..." : "Search components, SKUs, or categories..."}
              className="w-full bg-surface-container-high dark:bg-stone-900 border-none rounded-lg py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-primary transition-all text-on-surface"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="p-8 space-y-12 max-w-7xl mx-auto">

        {/* Page Header Title */}
        <section className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <h2 className="font-headline text-3xl font-black tracking-tight text-on-surface">
              {locale === "es" ? "Gestión de Inventario" : "Inventory Management"}
            </h2>
            <p className="text-secondary text-sm mt-2 font-medium">
              {locale === "es"
                ? "Añada y edite componentes de alta resistencia para el catálogo global de Torque & Treads."
                : "Add new precision parts to the global machining catalog."}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleExportCSV}
              disabled={products.length === 0}
              className="px-5 py-3 bg-surface-container-highest border border-outline-variant/30 font-bold text-xs tracking-tight flex items-center gap-2 hover:bg-surface-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase"
            >
              <span className="material-symbols-outlined text-sm">file_download</span>
              {locale === "es" ? "Exportar CSV" : "Export CSV"}
            </button>
            <button
              onClick={() => {
                resetForm();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-5 py-3 bg-primary-container text-on-primary-container font-black text-xs tracking-tight flex items-center gap-2 hover:bg-primary-fixed-dim transition-all active:scale-[0.98] uppercase"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              {locale === "es" ? "Nuevo Producto" : "New Product"}
            </button>
          </div>
        </section>

        {/* Dashboard Form & Upload */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Create/Edit Product Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-8 space-y-8 bg-surface-container-lowest p-8 border border-outline-variant/20 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>

            <h3 className="font-headline text-lg font-black uppercase tracking-widest mb-6">
              {editingId
                ? locale === "es"
                  ? "EDITAR PRODUCTO"
                  : "EDIT PRODUCT"
                : locale === "es"
                  ? "CREAR NUEVO PRODUCTO"
                  : "CREATE NEW PRODUCT"}
            </h3>

            {/* Success and Error messages */}
            {formSuccess && (
              <div className="p-4 bg-green-50 text-green-800 border-l-4 border-green-500 font-bold text-xs uppercase tracking-wide">
                {formSuccess}
              </div>
            )}
            {formError && (
              <div className="p-4 bg-red-50 text-error border-l-4 border-error font-bold text-xs uppercase tracking-wide">
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-secondary tracking-widest">
                  {locale === "es" ? "Nombre del Producto *" : "Product Name *"}
                </label>
                <input
                  type="text"
                  placeholder="e.g. T4 Twin-Scroll Turbo"
                  className="w-full bg-surface-container-low border-none rounded-sm p-3 focus:ring-2 focus:ring-primary outline-none transition-all font-medium text-sm text-on-surface"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* SKU */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-secondary tracking-widest">
                  {locale === "es" ? "Código SKU *" : "SKU ID *"}
                </label>
                <input
                  type="text"
                  placeholder="TRQ-8829-91"
                  className="w-full bg-surface-container-low border-none rounded-sm p-3 focus:ring-2 focus:ring-primary outline-none transition-all font-mono text-sm text-on-surface"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-secondary tracking-widest">
                  {locale === "es" ? "Categoría *" : "Category *"}
                </label>
                <select
                  className="w-full bg-surface-container-low border-none rounded-sm p-3 focus:ring-2 focus:ring-primary outline-none transition-all font-medium text-sm text-on-surface"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Turbo">Turbo</option>
                  <option value="Spare Part">{locale === "es" ? "Repuesto" : "Spare Part"}</option>
                  <option value="Gasket">{locale === "es" ? "Junta / Empaque" : "Gasket"}</option>
                </select>
              </div>

              {/* Price & Stock Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-secondary tracking-widest">
                    {locale === "es" ? "Precio (USD) *" : "Price (USD) *"}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full bg-surface-container-low border-none rounded-sm p-3 focus:ring-2 focus:ring-primary outline-none transition-all font-medium text-sm text-on-surface"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-secondary tracking-widest">
                    {locale === "es" ? "Unidades *" : "Stock *"}
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full bg-surface-container-low border-none rounded-sm p-3 focus:ring-2 focus:ring-primary outline-none transition-all font-medium text-sm text-on-surface"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="mt-8 pt-8 border-t border-outline-variant/20">
              <h4 className="text-xs font-black uppercase text-primary tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">settings_input_component</span>
                {locale === "es" ? "Especificaciones Técnicas" : "Technical Specifications"}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-tertiary">Comp Inducer (mm)</label>
                  <input
                    type="text"
                    className="w-full bg-surface border-b border-outline-variant p-1 focus:border-primary outline-none text-sm text-on-surface"
                    value={compInducer}
                    onChange={(e) => setCompInducer(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-tertiary">Comp Exducer (mm)</label>
                  <input
                    type="text"
                    className="w-full bg-surface border-b border-outline-variant p-1 focus:border-primary outline-none text-sm text-on-surface"
                    value={compExducer}
                    onChange={(e) => setCompExducer(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-tertiary">Turbine Inducer (mm)</label>
                  <input
                    type="text"
                    className="w-full bg-surface border-b border-outline-variant p-1 focus:border-primary outline-none text-sm text-on-surface"
                    value={turbineInducer}
                    onChange={(e) => setTurbineInducer(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-tertiary">Bearing Type</label>
                  <input
                    type="text"
                    className="w-full bg-surface border-b border-outline-variant p-1 focus:border-primary outline-none text-sm text-on-surface"
                    value={bearingType}
                    onChange={(e) => setBearingType(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-tertiary">Cooling System</label>
                  <input
                    type="text"
                    className="w-full bg-surface border-b border-outline-variant p-1 focus:border-primary outline-none text-sm text-on-surface"
                    value={coolingSystem}
                    onChange={(e) => setCoolingSystem(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-tertiary">Max Horsepower</label>
                  <input
                    type="text"
                    className="w-full bg-surface border-b border-outline-variant p-1 focus:border-primary outline-none text-sm font-bold text-on-surface"
                    value={maxHorsepower}
                    onChange={(e) => setMaxHorsepower(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Compatible Engines */}
            <div className="mt-8 space-y-4">
              <label className="text-xs font-black uppercase text-secondary tracking-widest">
                {locale === "es" ? "Motores Compatibles" : "Compatible Engines"}
              </label>
              <div className="flex flex-wrap gap-2 items-center">
                {compatibleEngines.map((eng) => (
                  <span
                    key={eng}
                    className="bg-surface-container py-1 px-3 text-xs font-bold flex items-center gap-2 border border-outline-variant/10 text-on-surface"
                  >
                    {eng}
                    <span
                      className="material-symbols-outlined text-[10px] cursor-pointer hover:text-error"
                      onClick={() => handleRemoveEngine(eng)}
                    >
                      close
                    </span>
                  </span>
                ))}

                {showAddEngineInput ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      placeholder="e.g. Caterpillar C15"
                      className="bg-surface border-b border-outline-variant p-1 outline-none text-xs text-on-surface w-32"
                      value={newEngineInput}
                      onChange={(e) => setNewEngineInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddEngine();
                        }
                      }}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleAddEngine}
                      className="material-symbols-outlined text-sm text-primary hover:text-amber-800"
                    >
                      check
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddEngineInput(false)}
                      className="material-symbols-outlined text-sm text-secondary hover:text-on-surface"
                    >
                      close
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAddEngineInput(true)}
                    className="border border-dashed border-outline-variant px-3 py-1 text-xs font-bold text-secondary hover:border-primary hover:text-primary transition-all flex items-center gap-1 bg-white"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span>
                    {locale === "es" ? "Añadir Motor" : "Add Engine"}
                  </button>
                )}
              </div>
            </div>

            {/* Hidden Button for default forms submit on enter */}
            <button type="submit" className="hidden" />
          </form>

          {/* Media upload and actions column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-surface-container-highest p-8 border border-outline-variant/20 shadow-sm flex flex-col justify-between h-fit">
              <h3 className="font-headline text-sm font-black uppercase tracking-widest mb-4">
                {locale === "es" ? "Imagen del Producto" : "Product Visuals"}
              </h3>

              <label className="aspect-square bg-surface flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/60 hover:border-primary cursor-pointer transition-all relative overflow-hidden group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {image ? (
                  <>
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-full object-contain p-4 group-hover:opacity-75 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white transition-opacity duration-200">
                      <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                      <p className="text-[9px] font-black uppercase mt-1">Cambiar Imagen</p>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-4xl text-stone-300 group-hover:text-primary mb-2">
                      cloud_upload
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-stone-400 group-hover:text-on-surface">
                      {locale === "es" ? "Subir imagen de repuesto" : "Upload High-Res Part Image"}
                    </p>
                    <p className="text-[10px] text-stone-400 mt-1">PNG, JPG up to 10MB</p>
                  </>
                )}
              </label>

              {/* Three Mock Image Preview Thumbnails */}
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="aspect-square bg-surface border border-outline-variant flex items-center justify-center text-stone-300 select-none">
                  <span className="material-symbols-outlined">image</span>
                </div>
                <div className="aspect-square bg-surface border border-outline-variant flex items-center justify-center text-stone-300 select-none">
                  <span className="material-symbols-outlined">image</span>
                </div>
                <div className="aspect-square bg-surface border border-outline-variant flex items-center justify-center text-stone-300 select-none">
                  <span className="material-symbols-outlined">image</span>
                </div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-primary-container text-on-primary-container py-4 font-black uppercase tracking-[0.2em] shadow-lg shadow-primary-container/10 hover:translate-y-[-2px] transition-all disabled:opacity-60 active:translate-y-[0px]"
              >
                {submitting
                  ? locale === "es"
                    ? "PROCESANDO..."
                    : "SUBMITTING..."
                  : editingId
                    ? locale === "es"
                      ? "ACTUALIZAR EN CATÁLOGO"
                      : "UPDATE CATALOG"
                    : locale === "es"
                      ? "SUBIR AL CATÁLOGO"
                      : "COMMIT TO CATALOG"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full bg-white border border-outline-variant/60 py-4 font-black uppercase tracking-[0.2em] text-on-surface hover:bg-stone-50 transition-all"
                >
                  {locale === "es" ? "CANCELAR EDICIÓN" : "CANCEL EDIT"}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Existing Products Listing */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-b-2 border-on-surface pb-4">
            <h3 className="font-headline text-xl font-black uppercase">
              {locale === "es" ? "Catálogo en Vivo" : "Live Inventory Catalog"}
            </h3>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-secondary">
                <span>
                  {locale === "es"
                    ? `Mostrando ${filteredProducts.length} repuestos`
                    : `Showing ${filteredProducts.length} items`}
                </span>
              </div>
              <button
                type="button"
                onClick={fetchProducts}
                className="material-symbols-outlined p-2 bg-surface-container-high hover:bg-primary hover:text-white transition-colors"
                title={locale === "es" ? "Recargar catálogo" : "Refresh catalog"}
              >
                refresh
              </button>
            </div>
          </div>

          {/* List Loader / Empty State / Listing Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-pulse">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-surface-container h-80 rounded-DEFAULT"></div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white border border-outline-variant/10 p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-stone-300">inventory</span>
              <p className="text-secondary text-sm font-semibold mt-2">
                {locale === "es"
                  ? "No se encontraron repuestos en el catálogo."
                  : "No inventory parts found in catalog."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p._id}
                  id={p._id}
                  title={p.name}
                  model={p.sku}
                  price={p.price}
                  image={p.images?.[0] || "/placeholder-product.png"}
                  inStock={p.status === "IN STOCK"}
                  dict={dict.catalog || {}}
                  locale={locale}
                  isAdminMode={true}
                  stockUnits={p.quantity ?? 0}
                  categoryName={p.category}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Fixed bottom Statistics overlay bar */}
      <footer className="fixed bottom-0 right-0 w-[calc(100%-16rem)] bg-on-surface text-white py-3 px-8 flex justify-between items-center z-20 select-none shadow-2xl">
        <div className="flex gap-8 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-primary uppercase tracking-tighter">
              {locale === "es" ? "CÓDIGOS DE PARTE TOTALES:" : "TOTAL SKU COUNT:"}
            </span>
            <span className="font-mono text-sm font-bold">{totalSkuCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-primary uppercase tracking-tighter">
              {locale === "es" ? "UNIDADES EN STOCK:" : "TOTAL UNITS STOCK:"}
            </span>
            <span className="font-mono text-sm font-bold">{totalStockCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-primary uppercase tracking-tighter">
              {locale === "es" ? "VALOR TOTAL:" : "CATALOG VALUE:"}
            </span>
            <span className="font-mono text-sm font-bold text-amber-400">
              {formattedTotalValue}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">
            {locale === "es" ? `Sincronizado: ${lastSynced}` : `Last synced: ${lastSynced}`}
          </p>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      </footer>
    </main>
  );
}
