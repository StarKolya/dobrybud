import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_HREF,
  CONTACT_TELEGRAM_URL,
} from "@/lib/constants";
import { routing } from "@/i18n/routing";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dobrybud.pl"
).replace(/\/$/, "");

export const SITE_NAME = "Dobry Bud";

const OG_LOCALES: Record<string, string> = {
  ua: "uk_UA",
  pl: "pl_PL",
  ru: "ru_RU",
};

export function localizedPath(locale: string, path: string) {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function languageAlternates(path: string) {
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [
      l === "ua" ? "uk" : l,
      localizedPath(l, path),
    ]),
  );
  languages["x-default"] = localizedPath(routing.defaultLocale, path);
  return languages;
}

export async function buildMetadata(
  locale: string,
  path: string,
  namespace: "home" | "prices" | "projects" | "about",
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `meta.${namespace}` });
  const title = t("title");
  const description = t("description");
  const url = localizedPath(locale, path);

  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: OG_LOCALES[locale],
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

export function businessJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    image: `${SITE_URL}/og-image.jpg`,
    description,
    telephone: `+${CONTACT_PHONE_HREF.replace(/^\+/, "")}`,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Warszawa",
      addressCountry: "PL",
    },
    areaServed: { "@type": "City", name: "Warszawa" },
    sameAs: [CONTACT_TELEGRAM_URL],
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}
