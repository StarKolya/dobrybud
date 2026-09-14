import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AboutView } from "@/components/sections/about/AboutView";

export const metadata: Metadata = {
  title: "Про нас — Dobrybud",
  description: "Як ми працюємо: консультація, кошторис, договір і супровід ремонту.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutView />;
}
