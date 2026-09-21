import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { PricesView } from "@/components/sections/prices/PricesView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "/prices", "prices");
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
