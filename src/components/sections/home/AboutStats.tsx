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
    order: "order-3",
    column: "left",
    mobileOffset: "translate-x-5 translate-y-10",
    offset: "tablet:translate-x-[145px]",
  },
  {
    key: "projects",
    target: 144,
    suffix: "",
    order: "order-2",
    column: "right",
    mobileOffset: "translate-y-5",
    offset: "tablet:translate-x-[50px] desktop:translate-x-[90px]",
  },
  {
    key: "hours",
    target: 5760,
    suffix: "+ M²",
    order: "order-6",
    column: "left",
    mobileOffset: "-translate-x-[55px] translate-y-[70px]",
    offset: "tablet:translate-x-15 tablet:translate-y-5",
  },
  {
    key: "team",
    target: 100,
    suffix: "%",
    order: "order-5",
    column: "right",
    mobileOffset: "translate-x-[15px] -translate-y-[70px]",
    offset: "tablet:translate-x-[18px] tablet:translate-y-12.5",
  },
] as const;

const LEFT_STATS = STATS.filter((stat) => stat.column === "left");
const RIGHT_STATS = STATS.filter((stat) => stat.column === "right");

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
  labelClassName = "max-w-[270px]",
}: {
  target: number;
  suffix: string;
  labelKey: (typeof STATS)[number]["key"];
  className?: string;
  labelClassName?: string;
}) {
  const t = useTranslations("home.about.stats");
  const { value, ref } = useCountUp(target);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`flex flex-col gap-2 ${className}`}
    >
      <FlagIcon className="h-4 w-4.5 tablet:h-5 tablet:w-5.5 text-brand-red" />
      <span className="font-heading whitespace-nowrap text-[45px] font-medium uppercase leading-none tracking-[-0.01em] lining-nums proportional-nums text-brand-dark tablet:text-[48px] desktop:text-[80px]">
        {value}
        {suffix}
      </span>
      <span className={`${labelClassName} tablet:max-w-[200px] desktop:max-w-[270px] font-sans text-[20px] tablet:text-base desktop:text-[22px] leading-none font-normal tracking-[-0.01em] lining-nums proportional-nums`}>
        {t(labelKey)}
      </span>
    </div>
  );
}

export function AboutStats() {
  const t = useTranslations("home.about");

  return (
    <section className="overflow-x-clip px-6 py-16 tablet:pb-0 desktop:px-16 desktop:py-24 desktop:pb-0">
      <div className="mx-auto max-w-360">
        <Badge className="order-1 col-span-2 tablet:col-span-3">
          {t("title")}
        </Badge>
        <div className="grid grid-cols-2 items-center gap-x-8 gap-y-10 tablet:grid-cols-3 tablet:gap-x-6 desktop:gap-x-14 tablet:gap-y-16 mt-9 h-[690px] tablet:h-120">
          {STATS.map((stat) => (
            <Stat
              key={stat.key}
              target={stat.target}
              suffix={stat.suffix}
              labelKey={stat.key}
              className={`${stat.order} ${stat.mobileOffset} tablet:hidden`}
              labelClassName={stat.key === "team" ? "max-w-[195px]" : undefined}
            />
          ))}

          <div className="hidden tablet:col-start-1 tablet:row-start-1 tablet:row-span-2 tablet:flex tablet:h-full tablet:flex-col tablet:justify-between">
            {LEFT_STATS.map((stat) => (
              <Stat
                key={stat.key}
                target={stat.target}
                suffix={stat.suffix}
                labelKey={stat.key}
                className={stat.offset}
              />
            ))}
          </div>

          <div className="hidden tablet:col-start-3 tablet:row-start-1 tablet:row-span-2 tablet:flex tablet:h-full tablet:flex-col tablet:justify-between">
            {RIGHT_STATS.map((stat) => (
              <Stat
                key={stat.key}
                target={stat.target}
                suffix={stat.suffix}
                labelKey={stat.key}
                className={stat.offset}
              />
            ))}
          </div>

          <div className="relative order-4 col-span-2 aspect-586/522 w-full max-w-[450px] justify-self-center tablet:max-w-none tablet:order-0 tablet:col-span-1 tablet:col-start-2 tablet:row-start-1 tablet:row-span-2 tablet:self-start tablet:justify-self-center tablet:w-[436px] desktop:w-[586px] tablet:z-10">
            <Image
              src="/images/about/3d-house.png"
              alt=""
              fill
              className="object-contain rotate-[5deg] tablet:translate-y-20 desktop:-translate-y-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
