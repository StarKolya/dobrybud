"use client";

import { useTranslations } from "next-intl";
import { CALCULATOR_PACKAGES } from "@/lib/calculator";
import type { PackageId } from "@/types";

const PACKAGE_IDS: PackageId[] = ["basic", "design", "premium"];

/**
 * Each card pins to the viewport in sequence while the section scrolls,
 * per the step-by-step animation shown in the Figma mock (section 8.1).
 * TODO: implement the pin/scale scroll-driven transition; this renders the
 * static stacked state as a starting point.
 */
export function PackagesScroll() {
  const t = useTranslations("home.calculator.packages");

  return (
    <section className="relative px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="flex flex-col gap-6">
        {PACKAGE_IDS.map((id, index) => (
          <div
            key={id}
            className="sticky rounded-3xl bg-brand-dark p-8 text-white"
            style={{ top: `${96 + index * 24}px` }}
          >
            <h3 className="font-heading text-2xl font-semibold">{t(id)}</h3>
            <p className="text-brand-red">від {CALCULATOR_PACKAGES[id].pricePerSqm} zł/m²</p>
          </div>
        ))}
      </div>
    </section>
  );
}
