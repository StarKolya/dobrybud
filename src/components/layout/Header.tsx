"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONTACT_EMAIL, CONTACT_TELEGRAM_URL, CONTACT_VIBER_URL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF, ROUTES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import Image from "next/image";

interface HeaderProps {
  variant?: "transparent" | "solid";
  onCtaClick?: () => void;
  sticky?: boolean;
}

export function Header({ variant = "transparent", onCtaClick, sticky = false }: HeaderProps) {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: ROUTES.prices, label: t("prices") },
    { href: ROUTES.projects, label: t("projects") },
    { href: ROUTES.about, label: t("about") },
  ];

  const isSolid = variant === "solid";
  const positionClass = isSolid
    ? sticky
      ? "sticky top-0 bg-background"
      : "relative"
    : "absolute inset-x-0 top-0";
  const textClass = isSolid ? "text-brand-dark" : "text-white";
  const iconVariant = isSolid ? "black" : "white";
  const paddingClass = isSolid
    ? "desktop:px-[max(70px,calc((100%-1300px)/2))]"
    : "desktop:px-17.5";

  return (
    <header
      className={`${positionClass} z-40 flex items-center justify-between px-5 pt-5.25 pb-5 tablet:py-5 ${paddingClass} desktop:py-6`}
    >
      <div className="flex items-center gap-24">
        <Link href={ROUTES.home} className={`font-heading text-[20px] font-semibold ${textClass}`}>
          <Image
            src={isSolid ? "/images/logos/red.svg" : "/images/logos/white.svg"}
            alt="Dobrybud logo"
            width={107}
            height={48}
            className="h-9 w-20 tablet:h-11 tablet:w-24 desktop:h-13.5 desktop:w-30"
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

      <div className="flex items-center gap-3 tablet:gap-10">

        <Link href={`tel:${CONTACT_PHONE_HREF}`} className={`text-[22px] hidden desktop:inline-flex ${textClass}`}>
          {CONTACT_PHONE_DISPLAY}
        </Link>

        <div className="items-center gap-2.25 flex">
          <Link href={CONTACT_TELEGRAM_URL} className={`text-[22px] ${textClass}`}>
            <Image
              src={`/icons/socials/${iconVariant}/telegram.svg`}
              alt="tg"
              width={28}
              height={28}
              className="h-auto w-auto"
            />
          </Link>
          <Link href={CONTACT_VIBER_URL} className={`text-[22px] ${textClass}`}>
            <Image
              src={`/icons/socials/${iconVariant}/viber.svg`}
              alt="viber"
              width={28}
              height={28}
              className="h-auto w-auto"
            />
          </Link>
          <Link href={`tel:${CONTACT_PHONE_HREF}`} className={`text-[22px] desktop:hidden ${textClass}`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.3061 14.7614 16.1192 14.7528 15.9406 14.7953C15.762 14.8377 15.599 14.9294 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </div>

        <LanguageSwitcher className={`hidden tablet:block ${textClass}`} />

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-red text-white transition-colors hover:bg-brand-dark tablet:hidden"
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

          <div className="mt-10 grid grid-cols-[8.5rem_1fr] gap-3 border-b border-brand-dark/10 pb-6">
            <p className="text-[14px] font-normal break-words uppercase tracking-wide text-brand-dark/70">
              {t("navigationTitle")}
            </p>
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[25px] font-normal text-brand-dark transition-colors hover:text-brand-red"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-[8.5rem_1fr] gap-3 border-b border-brand-dark/10 py-6">
            <p className="text-[14px] font-normal break-words uppercase tracking-wide text-brand-dark/70">
              {tFooter("contactsTitle")}
            </p>
            <div className="min-w-0">
              <Link
              href={`tel:${CONTACT_PHONE_HREF}`}
              className="text-[25px] font-normal text-brand-dark transition-colors hover:text-brand-red"
            >
              {CONTACT_PHONE_DISPLAY}
            </Link> <br />
            <Link
              href={`mailto:${CONTACT_EMAIL}`}
              className="break-all text-[25px] font-normal text-brand-dark transition-colors hover:text-brand-red"
            >
              {CONTACT_EMAIL}
            </Link>
            </div>
          
          </div>

          <div className="grid grid-cols-[8.5rem_1fr] gap-3 py-6">
            <p className="text-[14px] font-normal break-words uppercase tracking-wide text-brand-dark/70">
              {t("writeTitle")}
            </p>
            <div className="flex items-center gap-3">
              <Link
                href={CONTACT_TELEGRAM_URL}
              >
                <Image src="/icons/socials/black/telegram.svg" alt="Telegram" width={45} height={45} />
              </Link>
              <Link
                href={CONTACT_VIBER_URL}              >
                <Image src="/icons/socials/black/viber.svg" alt="Viber" width={45} height={45} />
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
