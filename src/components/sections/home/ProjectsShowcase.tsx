"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ShowcaseProject {
  id: string;
  image: string;
  budget: string;
  duration: string;
  resultValue: string;
  resultCaption: string;
}

const PROJECTS: ShowcaseProject[] = [
  {
    id: "1",
    image: "/images/projects/project-1.jpg",
    budget: "39 000 zł",
    duration: "2 місяці",
    resultValue: "+50%",
    resultCaption: "до вартості нерухомості після ремонту",
  },
  {
    id: "2",
    image: "/images/projects/project-1.jpg",
    budget: "68 000 zł",
    duration: "8 тижнів",
    resultValue: "+35%",
    resultCaption: "до вартості нерухомості після ремонту",
  },
  {
    id: "3",
    image: "/images/projects/project-1.jpg",
    budget: "92 000 zł",
    duration: "10 тижнів",
    resultValue: "+60%",
    resultCaption: "до вартості нерухомості після ремонту",
  },
  {
    id: "4",
    image: "/images/projects/project-1.jpg",
    budget: "38 000 zł",
    duration: "5 тижнів",
    resultValue: "+30%",
    resultCaption: "до вартості нерухомості після ремонту",
  },
];

function NavButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isNext ? "Next project" : "Previous project"}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
        disabled
          ? "cursor-not-allowed bg-white text-brand-dark/30"
          : "bg-brand-red text-white hover:bg-brand-dark"
      }`}
    >
      {isNext ? "→" : "←"}
    </button>
  );
}

function StatBlocks({
  project,
  t,
}: {
  project: ShowcaseProject;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <>
      <div className="flex gap-2">
        <div className="flex flex-148 flex-col justify-center overflow-hidden rounded-xl bg-white px-4 py-3 tablet:w-42.5 tablet:flex-none tablet:h-23.25">
          <p className="text-xs text-brand-dark/50">{t("budget")}</p>
          <p key={project.id} className="animate-stat-change font-medium">
            {project.budget}
          </p>
        </div>
        <div className="flex flex-198 flex-col justify-center overflow-hidden rounded-xl bg-white px-4 py-3 tablet:w-68.5 tablet:flex-none tablet:h-23.25">
          <p className="text-xs text-brand-dark/50">{t("duration")}</p>
          <p key={project.id} className="animate-stat-change font-medium">
            {project.duration}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center overflow-hidden rounded-xl bg-white px-4 py-3 tablet:h-29.5 tablet:w-112.25">
        <p className="mb-0.5 text-xs text-brand-dark/50">{t("result")}</p>
        <p key={project.id} className="animate-stat-change text-sm leading-5">
          <span className="font-semibold text-brand-red">{project.resultValue}</span>{" "}
          {project.resultCaption}
        </p>
      </div>
    </>
  );
}

export function ProjectsShowcase({ onRequestQuote }: { onRequestQuote: () => void }) {
  const t = useTranslations("home.projects");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const active = PROJECTS[index];
  const canGoPrev = index > 0;
  const canGoNext = index < PROJECTS.length - 1;

  const go = (delta: number) => {
    setDirection(delta > 0 ? "next" : "prev");
    setIndex((prev) => Math.min(Math.max(prev + delta, 0), PROJECTS.length - 1));
  };

  return (
    <section className="px-6 py-16 tablet:px-16 tablet:py-24">
      <div className="mb-4 flex items-center justify-between tablet:mb-6">
        <Badge>{t("title")}</Badge>
        <div className="flex gap-2 tablet:hidden">
          <NavButton direction="prev" onClick={() => go(-1)} disabled={!canGoPrev} />
          <NavButton direction="next" onClick={() => go(1)} disabled={!canGoNext} />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative aspect-4/3 overflow-hidden tablet:aspect-16/8">
          <Image
            key={active.id}
            src={active.image}
            alt=""
            fill
            className={`object-cover ${
              direction === "next"
                ? "animate-carousel-slide-from-right"
                : "animate-carousel-slide-from-left"
            }`}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-4 top-4 hidden w-fit flex-col gap-2 tablet:flex">
          <StatBlocks project={active} t={t} />
        </div>

        <div className="absolute inset-x-4 bottom-4 hidden justify-end gap-2 tablet:flex">
          <NavButton direction="prev" onClick={() => go(-1)} disabled={!canGoPrev} />
          <NavButton direction="next" onClick={() => go(1)} disabled={!canGoNext} />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 tablet:hidden">
        <StatBlocks project={active} t={t} />
      </div>

      <div className="mt-8 flex flex-col items-start gap-6 tablet:mt-10 tablet:flex-row tablet:items-center tablet:justify-between">
        <h2 className="max-w-xl text-xl font-semibold uppercase leading-tight tablet:text-3xl">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand-red align-middle" aria-hidden />
          {t("ctaHeadingMain")} <span className="text-brand-red">{t("ctaHeadingHighlight")}</span>
        </h2>
        <Button onClick={onRequestQuote} className="w-full tablet:w-auto">
          {t("cta")}
        </Button>
      </div>
    </section>
  );
}
