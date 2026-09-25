"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

// The first entry is the default selection.
const COUNTRIES: Country[] = [
  { code: "PL", name: "Polska", dialCode: "+48", flag: "🇵🇱" },
  { code: "UA", name: "Україна", dialCode: "+380", flag: "🇺🇦" },
  { code: "DE", name: "Deutschland", dialCode: "+49", flag: "🇩🇪" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
];

type PhoneInputProps = Omit<ComponentPropsWithoutRef<"input">, "type" | "value" | "onChange">;

export function PhoneInput({ className = "", name, required, placeholder, ...props }: PhoneInputProps) {
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center gap-2 rounded-lg bg-brand-gray px-4 py-3 ${className}`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1 text-sm font-normal text-[#5c5c5c] outline-none"
      >
        <span aria-hidden className="text-lg leading-none">
          {country.flag}
        </span>
        <span>{country.dialCode}</span>
        <span aria-hidden className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      <input
        {...props}
        type="tel"
        required={required}
        placeholder={placeholder}
        value={number}
        onChange={(event) => setNumber(event.target.value)}
        className="flex-1 bg-transparent text-sm font-normal text-[#5c5c5c] outline-none placeholder:text-[#5c5c5c]"
      />

      {name && <input type="hidden" name={name} value={`${country.dialCode}${number}`} />}

      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-[calc(100%+8px)] z-20 max-h-56 w-56 overflow-y-auto rounded-xl bg-white p-2 text-brand-dark shadow-lg"
        >
          {COUNTRIES.map((option) => (
            <button
              key={option.code}
              type="button"
              role="option"
              aria-selected={option.code === country.code}
              onClick={() => {
                setCountry(option);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-brand-gray ${
                option.code === country.code ? "font-medium text-brand-red" : ""
              }`}
            >
              <span aria-hidden className="text-base leading-none">
                {option.flag}
              </span>
              <span className="flex-1">{option.name}</span>
              <span className="text-brand-dark/40">{option.dialCode}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
