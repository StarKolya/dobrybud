import { Commissioner, Geist } from "next/font/google";

export const commissioner = Commissioner({
  variable: "--font-commissioner",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
});
