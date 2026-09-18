"use client";

import { Fragment, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { NavButton } from "@/components/ui/NavButton";
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
      className={`flex h-219.5 flex-col rounded-2xl p-6 desktop:p-8 ${
        onRed ? "bg-brand-red text-white" : "bg-white text-brand-dark"
      } ${className}`}
    >
      <p className="mb-3 flex items-center gap-2 font-heading text-[40px] leading-none font-medium tracking-[-0.01em] uppercase">
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${onRed ? "bg-white" : "bg-brand-red"}`} aria-hidden />
        {namesT(id)}
      </p>
      <hr className="border-brand-dark/50" />
      <p className={`my-4 text-[22px] leading-none font-normal tracking-[-0.01em] ${onRed ? "text-white/80" : "text-brand-dark/50"}`}>
        {t(`items.${id}.subtitle`)}
      </p>
      <hr className="border-brand-dark/50" />

      <div className="mb-3 flex items-center justify-between gap-2 text-base leading-none font-medium tracking-[-0.01em]">
        <span>{t("materialsHelp")}</span>
        <span className={onRed ? "text-white/70" : "text-brand-dark/50"}>({t(`items.${id}.helpLabel`)})</span>
      </div>

      <ul className={`flex flex-col gap-2.5 border-b pb-4 text-base leading-none font-normal tracking-[-0.01em] ${onRed ? "border-white/20" : "border-brand-dark/10"}`}>
        {included.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5">
            <CheckIcon variant="check" onRed={onRed} />
            {feature}
          </li>
        ))}
      </ul>
      <ul className={`flex flex-col gap-2.5 pt-4 text-base leading-none font-normal tracking-[-0.01em] ${onRed ? "text-white/50" : "text-brand-dark/40"}`}>
        {excluded.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5">
            <CheckIcon variant="dash" onRed={onRed} />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <p className={`text-xs ${onRed ? "text-white/70" : "text-brand-dark/50"}`}>{t("priceLabel")}:</p>
        <p className="mb-4 font-heading text-2xl font-semibold uppercase">
          {t("priceFrom")} {CALCULATOR_PACKAGES[id].pricePerSqm} ZŁ
        </p>
        <Button onClick={onRequestQuote} variant={onRed ? "white" : "primary"} className="w-full">
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
  const go = (delta: number) => setActiveId(PACKAGE_IDS[activeIndex + delta]);

  return (
    <section className="px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Badge>{t("title")}</Badge>

          <div className="flex gap-2 tablet:hidden">
            <NavButton direction="prev" onClick={() => go(-1)} disabled={activeIndex === 0} />
            <NavButton
              direction="next"
              onClick={() => go(1)}
              disabled={activeIndex === PACKAGE_IDS.length - 1}
            />
          </div>
        </div>

        <div className="mb-4 flex items-stretch tablet:hidden">
          {PACKAGE_IDS.map((id, i) => (
            <Fragment key={id}>
              {i > 0 && <span className="my-1 w-px shrink-0 bg-brand-dark/20" aria-hidden />}
              <button
                type="button"
                onClick={() => setActiveId(id)}
                className={`font-heading flex-1 rounded-md px-2 py-1.5 text-[20px] leading-none font-medium uppercase transition-colors ${
                  activeId === id ? "bg-brand-red text-white" : "text-brand-dark/60"
                }`}
              >
                {namesT(id)}
              </button>
            </Fragment>
          ))}
        </div>

        <div className="tablet:hidden">
          <PackageCard id={activeId} onRequestQuote={onRequestQuote} />
        </div>

        <div className="hidden tablet:grid tablet:grid-cols-3 tablet:items-center tablet:gap-6">
          {PACKAGE_IDS.map((id) => (
            <PackageCard
              key={id}
              id={id}
              onRequestQuote={onRequestQuote}
              className={id === "design" ? "tablet:-my-4 tablet:shadow-xl" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
