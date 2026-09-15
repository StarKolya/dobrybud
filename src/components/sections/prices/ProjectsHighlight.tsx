import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/sections/home/ProjectCard";
import type { ProjectCard as ProjectCardData } from "@/types";

const RESULT_CAPTION = "до вартості нерухомості після ремонту";

const PROJECTS: (ProjectCardData & { images: string[] })[] = [
  {
    id: "1",
    images: ["/images/projects/project-1-1.jpg"],
    image: "/images/projects/project-1-1.jpg",
    budget: "39 000 zł",
    duration: "2 місяці",
    areaSqm: 73,
    resultValue: "+50%",
    resultCaption: RESULT_CAPTION,
  },
  {
    id: "2",
    images: ["/images/projects/project-2-1.jpg"],
    image: "/images/projects/project-2-1.jpg",
    budget: "53 000 zł",
    duration: "3 місяці",
    areaSqm: 52,
    resultValue: "+39%",
    resultCaption: RESULT_CAPTION,
  },
  {
    id: "3",
    images: ["/images/projects/project-3-1.jpg"],
    image: "/images/projects/project-3-1.jpg",
    budget: "39 000 zł",
    duration: "2 місяці",
    areaSqm: 73,
    resultValue: "+50%",
    resultCaption: RESULT_CAPTION,
  },
  {
    id: "4",
    images: ["/images/projects/project-4-1.jpg"],
    image: "/images/projects/project-4-1.jpg",
    budget: "53 000 zł",
    duration: "3 місяці",
    areaSqm: 52,
    resultValue: "+39%",
    resultCaption: RESULT_CAPTION,
  },
];

export function ProjectsHighlight() {
  const t = useTranslations("home.projects");
  const priceT = useTranslations("prices");

  return (
    <section className="px-6 py-16 desktop:px-16 desktop:py-24">
      <Badge className="mb-6 desktop:mb-10">{t("title")}</Badge>

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
