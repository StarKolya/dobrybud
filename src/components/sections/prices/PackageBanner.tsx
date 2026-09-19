import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function PackageBanner({ onCtaClick }: { onCtaClick: () => void }) {
  const t = useTranslations("prices.packageBanner");

  return (
    <section className="px-0 py-16 tablet:px-6 desktop:px-16 desktop:py-24">
      <div className="relative mx-auto flex h-[374px] tablet:h-[580px] max-w-[1300px] items-center justify-center overflow-hidden rounded-none tablet:rounded-[15px]">
        <Image src="/images/banner-2.png" alt="" fill className="object-cover" />

        <div className="relative z-10 flex max-w-88 flex-col items-center gap-4 p-6 text-center tablet:max-w-140 tablet:gap-5 desktop:max-w-175">
          <h2 className="font-heading text-[35px] font-semibold uppercase leading-none tracking-[-0.01em] lining-nums proportional-nums text-white tablet:text-[48px] desktop:text-[60px]">
            {t("title")}
          </h2>
          <p className="max-w-72 font-sans text-[20px] font-normal leading-none tracking-[-0.01em] lining-nums proportional-nums text-white tablet:max-w-105 tablet:text-lg tablet:font-medium desktop:max-w-140 desktop:text-[25px]">{t("description")}</p>
          <Button onClick={onCtaClick} className="mt-2 h-11.25 w-75 tablet:h-13.75 tablet:w-auto">
            <span className="tablet:hidden">{t("ctaShort")}</span>
            <span className="hidden tablet:inline">{t("cta")}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
