import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uk", "pl", "ru"],
  defaultLocale: "uk",
});

export type Locale = (typeof routing.locales)[number];
