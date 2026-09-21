"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { NavButton } from "@/components/ui/NavButton";

const STAGE_KEYS = ["step1", "step2", "step3", "step4", "step5", "step6", "step7"] as const;

export function StagesSlider() {
  const t = useTranslations("about.stages");
  const scrollerRef = useRef<HTMLDivElement>(null);

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const scrollBy = (delta: number) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden px-6 py-8 tablet:px-16 tablet:py-12">
      <div className="relative mx-auto max-w-[1300px] overflow-hidden rounded-lg py-4">
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <Image
            src="/images/about/stages.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark/50" />
        </div>

        <div className="relative flex flex-col gap-6 p-4 text-white tablet:h-[447px] tablet:flex-row tablet:gap-0 tablet:py-8 tablet:pr-0 tablet:pl-8">
          <div className="tablet:w-[15%] tablet:shrink-0">
            <Badge>{t("badge")}</Badge>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-6 tablet:gap-8">
            <div className="flex items-start justify-between tablet:pr-8">
              <h2 className="whitespace-pre-line font-heading text-4xl font-semibold uppercase leading-none tablet:text-5xl">
                {t("title")}
              </h2>
              <div className="hidden gap-2 tablet:flex">
                <NavButton direction="prev" onClick={() => scrollBy(-320)} disabled={atStart} />
                <NavButton direction="next" onClick={() => scrollBy(320)} disabled={atEnd} />
              </div>
            </div>

            <div
              ref={scrollerRef}
              onScroll={updateEdges}
              className="flex max-h-[420px] flex-col gap-2.5 tablet:min-h-0 tablet:flex-1 overflow-y-auto overscroll-contain tablet:-mr-16 tablet:max-h-none tablet:snap-x tablet:snap-mandatory tablet:flex-row tablet:overflow-x-auto tablet:overflow-y-hidden tablet:overscroll-auto tablet:scroll-smooth tablet:pr-16"
            >
              {STAGE_KEYS.map((key, i) => (
                <div
                  key={key}
                  className="flex min-h-40 shrink-0 flex-col justify-between gap-6 rounded-lg bg-white p-4 text-brand-dark tablet:w-[330px] tablet:snap-start"
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
      </div>
    </section>
  );
}
