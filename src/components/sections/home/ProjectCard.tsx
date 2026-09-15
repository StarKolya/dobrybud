"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { ProjectCard as ProjectCardData } from "@/types";

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
      aria-label={isNext ? "Next photo" : "Previous photo"}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
        isNext ? "bg-brand-red text-white hover:bg-brand-dark" : "bg-white text-brand-dark hover:bg-white/80"
      }`}
    >
      {isNext ? "→" : "←"}
    </button>
  );
}

export function ProjectCard({ project }: { project: ProjectCardData & { images: string[] } }) {
  const t = useTranslations("home.projects");
  const [imageIndex, setImageIndex] = useState(0);

  const go = (delta: number) => {
    setImageIndex((prev) => (prev + delta + project.images.length) % project.images.length);
  };

  return (
    <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
      <Image src={project.images[imageIndex]} alt="" fill className="object-cover" />

      <div className="absolute inset-x-3 top-3 flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex flex-1 flex-col justify-center rounded-lg bg-white px-3 py-2">
            <p className="text-[11px] text-brand-dark/50">{t("budget")}</p>
            <p className="text-sm font-medium">{project.budget}</p>
          </div>
          <div className="flex flex-1 flex-col justify-center rounded-lg bg-white px-3 py-2">
            <p className="text-[11px] text-brand-dark/50">{t("duration")}</p>
            <p className="text-sm font-medium">{project.duration}</p>
          </div>
          <div className="flex flex-1 flex-col justify-center rounded-lg bg-white px-3 py-2">
            <p className="text-[11px] text-brand-dark/50">{t("area")}</p>
            <p className="text-sm font-medium">{project.areaSqm} m²</p>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-lg bg-white px-3 py-2">
          <p className="mb-0.5 text-[11px] text-brand-dark/50">{t("result")}</p>
          <p className="text-sm leading-5">
            <span className="font-semibold text-brand-red">{project.resultValue}</span>{" "}
            {project.resultCaption}
          </p>
        </div>
      </div>

      <div className="absolute inset-x-3 bottom-3 flex justify-end gap-2">
        <NavButton direction="prev" onClick={() => go(-1)} />
        <NavButton direction="next" onClick={() => go(1)} />
      </div>
    </div>
  );
}
