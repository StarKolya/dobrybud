"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCountUp } from "@/hooks/useCountUp";
import { Badge } from "@/components/ui/Badge";

const STATS = [
  { key: "hours", target: 5760, suffix: "+ M²", className: "order-1 col-span-2 pr-[150px]! tablet:pr-5! tablet:col-span-1 tablet:order-3 tablet:w-[304px]" },
  { key: "projects", target: 144, suffix: "", className: "order-2 col-span-2 pr-[40%]! tablet:pr-5! tablet:col-span-1 tablet:order-4 tablet:w-[290px]" },
  { key: "team", target: 100, suffix: "%", className: "order-3 col-span-1 tablet:order-2 tablet:w-[246px]" },
  { key: "years", target: 4, suffix: "+", className: "order-4 col-span-1 tablet:order-1 tablet:w-[175px]" },
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

function StatCard({
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
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`flex flex-col justify-between gap-2 rounded-lg bg-white p-5 tablet:h-[calc(50%-2.5px)] ${className}`}
    >
      <FlagIcon className="h-4 w-4.5 text-brand-red" />
      <span className="font-heading text-4xl font-semibold leading-none text-brand-dark tablet:text-5xl">
        {value}
        {suffix}
      </span>
      <span className="text-[18px] font-normal leading-none tracking-[-0.01em] text-brand-dark">
        {t(labelKey)}
      </span>
    </div>
  );
}

export function Numbers() {
  const t = useTranslations("about.numbers");

  return (
    <section className="overflow-x-clip bg-brand-gray px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="mx-auto max-w-[1300px]">
      <Badge>{t("title")}</Badge>

      <div className="relative mt-6 tablet:mt-9 tablet:flex tablet:h-[490px] tablet:overflow-hidden tablet:rounded-lg">
        <Image
          src="/images/family.png"
          alt=""
          fill
          sizes="100vw"
          className="hidden object-cover tablet:block"
        />

        <div className="relative z-10 grid grid-cols-2 tablet:flex gap-2.5 tablet:m-0 tablet:h-full tablet:w-[639px] tablet:flex-wrap tablet:content-stretch tablet:gap-[5px] tablet:p-5">
          <div className="pointer-events-none absolute -top-4 -right-[162px] z-20 h-[310px] w-[310px] tablet:hidden">
            <Image
              src="/images/popups/3d-house-4.png"
              alt=""
              fill
              sizes="310px"
              className="object-contain"
            />
          </div>
          {STATS.map((stat) => (
            <StatCard
              key={stat.key}
              target={stat.target}
              suffix={stat.suffix}
              labelKey={stat.key}
              className={stat.className}
            />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
