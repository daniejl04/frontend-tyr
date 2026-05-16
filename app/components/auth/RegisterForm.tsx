"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import OtpModal from "./OtpModal";
import { sanitizeInternalCallbackUrl } from "@/lib/auth/callback-url";

function apiErrorMessage(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const rec = data as { message?: unknown };
  const m = rec.message;
  if (typeof m === "string") return m;
  if (Array.isArray(m)) return m.filter((x) => typeof x === "string").join(", ");
  return "";
}

const inputWrap =
  "w-full bg-surface-container-low border-none pl-12 pr-4 py-4 text-xs font-bold focus:ring-1 focus:ring-primary outline-none";

export default function RegisterForm({
  locale,
  dict,
}: {
  locale: string;
  dict: Record<string, string>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postAuthPath = sanitizeInternalCallbackUrl(
    searchParams.get("callbackUrl"),
    locale
  );
  const rawCallback = searchParams.get("callbackUrl");
  const authSignInHref =
    rawCallback != null && rawCallback.trim() !== ""
      ? `/${locale}/auth?callbackUrl=${encodeURIComponent(
          sanitizeInternalCallbackUrl(rawCallback, locale)
        )}`
      : `/${locale}/auth`;

  const [email, setEmail] = useState(searchParams.get("prefillEmail") ?? "");
  const [username, setUsername] = useState(searchParams.get("prefillName") ?? "");
  const [lastname, setLastname] = useState(searchParams.get("prefillLastname") ?? "");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+57");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [photoUrl, setPhotoUrl] = useState(searchParams.get("prefillPhoto") ?? "");
  const fromGoogle = searchParams.has("prefillEmail");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!termsAccepted) {
      setFormError(dict.mustAcceptTerms);
      return;
    }

    const trimmedEmail = email.trim();
    if (
      !trimmedEmail ||
      !username.trim() ||
      !lastname.trim() ||
      !password ||
      !country.trim() ||
      !city.trim()
    ) {
      setFormError(dict.requiredField);
      return;
    }

    const cc = countryCode.trim().startsWith("+")
      ? countryCode.trim()
      : `+${countryCode.trim().replace(/^\+/, "")}`;
    const pn = phoneNumber.trim().replace(/\D/g, "");
    if (!pn) {
      setFormError(dict.requiredField);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        email: trimmedEmail,
        username: username.trim(),
        lastname: lastname.trim(),
        password,
        phone: {
          countryCode: cc,
          phoneNumber: pn,
        },
        country: country.trim(),
        city: city.trim(),
        photoUrl: photoUrl.trim() || "",
        role: "user",
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const data: unknown = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFormError(apiErrorMessage(data) || dict.networkError);
        return;
      }

      const emailFromApi =
        typeof data === "object" &&
        data !== null &&
        "email" in data &&
        typeof (data as { email?: unknown }).email === "string"
          ? (data as { email: string }).email
          : trimmedEmail;

      setOtpEmail(emailFromApi);
      setOtpOpen(true);
    } catch {
      setFormError(dict.networkError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="space-y-12">
        <div className="space-y-4 text-center lg:text-left">
          <h1 className="text-4xl font-headline font-black tracking-tighter uppercase leading-none">
            {dict.registerTitle}
          </h1>
          <p className="text-tertiary text-sm font-body font-medium leading-relaxed max-w-xs mx-auto lg:mx-0">
            {dict.registerSubtitle}
          </p>
          {fromGoogle && (
            <p className="text-xs text-primary font-bold uppercase tracking-wide border border-primary/25 bg-primary/5 px-4 py-3 max-w-md mx-auto lg:mx-0">
              {dict.googlePrefillHint}
            </p>
          )}
        </div>

        <form className="space-y-5" onSubmit={handleRegister} noValidate>
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
                required
                autoComplete="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputWrap}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-widest uppercase text-tertiary">
                {dict.username}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-3 text-tertiary text-lg">
                  person
                </span>
                <input
                  type="text"
                  autoComplete="given-name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={inputWrap}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-widest uppercase text-tertiary">
                {dict.lastname}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-3 text-tertiary text-lg">
                  badge
                </span>
                <input
                  type="text"
                  autoComplete="family-name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className={inputWrap}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black tracking-widest uppercase text-tertiary">
              {dict.securityKey}
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-3 text-tertiary text-lg">
                lock
              </span>
              <input
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputWrap}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black tracking-widest uppercase text-tertiary">
              {dict.phone}
            </label>
            <div className="grid grid-cols-[minmax(0,6rem)_1fr] gap-3">
              <input
                type="text"
                inputMode="tel"
                autoComplete="tel-country-code"
                placeholder="+57"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-surface-container-low border-none px-3 py-4 text-xs font-bold focus:ring-1 focus:ring-primary outline-none"
                aria-label={dict.countryCode}
              />
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-3 text-tertiary text-lg">
                  smartphone
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="3001234567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={inputWrap}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-widest uppercase text-tertiary">
                {dict.country}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-3 text-tertiary text-lg">
                  public
                </span>
                <input
                  type="text"
                  autoComplete="country-name"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={inputWrap}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-widest uppercase text-tertiary">
                {dict.city}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-3 text-tertiary text-lg">
                  location_city
                </span>
                <input
                  type="text"
                  autoComplete="address-level2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={inputWrap}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black tracking-widest uppercase text-tertiary">
              {dict.photoUrl}
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-3 text-tertiary text-lg">
                link
              </span>
              <input
                type="url"
                placeholder="https://"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className={inputWrap}
              />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input
              id="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 border-2 border-outline rounded-sm checked:bg-primary shrink-0"
            />
            <label htmlFor="terms" className="text-[10px] font-black tracking-widest uppercase text-tertiary leading-relaxed">
              {dict.termsAgree}{" "}
              <Link href="#" className="underline text-on-surface">
                {dict.termsOfService}
              </Link>
            </label>
          </div>

          {formError && (
            <p className="text-error text-xs font-bold uppercase tracking-wide">{formError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary-container text-on-primary-container py-5 text-xs font-black uppercase tracking-[0.2em] hover:bg-primary-fixed-dim transition-all disabled:opacity-60"
          >
            {submitting ? dict.registering : dict.register}
          </button>
        </form>

        <div className="text-center space-y-8">
          <p className="text-[10px] font-black tracking-widest uppercase text-tertiary">
            {dict.alreadyPartner}{" "}
            <Link
              href={authSignInHref}
              className="text-on-surface hover:text-primary transition-colors border-b border-outline-variant"
            >
              {dict.signIn}
            </Link>
          </p>

          <div className="flex justify-center gap-8 pt-4 grayscale opacity-50">
            <div className="flex items-center gap-2 text-[8px] font-black tracking-widest uppercase">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              {dict.sslEncrypted}
            </div>
            <div className="flex items-center gap-2 text-[8px] font-black tracking-widest uppercase">
              <span className="material-symbols-outlined text-sm">security</span>
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
          router.push(postAuthPath);
          router.refresh();
        }}
        dict={dict}
      />
    </>
  );
}
