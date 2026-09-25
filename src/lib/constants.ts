export const BREAKPOINTS = {
  mobile: 390,
  desktop: 1440,
} as const;

export const SESSION_STORAGE_KEYS = {
  exitPopupShown: "dobrybud:exit-popup-shown",
} as const;

export const ROUTES = {
  home: "/",
  prices: "/prices",
  projects: "/projects",
  about: "/about",
  thankYou: "/thank-you",
  privacy: "/privacy",
} as const;

export const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB per file
export const MAX_UPLOAD_FILES = 5;
export const MAX_UPLOAD_TOTAL_BYTES = 25 * 1024 * 1024; // 25 MB per request (email size)

export const CONTACT_PHONE_DISPLAY = "+48 883 053 614";
export const CONTACT_PHONE_HREF = "+48883053614";
export const CONTACT_EMAIL = "info@dobrybud.pl";
export const CONTACT_TELEGRAM = "dobrybud";
export const CONTACT_TELEGRAM_URL = `https://t.me/${CONTACT_TELEGRAM}`;
export const CONTACT_WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE_HREF.slice(1)}`;
