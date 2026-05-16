import type { Metadata } from "next";
import { Inter, Work_Sans } from "next/font/google";
import "../globals.css";
import { CartProvider } from "../components/Cart/CartProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Héctor Severino - Grupo Turbos y Repuestos",
  description: "Industrial leaders in turbocharger systems, supply, and specialized maintenance.",
};

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-surface text-on-surface">
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
