"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { NavButton } from "@/components/ui/NavButton";

export const ITEMS = [
  { id: "deadline", icon: "/icons/advantages/shield.svg" },
  { id: "contract", icon: "/icons/advantages/papers.svg" },
  { id: "warranty", icon: "/icons/advantages/calendar.svg" },
] as const;

export function AdvantageCard({ id, icon }: { id: (typeof ITEMS)[number]["id"]; icon: string }) {
  const t = useTranslations("prices.advantages");

  return (
    <div className="w-full shrink-0 rounded-lg bg-white p-7.5 tablet:w-auto">
      <Image src={icon} alt="" width={46} height={46} className="shrink-0" />
      <p className="mt-[65px] font-heading text-[25px] tablet:text-[20px] desktop:text-[25px] font-medium uppercase leading-none tracking-[-0.01em] text-brand-dark">
        {t(`items.${id}.title`)}
      </p>
      <p className="mt-[30px] text-[18px] tablet:text-[15px] desktop:text-[18px] font-normal leading-none tracking-[-0.01em] text-brand-dark">
        {t(`items.${id}.description`)}
      </p>
    </div>
  );
}

export function Advantages() {
  const t = useTranslations("prices.advantages");
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const canGoPrev = index > 0;
  const canGoNext = index < ITEMS.length - 1;

  const go = (delta: number) => {
    setIndex((prev) => Math.min(Math.max(prev + delta, 0), ITEMS.length - 1));
  };

  useEffect(() => {
    const updateOffset = () => {
      const track = trackRef.current;
      const target = track?.children[index] as HTMLElement | undefined;
      if (target) setOffset(target.offsetLeft);
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [index]);

  return (
    <section className="bg-brand-gray px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-6 flex items-center justify-between gap-4 tablet:hidden">
          <Badge>{t("title")}</Badge>
          <div className="flex gap-2">
            <NavButton direction="prev" onClick={() => go(-1)} disabled={!canGoPrev} />
            <NavButton direction="next" onClick={() => go(1)} disabled={!canGoNext} />
          </div>
        </div>

        <div className="min-w-0 overflow-hidden tablet:hidden">
          <div
            ref={trackRef}
            className="flex gap-2.5 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {ITEMS.map((item) => (
              <AdvantageCard key={item.id} id={item.id} icon={item.icon} />
            ))}
          </div>
        </div>

        <div className="hidden gap-6 tablet:flex">
          <div className="w-60 shrink-0">
            <Badge>{t("title")}</Badge>
          </div>

          <div className="grid flex-1 grid-cols-3 gap-2.5">
            {ITEMS.map((item) => (
              <AdvantageCard key={item.id} id={item.id} icon={item.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
