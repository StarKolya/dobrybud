import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/sections/home/ProjectCard";
import type { ProjectCard as ProjectCardData } from "@/types";

const PROJECTS: (ProjectCardData & { images: string[] })[] = [
  {
    id: "1",
    images: [1, 2, 3, 4, 5].map((n) => `/images/projects/1/${n}.jpg`),
    image: "/images/projects/1/1.jpg",
    budget: "39000 zł",
    durationMonths: 2,
    areaSqm: 73,
    resultValue: "+50%",
  },
  {
    id: "2",
    images: [1, 2, 3, 4].map((n) => `/images/projects/2/${n}.jpg`),
    image: "/images/projects/2/1.jpg",
    budget: "53000 zł",
    durationMonths: 3,
    areaSqm: 52,
    resultValue: "+39%",
  },
  {
    id: "3",
    images: [1, 2, 3, 4].map((n) => `/images/projects/3/${n}.jpg`),
    image: "/images/projects/3/1.jpg",
    budget: "39000 zł",
    durationMonths: 2,
    areaSqm: 73,
    resultValue: "+50%",
  },
  {
    id: "4",
    images: [1, 2, 3, 4].map((n) => `/images/projects/4/${n}.jpg`),
    image: "/images/projects/4/1.jpg",
    budget: "53000 zł",
    durationMonths: 3,
    areaSqm: 52,
    resultValue: "+39%",
  },
];

export function ProjectsHighlight({ redResult = false }: { redResult?: boolean }) {
  const t = useTranslations("home.projects");
  const priceT = useTranslations("prices");

  return (
    <section className="px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="mx-auto max-w-[1300px]">
        <Badge className="mb-6 desktop:mb-10">{t("title")}</Badge>

        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className={index === 3 ? "hidden tablet:block" : undefined}>
              <ProjectCard project={project} redResult={redResult} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href={ROUTES.projects} className="w-[calc(100%-24px)] tablet:w-auto">
            <Button className="w-full rounded-2xl tablet:w-auto tablet:px-16 desktop:px-28">
              {priceT("viewAll")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
