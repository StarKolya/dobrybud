import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { ROUTES } from "@/lib/constants";
import { SITE_URL, languageAlternates, localizedPath } from "@/lib/seo";

const PATHS = [ROUTES.home, ROUTES.prices, ROUTES.projects, ROUTES.about, ROUTES.privacy];

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = (path: string) =>
    Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([k, v]) => [
        k,
        `${SITE_URL}${v}`,
      ]),
    );

  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}${localizedPath(locale, path)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === ROUTES.home ? 1 : path === ROUTES.privacy ? 0.3 : 0.8,
      alternates: { languages: languages(path) },
    })),
  );
}
