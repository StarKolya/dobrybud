"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";

const STAGE_KEYS = ["step1", "step2", "step3", "step4", "step5", "step6", "step7"] as const;

export function StagesSlider() {
  const t = useTranslations("about.stages");
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (delta: number) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden px-6 py-8 tablet:px-16 tablet:py-12">
      <div className="relative rounded-lg">
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <Image
            src="/images/projects/project-1.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark/50" />
        </div>

        <div className="relative flex flex-col gap-6 p-4 text-white tablet:flex-row tablet:gap-0 tablet:py-8 tablet:pr-0 tablet:pl-8">
          <div className="tablet:w-[20%] tablet:shrink-0">
            <Badge>{t("badge")}</Badge>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-6 tablet:gap-8">
            <div className="flex items-start justify-between tablet:pr-8">
              <h2 className="font-heading text-4xl font-semibold uppercase leading-none tablet:text-5xl">
                {t("title")}
              </h2>
              <div className="hidden gap-2 tablet:flex">
                <button
                  type="button"
                  onClick={() => scrollBy(-320)}
                  aria-label="Previous"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-dark"
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
              className="flex max-h-[420px] flex-col gap-2.5 overflow-y-auto overscroll-contain tablet:-mr-16 tablet:max-h-none tablet:snap-x tablet:snap-mandatory tablet:flex-row tablet:overflow-x-auto tablet:overflow-y-visible tablet:scroll-smooth tablet:pr-16"
            >
              {STAGE_KEYS.map((key, i) => (
                <div
                  key={key}
                  className="flex min-h-40 shrink-0 flex-col justify-between gap-6 rounded-lg bg-white p-4 text-brand-dark tablet:w-72 tablet:snap-start"
                >
                  <span className="text-brand-dark/60">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-semibold">{t(`${key}.title`)}</h3>
                    <p className="mt-1 text-sm text-brand-dark/70">{t(`${key}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
