"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { NavButton } from "@/components/ui/NavButton";
import { AnimatedValue } from "@/components/ui/AnimatedValue";
import type { ProjectCard as ProjectCardData } from "@/types";

export function ProjectCard({
  project,
  redResult = false,
}: {
  project: ProjectCardData & { images: string[] };
  /** Phone/tablet card: brand-red result block with white text. */
  redResult?: boolean;
}) {
  const t = useTranslations("home.projects");
  const tAlt = useTranslations("seo.alt");
  const [imageIndex, setImageIndex] = useState(0);

  const go = (delta: number) => {
    setImageIndex((prev) => Math.min(Math.max(prev + delta, 0), project.images.length - 1));
  };

  return (
    <>
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-3 desktop:hidden">
      <p className="font-heading text-xl font-medium uppercase leading-none text-[#2C2C2C]">
        {t("project")} {project.id}
      </p>

      <div className="relative aspect-3/2 overflow-hidden rounded-xl">
        <Image src={project.images[imageIndex]} alt={tAlt("project", { number: project.id, photo: imageIndex + 1 })} fill
 sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />

        <div className="absolute left-2 top-2 right-2 flex flex-wrap gap-1">
          {[project.budget, `${project.areaSqm} m²`, t("months", { count: project.durationMonths })].map((value) => (
            <span
              key={value}
              className="flex items-center gap-1.5 rounded-md bg-white p-3 font-heading text-[18px] font-medium leading-none tracking-[-0.01em] lining-nums proportional-nums text-[#2C2C2C]"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" aria-hidden />
              {value}
            </span>
          ))}
        </div>

        <div className="absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between">
          <NavButton direction="prev" onClick={() => go(-1)} disabled={imageIndex === 0} />
          <NavButton direction="next" onClick={() => go(1)} disabled={imageIndex === project.images.length - 1} />
        </div>
      </div>

      <div
        className={`rounded-lg p-3 font-heading text-sm leading-tight ${
          redResult ? "bg-brand-red text-white" : "bg-[#F0F0F0] text-[#2C2C2C]"
        }`}
      >
        <p className="font-sans text-[18px] font-normal leading-none tracking-[-0.01em] lining-nums proportional-nums">{t("result")}:</p>
        <p className="mt-2 max-w-[250px] font-heading text-[18px] font-medium leading-none tracking-[-0.01em] lining-nums proportional-nums">
          <span className="font-bold">{project.resultValue}</span> {t("resultCaption")}
        </p>
      </div>
    </div>

    <div className="relative hidden aspect-4/3 overflow-hidden rounded-2xl desktop:block">
      <Image src={project.images[imageIndex]} alt={tAlt("project", { number: project.id, photo: imageIndex + 1 })} fill
 sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />

      <div className="absolute inset-x-2.5 top-2.5 flex flex-col gap-[5px]">
        <div className="flex gap-[5px]">
          <div className="flex h-[60px] basis-0 grow-[119] desktop:h-[77px] desktop:w-[119px] desktop:flex-none flex-col justify-center gap-1 rounded-lg bg-white p-2.5 desktop:p-[18px]">
            <p className="font-sans text-[13px] desktop:text-[18px] font-normal leading-none tracking-[-0.01em] lining-nums proportional-nums text-[#2C2C2C]">{t("budget")}:</p>
            <p className="font-heading text-[15px] desktop:text-[20px] font-medium leading-none tracking-[-0.01em] lining-nums proportional-nums text-[#2C2C2C]"><AnimatedValue value={project.budget} /></p>
          </div>
          <div className="flex h-[60px] basis-0 grow-[193] desktop:h-[77px] desktop:w-[193px] desktop:flex-none flex-col justify-center gap-1 rounded-lg bg-white p-2.5 desktop:p-[18px]">
            <p className="font-sans text-[13px] desktop:text-[18px] font-normal leading-none tracking-[-0.01em] lining-nums proportional-nums text-[#2C2C2C]">{t("duration")}:</p>
            <p className="font-heading text-[15px] desktop:text-[20px] font-medium leading-none tracking-[-0.01em] lining-nums proportional-nums text-[#2C2C2C]"><AnimatedValue value={t("months", { count: project.durationMonths })} /></p>
          </div>
          <div className="flex h-[60px] basis-0 grow-[150] desktop:h-[77px] desktop:w-[150px] desktop:flex-none flex-col justify-center gap-1 rounded-lg bg-white p-2.5 desktop:p-[18px]">
            <p className="font-sans text-[13px] desktop:text-[18px] font-normal leading-none tracking-[-0.01em] lining-nums proportional-nums text-[#2C2C2C]">{t("area")}:</p>
            <p className="font-heading text-[15px] desktop:text-[20px] font-medium leading-none tracking-[-0.01em] lining-nums proportional-nums text-[#2C2C2C]"><AnimatedValue value={`${project.areaSqm} m²`} /></p>
          </div>
        </div>

        <div className="flex h-[84px] w-[72%] desktop:h-[106px] desktop:w-[317px] flex-col justify-center gap-1 rounded-lg bg-white p-2.5 desktop:p-[18px]">
          <p className="font-sans text-[13px] desktop:text-[18px] font-normal leading-none tracking-[-0.01em] lining-nums proportional-nums text-[#2C2C2C]">{t("result")}:</p>
          <p className="font-heading text-[15px] desktop:text-[20px] font-medium leading-none tracking-[-0.01em] lining-nums proportional-nums text-[#2C2C2C]">
            <span className="font-semibold text-brand-red"><AnimatedValue value={project.resultValue} /></span>{" "}
            {t("resultCaption")}
          </p>
        </div>
      </div>

      <div className="absolute inset-x-2.5 bottom-2.5 flex justify-end gap-[5px]">
        <NavButton direction="prev" onClick={() => go(-1)} disabled={imageIndex === 0} />
        <NavButton direction="next" onClick={() => go(1)} disabled={imageIndex === project.images.length - 1} />
      </div>
    </div>
    </>
  );
}
