import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ua", "pl", "ru"],
  defaultLocale: "ua",
});

export type Locale = (typeof routing.locales)[number];
