"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { NavButton } from "@/components/ui/NavButton";
import { useScrollSlider } from "@/hooks/useScrollSlider";

const STAGE_KEYS = ["step1", "step2", "step3", "step4", "step5", "step6", "step7"] as const;

export function StagesSlider() {
  const t = useTranslations("about.stages");
  const tAlt = useTranslations("seo.alt");
  const { ref: scrollerRef, atStart, atEnd, scrollBySlides, dragging, handlers } = useScrollSlider<HTMLDivElement>();

  return (
    <section className="overflow-hidden px-6 py-8 tablet:px-16 tablet:py-12">
      <div className="relative mx-auto max-w-[1300px] overflow-hidden rounded-lg py-4">
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <Image
            src="/images/about/stages.png"
            alt={tAlt("stages")}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark/50" />
        </div>

        <div className="@container relative flex flex-col gap-6 p-4 text-white tablet:h-[447px] tablet:gap-8 tablet:py-8 tablet:pr-0 tablet:pl-8">
          <div className="flex flex-col gap-6 tablet:flex-row tablet:gap-0">
            <div className="tablet:w-[15cqw] tablet:shrink-0">
              <Badge>{t("badge")}</Badge>
            </div>

            <div className="flex min-w-0 flex-1 items-start justify-between tablet:pr-8">
              <h2 className="whitespace-pre-line font-heading text-4xl font-semibold uppercase leading-none tablet:text-5xl">
                {t("title")}
              </h2>
              <div className="hidden gap-2 tablet:flex">
                <NavButton direction="prev" onClick={() => scrollBySlides(-3)} disabled={atStart} />
                <NavButton direction="next" onClick={() => scrollBySlides(3)} disabled={atEnd} />
              </div>
            </div>
          </div>

          {/* On tablet+ the scroller spans the full card width so slides travel to its left edge,
              while the padding keeps the first slide aligned with the title column. */}
          <div
            ref={scrollerRef}
            {...handlers}
            className={`flex max-h-[420px] flex-col gap-2.5 overflow-y-auto overscroll-contain tablet:-ml-8 tablet:-mr-16 tablet:max-h-none tablet:min-h-0 tablet:flex-1 tablet:scroll-pl-[calc(15cqw+2rem)] tablet:flex-row tablet:overflow-x-auto tablet:overflow-y-hidden tablet:overscroll-auto tablet:pl-[calc(15cqw+2rem)] tablet:pr-16 ${
              // Snapping and smooth scrolling would fight the pointer, so they're off mid-drag.
              dragging
                ? "tablet:cursor-grabbing tablet:select-none"
                : "tablet:cursor-grab tablet:snap-x tablet:snap-mandatory tablet:scroll-smooth"
            }`}
          >
            {STAGE_KEYS.map((key, i) => (
              <div
                key={key}
                className="flex min-h-40 shrink-0 flex-col justify-between gap-6 rounded-lg bg-white p-4 text-brand-dark tablet:w-[330px] tablet:snap-start tablet:last:mr-8"
              >
                <span className="font-heading text-[25px] font-light leading-none tracking-[-0.01em] lining-nums proportional-nums text-brand-dark/60">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-heading text-[25px] font-medium leading-none tracking-[-0.01em] lining-nums proportional-nums">{t(`${key}.title`)}</h3>
                  <p className="mt-2 font-sans text-[18px] font-normal leading-none tracking-[-0.01em] lining-nums proportional-nums text-brand-dark/70">{t(`${key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
