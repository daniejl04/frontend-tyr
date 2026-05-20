import React from "react";
import InfoRow from "@/app/components/InfoRow";
import type { SessionUser } from "@/types/session";
import type { UserProfile } from "@/types/user";

export type ProfileLabels = {
  userId: string;
  username: string;
  lastname: string;
  email: string;
  phone: string;
  location: string;
  joinedDate: string;
  role: string;
  permissions: string;
  sessionExpires: string;
  noEmail: string;
  nonePermissions: string;
  none: string;
};

export default function ProfileSummaryCard({
  session,
  user,
  labels,
  locale,
}: {
  session: SessionUser;
  user?: UserProfile | null;
  labels: ProfileLabels;
  locale: string;
}) {
  const expiresLabel = new Date(session.expiresAt * 1000).toLocaleString(
    locale === "es" ? "es-CO" : "en-US",
    { dateStyle: "medium", timeStyle: "short" }
  );

  const permDisplay =
    session.permissions.length > 0
      ? session.permissions.join(", ")
      : labels.nonePermissions;

  const joinedLabel = user
    ? new Date(user.createdAt).toLocaleDateString(
        locale === "es" ? "es-CO" : "en-US",
        { dateStyle: "long" }
      )
    : "";

  const displayName = user
    ? `${user.username} ${user.lastname}`
    : session.username;

  const displayRole = user ? user.role : session.role;

  // Initials for avatar fallback
  const initials = user
    ? `${user.username.charAt(0)}${user.lastname.charAt(0)}`.toUpperCase()
    : session.username.charAt(0).toUpperCase();

  return (
    <div className="bg-white border border-outline-variant/10 p-8 md:p-10 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-8 border-b border-outline-variant/10 mb-2">
        {user?.photoUrl ? (
          <img
            src={user.photoUrl}
            alt={displayName}
            className="w-20 h-20 rounded-full object-cover border-4 border-outline-variant/10 shadow-sm shrink-0"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-primary/80 flex items-center justify-center shrink-0 border-4 border-outline-variant/10 text-white font-headline font-black text-2xl shadow-inner">
            {initials || (
              <span className="material-symbols-outlined text-4xl">person</span>
            )}
          </div>
        )}
        <div className="space-y-1">
          <h2 className="text-3xl md:text-4xl font-headline font-black uppercase tracking-tighter text-on-surface leading-none break-words max-w-md">
            {displayName}
          </h2>
           <p className="text-[10px] font-black tracking-widest text-primary uppercase">
            {labels.role}
          </p>
          <p className="text-tertiary text-[10px] font-black tracking-widest uppercase">
            {displayRole}
          </p>
        </div>
      </div>

      <div className="pt-2">
        <InfoRow label={labels.username} value={user?.username || session.username} />
        {user && <InfoRow label={labels.lastname} value={user.lastname} />}
        <InfoRow
          label={labels.email}
          value={user?.email || session.email || labels.noEmail}
        />
        {user && (
          <>
            <InfoRow
              label={labels.phone}
              value={
                user.phone.phoneNumber
                  ? `${user.phone.countryCode} ${user.phone.phoneNumber}`
                  : labels.none
              }
            />
            <InfoRow
              label={labels.location}
              value={
                user.city || user.country
                  ? `${user.city ? `${user.city}, ` : ""}${user.country}`
                  : labels.none
              }
            />
            <InfoRow label={labels.joinedDate} value={joinedLabel} />
          </>
        )}
        <InfoRow label={labels.sessionExpires} value={expiresLabel} />
      </div>
    </div>
  );
}
