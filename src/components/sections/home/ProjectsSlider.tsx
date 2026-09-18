"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface Slide {
  image: string;
  budget: string;
  duration: string;
  resultValue: string;
}

const SLIDES: Slide[] = [
  {
    image: "/images/projects/project-1-1.jpg",
    budget: "39000 zł",
    duration: "2 місяці",
    resultValue: "+50%",
  },
  {
    image: "/images/projects/project-1-2.jpg",
    budget: "39000 zł",
    duration: "2 місяці",
    resultValue: "+50%",
  },
  {
    image: "/images/projects/project-2-1.jpg",
    budget: "53000 zł",
    duration: "3 місяці",
    resultValue: "+39%",
  },
  {
    image: "/images/projects/project-2-2.jpg",
    budget: "53000 zł",
    duration: "3 місяці",
    resultValue: "+39%",
  },
  {
    image: "/images/projects/project-3-1.jpg",
    budget: "39000 zł",
    duration: "2 місяці",
    resultValue: "+50%",
  },
  {
    image: "/images/projects/project-4-1.jpg",
    budget: "53000 zł",
    duration: "3 місяці",
    resultValue: "+39%",
  },
];

const NUMBER_PATTERN = /^(\D*)(\d+)(.*)$/;

function AnimatedValue({
  value,
  durationMs = 700,
}: {
  value: string;
  durationMs?: number;
}) {
  const match = NUMBER_PATTERN.exec(value);
  const target = match ? Number(match[2]) : 0;
  const [display, setDisplay] = useState(0);
  const [visible, setVisible] = useState(false);
  const shown = useRef(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const from = shown.current;
    const start = performance.now();
    let frame = requestAnimationFrame(function step(now) {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      shown.current = Math.round(from + (target - from) * eased);
      setDisplay(shown.current);
      if (progress < 1) frame = requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(frame);
  }, [target, visible, durationMs]);

  if (!match) return <>{value}</>;
  return (
    <span ref={ref}>
      {match[1]}
      {display}
      {match[3]}
    </span>
  );
}

function NavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isNext ? "Next photo" : "Previous photo"}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors tablet:h-[53px] tablet:w-[53px] ${
        isNext
          ? "bg-brand-red text-white hover:bg-brand-dark"
          : "bg-white text-brand-dark hover:bg-white/80"
      }`}
    >
      <Image
        src={isNext ? "/icons/arrows/white.svg" : "/icons/arrows/black.svg"}
        alt=""
        width={24}
        height={24}
        className="h-[18px] w-[18px] tablet:h-6 tablet:w-6"
      />
    </button>
  );
}

function Fact({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg bg-white/90 px-3 pt-[25px] pb-2 pl-[15px] tablet:px-[18px] tablet:py-[20px] ${className}`}
    >
      <p className="font-sans text-[18px] leading-none font-light tracking-[-0.01em] text-brand-dark lining-nums proportional-nums tablet:font-normal">
        {label}:
      </p>
      <p className="font-heading mt-2 text-[22px] leading-none font-medium text-brand-dark tracking-[-0.01em] lining-nums proportional-nums tablet:text-[25px]">
        {children}
      </p>
    </div>
  );
}

export function ProjectsSlider({ onCtaClick }: { onCtaClick: () => void }) {
  const t = useTranslations("home.projects");
  const tTitle = useTranslations("projects");
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  const go = (delta: number) =>
    setIndex((prev) => (prev + delta + SLIDES.length) % SLIDES.length);

  const result = (
    <span className="block w-[300px] max-w-full tablet:w-auto">
      <span className="font-semibold text-brand-red">
        <AnimatedValue value={slide.resultValue} />
      </span>{" "}
      {t("resultCaption")}
    </span>
  );

  return (
    <section className="mt-[100px] bg-brand-gray px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-4 flex items-center justify-between tablet:mb-6">
          <Badge>{tTitle("title")}</Badge>
          <div className="flex gap-2 tablet:hidden">
            <NavButton direction="prev" onClick={() => go(-1)} />
            <NavButton direction="next" onClick={() => go(1)} />
          </div>
        </div>

        <div className="relative h-[408px] overflow-hidden rounded-lg tablet:h-[700px]">
          <Image
            key={slide.image}
            src={slide.image}
            alt=""
            fill
            priority={index === 0}
            sizes="(min-width: 768px) 90vw, 100vw"
            className="object-cover"
          />

          <div className="pointer-events-none absolute left-[25px] top-[25px] hidden gap-[5px] tablet:grid tablet:grid-cols-[170px_270px]">
            <Fact label={t("budget")} className="tablet:h-[93px]">
              <AnimatedValue value={slide.budget} />
            </Fact>
            <Fact label={t("duration")} className="tablet:h-[93px]">
              <AnimatedValue value={slide.duration} />
            </Fact>
            <Fact label={t("result")} className="col-span-2 tablet:h-[120px]">
              {result}
            </Fact>
          </div>

          <div className="absolute bottom-[25px] right-[25px] hidden gap-2 tablet:flex">
            <NavButton direction="prev" onClick={() => go(-1)} />
            <NavButton direction="next" onClick={() => go(1)} />
          </div>
        </div>

        <div className="mt-[5px] grid grid-cols-[170fr_270fr] gap-[5px] tablet:hidden">
          <Fact label={t("budget")} className="h-[93px]">
            <AnimatedValue value={slide.budget} />
          </Fact>
          <Fact label={t("duration")} className="h-[93px]">
            <AnimatedValue value={slide.duration} />
          </Fact>
          <Fact label={t("result")} className="col-span-2 h-[120px]">
            {result}
          </Fact>
        </div>

        <div className="mt-8 flex flex-col gap-6 tablet:mt-10 tablet:flex-row tablet:items-center tablet:justify-between">
          <h2 className="font-heading max-w-[740px] text-[30px] leading-none font-semibold tracking-[-0.01em] text-brand-dark uppercase lining-nums proportional-nums tablet:text-[35px] desktop:text-[40px]">
            <span className="text-brand-red" aria-hidden>
              •{" "}
            </span>
            {t("ctaHeadingMain")}{" "}
            <span className="text-brand-red">{t("ctaHeadingHighlight")}</span>
          </h2>
          <Button
            onClick={onCtaClick}
            className="h-[45px] w-[330px] max-w-full shrink-0 font-raleway text-[18px]! leading-none font-semibold tracking-normal tablet:h-auto tablet:w-auto tablet:px-5 tablet:py-3 tablet:text-base"
          >
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
