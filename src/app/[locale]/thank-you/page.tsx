import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/constants";
import { LeadEvent } from "@/components/analytics/LeadEvent";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Дякуємо за заявку! — Dobrybud",
  description: "Заявку прийнято, наш менеджер зв'яжеться з вами найближчим часом.",
};

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("thankYou");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <LeadEvent />
      <h1 className="font-heading text-3xl font-semibold desktop:text-5xl">{t("title")}</h1>
      <p className="max-w-md text-brand-dark/60">{t("description")}</p>
      <Link href={ROUTES.home}>
        <Button>{t("backHome")}</Button>
      </Link>
    </main>
  );
}
