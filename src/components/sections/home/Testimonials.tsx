"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Badge } from "@/components/ui/Badge";
import { NavButton } from "@/components/ui/NavButton";
import type { Testimonial } from "@/types";

// TODO: replace the duplicated entries below with real reviews once more come in.
const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Аліна",
    subtitle: "Квартира під оренду",
    quote:
      "Дуже задоволені результатом! Ремонт завершили в обумовлені терміни, кошторис не змінився, а якість робіт перевершила очікування. Усі питання вирішували швидко, тому процес пройшов без зайвого стресу. Однозначно рекомендуємо!",
    avatarImage: "/images/testimonials/avatar-1.png",
    beforeImage: "/images/testimonials/review-1-before.png",
    afterImage: "/images/testimonials/review-1-after.jpg",
  },
  {
    id: "2",
    name: "Марта",
    subtitle: "Квартира під ремонт",
    quote:
      "Команда чітко тримала терміни та бюджет. Сподобалось, що на кожному етапі надсилали фото прогресу, тож ми завжди знали, що відбувається.",
    avatarImage: "/images/testimonials/avatar-1.png",
    beforeImage: "/images/testimonials/review-1-before.png",
    afterImage: "/images/testimonials/review-1-after.jpg",
  },
  {
    id: "3",
    name: "Олег",
    subtitle: "Будинок під ключ",
    quote:
      "Робили капітальний ремонт будинку — складний проєкт, але виконали якісно і без сюрпризів по кошторису. Рекомендую всім знайомим.",
    avatarImage: "/images/testimonials/avatar-1.png",
    beforeImage: "/images/testimonials/review-1-before.png",
    afterImage: "/images/testimonials/review-1-after.jpg",
  },
  {
    id: "4",
    name: "Ірина",
    subtitle: "Квартира під оренду",
    quote:
      "Дуже вдячна за увагу до деталей та професійний підхід. Результат перевершив очікування, а спілкування з командою було приємним і зрозумілим.",
    avatarImage: "/images/testimonials/avatar-1.png",
    beforeImage: "/images/testimonials/review-1-before.png",
    afterImage: "/images/testimonials/review-1-after.jpg",
  },
  {
    id: "5",
    name: "Андрій",
    subtitle: "Квартира під ключ",
    quote:
      "Ремонт зробили швидко й акуратно. Приємно вразила чесна комунікація: про будь-які зміни попереджали заздалегідь, а фінальна вартість збіглася з кошторисом.",
    avatarImage: "/images/testimonials/avatar-1.png",
    beforeImage: "/images/testimonials/review-1-before.png",
    afterImage: "/images/testimonials/review-1-after.jpg",
  },
  {
    id: "6",
    name: "Софія",
    subtitle: "Квартира під оренду",
    quote:
      "Просто чудова команда! Дизайн-проєкт втілили точно, без жодних відхилень. Тепер квартира здається за вищою ціною, ніж ми очікували.",
    avatarImage: "/images/testimonials/avatar-1.png",
    beforeImage: "/images/testimonials/review-1-before.png",
    afterImage: "/images/testimonials/review-1-after.jpg",
  },
  {
    id: "7",
    name: "Максим",
    subtitle: "Будинок під ключ",
    quote:
      "Працювали над будинком понад пів року. Усі етапи були розписані заздалегідь, майстри приходили вчасно та залишали після себе чистоту.",
    avatarImage: "/images/testimonials/avatar-1.png",
    beforeImage: "/images/testimonials/review-1-before.png",
    afterImage: "/images/testimonials/review-1-after.jpg",
  },
  {
    id: "8",
    name: "Наталія",
    subtitle: "Квартира під ремонт",
    quote:
      "Звернулися з невеликим бюджетом, і нам одразу запропонували оптимальне рішення. Результатом дуже задоволені, дякуємо за професійну роботу!",
    avatarImage: "/images/testimonials/avatar-1.png",
    beforeImage: "/images/testimonials/review-1-before.png",
    afterImage: "/images/testimonials/review-1-after.jpg",
  },
];

function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex w-full shrink-0 flex-col gap-4 rounded-2xl bg-white p-5 tablet:w-95">
      <div className="flex items-end gap-3">
        {testimonial.avatarImage ? (
          <Image
            src={testimonial.avatarImage}
            alt=""
            width={80}
            height={80}
            className="h-20 w-20 shrink-0 rounded-lg object-cover"
          />
        ) : (
          <span
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-brand-gray text-lg font-medium text-brand-dark"
            aria-hidden
          >
            {testimonial.name.charAt(0)}
          </span>
        )}
        <div>
          <p className="font-heading text-[25px] leading-none font-medium tracking-[-0.01em] lining-nums proportional-nums">
            {testimonial.name}
          </p>
          <p className="mt-2 font-sans text-[16px] leading-none font-normal tracking-[-0.01em] text-brand-dark/50 lining-nums proportional-nums">
            {testimonial.subtitle}
          </p>
        </div>
      </div>

      <p className="font-sans text-[16px] leading-none font-normal tracking-[-0.01em] lining-nums proportional-nums tablet:text-[18px]">
        {testimonial.quote}
      </p>

      <BeforeAfterSlider
        beforeSrc={testimonial.beforeImage}
        afterSrc={testimonial.afterImage}
        alt={`${testimonial.name} — before/after`}
      />
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("home.reviews");
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const canGoPrev = index > 0;
  const canGoNext = index < TESTIMONIALS.length - 1;

  const go = (delta: number) => {
    setIndex((prev) => Math.min(Math.max(prev + delta, 0), TESTIMONIALS.length - 1));
  };

  useEffect(() => {
    const updateOffset = () => {
      const track = trackRef.current;
      const target = track?.children[index] as HTMLElement | undefined;
      if (target) setOffset(target.offsetLeft);
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [index]);

  return (
    <section className="overflow-x-clip bg-brand-gray px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-6 flex items-center justify-between gap-4 tablet:hidden">
          <Badge>{t("title")}</Badge>
          <div className="flex gap-2">
            <NavButton direction="prev" onClick={() => go(-1)} disabled={!canGoPrev} />
            <NavButton direction="next" onClick={() => go(1)} disabled={!canGoNext} />
          </div>
        </div>

        <div className="flex flex-col gap-6 tablet:flex-row">
          <div className="hidden tablet:flex tablet:w-40 tablet:shrink-0 tablet:flex-col tablet:justify-between desktop:w-52">
            <Badge>{t("title")}</Badge>
            <div className="flex gap-2">
              <NavButton direction="prev" onClick={() => go(-1)} disabled={!canGoPrev} />
              <NavButton direction="next" onClick={() => go(1)} disabled={!canGoNext} />
            </div>
          </div>

          <div className="min-w-0 flex-1 overflow-hidden tablet:-mr-[max(1.5rem,calc((100vw_-_1300px)/2))] desktop:-mr-[max(4rem,calc((100vw_-_1300px)/2))]">
            <div
              ref={trackRef}
              className="flex items-start gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${offset}px)` }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <ReviewCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
