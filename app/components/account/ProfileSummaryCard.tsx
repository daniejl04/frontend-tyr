import React from "react";
import InfoRow from "@/app/components/InfoRow";
import type { SessionUser } from "@/types/session";

export type ProfileLabels = {
  userId: string;
  username: string;
  email: string;
  role: string;
  permissions: string;
  sessionExpires: string;
  noEmail: string;
  nonePermissions: string;
};

export default function ProfileSummaryCard({
  session,
  labels,
  locale,
}: {
  session: SessionUser;
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

  return (
    <div className="bg-white border border-outline-variant/10 p-8 md:p-10 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-8 border-b border-outline-variant/10 mb-2">
        <div className="w-20 h-20 rounded-full bg-primary-container flex items-center justify-center shrink-0 border-4 border-outline-variant/10">
          <span className="material-symbols-outlined text-4xl text-on-primary-container">
            person
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-black tracking-widest text-primary uppercase">
            {labels.role}
          </p>
          <h2 className="text-3xl md:text-4xl font-headline font-black uppercase tracking-tighter text-on-surface leading-none">
            {session.username}
          </h2>
          <p className="text-tertiary text-[10px] font-black tracking-widest uppercase">
            {session.role}
          </p>
        </div>
      </div>

      <div className="pt-2">
        <InfoRow label={labels.userId} value={session.userId} />
        <InfoRow label={labels.username} value={session.username} />
        <InfoRow
          label={labels.email}
          value={session.email ?? labels.noEmail}
        />
        <InfoRow label={labels.permissions} value={permDisplay} />
        <InfoRow label={labels.sessionExpires} value={expiresLabel} />
      </div>
    </div>
  );
}
