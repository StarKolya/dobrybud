"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { ProjectCard as ProjectCardData } from "@/types";

export function ProjectCard({ project }: { project: ProjectCardData & { images: string[] } }) {
  const t = useTranslations("home.projects");
  const [imageIndex, setImageIndex] = useState(0);

  const go = (delta: number) => {
    setImageIndex((prev) => (prev + delta + project.images.length) % project.images.length);
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-brand-gray">
      <div className="relative aspect-[4/3]">
        <Image src={project.images[imageIndex]} alt="" fill className="object-cover" />
        <div className="absolute inset-x-4 bottom-4 flex justify-between">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 hover:bg-white"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 hover:bg-white"
          >
            →
          </button>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-3 p-5 text-sm">
        <div>
          <dt className="text-brand-dark/50">{t("budget")}</dt>
          <dd className="font-medium">{project.budget}</dd>
        </div>
        <div>
          <dt className="text-brand-dark/50">{t("duration")}</dt>
          <dd className="font-medium">{project.duration}</dd>
        </div>
        <div>
          <dt className="text-brand-dark/50">{t("area")}</dt>
          <dd className="font-medium">{project.areaSqm} m²</dd>
        </div>
        <div>
          <dt className="text-brand-dark/50">{t("result")}</dt>
          <dd className="font-medium">{project.result}</dd>
        </div>
      </dl>
    </div>
  );
}
