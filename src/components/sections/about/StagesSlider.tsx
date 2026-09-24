"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { NavButton } from "@/components/ui/NavButton";

const STAGE_KEYS = ["step1", "step2", "step3", "step4", "step5", "step6", "step7"] as const;

export function StagesSlider() {
  const t = useTranslations("about.stages");
  const tAlt = useTranslations("seo.alt");
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

  // Distance between the left edges of two neighbouring slides.
  const slideStep = () => {
    const el = scrollerRef.current;
    const first = el?.children[0] as HTMLElement | undefined;
    const second = el?.children[1] as HTMLElement | undefined;
    return first && second ? second.offsetLeft - first.offsetLeft : 0;
  };

  // Moves by three slides at a time; snap-start then lands the next slide on the title column.
  const scrollPage = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: direction * slideStep() * 3, behavior: "smooth" });
  };

  // Mouse drag-to-scroll. Touch and trackpads already scroll natively.
  const dragRef = useRef<{ startX: number; startLeft: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    e.preventDefault(); // stops text selection while dragging
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startLeft: e.currentTarget.scrollLeft };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    e.currentTarget.scrollLeft = drag.startLeft - (e.clientX - drag.startX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    setDragging(false);

    const el = e.currentTarget;
    const step = slideStep();
    if (!step) return;
    // A deliberate drag advances at least one slide in its direction; a tiny one settles on the nearest.
    const dx = e.clientX - drag.startX;
    const position = el.scrollLeft / step;
    const index = dx < -40 ? Math.ceil(position) : dx > 40 ? Math.floor(position) : Math.round(position);
    el.scrollTo({ left: index * step, behavior: "smooth" });
  };

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
                <NavButton direction="prev" onClick={() => scrollPage(-1)} disabled={atStart} />
                <NavButton direction="next" onClick={() => scrollPage(1)} disabled={atEnd} />
              </div>
            </div>
          </div>

          {/* On tablet+ the scroller spans the full card width so slides travel to its left edge,
              while the padding keeps the first slide aligned with the title column. */}
          <div
            ref={scrollerRef}
            onScroll={updateEdges}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
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
