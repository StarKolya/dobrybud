"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import type { Stage } from "@/types";

const STAGE_KEYS = ["step1", "step2", "step3", "step4"] as const;

export function StagesSlider() {
  const t = useTranslations("about.stages");
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (delta: number) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  const stages: (Stage & { number: string })[] = STAGE_KEYS.map((key, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: t(`${key}.title`),
    description: t(`${key}.description`),
  }));

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-dark/80" />

      <div className="relative px-6 py-16 text-white desktop:px-16 desktop:py-24">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-semibold desktop:text-4xl">{t("title")}</h2>
          <div className="hidden gap-2 desktop:flex">
            <button
              type="button"
              onClick={() => scrollBy(-320)}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 hover:bg-white/10"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(320)}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
        >
          {stages.map((stage) => (
            <div
              key={stage.number}
              className="w-64 flex-shrink-0 snap-start rounded-2xl bg-white/10 p-6 backdrop-blur"
            >
              <span className="text-sm text-white/50">{stage.number}</span>
              <h3 className="mt-4 mb-2 font-medium">{stage.title}</h3>
              <p className="text-sm text-white/70">{stage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
