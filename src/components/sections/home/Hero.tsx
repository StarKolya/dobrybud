import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { RevealImage } from "@/components/ui/RevealImage";

export function Hero({ onCtaClick }: { onCtaClick: () => void }) {
  const t = useTranslations("home.hero");

  return (
    <section className="relative flex aspect-1440/751 overflow-hidden">
      <Header onCtaClick={onCtaClick} />

      <div className="absolute inset-0">
        <RevealImage
          afterSrc="/images/hero/hhero-before.png"
          beforeSrc="/images/hero/hhero-after.png"
          alt=""
          priority
        />
      </div>

      <div className="relative z-10 flex w-full flex-col gap-6 px-5 pb-16 desktop:px-16 desktop:pt-43.5">
        <h1 className="font-semibold w-fit  text-white leading-none">
          <span className="uppercase desktop:text-[80px]">
            {t("titleMain1")}
            <br />
            {t("titleMain2")}
          </span>
          <br />
          <span className="block w-fit bg-white/70 px-4 py-2 uppercase text-brand-dark desktop:text-[80px] rounded-md ml-auto mr-2 mt-4">
            {t("titleHighlight")}
          </span>
        </h1>

        <p className="flex items-center gap-3 text-2xl font-semibold text-white desktop:text-4xl mt-10">
          <span className="h-3 w-3 shrink-0 rounded-full bg-brand-red" aria-hidden />
          {t("priceFrom")}
        </p>

        <Button onClick={onCtaClick} className="w-fit">
          {t("cta")}
        </Button>
      </div>
    </section>
  );
}
