"use client";

import React, { useEffect, useState } from "react";

function apiErrorMessage(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const rec = data as { message?: unknown };
  const m = rec.message;
  if (typeof m === "string") return m;
  if (Array.isArray(m)) return m.filter((x) => typeof x === "string").join(", ");
  return "";
}

export default function OtpModal({
  email,
  open,
  onClose,
  onVerified,
  dict,
}: {
  email: string;
  open: boolean;
  onClose: () => void;
  onVerified: () => void;
  dict: Record<string, string>;
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setCode("");
      setError(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const digits = code.replace(/\D/g, "").slice(0, 6);
    if (digits.length !== 6) {
      setError(dict.otpInvalidLength);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, code: digits }),
      });
      const data: unknown = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(apiErrorMessage(data) || dict.otpError);
        return;
      }
      onVerified();
    } catch {
      setError(dict.networkError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="otp-title"
    >
      <div className="w-full max-w-md bg-white shadow-xl border border-outline-variant/10 p-8 space-y-6">
        <div className="space-y-2">
          <h2 id="otp-title" className="text-xl font-headline font-black uppercase tracking-tighter">
            {dict.otpTitle}
          </h2>
          <p className="text-tertiary text-xs font-medium leading-relaxed">
            {dict.otpSubtitle}{" "}
            <span className="text-on-surface font-bold">{email}</span>
          </p>
          <p className="text-[10px] font-black tracking-widest uppercase text-primary">
            {dict.registerSuccessHint}
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder={dict.otpPlaceholder}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="w-full bg-surface-container-low border-none px-4 py-4 text-center text-2xl font-black tracking-[0.5em] focus:ring-2 focus:ring-primary outline-none"
          />

          {error && (
            <p className="text-error text-xs font-bold uppercase tracking-wide">{error}</p>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-container text-on-primary-container py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-primary-fixed-dim transition-all disabled:opacity-60"
            >
              {loading ? dict.verifying : dict.otpVerify}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full border border-outline-variant/40 py-3 text-[10px] font-black uppercase tracking-widest text-tertiary hover:bg-surface-container transition-colors disabled:opacity-60"
            >
              {dict.otpCancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
