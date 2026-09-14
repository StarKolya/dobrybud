import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ProjectsView } from "@/components/sections/projects/ProjectsView";

export const metadata: Metadata = {
  title: "Реалізовані проєкти — Dobrybud",
  description: "Галерея завершених ремонтів: до/після, бюджет, терміни та площа.",
};

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsView />;
}
