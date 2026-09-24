"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Badge } from "@/components/ui/Badge";
import { NavButton } from "@/components/ui/NavButton";
import { useScrollSlider } from "@/hooks/useScrollSlider";
import type { Testimonial } from "@/types";

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    avatarImage: "/images/testimonials/1/avatar.png",
    beforeImage: "/images/testimonials/1/before.png",
    afterImage: "/images/testimonials/1/after.jpg",
  },
  {
    id: "2",
    avatarImage: "/images/testimonials/2/avatar.PNG",
    beforeImage: "/images/testimonials/2/before.JPG",
    afterImage: "/images/testimonials/2/after.JPG",
  },
  {
    id: "3",
    avatarImage: "/images/testimonials/3/avatar.PNG",
    beforeImage: "/images/testimonials/3/before.PNG",
    afterImage: "/images/testimonials/3/after.PNG",
  },
  {
    id: "4",
    avatarImage: "/images/testimonials/4/avatar.PNG",
    beforeImage: "/images/testimonials/4/before.PNG",
    afterImage: "/images/testimonials/4/after.PNG",
  },
  {
    id: "5",
    avatarImage: "/images/testimonials/5/avatar.PNG",
    beforeImage: "/images/testimonials/5/before.PNG",
    afterImage: "/images/testimonials/5/after.PNG",
  },
  {
    id: "6",
    avatarImage: "/images/testimonials/6/avatar.PNG",
    beforeImage: "/images/testimonials/6/before.PNG",
    afterImage: "/images/testimonials/6/after.PNG",
  },
];


function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  const t = useTranslations("home.reviews.items");
  const tAlt = useTranslations("seo.alt");
  const name = t(`${testimonial.id}.name`);
  return (
    <div className="flex w-full shrink-0 snap-start flex-col gap-4 rounded-2xl bg-white p-5 tablet:w-95">
      <div className="flex items-end gap-3">
        {testimonial.avatarImage ? (
          <Image
            src={testimonial.avatarImage}
            alt={tAlt("avatar", { name })}
            width={80}
            height={80}
            className="h-20 w-20 shrink-0 rounded-lg object-cover"
          />
        ) : (
          <span
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-brand-gray text-lg font-medium text-brand-dark"
            aria-hidden
          >
            {name.charAt(0)}
          </span>
        )}
        <div>
          <p className="font-heading text-[25px] leading-none font-medium tracking-[-0.01em] lining-nums proportional-nums">
            {name}
          </p>
          <p className="mt-2 font-sans text-[16px] leading-none font-normal tracking-[-0.01em] text-brand-dark/50 lining-nums proportional-nums">
            {t(`${testimonial.id}.subtitle`)}
          </p>
        </div>
      </div>

      <p className="font-sans text-[16px] leading-none font-normal tracking-[-0.01em] lining-nums proportional-nums tablet:text-[18px]">
        {t(`${testimonial.id}.quote`)}
      </p>

      <div className="mt-auto">
        <BeforeAfterSlider
          beforeSrc={testimonial.beforeImage}
          afterSrc={testimonial.afterImage}
          alt={`${name} — before/after`}
        />
      </div>
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("home.reviews");
  const { ref, atStart, atEnd, scrollBySlides, dragging, handlers } = useScrollSlider<HTMLDivElement>();

  return (
    <section className="overflow-x-clip bg-brand-gray px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-6 flex items-center justify-between gap-4 tablet:hidden">
          <Badge>{t("title")}</Badge>
          <div className="flex gap-2">
            <NavButton direction="prev" onClick={() => scrollBySlides(-1)} disabled={atStart} />
            <NavButton direction="next" onClick={() => scrollBySlides(1)} disabled={atEnd} />
          </div>
        </div>

        <div className="flex flex-col gap-6 tablet:flex-row">
          <div className="hidden tablet:flex tablet:w-40 tablet:shrink-0 tablet:flex-col tablet:justify-between desktop:w-52">
            <Badge>{t("title")}</Badge>
            <div className="flex gap-2">
              <NavButton direction="prev" onClick={() => scrollBySlides(-1)} disabled={atStart} />
              <NavButton direction="next" onClick={() => scrollBySlides(1)} disabled={atEnd} />
            </div>
          </div>

          <div
            ref={ref}
            {...handlers}
            className={`flex min-w-0 flex-1 items-stretch gap-6 overflow-x-auto overscroll-x-contain [scrollbar-width:none] tablet:-mr-[max(1.5rem,calc((100vw_-_1300px)/2))] desktop:-mr-[max(4rem,calc((100vw_-_1300px)/2))] [&::-webkit-scrollbar]:hidden ${
              // Snapping and smooth scrolling would fight the pointer, so they're off mid-drag.
              dragging ? "cursor-grabbing select-none" : "cursor-grab snap-x snap-mandatory scroll-smooth"
            }`}
          >
            {TESTIMONIALS.map((testimonial) => (
              <ReviewCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
