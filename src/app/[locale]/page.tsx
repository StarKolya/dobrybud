import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, businessJsonLd, faqJsonLd } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomeView } from "@/components/sections/home/HomeView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "/", "home");
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [tMeta, tFaq] = await Promise.all([
    getTranslations({ locale, namespace: "meta.home" }),
    getTranslations({ locale, namespace: "home.faq" }),
  ]);
  const faqItems = tFaq.raw("items") as { question: string; answer: string }[];

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={businessJsonLd(tMeta("description"))} />
      <JsonLd data={faqJsonLd(faqItems)} />
      <HomeView />
    </main>
  );
}
