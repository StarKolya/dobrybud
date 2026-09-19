"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";

export function FAQ() {
  const t = useTranslations("home.faq");
  const items = t.raw("items") as { question: string; answer: string }[];
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-brand-gray px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-6 tablet:hidden">
          <Badge>{t("title")}</Badge>
        </div>

        <div className="flex flex-col gap-6 tablet:flex-row">
          <div className="hidden tablet:block tablet:w-40 tablet:shrink-0 desktop:w-52">
            <Badge>{t("title")}</Badge>
          </div>

          <div className="flex flex-1 flex-col gap-3">
            {items.map((item, index) => {
              const open = openIndex === index;
              return (
                <div key={item.question} className="rounded-[5px] bg-white">
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={open}
                    className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-heading text-[25px] leading-none font-medium tracking-[-0.01em] lining-nums proportional-nums">
                      {item.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        open ? "bg-brand-red text-white" : "text-brand-dark/40"
                      }`}
                      aria-hidden
                    >
                      <span
                        className="inline-block transition-transform duration-300"
                        style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        ↓
                      </span>
                    </span>
                  </button>

                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 font-sans text-[18px] leading-none font-normal tracking-[-0.01em] text-brand-dark/60 lining-nums proportional-nums">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
