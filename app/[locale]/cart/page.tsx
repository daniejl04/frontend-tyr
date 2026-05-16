import React from "react";
import Navbar from "../../components/Navbar";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import CartPageView from "./CartPageView";

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "es");

  return (
    <>
      <Navbar dict={dict.navbar} />
      <CartPageView dict={dict} locale={locale} />
    </>
  );
}
