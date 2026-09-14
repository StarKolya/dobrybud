import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/sections/home/ProjectCard";
import type { ProjectCard as ProjectCardData } from "@/types";

const PROJECTS: (ProjectCardData & { images: string[] })[] = [
  {
    id: "1",
    images: ["/images/projects/project-1-1.jpg"],
    image: "/images/projects/project-1-1.jpg",
    budget: "45 000 zł",
    duration: "6 тижнів",
    areaSqm: 52,
    result: "Стандартний ремонт",
  },
  {
    id: "2",
    images: ["/images/projects/project-2-1.jpg"],
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

export function ProjectsHighlight() {
  const t = useTranslations("home.projects");
  const priceT = useTranslations("prices");

  return (
    <section className="px-6 py-16 desktop:px-16 desktop:py-24">
      <h2 className="mb-10 text-2xl font-semibold desktop:text-4xl">{t("title")}</h2>

      <div className="grid grid-cols-1 gap-6 desktop:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <Link href={ROUTES.projects} className="mt-8 inline-block">
        <Button>{priceT("viewAll")}</Button>
      </Link>
    </section>
  );
}
