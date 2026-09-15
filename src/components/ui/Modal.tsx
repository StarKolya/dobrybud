"use client";

import type { ReactNode } from "react";

export function Modal({
  open,
  onClose,
  children,
  className = "",
  maxWidthClassName = "max-w-lg",
  closeButtonClassName = "rounded-full bg-white/90 hover:bg-brand-gray",
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  maxWidthClassName?: string;
  closeButtonClassName?: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 desktop:p-6">
      <div className={`relative w-full ${maxWidthClassName} rounded-3xl bg-white ${className}`}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center ${closeButtonClassName}`}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
