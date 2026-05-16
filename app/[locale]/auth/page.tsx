import React, { Suspense } from "react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import LoginForm from "../../components/auth/LoginForm";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "es");

  return (
    <Suspense
      fallback={
        <div
          className="min-h-[28rem] animate-pulse rounded-DEFAULT bg-surface-container-low"
          aria-hidden
        />
      }
    >
      <LoginForm locale={locale} dict={dict.auth as Record<string, string>} />
    </Suspense>
  );
}
