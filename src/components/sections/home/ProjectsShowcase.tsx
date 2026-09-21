"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";

interface ShowcaseProject {
  id: string;
  images: string[];
  budget: string;
  duration: string;
  areaSqm: number;
  resultValue: string;
  resultCaption: string;
}

const RESULT_CAPTION = "до вартості нерухомості після ремонту";

const PROJECTS: ShowcaseProject[] = [
  {
    id: "1",
    images: ["/images/projects/1/1.jpg"],
    budget: "39000 zł",
    duration: "2 місяці",
    areaSqm: 73,
    resultValue: "+50%",
    resultCaption: RESULT_CAPTION,
  },
  {
    id: "2",
    images: ["/images/projects/2/1.jpg"],
    budget: "53000 zł",
    duration: "3 місяці",
    areaSqm: 52,
    resultValue: "+39%",
    resultCaption: RESULT_CAPTION,
  },
  {
    id: "3",
    images: ["/images/projects/3/1.jpg"],
    budget: "39000 zł",
    duration: "2 місяці",
    areaSqm: 73,
    resultValue: "+50%",
    resultCaption: RESULT_CAPTION,
  },

];

function NavButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isNext ? "Next photo" : "Previous photo"}
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors tablet:h-9 tablet:w-9 ${
        isNext
          ? "bg-brand-red text-white hover:bg-brand-dark"
          : "bg-white text-brand-dark hover:bg-white/80"
      }`}
    >
      {isNext ? "→" : "←"}
    </button>
  );
}

function Fact({ label, value, className }: { label: string; value: string; className: string }) {
  return (
    <div className={`flex flex-col justify-center rounded-lg bg-white px-3 py-2 ${className}`}>
      <p className="text-xs text-brand-dark/50">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function Pill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-xs">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-red" aria-hidden />
      {children}
    </span>
  );
}

function Result({ project, label }: { project: ShowcaseProject; label: string }) {
  return (
    <>
      <p className="text-xs text-brand-dark/50">{label}</p>
      <p className="text-sm leading-5">
        <span className="font-semibold text-brand-red">{project.resultValue}</span>{" "}
        {project.resultCaption}
      </p>
    </>
  );
}

function ProjectCard({ project, number }: { project: ShowcaseProject; number: number }) {
  const t = useTranslations("home.projects");
  const tAlt = useTranslations("seo.alt");
  const [imageIndex, setImageIndex] = useState(0);
  const area = `${project.areaSqm} m²`;

  const go = (delta: number) => {
    setImageIndex((prev) => (prev + delta + project.images.length) % project.images.length);
  };

  return (
    <div className={number === 4 ? "hidden tablet:block" : ""}>
      <h3 className="mb-2.5 text-lg font-semibold uppercase tablet:hidden">
        {t("project")} {number}
      </h3>

      <div className="relative aspect-4/3 overflow-hidden rounded-lg tablet:aspect-16/11">
        <Image
          src={project.images[imageIndex]}
          alt={tAlt("project", { number, photo: imageIndex + 1 })}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />

        <div className="absolute inset-x-2.5 top-2.5 flex flex-wrap gap-1 tablet:hidden">
          <Pill>{project.budget}</Pill>
          <Pill>{area}</Pill>
          <Pill>{project.duration}</Pill>
        </div>

        <div className="pointer-events-none absolute left-2.5 top-2.5 hidden flex-col gap-[5px] tablet:flex">
          <div className="flex gap-[5px]">
            <Fact label={t("budget")} value={project.budget} className="w-[120px]" />
            <Fact label={t("duration")} value={project.duration} className="w-[190px]" />
            <Fact label={t("area")} value={area} className="w-[120px]" />
          </div>
          <div className="flex w-[315px] flex-col justify-center rounded-lg bg-white px-3 py-2">
            <Result project={project} label={t("result")} />
          </div>
        </div>

        <div className="absolute inset-x-2.5 top-1/2 flex -translate-y-1/2 justify-between tablet:inset-x-auto tablet:bottom-2.5 tablet:right-2.5 tablet:top-auto tablet:translate-y-0 tablet:gap-2">
          <NavButton direction="prev" onClick={() => go(-1)} />
          <NavButton direction="next" onClick={() => go(1)} />
        </div>
      </div>

      <div className="mt-2.5 rounded-lg bg-white px-3 py-2 tablet:hidden">
        <Result project={project} label={t("result")} />
      </div>
    </div>
  );
}

export function ProjectsShowcase() {
  const t = useTranslations("home.projects");

  return (
    <section className="bg-brand-gray px-6 py-16 tablet:px-16 tablet:py-24">
      <Badge>{t("title")}</Badge>

      <div className="mt-6 grid gap-6 tablet:grid-cols-2 tablet:gap-2">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} number={i + 1} />
        ))}
      </div>

      <div className="mt-8 flex justify-center tablet:mt-6">
        <Link
          href={ROUTES.projects}
          className="inline-flex w-full items-center justify-center rounded-md bg-brand-red px-5 py-3.5 text-[20px] text-white transition-colors hover:bg-brand-dark tablet:w-auto"
        >
          {t("viewAll")}
        </Link>
      </div>
    </section>
  );
}
