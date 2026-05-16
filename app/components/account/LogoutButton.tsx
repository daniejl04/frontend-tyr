"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton({
  locale,
  label,
  loggingOutLabel,
}: {
  locale: string;
  label: string;
  loggingOutLabel: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });
      router.push(`/${locale}`);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="w-full bg-on-background text-white py-4 text-xs font-black uppercase tracking-[0.2em] hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
    >
      <span className="material-symbols-outlined text-base">logout</span>
      {loading ? loggingOutLabel : label}
    </button>
  );
}
