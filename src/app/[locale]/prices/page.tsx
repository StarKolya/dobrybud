import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PricesView } from "@/components/sections/prices/PricesView";

export const metadata: Metadata = {
  title: "Ціни та пакети ремонту — Dobrybud",
  description: "Порівняйте пакети ремонту BASIC, DESIGN та PREMIUM і оберіть свій.",
};

export default async function PricesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PricesView />;
}
