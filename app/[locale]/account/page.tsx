import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProfileSummaryCard from "../../components/account/ProfileSummaryCard";
import LogoutButton from "../../components/account/LogoutButton";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getServerSession } from "@/lib/auth/get-session";
import { getAccessTokenFromCookies } from "@/lib/auth/session-server";
import { userService } from "@/services/user-service";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "es");
  const session = await getServerSession();

  if (!session) {
    redirect(
      `/${locale}/auth?callbackUrl=${encodeURIComponent(`/${locale}/account`)}`
    );
  }

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
  const p = dict.profilePage;

  return (
    <>
      <Navbar dict={dict.navbar} />
      <main className="pt-20 bg-surface min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <header className="mb-12 space-y-4">
            <nav className="flex text-[10px] font-black tracking-widest uppercase text-tertiary/70 mb-6">
              <Link
                href={`/${locale}`}
                className="hover:text-primary transition-colors"
              >
                {dict.navbar.home}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-on-surface">{p.title}</span>
            </nav>
            <h1 className="text-5xl md:text-6xl font-headline font-black tracking-tighter uppercase leading-none text-on-surface">
              {p.title}
            </h1>
            <p className="text-[10px] font-black tracking-[0.3em] text-tertiary uppercase">
              {p.subtitle}
            </p>
          </header>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-6">
              <ProfileSummaryCard
                session={session}
                user={userProfile}
                labels={{
                  userId: p.userId,
                  username: p.username,
                  lastname: p.lastname,
                  email: p.email,
                  phone: p.phone,
                  location: p.location,
                  joinedDate: p.joinedDate,
                  role: p.role,
                  permissions: p.permissions,
                  sessionExpires: p.sessionExpires,
                  noEmail: p.noEmail,
                  nonePermissions: p.nonePermissions,
                  none: p.none,
                }}
                locale={locale}
              />
              <div className="bg-surface-container p-6 border-l-4 border-primary/30">
                <p className="text-tertiary text-xs font-medium leading-relaxed">
                  {p.securityNote}
                </p>
              </div>
            </div>

            <aside className="lg:col-span-1 space-y-6 h-fit">
              <div className="bg-surface-container-low border border-outline-variant/10 p-8 space-y-6">
                <h3 className="text-lg font-headline font-black uppercase tracking-tighter border-b-2 border-primary pb-4">
                  {p.actionsTitle}
                </h3>
                <LogoutButton
                  locale={locale}
                  label={p.logout}
                  loggingOutLabel={p.loggingOut}
                />
                {(role === "admin" ||
                  role === "super_admin" ||
                  role === "super-admin") && (
                  <Link
                    href={`/${locale}/admin`}
                    className="block text-center text-[10px] font-black tracking-widest uppercase text-primary hover:text-primary-fixed-dim transition-colors border-b border-primary hover:border-primary-fixed-dim pb-1 font-bold"
                  >
                    {p.adminPanel || "Panel de Administrador"}
                  </Link>
                )}
                <Link
                  href={`/${locale}/catalog`}
                  className="block text-center text-[10px] font-black tracking-widest uppercase text-tertiary hover:text-primary transition-colors border-b border-outline-variant hover:border-primary pb-1"
                >
                  {dict.cart.continue}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}
