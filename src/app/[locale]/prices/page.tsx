import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PricesView } from "@/components/sections/prices/PricesView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.prices" });
  return { title: t("title"), description: t("description") };
}

export default async function PricesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PricesView />;
}
