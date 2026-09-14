import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  variant?: "transparent" | "solid";
  onCtaClick?: () => void;
}

export function Header({ variant = "transparent", onCtaClick }: HeaderProps) {
  const t = useTranslations("nav");

  const links = [
    { href: ROUTES.home, label: t("home") },
    { href: ROUTES.prices, label: t("prices") },
    { href: ROUTES.projects, label: t("projects") },
    { href: ROUTES.about, label: t("about") },
  ];

  const isSolid = variant === "solid";
  const positionClass = isSolid ? "relative" : "absolute inset-x-0 top-0";
  const textClass = isSolid ? "text-brand-dark" : "text-white";

  return (
    <header
      className={`${positionClass} z-40 flex items-center justify-between px-6 py-6 desktop:px-16`}
    >
      <Link href={ROUTES.home} className={`font-heading text-xl font-semibold ${textClass}`}>
        Dobrybud
      </Link>

      <nav className="hidden items-center gap-8 desktop:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors hover:text-brand-red ${textClass}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Button onClick={onCtaClick} className="hidden desktop:inline-flex">
        {t("cta")}
      </Button>

      <button
        type="button"
        aria-label="Menu"
        className={`flex h-10 w-10 items-center justify-center desktop:hidden ${textClass}`}
      >
        <span className="sr-only">Menu</span>
      </button>
    </header>
  );
}
