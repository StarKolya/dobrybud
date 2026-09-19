"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import type { PackageId } from "@/types";

const PACKAGE_IDS: PackageId[] = ["basic", "design", "premium"];

const PACKAGE_IMAGES: Record<PackageId, string> = {
  basic: "/images/prices/basic.jpg",
  design: "/images/prices/design.jpg",
  premium: "/images/prices/premium.jpg",
};

const TABLET_BREAKPOINT_PX = 768;
const DESKTOP_BREAKPOINT_PX = 1280;
const CARD_H_MOBILE_PX = 400;
const CARD_H_TABLET_PX = 700;
const PAD_MOBILE_PX = 24;
const PAD_DESKTOP_PX = 64;
const GAP_PX = 24;
const TOP_MARGIN_PX = 16;
const RADIUS_PX = 24;
/**
 * Scroll distance of each phase (a slide or a widen), as a share of the pinned
 * stage height. The animation has 6 phases: lift, widen, then slide + widen for
 * each of the two remaining cards. The last four are slower than the first two.
 */
const PHASE_SCROLL_RATIOS = [0.35, 0.175, 0.5, 0.25, 0.5, 0.25];
const TOTAL_SCROLL_RATIO = PHASE_SCROLL_RATIOS.reduce((sum, r) => sum + r, 0);

interface Metrics {
  vw: number;
  stageH: number;
  headerH: number;
  titleBottom: number;
  padX: number;
  cardH: number;
}

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Scroll-driven stack. The stage is pinned under the (sticky) header while the
 * section scrolls; `progress` runs 0..4:
 *   0-1  all cards slide up over the title
 *   1-2  first card widens to full-bleed
 *   2-3  second card slides over the first, then widens
 *   3-4  third card slides over the second, then widens
 */
export function PackagesScroll() {
  const packagesT = useTranslations("home.calculator.packages");
  const t = useTranslations("prices");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const vw = document.documentElement.clientWidth;
      const headerH = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const title = titleRef.current;
      setMetrics({
        vw,
        headerH,
        stageH: window.innerHeight - headerH,
        titleBottom: title ? title.offsetTop + title.offsetHeight : 0,
        padX: vw >= DESKTOP_BREAKPOINT_PX ? PAD_DESKTOP_PX : PAD_MOBILE_PX,
        cardH: vw >= TABLET_BREAKPOINT_PX ? CARD_H_TABLET_PX : CARD_H_MOBILE_PX,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!metrics) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const scrolled = metrics.headerH - section.getBoundingClientRect().top;
      const phase = (i: number) => {
        const start = PHASE_SCROLL_RATIOS.slice(0, i).reduce((sum, r) => sum + r, 0);
        return clamp01((scrolled / metrics.stageH - start) / PHASE_SCROLL_RATIOS[i]);
      };
      // Steps 3 and 4 span two phases each (slide, then widen).
      setProgress(phase(0) + phase(1) + (phase(2) + phase(3)) / 2 + (phase(4) + phase(5)) / 2);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [metrics]);

  const m = metrics;
  const cardH = m?.cardH ?? 0;
  const restY = (i: number) => (m ? m.titleBottom + GAP_PX : 0) + i * (cardH + GAP_PX);
  const liftedBy = (m ? restY(0) - TOP_MARGIN_PX : 0) * clamp01(progress);

  const cardStyle = (i: number) => {
    if (!m) return { visibility: "hidden" as const };
    // Card 0 widens during step 2; cards 1 and 2 slide in the first half of
    // their step and widen in the second half.
    const step = i === 0 ? progress - 1 : progress - (i + 1);
    const move = i === 0 ? 0 : clamp01(step * 2);
    const widen = i === 0 ? clamp01(step) : clamp01(step * 2 - 1);
    // The card below rides along with the one ahead of it, keeping the gap.
    const followed = i === 2 ? (restY(1) - liftedBy - TOP_MARGIN_PX) * clamp01((progress - 2) * 2) : 0;
    const y = lerp(restY(i) - liftedBy - followed, TOP_MARGIN_PX, move);
    const inset = lerp(m.padX, 0, widen);
    return {
      top: 0,
      left: inset,
      width: m.vw - inset * 2,
      height: cardH,
      transform: `translateY(${y}px)`,
      borderRadius: lerp(RADIUS_PX, 0, widen),
      zIndex: i + 1,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={
        m
          ? {
              height: m.stageH * (1 + TOTAL_SCROLL_RATIO),
              // Pull the next section up over the empty space below the finished stack.
              marginBottom: -Math.max(m.stageH - m.cardH - TOP_MARGIN_PX * 2, 0),
            }
          : { height: "500vh" }
      }
    >
      <div
        className="pointer-events-none sticky overflow-hidden"
        style={{ top: m?.headerH ?? 0, height: m?.stageH ?? "100svh" }}
      >
        <h1
          ref={titleRef}
          className="mx-auto max-w-357 px-6 pt-8 font-heading text-[30px] font-semibold uppercase leading-tight tablet:text-[52px] desktop:px-16 desktop:text-[80px]"
        >
          {t("title")}
          <br />
          <span className="mt-2 inline-block rounded-md bg-brand-dark px-4 py-2 text-white">
            {t("titleHighlight")}
          </span>
        </h1>

        {PACKAGE_IDS.map((id, index) => (
          <div
            key={id}
            className="pointer-events-auto absolute overflow-hidden will-change-transform"
            style={cardStyle(index)}
          >
            <Image src={PACKAGE_IMAGES[id]} alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white desktop:p-10">
              <h3 className="mb-[15px] font-heading text-[32px] font-semibold uppercase leading-none tablet:text-[44px] desktop:text-[60px]">
                {packagesT(id)}
              </h3>
              <p className="max-w-md font-sans text-base font-medium leading-none tracking-[-0.01em] text-white/80 tablet:text-[18px] desktop:max-w-xl desktop:text-[22px]">
                {t(`packages.${id}.description`)}
              </p>
              <Button className="mt-5 px-[15px]! py-[11px]! text-[18px]! font-medium">{t("detailsCta")}</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
