"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { ResultCaption } from "@/components/ui/ResultCaption";
import { useTranslations } from "next-intl";
import { NavButton } from "@/components/ui/NavButton";

interface ProjectStats {
  budget: string;
  durationMonths: number;
  areaSqm: number;
  resultValue: string;
}

interface ScrollProject {
  id: string;
  images: string[];
  /** Left out until the real figures are known; the card then shows only its photos. */
  stats?: ProjectStats;
}

const projectImages = (id: number, count: number) =>
  Array.from({ length: count }, (_, i) => `/images/projects/${id}/${i + 1}.jpg`);

const PROJECTS: ScrollProject[] = [
  {
    id: "1",
    images: projectImages(1, 5),
    stats: { budget: "39000 zł", durationMonths: 2, areaSqm: 73, resultValue: "+50%" },
  },
  {
    id: "2",
    images: projectImages(2, 4),
    stats: { budget: "53000 zł", durationMonths: 3, areaSqm: 52, resultValue: "+39%" },
  },
  {
    id: "3",
    images: projectImages(3, 4),
    stats: { budget: "39000 zł", durationMonths: 2, areaSqm: 73, resultValue: "+50%" },
  },
  {
    id: "4",
    images: projectImages(4, 4),
    stats: { budget: "53000 zł", durationMonths: 3, areaSqm: 52, resultValue: "+39%" },
  },
  {
    id: "5",
    images: projectImages(5, 5),
    stats: { budget: "89000 zł", durationMonths: 3, areaSqm: 96, resultValue: "+45%" },
  },
  {
    id: "6",
    images: projectImages(6, 4),
    stats: { budget: "46000 zł", durationMonths: 2, areaSqm: 48, resultValue: "+42%" },
  },
  {
    id: "7",
    images: projectImages(7, 3),
    stats: { budget: "51000 zł", durationMonths: 2, areaSqm: 54, resultValue: "+40%" },
  },
];

