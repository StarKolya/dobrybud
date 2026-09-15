"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import type { PackageId } from "@/types";

const PACKAGE_IDS: PackageId[] = ["basic", "design", "premium"];

const PACKAGE_IMAGES: Record<PackageId, string> = {
  basic: "/images/prices/basic.jpg",
  design: "/images/prices/design.jpg",
  premium: "/images/prices/premium.jpg",
};

const STICKY_TOP_PX = 24;
const STICKY_STEP_PX = 32;

/**
 * Each card sticks to the top of the viewport in sequence as the section
 * scrolls, stacking with a slight peek of the previous card above it —
 * per the Figma scroll-animation mock. Disabled below `tablet:` since the
 * mobile mock shows the cards as a plain static stack instead.
 */
export function PackagesScroll() {
  const packagesT = useTranslations("home.calculator.packages");
  const t = useTranslations("prices");

  return (
    <section className="px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="flex flex-col gap-6 tablet:gap-8">
        {PACKAGE_IDS.map((id, index) => (
          <div
            key={id}
            className="overflow-hidden rounded-3xl tablet:sticky"
            style={{ top: `${STICKY_TOP_PX + index * STICKY_STEP_PX}px`, zIndex: index + 1 }}
          >
            <div className="relative tablet:h-[75vh]">
              <Image src={PACKAGE_IMAGES[id]} alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-6 text-white desktop:p-10">
                <h3 className="font-heading text-2xl font-semibold uppercase desktop:text-4xl">
                  {packagesT(id)}
                </h3>
                <p className="max-w-md text-sm leading-6 text-white/80">
                  {t(`packages.${id}.description`)}
                </p>
                <Button className="mt-1">{t("detailsCta")}</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
