"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "./ProjectCard";
import type { ProjectCard as ProjectCardData } from "@/types";

const PROJECTS: (ProjectCardData & { images: string[] })[] = [
  {
    id: "1",
    images: ["/images/projects/project-1-1.jpg", "/images/projects/project-1-2.jpg"],
    image: "/images/projects/project-1-1.jpg",
    budget: "45 000 zł",
    duration: "6 тижнів",
    areaSqm: 52,
    result: "Стандартний ремонт",
  },
  {
    id: "2",
    images: ["/images/projects/project-2-1.jpg", "/images/projects/project-2-2.jpg"],
    image: "/images/projects/project-2-1.jpg",
    budget: "68 000 zł",
    duration: "8 тижнів",
    areaSqm: 74,
    result: "Дизайн-ремонт",
  },
  {
    id: "3",
    images: ["/images/projects/project-3-1.jpg"],
    image: "/images/projects/project-3-1.jpg",
    budget: "92 000 zł",
    duration: "10 тижнів",
    areaSqm: 96,
    result: "Преміум-ремонт",
  },
  {
    id: "4",
    images: ["/images/projects/project-4-1.jpg"],
    image: "/images/projects/project-4-1.jpg",
    budget: "38 000 zł",
    duration: "5 тижнів",
    areaSqm: 41,
    result: "Стандартний ремонт",
  },
];

export function ProjectsShowcase({ onRequestQuote }: { onRequestQuote: () => void }) {
  const t = useTranslations("home.projects");

  return (
    <section className="px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-2xl font-semibold desktop:text-4xl">{t("title")}</h2>
        <Button onClick={onRequestQuote} className="hidden desktop:inline-flex">
          {t("cta")}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 desktop:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <Button onClick={onRequestQuote} className="mt-8 w-full desktop:hidden">
        {t("cta")}
      </Button>
    </section>
  );
}
