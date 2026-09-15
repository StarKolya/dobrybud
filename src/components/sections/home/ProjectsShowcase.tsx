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
    image: "/images/projects/project-1-1.jpg",
    budget: "39 000 zł",
    duration: "2 місяці",
    resultValue: "+50%",
    resultCaption: "до вартості нерухомості після ремонту",
  },
  {
    id: "2",
    image: "/images/projects/project-2-1.jpg",
    budget: "68 000 zł",
    duration: "8 тижнів",
    resultValue: "+35%",
    resultCaption: "до вартості нерухомості після ремонту",
  },
  {
    id: "3",
    image: "/images/projects/project-3-1.jpg",
    budget: "92 000 zł",
    duration: "10 тижнів",
    resultValue: "+60%",
    resultCaption: "до вартості нерухомості після ремонту",
  },
  {
    id: "4",
    image: "/images/projects/project-4-1.jpg",
    budget: "38 000 zł",
    duration: "5 тижнів",
    resultValue: "+30%",
    resultCaption: "до вартості нерухомості після ремонту",
  },
];

function NavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isNext ? "Next project" : "Previous project"}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
        isNext
          ? "bg-brand-red text-white hover:bg-brand-dark"
          : "bg-white text-brand-dark hover:bg-brand-gray"
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
        <div className="rounded-xl bg-white px-4 py-3">
          <p className="text-xs text-brand-dark/50">{t("budget")}</p>
          <p className="font-medium">{project.budget}</p>
        </div>
        <div className="rounded-xl bg-white px-4 py-3">
          <p className="text-xs text-brand-dark/50">{t("duration")}</p>
          <p className="font-medium">{project.duration}</p>
        </div>
      </div>
      <div className="rounded-xl bg-white px-4 py-3">
        <p className="mb-0.5 text-xs text-brand-dark/50">{t("result")}</p>
        <p className="text-sm leading-5">
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
  const active = PROJECTS[index];

  const go = (delta: number) => {
    setIndex((prev) => (prev + delta + PROJECTS.length) % PROJECTS.length);
  };

  return (
    <section className="px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="mb-4 flex items-center justify-between desktop:mb-6">
        <Badge>{t("title")}</Badge>
        <div className="flex gap-2 desktop:hidden">
          <NavButton direction="prev" onClick={() => go(-1)} />
          <NavButton direction="next" onClick={() => go(1)} />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative aspect-4/3 desktop:aspect-16/8">
          <Image src={active.image} alt="" fill className="object-cover" />
        </div>

        <div className="pointer-events-none absolute inset-x-4 top-4 hidden max-w-xs flex-col gap-2 desktop:flex">
          <StatBlocks project={active} t={t} />
        </div>

        <div className="absolute inset-x-4 bottom-4 hidden justify-end gap-2 desktop:flex">
          <NavButton direction="prev" onClick={() => go(-1)} />
          <NavButton direction="next" onClick={() => go(1)} />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 desktop:hidden">
        <StatBlocks project={active} t={t} />
      </div>

      <div className="mt-8 flex flex-col items-start gap-6 desktop:mt-10 desktop:flex-row desktop:items-center desktop:justify-between">
        <h2 className="max-w-xl text-xl font-semibold uppercase leading-tight desktop:text-3xl">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand-red align-middle" aria-hidden />
          {t("ctaHeadingMain")} <span className="text-brand-red">{t("ctaHeadingHighlight")}</span>
        </h2>
        <Button onClick={onRequestQuote} className="w-full desktop:w-auto">
          {t("cta")}
        </Button>
      </div>
    </section>
  );
}
