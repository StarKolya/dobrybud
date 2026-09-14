"use client";

import { useTranslations } from "next-intl";
import { useCountUp } from "@/hooks/useCountUp";

const STATS = [
  { target: 4, suffix: "", key: "years" },
  { target: 5760, suffix: "", key: "hours" },
  { target: 144, suffix: "", key: "projects" },
  { target: 100, suffix: "", key: "team" },
] as const;

function Stat({ target, labelKey }: { target: number; labelKey: (typeof STATS)[number]["key"] }) {
  const t = useTranslations("home.about.stats");
  const { value, ref } = useCountUp(target);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="flex flex-col gap-1">
      <span className="font-heading text-4xl font-semibold text-brand-dark desktop:text-5xl">
        {value}
      </span>
      <span className="text-sm text-brand-dark/60">{t(labelKey)}</span>
    </div>
  );
}

export function AboutStats() {
  const t = useTranslations("home.about");

  return (
    <section className="px-6 py-16 desktop:px-16 desktop:py-24">
      <h2 className="mb-10 text-2xl font-semibold desktop:text-4xl">{t("title")}</h2>
      <div className="grid grid-cols-2 gap-8 desktop:grid-cols-4">
        {STATS.map((stat) => (
          <Stat key={stat.key} target={stat.target} labelKey={stat.key} />
        ))}
      </div>
      {/* TODO: fade + scale 3D model per Figma */}
    </section>
  );
}
