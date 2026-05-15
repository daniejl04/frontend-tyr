import React, { Suspense } from "react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import RegisterForm from "../../../components/auth/RegisterForm";

export default async function RegisterPage({
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
      <RegisterForm locale={locale} dict={dict.auth as Record<string, string>} />
    </Suspense>
  );
}
