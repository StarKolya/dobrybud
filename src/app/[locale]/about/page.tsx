import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { AboutView } from "@/components/sections/about/AboutView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "/about", "about");
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutView />;
}
