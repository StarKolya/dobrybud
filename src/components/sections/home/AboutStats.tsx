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
    <svg viewBox="0 0 22 21" fill="none" className={className} aria-hidden>
      <path
        d="M20.5858 3.41421C21.8457 2.15428 20.9534 0 19.1716 0H2C0.89543 0 0 0.895431 0 2V18.4424C0 20.1843 2.07217 21.0936 3.35411 19.9142L12.5 11.5L20.5858 3.41421Z"
        fill="currentColor"
      />
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
      <FlagIcon className="h-5 w-5.5 text-brand-red" />
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
      <Badge className="order-1 col-span-2 desktop:col-span-3">{t("title")}</Badge>
      <div className="grid grid-cols-2 items-center gap-x-8 gap-y-10 desktop:grid-cols-3 desktop:gap-x-14 desktop:gap-y-16">

        {STATS.map((stat) => (
          <Stat
            key={stat.key}
            target={stat.target}
            suffix={stat.suffix}
            labelKey={stat.key}
            className={`${stat.order} ${stat.position}`}
          />
        ))}

        <div className="relative order-4 col-span-2 aspect-4/3 desktop:order-0 desktop:col-span-1 desktop:col-start-2 desktop:row-start-1 desktop:row-span-2">
          <Image
            src="/images/about/3d-house.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
