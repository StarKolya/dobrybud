import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { ProjectsView } from "@/components/sections/projects/ProjectsView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "/projects", "projects");
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsView />;
}