function ProjectCardContent({ project, number }: { project: ScrollProject; number: number }) {
  const t = useTranslations("home.projects");
  const tAlt = useTranslations("seo.alt");
  const [imageIndex, setImageIndex] = useState(0);
  const count = project.images.length;
  const go = (delta: number) => setImageIndex((prev) => Math.min(Math.max(prev + delta, 0), count - 1));
  const { stats } = project;

  const facts = stats
    ? [
        { key: "budget", label: t("budget"), value: stats.budget },
        { key: "duration", label: t("duration"), value: t("months", { count: stats.durationMonths }) },
        { key: "area", label: t("area"), value: `${stats.areaSqm} m²` },
      ]
    : [];

  return (
    <>
      <div className="flex h-full flex-col bg-brand-gray px-3 py-3 text-[#2C2C2C] tablet:hidden">
        <h2 className="mb-3 font-heading text-xl font-medium uppercase leading-none">
          {t("project")} {number}
        </h2>

        <div className={`relative overflow-hidden rounded-xl ${stats ? "h-[300px] shrink-0" : "flex-1"}`}>
          <Image src={project.images[imageIndex]} alt={tAlt("project", { number, photo: imageIndex + 1 })} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between">
            <NavButton small direction="prev" onClick={() => go(-1)} disabled={imageIndex === 0} />
            <NavButton small direction="next" onClick={() => go(1)} disabled={imageIndex === count - 1} />
          </div>
        </div>

        {stats && (
        <div className="mt-[5px] flex flex-col gap-[5px]">
          {[
            [
              { key: "budget", grow: "grow-[148]" },
              { key: "duration", grow: "grow-[198]" },
            ],
            [
              { key: "area", grow: "grow-[119]" },
              { key: "result", grow: "grow-[226]" },
            ],
          ].map((row) => (
            <div key={row[0].key} className="flex gap-[5px]">
              {row.map(({ key, grow }) => {
                const fact = facts.find((f) => f.key === key);
                return (
                  <div key={key} className={`flex basis-0 ${grow} flex-col justify-center gap-2 rounded-lg bg-white p-3`}>
                    <p className="font-sans text-[18px] font-normal leading-none tracking-[-0.01em] lining-nums proportional-nums">
                      {fact ? fact.label : t("result")}:
                    </p>
                    <p className="font-heading text-[18px] font-medium leading-none tracking-[-0.01em] lining-nums proportional-nums">
                      {fact ? (
                        fact.value
                      ) : (
                        <ResultCaption
                          value={<span className="font-bold text-brand-red">{stats.resultValue}</span>}
                          caption={t("resultCaption")}
                          fit={false}
                        />
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        )}
      </div>

      <div className="hidden tablet:contents">
      <Image
        src={project.images[imageIndex]}
        alt={tAlt("project", { number, photo: imageIndex + 1 })}
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute left-10 top-10 flex w-[215px] flex-col gap-[5px]">
        <h2 className="font-heading mb-5 text-[40px] font-medium uppercase leading-none tracking-[-0.01em] lining-nums proportional-nums text-white">
          {t("project")} {number}
        </h2>
        {facts.map((fact) => (
          <div key={fact.key} className="flex flex-col gap-2 rounded-lg bg-white/90 px-5 py-[18px] text-[#2C2C2C]">
            <p className="font-sans text-[18px] font-normal leading-none tracking-[-0.01em] lining-nums proportional-nums">{fact.label}</p>
            <p className="font-heading text-[25px] font-medium leading-none tracking-[-0.01em] lining-nums proportional-nums">{fact.value}</p>
          </div>
        ))}
        {stats && (
        <div className="flex flex-col gap-2 rounded-lg bg-white/90 px-5 py-[18px] text-[#2C2C2C]">
          <p className="font-sans text-[18px] font-normal leading-none tracking-[-0.01em] lining-nums proportional-nums">{t("result")}</p>
          <p className="font-heading text-[25px] font-medium leading-none tracking-[-0.01em] lining-nums proportional-nums">
            <ResultCaption
              value={<span className="text-brand-red">{stats.resultValue}</span>}
              caption={t("resultCaption")}
            />
          </p>
        </div>
        )}
      </div>

      <div className="absolute bottom-10 right-10 flex flex-col items-center gap-2">
      {count > 1 && (
        <div className="flex flex-col gap-[5px] rounded-lg bg-white p-[5px]">
          {project.images.map((image, i) => (
            <button
              key={image}
              type="button"
              onClick={() => setImageIndex(i)}
              aria-label={`Photo ${i + 1}`}
              className={`relative h-10 w-14 overflow-hidden rounded-md tablet:h-14 tablet:w-20 ${
                i === imageIndex ? "" : "opacity-60"
              }`}
            >
              <Image src={image} alt={tAlt("project", { number, photo: i + 1 })} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <NavButton small direction="prev" onClick={() => go(-1)} disabled={imageIndex === 0} />
        <NavButton small direction="next" onClick={() => go(1)} disabled={imageIndex === count - 1} />
      </div>
      </div>
      </div>
    </>
  );
}

const TABLET_BREAKPOINT_PX = 768;
const DESKTOP_BREAKPOINT_PX = 1280;
const PAD_MOBILE_PX = 24;
const PAD_DESKTOP_PX = 64;
const MAX_CONTENT_PX = 1300;
/** Extra side inset of the not-yet-active cards compared to the first one. */
const NARROW_EXTRA_PX = 24;
/** Smallest scale an incoming card starts at (keeps phones from shrinking too much). */
const MIN_INCOMING_SCALE = 0.9;
/** How far a card sinks back, and how dark it gets, while the next one covers it. */
const RECEDE_SCALE = 0.94;
const RECEDE_SHADE = 0.45;
const CARD_H_MOBILE_PX = 560;
const CARD_H_TABLET_PX = 620;
const GAP_PX = 24;
/** Phones: the card reaches this far past the content column, padding its content back in. */
const CARD_PAD_X_MOBILE_PX = 12;
const BOTTOM_MARGIN_PX = 16;

/** Top of the finished stack: the first card ends up here, covering the heading. */
const END_TOP_PX = BOTTOM_MARGIN_PX;

/**
 * Scroll distance of each phase as a share of the viewport height: the first
 * card covers the heading, then every later card slides up and widens.
 */
const PHASE_SCROLL_RATIOS = [0.5, ...PROJECTS.slice(1).flatMap(() => [0.5, 0.25])];
const TOTAL_SCROLL_RATIO = PHASE_SCROLL_RATIOS.reduce((sum, r) => sum + r, 0);

interface Metrics {
  vw: number;
  vh: number;
  headerH: number;
  firstTop: number;
  contentLeft: number;
  contentW: number;
  cardPadX: number;
  cardH: number;
}

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Smoothstep: eases each phase in and out instead of moving at constant speed. */
const ease = (t: number) => t * t * (3 - 2 * t);

/**
 * The first card starts below the heading, slightly wider than the others, and
 * slides up to cover it; each later card then slides up over the previous one
 * in turn and widens to its width.
 */
export function ProjectsScroll() {
  const t = useTranslations("projects");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const vw = document.documentElement.clientWidth;
      const title = titleRef.current;
      const padX = vw >= DESKTOP_BREAKPOINT_PX ? PAD_DESKTOP_PX : PAD_MOBILE_PX;
      const contentW = Math.min(vw - padX * 2, MAX_CONTENT_PX);
      setMetrics({
        vw,
        vh: window.innerHeight,
        headerH: document.querySelector("header")?.getBoundingClientRect().height ?? 0,
        firstTop: title ? title.offsetTop + title.offsetHeight + GAP_PX : 0,
        contentLeft: (vw - contentW) / 2,
        contentW,
        cardPadX: vw >= TABLET_BREAKPOINT_PX ? 0 : CARD_PAD_X_MOBILE_PX,
        cardH: vw >= TABLET_BREAKPOINT_PX ? CARD_H_TABLET_PX : CARD_H_MOBILE_PX,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const m = metrics;
  const stageH = m ? Math.max(m.vh - m.headerH, m.firstTop + m.cardH + BOTTOM_MARGIN_PX) : 0;

  // Scroll-linked, so styles are written straight to the DOM every frame rather
  // than through React state, and only transform/opacity change (no layout).
  useLayoutEffect(() => {
    if (!m) return;
    const cardW = m.contentW + m.cardPadX * 2;
    const narrowScale = Math.max((cardW - NARROW_EXTRA_PX * 2) / cardW, MIN_INCOMING_SCALE);

    const apply = (progress: number) => {
      // The heading fades out as the first card slides over it.
      if (titleRef.current) titleRef.current.style.opacity = String(1 - ease(clamp01(progress)));
      // Card 0 slides up over the heading in the first unit of progress. Every
      // later card then slides in the first half of its unit and widens in the
      // second, while the card underneath sinks back and darkens.
      let prevY = 0;
      PROJECTS.forEach((_, i) => {
        const step = progress - i;
        const move = ease(clamp01(step * 2));
        const widen = ease(clamp01(step * 2 - 1));
        // Card 1 waits below the heading's spot; from card 2 on, each waiting
        // card rides along with the one above it, keeping the gap.
        const waitY = i === 1 ? m.firstTop + m.cardH + GAP_PX : prevY + m.cardH + GAP_PX;
        const y =
          i === 0 ? lerp(m.firstTop, END_TOP_PX, ease(clamp01(progress))) : lerp(waitY, END_TOP_PX, move);
        prevY = y;

        const card = cardRefs.current[i];
        const shade = shadeRefs.current[i];
        if (!card || !shade) return;
        const covered = i < PROJECTS.length - 1 ? ease(clamp01((progress - i - 1) * 2)) : 0;
        const recede = lerp(1, RECEDE_SCALE, covered);
        const scale = (i === 0 ? 1 : lerp(narrowScale, 1, widen)) * recede;
        // Sink back around the centre, so the darkened top edge drops behind the
        // covering card instead of peeking out as a line along its top.
        const sink = (m.cardH * (1 - recede)) / 2;

        card.style.transform = `translate3d(0, ${y + sink}px, 0) scale(${scale})`;
        shade.style.opacity = String(covered * RECEDE_SHADE);
      });
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const scrolled = m.headerH - section.getBoundingClientRect().top;
      const phase = (i: number) => {
        const start = PHASE_SCROLL_RATIOS.slice(0, i).reduce((sum, r) => sum + r, 0);
        return clamp01((scrolled / m.vh - start) / PHASE_SCROLL_RATIOS[i]);
      };
      // 0..PROJECTS.length, one unit per card: the heading phase, then a slide
      // and a widen phase per later card, each worth half a unit.
      let progress = phase(0);
      for (let i = 1; i < PHASE_SCROLL_RATIOS.length; i += 2) progress += (phase(i) + phase(i + 1)) / 2;
      apply(progress);
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
  }, [m]);

  const cardStyle = (i: number) => {
    if (!m) return { visibility: "hidden" as const };
    return {
      top: 0,
      left: m.contentLeft - m.cardPadX,
      width: m.contentW + m.cardPadX * 2,
      height: m.cardH,
      transformOrigin: "50% 0",
      zIndex: i + 1,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="pointer-events-none relative"
      style={
        m
          ? {
              height: stageH + m.vh * TOTAL_SCROLL_RATIO,
              // Pull the next section up over the empty space below the finished stack.
              marginBottom: -Math.max(stageH - END_TOP_PX - m.cardH - BOTTOM_MARGIN_PX, 0),
            }
          : { height: "300vh" }
      }
    >
      <div
        className="pointer-events-none sticky overflow-hidden"
        style={{ top: m?.headerH ?? 0, height: stageH || "100svh" }}
      >
        <div className="px-6 desktop:px-16">
          <h1
            ref={titleRef}
            className="mx-auto max-w-[1300px] pt-4 font-heading text-[27px] font-semibold uppercase leading-none tablet:pt-8 tablet:leading-tight tablet:text-3xl desktop:text-5xl"
          >
            <span className="mb-1 inline-block rounded-md bg-brand-dark px-2 py-1 text-white tablet:mb-2 tablet:px-4 tablet:py-2">
              {t("titleHighlight")}
            </span>
            <br />
            {t("titleMain")}
          </h1>
        </div>

        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="pointer-events-auto absolute overflow-hidden rounded-2xl will-change-transform"
            style={cardStyle(index)}
          >
            <ProjectCardContent project={project} number={index + 1} />
            <div
              ref={(el) => {
                shadeRefs.current[index] = el;
              }}
              className="pointer-events-none absolute inset-0 z-20 bg-black opacity-0"
              aria-hidden
            />
          </div>
        ))}
      </div>
    </section>
  );
}
