"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

interface ScrollProject {
  id: string;
  images: string[];
  budget: string;
  duration: string;
  areaSqm: number;
  resultValue: string;
  resultCaption: string;
}

const RESULT_CAPTION = "до вартості нерухомості після ремонту";

const PROJECTS: ScrollProject[] = [
  {
    id: "1",
    images: ["/images/projects/project-1-1.jpg", "/images/projects/project-1-2.jpg"],
    budget: "39000 zł",
    duration: "2 місяці",
    areaSqm: 73,
    resultValue: "+50%",
    resultCaption: RESULT_CAPTION,
  },
  {
    id: "2",
    images: ["/images/projects/project-2-1.jpg", "/images/projects/project-2-2.jpg"],
    budget: "53000 zł",
    duration: "3 місяці",
    areaSqm: 52,
    resultValue: "+39%",
    resultCaption: RESULT_CAPTION,
  },
  {
    id: "3",
    images: ["/images/projects/project-3-1.jpg"],
    budget: "39000 zł",
    duration: "2 місяці",
    areaSqm: 73,
    resultValue: "+50%",
    resultCaption: RESULT_CAPTION,
  },
];

function ProjectCardContent({ project, number }: { project: ScrollProject; number: number }) {
  const t = useTranslations("home.projects");
  const [imageIndex, setImageIndex] = useState(0);
  const count = project.images.length;
  const go = (delta: number) => setImageIndex((prev) => (prev + delta + count) % count);

  const facts = [
    { label: t("budget"), value: project.budget },
    { label: t("duration"), value: project.duration },
    { label: t("area"), value: `${project.areaSqm} m²` },
  ];

  return (
    <>
      <Image
        src={project.images[imageIndex]}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute left-2.5 top-2.5 flex w-32 flex-col gap-[5px] tablet:left-4 tablet:top-4 tablet:w-40">
        <div className="rounded-lg bg-white px-3 py-2 text-sm font-semibold uppercase">
          {t("project")} {number}
        </div>
        {facts.map((fact) => (
          <div key={fact.label} className="rounded-lg bg-white px-3 py-2">
            <p className="text-xs text-brand-dark/50">{fact.label}</p>
            <p className="text-sm font-medium">{fact.value}</p>
          </div>
        ))}
        <div className="rounded-lg bg-white px-3 py-2">
          <p className="text-xs text-brand-dark/50">{t("result")}</p>
          <p className="text-xs leading-4">
            <span className="font-semibold text-brand-red">{project.resultValue}</span>{" "}
            {project.resultCaption}
          </p>
        </div>
      </div>

      {count > 1 && (
        <div className="absolute right-2.5 top-2.5 flex flex-col gap-[5px] tablet:right-4 tablet:top-4">
          {project.images.map((image, i) => (
            <button
              key={image}
              type="button"
              onClick={() => setImageIndex(i)}
              aria-label={`Photo ${i + 1}`}
              className={`relative h-10 w-14 overflow-hidden rounded-md border-2 tablet:h-14 tablet:w-20 ${
                i === imageIndex ? "border-white" : "border-transparent opacity-80"
              }`}
            >
              <Image src={image} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="absolute bottom-2.5 right-2.5 flex gap-2 tablet:bottom-4 tablet:right-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-dark"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-white"
        >
          →
        </button>
      </div>
    </>
  );
}

const TABLET_BREAKPOINT_PX = 768;
const DESKTOP_BREAKPOINT_PX = 1280;
const PAD_MOBILE_PX = 24;
const PAD_DESKTOP_PX = 64;
/** Extra side inset of the not-yet-active cards compared to the first one. */
const NARROW_EXTRA_PX = 24;
const CARD_H_MOBILE_PX = 400;
const CARD_H_TABLET_PX = 700;
const GAP_PX = 24;
const BOTTOM_MARGIN_PX = 16;
const RADIUS_PX = 24;

/** Scroll distance of each phase as a share of the viewport height: slide, widen, slide, widen. */
const PHASE_SCROLL_RATIOS = [0.5, 0.25, 0.5, 0.25];
const TOTAL_SCROLL_RATIO = PHASE_SCROLL_RATIOS.reduce((sum, r) => sum + r, 0);

interface Metrics {
  vw: number;
  vh: number;
  headerH: number;
  firstTop: number;
  padX: number;
  cardH: number;
}

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * The first card is already in place and slightly wider than the others; the
 * second and third slide up over it in turn, then widen to its width.
 */
export function ProjectsScroll() {
  const t = useTranslations("projects");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [progress, setProgress] = useState(0); // 0..2, one unit per card

  useLayoutEffect(() => {
    const measure = () => {
      const vw = document.documentElement.clientWidth;
      const title = titleRef.current;
      setMetrics({
        vw,
        vh: window.innerHeight,
        headerH: document.querySelector("header")?.getBoundingClientRect().height ?? 0,
        firstTop: title ? title.offsetTop + title.offsetHeight + GAP_PX : 0,
        padX: vw >= DESKTOP_BREAKPOINT_PX ? PAD_DESKTOP_PX : PAD_MOBILE_PX,
        cardH: vw >= TABLET_BREAKPOINT_PX ? CARD_H_TABLET_PX : CARD_H_MOBILE_PX,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const m = metrics;
  const stageH = m ? Math.max(m.vh - m.headerH, m.firstTop + m.cardH + BOTTOM_MARGIN_PX) : 0;

  useEffect(() => {
    if (!m) return;
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
      setProgress((phase(0) + phase(1)) / 2 + (phase(2) + phase(3)) / 2);
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
    // Card 0 never moves. Cards 1 and 2 slide in the first half of their step
    // and widen in the second half.
    const step = progress - (i - 1);
    const move = i === 0 ? 1 : clamp01(step * 2);
    const widen = i === 0 ? 1 : clamp01(step * 2 - 1);
    const restY = m.firstTop + i * (m.cardH + GAP_PX);
    // The third card rides along with the second one, keeping the gap.
    const followed = i === 2 ? (m.cardH + GAP_PX) * clamp01(progress * 2) : 0;
    const inset = lerp(m.padX + NARROW_EXTRA_PX, m.padX, widen);
    return {
      top: 0,
      left: i === 0 ? m.padX : inset,
      width: m.vw - (i === 0 ? m.padX : inset) * 2,
      height: m.cardH,
      transform: `translateY(${i === 0 ? m.firstTop : lerp(restY - followed, m.firstTop, move)}px)`,
      borderRadius: RADIUS_PX,
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
              height: stageH + m.vh * TOTAL_SCROLL_RATIO,
              // Pull the next section up over the empty space below the finished stack.
              marginBottom: -Math.max(stageH - m.firstTop - m.cardH - BOTTOM_MARGIN_PX, 0),
            }
          : { height: "300vh" }
      }
    >
      <div
        className="pointer-events-none sticky overflow-hidden"
        style={{ top: m?.headerH ?? 0, height: stageH || "100svh" }}
      >
        <h1
          ref={titleRef}
          className="px-6 pt-8 font-heading text-3xl font-semibold uppercase leading-tight desktop:px-16 desktop:text-5xl"
        >
          <span className="mb-2 inline-block rounded-md bg-brand-dark px-4 py-2 text-white">
            {t("titleHighlight")}
          </span>
          <br />
          {t("titleMain")}
        </h1>

        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className="pointer-events-auto absolute overflow-hidden will-change-transform"
            style={cardStyle(index)}
          >
            <ProjectCardContent project={project} number={index + 1} />
          </div>
        ))}
      </div>
    </section>
  );
}
