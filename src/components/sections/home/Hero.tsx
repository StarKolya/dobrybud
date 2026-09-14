import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { RevealImage } from "@/components/ui/RevealImage";

export function Hero({ onCtaClick }: { onCtaClick: () => void }) {
  const t = useTranslations("home.hero");

  return (
    <section className="relative flex h-[640px] items-end overflow-hidden desktop:h-[880px]">
      <Header onCtaClick={onCtaClick} />

      <div className="absolute inset-0">
        <RevealImage
          afterSrc="/images/hero/hero-after.png"
          beforeSrc="/images/hero/hero-before.png"
          alt=""
          priority
        />
      </div>

      <div className="relative z-10 flex w-full flex-col gap-6 px-6 pb-16 desktop:px-16 desktop:pb-24">
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white desktop:text-6xl">
          {t("titleMain")} <span className="text-brand-red">{t("titleHighlight")}</span>
        </h1>
        <Button onClick={onCtaClick} className="w-fit">
          {t("cta")}
        </Button>
      </div>
    </section>
  );
}
