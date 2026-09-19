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
    images: [1, 2, 3, 4, 5].map((n) => `/images/projects/1/${n}.jpg`),
    image: "/images/projects/1/1.jpg",
    budget: "39000 zł",
    duration: "2 місяці",
    areaSqm: 73,
    resultValue: "+50%",
    resultCaption: RESULT_CAPTION,
  },
  {
    id: "2",
    images: [1, 2, 3, 4].map((n) => `/images/projects/2/${n}.jpg`),
    image: "/images/projects/2/1.jpg",
    budget: "53000 zł",
    duration: "3 місяці",
    areaSqm: 52,
    resultValue: "+39%",
    resultCaption: RESULT_CAPTION,
  },
  {
    id: "3",
    images: [1, 2, 3, 4].map((n) => `/images/projects/3/${n}.jpg`),
    image: "/images/projects/3/1.jpg",
    budget: "39000 zł",
    duration: "2 місяці",
    areaSqm: 73,
    resultValue: "+50%",
    resultCaption: RESULT_CAPTION,
  },
  {
    id: "4",
    images: [1, 2, 3, 4].map((n) => `/images/projects/4/${n}.jpg`),
    image: "/images/projects/4/1.jpg",
    budget: "53000 zł",
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
      <div className="mx-auto max-w-[1300px]">
        <Badge className="mb-6 desktop:mb-10">{t("title")}</Badge>

        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className={index === 3 ? "hidden tablet:block" : undefined}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <Link href={ROUTES.projects} className="mx-auto mt-8 block w-[calc(100%-24px)] tablet:mx-0 tablet:inline-block tablet:w-auto">
          <Button className="w-full rounded-2xl tablet:w-auto">{priceT("viewAll")}</Button>
        </Link>
      </div>
    </section>
  );
}
