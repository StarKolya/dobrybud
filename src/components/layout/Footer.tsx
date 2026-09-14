import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-brand-dark px-6 py-10 text-white desktop:px-16">
      <p className="text-sm text-white/60">
        © {new Date().getFullYear()} Dobrybud. {t("rights")}.
      </p>
    </footer>
  );
}
