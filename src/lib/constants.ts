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
} as const;

export const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
