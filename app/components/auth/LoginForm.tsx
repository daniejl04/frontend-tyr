"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/config";
import { sanitizeInternalCallbackUrl } from "@/lib/auth/callback-url";
import OtpModal from "./OtpModal";

function apiErrorMessage(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const rec = data as { message?: unknown };
  const m = rec.message;
  if (typeof m === "string") return m;
  if (Array.isArray(m))
    return m.filter((x) => typeof x === "string").join(", ");
  return "";
}

const inputClass =
  "w-full bg-surface-container-low border-none pl-12 pr-4 py-4 text-xs font-bold focus:ring-1 focus:ring-primary outline-none";

export default function LoginForm({
  locale,
  dict,
}: {
  locale: string;
  dict: Record<string, string>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawCb = searchParams.get("callbackUrl");
  const safeCb = sanitizeInternalCallbackUrl(rawCb, locale);
  const hasRedirect =
    typeof rawCb === "string" &&
    rawCb.trim().length > 0 &&
    safeCb !== `/${locale}`;

  const registerHref =
    hasRedirect
      ? `/${locale}/auth/register?callbackUrl=${encodeURIComponent(safeCb)}`
      : `/${locale}/auth/register`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [otpOpen, setOtpOpen] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");

  const redirectAfterAuth = () => {
    router.push(safeCb);
    router.refresh();
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setFormError(dict.requiredField);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      const data: unknown = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFormError(apiErrorMessage(data) || dict.networkError);
        return;
      }

      setOtpEmail(trimmedEmail);
      setOtpOpen(true);
    } catch {
      setFormError(dict.networkError);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setFormError(null);
    setGoogleLoading(true);
    try {
      const auth = getFirebaseAuth();
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({ idToken }),
      });

      const data: unknown = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 401) {
          const fbUser = result.user;
          const parts = (fbUser.displayName ?? "").split(" ");
          const prefill = new URLSearchParams();
          if (fbUser.email) prefill.set("prefillEmail", fbUser.email);
          if (parts[0]) prefill.set("prefillName", parts[0]);
          if (parts.length > 1) prefill.set("prefillLastname", parts.slice(1).join(" "));
          if (fbUser.photoURL) prefill.set("prefillPhoto", fbUser.photoURL);

          const cbParam = hasRedirect ? `&callbackUrl=${encodeURIComponent(safeCb)}` : "";
          router.push(`/${locale}/auth/register?${prefill.toString()}${cbParam}`);
          return;
        }
        setFormError(apiErrorMessage(data) || dict.googleError);
        return;
      }

      redirectAfterAuth();
    } catch (err) {
      const code =
        err && typeof err === "object" && "code" in err
          ? (err as { code: string }).code
          : "";
      if (code === "auth/popup-closed-by-user") return;
      setFormError(dict.googleError || dict.networkError);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-12">
        <div className="space-y-4 text-center lg:text-left">
          <h1 className="text-4xl font-headline font-black tracking-tighter uppercase leading-none">
            {dict.loginTitle}
          </h1>
          <p className="text-tertiary text-sm font-body font-medium leading-relaxed max-w-xs mx-auto lg:mx-0">
            {dict.loginSubtitle}
          </p>
          {hasRedirect && (
            <p className="text-xs text-primary font-bold uppercase tracking-wide border border-primary/25 bg-primary/5 px-4 py-3 max-w-md mx-auto lg:mx-0">
              {dict.callbackHint}
            </p>
          )}
        </div>

        <div className="space-y-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || submitting}
            className="w-full border border-outline-variant/30 py-4 flex items-center justify-center gap-4 text-xs font-black uppercase tracking-widest hover:bg-surface-container transition-all disabled:opacity-60"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            {googleLoading ? dict.authenticating : dict.googleSignIn}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-outline-variant/30"></span>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-4 text-tertiary font-black tracking-widest">
                {dict.orEmail}
              </span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleEmailLogin} noValidate>
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-widest uppercase text-tertiary">
                {dict.corporateEmail}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-3 text-tertiary text-lg">
                  mail
                </span>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black tracking-widest uppercase text-tertiary">
                  {dict.securityKey}
                </label>
                <button
                  type="button"
                  className="text-[8px] font-black tracking-widest uppercase text-tertiary hover:text-primary underline"
                >
                  {dict.forgot}
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-3 text-tertiary text-lg">
                  lock
                </span>
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 border-2 border-outline rounded-sm checked:bg-primary"
              />
              <span className="text-[10px] font-black tracking-widest uppercase text-tertiary">
                {dict.keepSession}
              </span>
            </div>

            {formError && (
              <p className="text-error text-xs font-bold uppercase tracking-wide">
                {formError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || googleLoading}
              className="w-full bg-primary-container text-on-primary-container py-5 text-xs font-black uppercase tracking-[0.2em] hover:bg-primary-fixed-dim transition-all disabled:opacity-60"
            >
              {submitting ? dict.authenticating : dict.authenticate}
            </button>
          </form>
        </div>

        <div className="text-center space-y-8">
          <p className="text-[10px] font-black tracking-widest uppercase text-tertiary">
            {dict.newPartner}{" "}
            <Link
              href={registerHref}
              className="text-on-surface hover:text-primary transition-colors border-b border-outline-variant"
            >
              {dict.requestRegistration}
            </Link>
          </p>

          <div className="flex justify-center gap-8 pt-4 grayscale opacity-50">
            <div className="flex items-center gap-2 text-[8px] font-black tracking-widest uppercase">
              <span className="material-symbols-outlined text-sm">
                verified_user
              </span>
              {dict.sslEncrypted}
            </div>
            <div className="flex items-center gap-2 text-[8px] font-black tracking-widest uppercase">
              <span className="material-symbols-outlined text-sm">
                security
              </span>
              {dict.enterpriseGrade}
            </div>
          </div>
        </div>
      </div>

      <OtpModal
        email={otpEmail}
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerified={() => {
          setOtpOpen(false);
          redirectAfterAuth();
        }}
        dict={dict}
      />
    </>
  );
}
