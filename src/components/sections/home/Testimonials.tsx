"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import type { Testimonial } from "@/types";

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Аліна",
    subtitle: "Квартира під оренду",
    quote:
      "Дуже задоволені результатом! Ремонт завершили в обумовлені терміни, кошторис не змінився, а якість робіт перевершила очікування.",
    beforeImage: "/images/testimonials/review-1-before.jpg",
    afterImage: "/images/testimonials/review-1-after.jpg",
  },
];

export function Testimonials() {
  const t = useTranslations("home.reviews");
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TESTIMONIALS[activeIndex];

  const go = (delta: number) => {
    setActiveIndex((prev) => (prev + delta + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="bg-brand-gray px-6 py-16 desktop:px-16 desktop:py-24">
      <h2 className="mb-10 text-2xl font-semibold desktop:text-4xl">{t("title")}</h2>

      <div className="grid grid-cols-1 gap-6 desktop:grid-cols-2">
        <div className="rounded-2xl bg-white p-6">
          <p className="font-medium">{active.name}</p>
          <p className="mb-4 text-sm text-brand-dark/50">{active.subtitle}</p>
          <p className="text-sm leading-6">{active.quote}</p>
        </div>

        <BeforeAfterSlider
          beforeSrc={active.beforeImage}
          afterSrc={active.afterImage}
          alt={`${active.name} — before/after`}
        />
      </div>

      <div className="mt-8 flex gap-2">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous review"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-dark/20 hover:bg-white"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next review"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red text-white"
        >
          →
        </button>
      </div>
    </section>
  );
}
