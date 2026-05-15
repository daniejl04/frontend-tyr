import React from "react";

export default function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 border-b border-outline-variant/10 py-4 last:border-b-0">
      <span className="text-[10px] font-black tracking-widest text-tertiary uppercase shrink-0">
        {label}
      </span>
      <span className="text-sm font-bold text-on-surface sm:text-right break-all font-mono">
        {value}
      </span>
    </div>
  );
}
