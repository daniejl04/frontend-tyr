"use client";

import React, { useCallback, useState } from "react";
import Script from "next/script";
import type { CartItem } from "@/types/cart";
import type { EpaycoCheckoutData } from "@/types/epayco";

function buildDescription(items: CartItem[], maxLen = 240): string {
  const parts = items.map((i) => `${i.name} ×${i.quantity}`);
  const joined = parts.join(" · ");
  return joined.length > maxLen ? `${joined.slice(0, maxLen - 1)}…` : joined;
}

function invoiceId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `TYR-${crypto.randomUUID().slice(0, 12)}`;
  }
  return `TYR-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function EpaycoCheckoutButton({
  items,
  subtotal,
  tax,
  total,
  locale,
  bundleName,
  label,
  loadingLabel,
  notConfiguredLabel,
  scriptErrorLabel,
}: {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  locale: string;
  bundleName: string;
  label: string;
  loadingLabel: string;
  notConfiguredLabel: string;
  scriptErrorLabel: string;
}) {
  const [scriptReady, setScriptReady] = useState(false);
  const [busy, setBusy] = useState(false);

  const publicKey = process.env.NEXT_PUBLIC_EPAYCO_PUBLIC_KEY || "";
  const testMode =
    process.env.NEXT_PUBLIC_EPAYCO_TEST === "true" ||
    (process.env.NEXT_PUBLIC_EPAYCO_TEST !== "false" &&
      process.env.NODE_ENV === "development");
  const currency = process.env.NEXT_PUBLIC_EPAYCO_CURRENCY || "cop";
  const country = process.env.NEXT_PUBLIC_EPAYCO_COUNTRY || "co";
  const confirmation =
    process.env.NEXT_PUBLIC_EPAYCO_CONFIRMATION_URL?.trim() || "";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "";

  const openCheckout = useCallback(() => {
    if (!publicKey) return;
    const api = window.ePayco?.checkout;
    if (!api) {
      window.alert(scriptErrorLabel);
      return;
    }

    const origin =
      appUrl ||
      (typeof window !== "undefined" ? window.location.origin : "") ||
      "";
    const response = `${origin}/${locale}/payment/response`;

    const taxBase = Math.max(0, subtotal);
    const taxVal = Math.max(0, tax);
    const amount = Math.max(0, total);

    const data: EpaycoCheckoutData = {
      name:
        items.length === 1
          ? items[0].name.slice(0, 120)
          : bundleName.slice(0, 120),
      description: buildDescription(items),
      invoice: invoiceId(),
      currency: currency.toLowerCase(),
      amount: amount.toString(),
      tax_base: taxBase.toString(),
      tax: taxVal.toString(),
      country: country.toLowerCase(),
      lang: locale === "en" ? "en" : "es",
      external: "false",
      confirmation,
      response,
    };

    setBusy(true);
    try {
      const handler = api.configure({
        key: publicKey,
        test: testMode,
      });
      handler.open(data);
    } finally {
      setBusy(false);
    }
  }, [
    publicKey,
    testMode,
    currency,
    country,
    confirmation,
    appUrl,
    locale,
    items,
    subtotal,
    tax,
    total,
    scriptErrorLabel,
    bundleName,
  ]);

  if (!publicKey) {
    return (
      <p className="text-[10px] font-bold uppercase tracking-wide text-tertiary text-center">
        {notConfiguredLabel}
      </p>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.epayco.co/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onError={() => setScriptReady(false)}
      />
      <button
        type="button"
        disabled={!scriptReady || busy}
        onClick={openCheckout}
        className="w-full bg-primary-container text-on-primary-container py-5 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-primary-fixed-dim transition-all group disabled:opacity-60"
      >
        {busy || !scriptReady ? loadingLabel : label}
        <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
          arrow_forward
        </span>
      </button>
    </>
  );
}
