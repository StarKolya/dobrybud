import type { ReactNode } from "react";

export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-dark ${className}`}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" aria-hidden />
      {children}
    </span>
  );
}
