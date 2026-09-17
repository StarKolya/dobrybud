"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF, ROUTES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import Image from "next/image";

interface HeaderProps {
  variant?: "transparent" | "solid";
  onCtaClick?: () => void;
}

export function Header({ variant = "transparent", onCtaClick }: HeaderProps) {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: ROUTES.prices, label: t("prices") },
    { href: ROUTES.projects, label: t("projects") },
    { href: ROUTES.about, label: t("about") },
  ];

  const isSolid = variant === "solid";
  const positionClass = isSolid ? "relative" : "absolute inset-x-0 top-0";
  const textClass = isSolid ? "text-brand-dark" : "text-white";
  const iconVariant = isSolid ? "black" : "white";

  return (
    <header
      className={`${positionClass} z-40 flex items-center justify-between px-5 pt-5.25 pb-5 tablet:py-5 desktop:px-17.5 desktop:py-8.75`}
    >
      <div className="flex items-center gap-24">
        <Link href={ROUTES.home} className={`font-heading text-[20px] font-semibold ${textClass}`}>
          <Image
            src="/images/logos/white.svg"
            alt="Dobrybud logo"
            width={120}
            height={24}
            className="h-9 w-20 tablet:h-6 tablet:w-30"
          />
        </Link>

        <nav className="hidden items-center gap-8 tablet:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[20px] font-medium transition-colors hover:text-brand-red ${textClass}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-10">

        <Link href="tel:+380666666666" className="text-[22px] hidden desktop:inline-flex text-white">
          +38 066 666 66 66
        </Link>

        <div className="items-center gap-2.25 flex">
          <Link href="https://t.me/dobrybud" className="text-[22px] text-white">
            <Image
              src="/icons/socials/white/telegram.svg"
              alt="tg"
              width={28}
              height={28}
              className="h-auto w-auto"
            />
          </Link>
          <Link href="viber://chat?number=%2B380666666666" className="text-[22px] text-white">
            <Image
              src="/icons/socials/white/viber.svg"
              alt="viber"
              width={28}
              height={28}
              className="h-auto w-auto"
            />
          </Link>
          <Link href="tel:+380666666666" className="text-[22px] text-white desktop:hidden">
            <Image
                src="/icons/phone-white.svg"
                alt="phone"
                width={28}
                height={28}
                className="h-auto w-auto"
              />
          </Link>
        </div>

        <LanguageSwitcher className={`hidden tablet:block ${textClass}`} />

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className={`flex h-10 w-10 items-center justify-center tablet:hidden ${textClass}`}
        >
          <span className="sr-only">Menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="h-6 w-6">
            <path
              d="M3 6H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={`origin-center transition-transform ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <path
              d="M3 12H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={`transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <path
              d="M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={`origin-center transition-transform ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="animate-menu-in fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white px-5 pt-5.25 pb-8 tablet:hidden">
          <div className="flex items-center justify-between">
            <Link href={ROUTES.home} onClick={() => setMenuOpen(false)}>
              <Image src="/images/logos/red.svg" alt="Dobrybud logo" width={107} height={48} className="h-9 w-20" />
            </Link>

            <div className="flex items-center gap-3">
              <LanguageSwitcher className="text-brand-dark" />

              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-red text-white transition-colors hover:bg-brand-dark"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path
                    d="M1 1l16 16M17 1 1 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-b border-brand-dark/10 pb-6">
            <p className="text-xs font-medium uppercase tracking-wide text-brand-dark/40">
              {t("navigationTitle")}
            </p>
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-medium text-brand-dark transition-colors hover:text-brand-red"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3 border-b border-brand-dark/10 py-6">
            <p className="text-xs font-medium uppercase tracking-wide text-brand-dark/40">
              {tFooter("contactsTitle")}
            </p>
            <Link
              href={`tel:${CONTACT_PHONE_HREF}`}
              className="text-2xl font-medium text-brand-dark transition-colors hover:text-brand-red"
            >
              {CONTACT_PHONE_DISPLAY}
            </Link>
            <Link
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-2xl font-medium text-brand-dark transition-colors hover:text-brand-red"
            >
              {CONTACT_EMAIL}
            </Link>
          </div>

          <div className="flex flex-col gap-3 py-6">
            <p className="text-xs font-medium uppercase tracking-wide text-brand-dark/40">
              {t("writeTitle")}
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="https://t.me/dobrybud"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-dark transition-colors hover:bg-brand-red"
              >
                <Image src="/icons/socials/white/telegram.svg" alt="Telegram" width={20} height={20} />
              </Link>
              <Link
                href={`viber://chat?number=%2B${CONTACT_PHONE_HREF.slice(1)}`}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-dark transition-colors hover:bg-brand-red"
              >
                <Image src="/icons/socials/white/viber.svg" alt="Viber" width={20} height={20} />
              </Link>
            </div>
          </div>

          <Button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onCtaClick?.();
            }}
            className="mt-auto w-full"
          >
            {tFooter("cta")}
          </Button>
        </div>
      )}
    </header>
  );
}
