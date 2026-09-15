"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCountUp } from "@/hooks/useCountUp";
import { Badge } from "@/components/ui/Badge";

const STATS = [
  {
    key: "years",
    target: 4,
    suffix: "+",
    order: "order-3 desktop:order-0",
    position: "desktop:col-start-1 desktop:row-start-1",
  },
  {
    key: "projects",
    target: 144,
    suffix: "",
    order: "order-2 desktop:order-0",
    position: "desktop:col-start-3 desktop:row-start-1",
  },
  {
    key: "hours",
    target: 5760,
    suffix: "+ M²",
    order: "order-6 desktop:order-0",
    position: "desktop:col-start-1 desktop:row-start-2",
  },
  {
    key: "team",
    target: 100,
    suffix: "%",
    order: "order-5 desktop:order-0",
    position: "desktop:col-start-3 desktop:row-start-2",
  },
] as const;

function FlagIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" className={className} aria-hidden>
      <path d="M1.5 1v16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M1.5 1.5h10.2l-3 3.6 3 3.6H1.5V1.5Z" fill="currentColor" />
    </svg>
  );
}

function Stat({
  target,
  suffix,
  labelKey,
  className = "",
}: {
  target: number;
  suffix: string;
  labelKey: (typeof STATS)[number]["key"];
  className?: string;
}) {
  const t = useTranslations("home.about.stats");
  const { value, ref } = useCountUp(target);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`flex flex-col gap-2 ${className}`}>
      <FlagIcon className="text-brand-red" />
      <span className="font-heading text-4xl font-semibold text-brand-dark desktop:text-5xl">
        {value}
        {suffix}
      </span>
      <span className="max-w-44 text-sm text-brand-dark/60">{t(labelKey)}</span>
    </div>
  );
}

export function AboutStats() {
  const t = useTranslations("home.about");

  return (
    <section className="px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="grid grid-cols-2 items-center gap-x-8 gap-y-10 desktop:grid-cols-3 desktop:gap-x-14 desktop:gap-y-16">
        <Badge className="order-1 col-span-2 desktop:col-span-3">{t("title")}</Badge>

        {STATS.map((stat) => (
          <Stat
            key={stat.key}
            target={stat.target}
            suffix={stat.suffix}
            labelKey={stat.key}
            className={`${stat.order} ${stat.position}`}
          />
        ))}

        <div className="relative order-4 col-span-2 aspect-4/3 desktop:order-0 desktop:col-start-2 desktop:row-start-1 desktop:row-span-2">
          <Image
            src="/images/about/loft-render.png"
            alt=""
            fill
            className="object-contain"
            sizes="(min-width: 1280px) 32rem, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
