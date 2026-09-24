"use client";

import { Fragment, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { NavButton } from "@/components/ui/NavButton";
import { useSwipe } from "@/hooks/useSwipe";
import { CALCULATOR_PACKAGES } from "@/lib/calculator";
import type { PackageId } from "@/types";

const PACKAGE_IDS: PackageId[] = ["basic", "design", "premium"];

// TODO: verify against the real spec — how many of the 14 canonical features
// (home.packages.features, ordered least → most exclusive) each package
// includes. This is a best-effort progressive guess pending confirmation.
const INCLUDED_FEATURE_COUNT: Record<PackageId, number> = {
  basic: 4,
  design: 9,
  premium: 14,
};

function CheckIcon({ variant, onRed }: { variant: "check" | "dash"; onRed: boolean }) {
  const circleClass = onRed ? "bg-white" : "bg-brand-red";
  const strokeClass = onRed ? "stroke-brand-red" : "stroke-white";

  return (
    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${circleClass}`}>
      <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden>
        {variant === "check" ? (
          <path d="M1 3.5 3.3 6 8 1" className={strokeClass} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M1 3.5 8 3.5" className={strokeClass} strokeWidth="1.4" strokeLinecap="round" />
        )}
      </svg>
    </span>
  );
}

function PackageCard({
  id,
  onRequestQuote,
  className = "",
}: {
  id: PackageId;
  onRequestQuote: () => void;
  className?: string;
}) {
  const t = useTranslations("home.packages");
  const namesT = useTranslations("home.calculator.packages");
  const features = t.raw("features") as string[];
  const includedCount = INCLUDED_FEATURE_COUNT[id];
  const included = features.slice(0, includedCount);
  const excluded = features.slice(includedCount);
  const onRed = id === "design";

  return (
    <div
      className={`flex flex-col rounded-2xl p-6 desktop:p-8 ${
        onRed ? "bg-brand-red text-white" : "bg-white text-brand-dark"
      } ${className}`}
    >
      <p className="mb-5 flex items-center gap-2 font-heading text-[40px] leading-none font-medium tracking-[-0.01em] uppercase">
        <span className={`hidden h-2.5 w-2.5 shrink-0 rounded-full min-[900px]:block ${onRed ? "bg-white" : "bg-brand-red"}`} aria-hidden />
        {namesT(id)}
      </p>
      <hr className={onRed ? "border-white/30" : "border-brand-dark/30"} />
      <p className={`my-5 text-[22px] leading-none font-normal tracking-[-0.01em] ${id === "basic" ? "max-w-[300px]" : ""} ${onRed ? "text-white" : "text-brand-red"}`}>
        {t(`items.${id}.subtitle`)}
      </p>
      <hr className={onRed ? "border-white/30" : "border-brand-dark/30"} />

      <div className="mt-5 mb-5 flex items-center justify-between gap-2 text-base leading-none font-medium tracking-[-0.01em]">
        <span>{t("materialsHelp")}</span>
        <span className={onRed ? "text-white" : "text-brand-red"}>({t(`items.${id}.helpLabel`)})</span>
      </div>

      <ul className={`flex flex-col gap-2.5 border-b pb-4 text-base leading-none font-normal tracking-[-0.01em] ${onRed ? "border-white/30" : "border-brand-dark/30"}`}>
        {included.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5">
            <CheckIcon variant="check" onRed={onRed} />
            {feature}
          </li>
        ))}
      </ul>
      <ul className={`flex flex-col gap-2.5 pt-4 text-base leading-none font-normal tracking-[-0.01em] ${onRed ? "text-white" : "text-brand-dark/40"}`}>
        {excluded.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5">
            <CheckIcon variant="dash" onRed={onRed} />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <p className={`text-xs ${onRed ? "text-white" : "text-brand-dark/50"}`}>{t("priceLabel")}:</p>
        <p className="font-heading text-2xl font-semibold uppercase">
          {t("priceFrom")} {CALCULATOR_PACKAGES[id].pricePerSqm} ZŁ
        </p>
        <Button onClick={onRequestQuote} variant={onRed ? "white" : "primary"} className="mt-6 w-[215px] py-2.5!">
          {t("cta")}
        </Button>
      </div>
    </div>
  );
}

export function PackagesTable({ onRequestQuote }: { onRequestQuote: () => void }) {
  const t = useTranslations("home.packages");
  const namesT = useTranslations("home.calculator.packages");
  const [activeId, setActiveId] = useState<PackageId>("basic");
  const activeIndex = PACKAGE_IDS.indexOf(activeId);
  const go = (delta: number) =>
    setActiveId(PACKAGE_IDS[Math.min(Math.max(activeIndex + delta, 0), PACKAGE_IDS.length - 1)]);
  const { dragging, handlers: swipeHandlers } = useSwipe({
    onSwipe: go,
    canPrev: activeIndex > 0,
    canNext: activeIndex < PACKAGE_IDS.length - 1,
  });

  return (
    <section className="px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Badge>{t("title")}</Badge>

          <div className="flex gap-2 min-[900px]:hidden">
            <NavButton direction="prev" onClick={() => go(-1)} disabled={activeIndex === 0} />
            <NavButton
              direction="next"
              onClick={() => go(1)}
              disabled={activeIndex === PACKAGE_IDS.length - 1}
            />
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2 min-[900px]:hidden">
          {PACKAGE_IDS.map((id, i) => (
            <Fragment key={id}>
              {i > 0 && <span className="h-6 w-px shrink-0 bg-brand-dark/20" aria-hidden />}
              <button
                type="button"
                onClick={() => setActiveId(id)}
                className={`font-heading flex-1 rounded-md px-2 py-2 text-center text-[20px] leading-none font-semibold uppercase transition-colors ${
                  activeId === id ? "bg-brand-red text-white" : "bg-white text-brand-dark/40"
                }`}
              >
                {namesT(id)}
              </button>
            </Fragment>
          ))}
        </div>

        <div className="overflow-hidden min-[900px]:hidden" {...swipeHandlers}>
          <div
            className={`flex items-start gap-6 will-change-transform ${dragging ? "" : "transition-transform duration-500 ease-out"}`}
            style={{
              transform: `translateX(calc(${-activeIndex * 100}% - ${activeIndex * 24}px + var(--swipe-offset, 0px)))`,
            }}
          >
            {PACKAGE_IDS.map((id) => (
              <PackageCard key={id} id={id} onRequestQuote={onRequestQuote} className="w-full shrink-0" />
            ))}
          </div>
        </div>

        <div className="hidden min-[900px]:grid min-[900px]:grid-cols-3 min-[900px]:items-center min-[900px]:gap-6">
          {PACKAGE_IDS.map((id) => (
            <PackageCard
              key={id}
              id={id}
              onRequestQuote={onRequestQuote}
              className={id === "design" ? "min-[900px]:-my-4 min-[900px]:shadow-xl" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
