"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const LOCALE_LABELS: Record<Locale, string> = {
  uk: "UA",
  ru: "RU",
  pl: "PL",
};

const DISPLAY_ORDER: Locale[] = ["uk", "ru", "pl"];

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.28453 0L8.71153 0C8.95686 0 9.15286 0.0806704 9.29953 0.242004C9.4462 0.403337 9.51953 0.592004 9.51953 0.808004C9.51953 0.87867 9.5102 0.950004 9.49153 1.022C9.47353 1.09467 9.44586 1.16634 9.40853 1.237L5.67553 7.079C5.58886 7.203 5.48953 7.29634 5.37753 7.359C5.2662 7.421 5.13986 7.452 4.99853 7.452C4.8572 7.452 4.73087 7.421 4.61953 7.359C4.5082 7.297 4.40886 7.20367 4.32153 7.079L0.588531 1.236C0.551865 1.166 0.524198 1.09467 0.505531 1.022C0.486865 0.950004 0.477531 0.87867 0.477531 0.808004C0.477531 0.59267 0.550864 0.404004 0.697531 0.242004C0.844197 0.0800037 1.03986 -0.000662568 1.28453 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSelect = (nextLocale: Locale) => {
    setOpen(false);
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  };

  const otherLocales = DISPLAY_ORDER.filter((option) => option !== locale);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <div
        className={`rounded-lg transition-colors ${
          open ? "rounded-b-none bg-brand-dark" : "hover:bg-brand-dark"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`group flex items-center gap-1.5 rounded-lg px-3 py-2 text-[16px] font-semibold transition-colors ${
            open ? "text-white" : "text-current hover:text-white"
          }`}
        >
          {LOCALE_LABELS[locale]}
          <ChevronIcon className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-50 flex w-full min-w-full flex-col rounded-b-lg bg-brand-dark"
        >
          {otherLocales.map((option) => (
            <li key={option} className="border-t border-white/15">
              <button
                type="button"
                role="option"
                aria-selected={false}
                onClick={() => handleSelect(option)}
                className="block w-full px-3 py-2 text-left text-[16px] text-white transition-colors hover:bg-white/10"
              >
                {LOCALE_LABELS[option]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
