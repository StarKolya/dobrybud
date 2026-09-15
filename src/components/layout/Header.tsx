import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import Image from "next/image";

interface HeaderProps {
  variant?: "transparent" | "solid";
  onCtaClick?: () => void;
}

export function Header({ variant = "transparent", onCtaClick }: HeaderProps) {
  const t = useTranslations("nav");

  const links = [
    { href: ROUTES.prices, label: t("prices") },
    { href: ROUTES.projects, label: t("projects") },
    { href: ROUTES.about, label: t("about") },
  ];

  const isSolid = variant === "solid";
  const positionClass = isSolid ? "relative" : "absolute inset-x-0 top-0";
  const textClass = isSolid ? "text-brand-dark" : "text-white";

  return (
    <header
      className={`${positionClass} z-40 flex items-center justify-between px-5 py-5 desktop:px-17.5 desktop:py-8.75`}
    >
      <div className="flex items-center gap-24">
        <Link href={ROUTES.home} className={`font-heading text-[20px] font-semibold ${textClass}`}>
          <Image
            src="/images/logos/white.svg"
            alt="Dobrybud logo"
            width={120}
            height={24}
            className="h-auto w-auto"
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
                src="/icons/phone.svg"
                alt="phone"
                width={28}
                height={28}
                className="h-auto w-auto"
              />
          </Link>
        </div>

        <LanguageSwitcher className={textClass} />

        <button
          type="button"
          aria-label="Menu"
          className={`flex h-10 w-10 items-center justify-center tablet:hidden ${textClass}`}
        >
          <span className="sr-only">Menu</span>
        </button>
      </div>
    </header>
  );
}
