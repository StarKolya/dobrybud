"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { NavButton } from "@/components/ui/NavButton";

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

const projectImages = (id: number, count: number) =>
  Array.from({ length: count }, (_, i) => `/images/projects/${id}/${i + 1}.jpg`);

const PROJECTS: ScrollProject[] = [
  {
    id: "1",
    images: projectImages(1, 5),
    budget: "39000 zł",
    duration: "2 місяці",
    areaSqm: 73,
    resultValue: "+50%",
    resultCaption: RESULT_CAPTION,
  },
  {
    id: "2",
    images: projectImages(2, 4),
    budget: "53000 zł",
    duration: "3 місяці",
    areaSqm: 52,
    resultValue: "+39%",
    resultCaption: RESULT_CAPTION,
  },
  {
    id: "3",
    images: projectImages(3, 4),
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
  const go = (delta: number) => setImageIndex((prev) => Math.min(Math.max(prev + delta, 0), count - 1));

  const facts = [
    { key: "budget", label: t("budget"), value: project.budget },
    { key: "duration", label: t("duration"), value: project.duration },
    { key: "area", label: t("area"), value: `${project.areaSqm} m²` },
  ];

  return (
    <>
      <div className="flex h-full flex-col gap-3 bg-brand-gray p-3 text-[#2C2C2C] tablet:hidden">
        <p className="font-heading text-xl font-medium uppercase leading-none">
          {t("project")} {number}
        </p>

        <div className="relative h-[300px] shrink-0 overflow-hidden rounded-xl">
          <Image src={project.images[imageIndex]} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between">
            <NavButton small direction="prev" onClick={() => go(-1)} disabled={imageIndex === 0} />
            <NavButton small direction="next" onClick={() => go(1)} disabled={imageIndex === count - 1} />
          </div>
        </div>

        <div className="flex flex-col gap-[5px]">
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
                        <>
                          <span className="font-bold text-brand-red">{project.resultValue}</span> {project.resultCaption}
                        </>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="hidden tablet:contents">
      <Image
        src={project.images[imageIndex]}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute left-10 top-10 flex w-[215px] flex-col gap-[5px]">
        <div className="font-heading mb-5 text-[40px] font-medium uppercase leading-none tracking-[-0.01em] lining-nums proportional-nums text-white">
          {t("project")} {number}
        </div>
        {facts.map((fact) => (
          <div key={fact.key} className="flex flex-col gap-2 rounded-lg bg-white/90 px-5 py-[18px] text-[#2C2C2C]">
            <p className="font-sans text-[18px] font-normal leading-none tracking-[-0.01em] lining-nums proportional-nums">{fact.label}</p>
            <p className="font-heading text-[25px] font-medium leading-none tracking-[-0.01em] lining-nums proportional-nums">{fact.value}</p>
          </div>
        ))}
        <div className="flex flex-col gap-2 rounded-lg bg-white/90 px-5 py-[18px] text-[#2C2C2C]">
          <p className="font-sans text-[18px] font-normal leading-none tracking-[-0.01em] lining-nums proportional-nums">{t("result")}</p>
          <p className="font-heading text-[25px] font-medium leading-none tracking-[-0.01em] lining-nums proportional-nums">
            <span className="text-brand-red">{project.resultValue}</span>{" "}
            {project.resultCaption}
          </p>
        </div>
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
              <Image src={image} alt="" fill sizes="80px" className="object-cover" />
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
const CARD_H_MOBILE_PX = 560;
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
  contentLeft: number;
  contentW: number;
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
      const padX = vw >= DESKTOP_BREAKPOINT_PX ? PAD_DESKTOP_PX : PAD_MOBILE_PX;
      const contentW = Math.min(vw - padX * 2, MAX_CONTENT_PX);
      setMetrics({
        vw,
        vh: window.innerHeight,
        headerH: document.querySelector("header")?.getBoundingClientRect().height ?? 0,
        firstTop: title ? title.offsetTop + title.offsetHeight + GAP_PX : 0,
        contentLeft: (vw - contentW) / 2,
        contentW,
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
    const extra = i === 0 ? 0 : lerp(NARROW_EXTRA_PX, 0, widen);
    return {
      top: 0,
      left: m.contentLeft + extra,
      width: m.contentW - extra * 2,
      height: m.cardH,
      transform: `translateY(${i === 0 ? m.firstTop : lerp(restY - followed, m.firstTop, move)}px)`,
      borderRadius: RADIUS_PX,
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
              marginBottom: -Math.max(stageH - m.firstTop - m.cardH - BOTTOM_MARGIN_PX, 0),
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
            className="mx-auto max-w-[1300px] pt-8 font-heading text-3xl font-semibold uppercase leading-tight desktop:text-5xl"
          >
            <span className="mb-2 inline-block rounded-md bg-brand-dark px-4 py-2 text-white">
              {t("titleHighlight")}
            </span>
            <br />
            {t("titleMain")}
          </h1>
        </div>

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
