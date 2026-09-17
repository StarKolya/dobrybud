"use client";

import type { ComponentPropsWithoutRef } from "react";

export function PhoneInput({ className = "", ...props }: ComponentPropsWithoutRef<"input">) {
  return (
    <div className={`flex items-center gap-2 rounded-lg bg-brand-gray px-4 py-3 ${className}`}>
      <span aria-hidden className="text-lg leading-none">
        🇺🇦
      </span>
      <span className="text-sm font-normal text-[#5c5c5c]">+380</span>
      <input
        type="tel"
        className="flex-1 bg-transparent text-sm font-normal text-[#5c5c5c] outline-none placeholder:text-[#5c5c5c]"
        {...props}
      />
    </div>
  );
}
