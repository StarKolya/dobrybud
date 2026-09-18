import { Commissioner, Geist, Raleway } from "next/font/google";

export const commissioner = Commissioner({
  variable: "--font-commissioner",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
});

export const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["600"],
});
