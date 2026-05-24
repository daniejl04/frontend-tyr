import React from "react";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getServerSession } from "@/lib/auth/get-session";
import { getAccessTokenFromCookies } from "@/lib/auth/session-server";
import { userService } from "@/services/user-service";
import AdminLayoutWrapper from "./AdminLayoutWrapper";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "es");
  const session = await getServerSession();

  // 1. Authenticated validation
  if (!session) {
    redirect(
      `/${locale}/auth?callbackUrl=${encodeURIComponent(`/${locale}/admin`)}`
    );
  }

  // 2. Role validation - fetch profile details from backend
  const token = await getAccessTokenFromCookies();
  let userProfile = null;

  if (token && session.userId) {
    try {
      userProfile = await userService.getProfile(session.userId, token);
    } catch (error) {
      console.error(
        "Error fetching detailed user profile from backend:",
        error
      );
    }
  }

  const role = userProfile?.role || session.role;
  const isAdmin =
    role === "admin" || role === "super_admin" || role === "super-admin";

  if (!isAdmin) {
    // Redirect standard users to catalog page
    redirect(`/${locale}/`);
  }

  // Render Section Selector wrapper (Client state will control section in AdminSidebar and AdminDashboard)
  // We can pass current locale, dict, and token cleanly
  return (
    <AdminLayoutWrapper locale={locale} dict={dict} token={token || ""} />
  );
}

// Inline client shell wrapper to bind active selection
// Using "use client" inside a wrapper file is easier, but since this is next.js server file,
// we must implement a client component or import one.
// Let's create a small client layout component in a separate client wrapper to keep next.js clean!
// Wait! Let's write the AdminLayoutWrapper client component directly inside the same file by using
// a client component file, or importing one.
// Actually, next.js allows client components in separate files.
// Let's implement the wrapper client component in a new file, or we can make AdminPage return
// a small client component imported from the components directory, or put a separate file app/[locale]/admin/AdminLayoutWrapper.tsx!
// A separate file is super clean and respects the separation of concerns.
// Let's call the wrapper "AdminLayoutWrapper.tsx" inside app/[locale]/admin/AdminLayoutWrapper.tsx!
