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

const DESKTOP_BREAKPOINT_PX = 1280;
const PAD_MOBILE_PX = 24;
const PAD_DESKTOP_PX = 64;
const GAP_PX = 24;
const TOP_MARGIN_PX = 16;
const RADIUS_PX = 24;
/** Scroll distance per animation step, as a share of the pinned stage height. */
const STEP_SCROLL_RATIO = 0.7;
const STEPS = 4;

interface Metrics {
  vw: number;
  stageH: number;
  headerH: number;
  titleBottom: number;
  padX: number;
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
      const scrollLen = section.offsetHeight - metrics.stageH;
      const scrolled = metrics.headerH - section.getBoundingClientRect().top;
      setProgress(clamp01(scrolled / scrollLen) * STEPS);
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
  const cardH = m ? m.stageH - TOP_MARGIN_PX * 2 : 0;
  const restY = (i: number) => (m ? m.titleBottom + GAP_PX : 0) + i * (cardH + GAP_PX);
  const liftedBy = (m ? restY(0) - TOP_MARGIN_PX : 0) * clamp01(progress);

  const cardStyle = (i: number) => {
    if (!m) return { visibility: "hidden" as const };
    // Card 0 widens during step 2; cards 1 and 2 slide in the first half of
    // their step and widen in the second half.
    const step = i === 0 ? progress - 1 : progress - (i + 1);
    const move = i === 0 ? 0 : clamp01(step * 2);
    const widen = i === 0 ? clamp01(step) : clamp01(step * 2 - 1);
    const y = lerp(restY(i) - liftedBy, TOP_MARGIN_PX, move);
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
      style={m ? { height: m.stageH * (1 + STEPS * STEP_SCROLL_RATIO) } : { height: "500vh" }}
    >
      <div
        className="sticky overflow-hidden"
        style={{ top: m?.headerH ?? 0, height: m?.stageH ?? "100svh" }}
      >
        <h1
          ref={titleRef}
          className="px-6 pt-8 font-heading text-3xl font-semibold uppercase leading-tight desktop:px-16 desktop:text-5xl"
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
            className="absolute overflow-hidden will-change-transform"
            style={cardStyle(index)}
          >
            <Image src={PACKAGE_IMAGES[id]} alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-6 text-white desktop:p-10">
              <h3 className="font-heading text-2xl font-semibold uppercase desktop:text-4xl">
                {packagesT(id)}
              </h3>
              <p className="max-w-md text-sm leading-6 text-white/80">
                {t(`packages.${id}.description`)}
              </p>
              <Button className="mt-1">{t("detailsCta")}</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
