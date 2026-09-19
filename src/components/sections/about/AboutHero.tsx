import Image from "next/image";
import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";

export function AboutHero({ onCtaClick }: { onCtaClick: () => void }) {
  const t = useTranslations("about.hero");

  return (
    <section className="relative flex h-150 overflow-hidden desktop:h-187.5">
      <Header onCtaClick={onCtaClick} />

      <div className="absolute inset-0">
        <Image src="/images/hero/hero-about.png" alt="" fill priority sizes="100vw" className="object-cover" />
      </div>

      <div className="relative z-10 flex w-full flex-col justify-end px-5 pb-10 tablet:pb-16 desktop:px-16">
        <h1 className="w-fit font-semibold uppercase leading-none tracking-[-0.01em] text-[32px] text-white tablet:text-[56px] desktop:text-[80px]">
          {t("titleMain1")}
          <br />
          <span className="mt-1 flex flex-wrap items-center gap-x-2 tablet:mt-4 tablet:gap-x-4">
            {t("titleMain2")}
            <span className="rounded-md bg-white/70 px-2 py-1 text-brand-dark tablet:px-4 tablet:py-2">
              {t("titleHighlight")}
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}
