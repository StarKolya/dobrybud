import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function PackageBanner({ onCtaClick }: { onCtaClick: () => void }) {
  const t = useTranslations("prices.packageBanner");

  return (
    <section className="py-16 tablet:px-16 desktop:py-24">
      <div className="relative mx-auto flex h-100 max-w-[1300px] items-end justify-center overflow-hidden tablet:h-115 tablet:items-center tablet:rounded-3xl">
        <Image src="/images/banner.png" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-brand-dark/50" />

        <div className="relative z-10 flex flex-col items-center gap-4 p-6 text-center tablet:max-w-160 tablet:gap-5">
          <h2 className="font-heading text-[28px] font-medium uppercase leading-none tracking-[-0.01em] text-white tablet:text-[48px]">
            {t("title")}
          </h2>
          <p className="text-sm text-white tablet:text-lg">{t("description")}</p>
          <Button onClick={onCtaClick} className="mt-2 h-11.25 w-67.5 tablet:h-13.75 tablet:w-auto">
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
