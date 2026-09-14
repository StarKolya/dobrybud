import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HomeView } from "@/components/sections/home/HomeView";

export const metadata: Metadata = {
  title: "Dobrybud — ремонт квартир під ключ у Польщі",
  description:
    "Ремонт квартир під ключ: дизайн-проєкт, кошторис без прихованих витрат, договір і контроль на кожному етапі.",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col">
      <HomeView />
    </main>
  );
}
