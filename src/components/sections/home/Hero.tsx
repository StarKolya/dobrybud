import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { RevealImage } from "@/components/ui/RevealImage";

export function Hero({ onCtaClick }: { onCtaClick: () => void }) {
  const t = useTranslations("home.hero");
  const tAlt = useTranslations("seo.alt");

  return (
    <section className="relative flex h-150 overflow-hidden desktop:h-187.5">
      <Header onCtaClick={onCtaClick} />

      <div className="absolute inset-0">
        <RevealImage
          afterSrc="/images/hero/hhero-before.png"
          beforeSrc="/images/hero/hhero-after.png"
          alt={tAlt("hero")}
          priority
        />
      </div>

      <div className="relative z-10 flex w-full flex-col gap-4 tablet:gap-6 px-5 tablet:pt-24 pt-35 pb-10 tablet:pb-16 desktop:px-16 desktop:pt-43.5">
        <h1 className="w-fit font-semibold uppercase leading-none tracking-[-0.01em] text-[32px] text-white tablet:text-[56px] desktop:text-[80px]">
          <span>
            {t("titleMain1")}
            <br />
            {t("titleMain2")}
          </span>
          <br />
          <span className="block w-fit bg-white/70 tablet:px-4 px-2 py-1 tablet:py-2 text-brand-dark rounded-md ml-auto tablet:mr-2 mt-1 tablet:mt-4">
            {t("titleHighlight")}
          </span>
        </h1>

        <p className="flex items-center gap-3 text-3xl font-medium text-white desktop:text-4xl mt-auto">
          <span className="h-3 w-3 shrink-0 rounded-full bg-brand-red" aria-hidden />
          {t("priceFrom")}
        </p>

        <Button onClick={onCtaClick} className="w-fit h-11.25">
          {t("cta")}
        </Button>
      </div>
    </section>
  );
}
