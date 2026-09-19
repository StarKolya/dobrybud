import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function ConsultationBanner({
  onHasDesignClick,
  onNoDesignClick,
}: {
  onHasDesignClick: () => void;
  onNoDesignClick: () => void;
}) {
  const t = useTranslations("home.banner");

  return (
    <section className="py-16 tablet:px-16 desktop:py-24">
      <div className="relative mx-auto flex h-100 max-w-[1300px] items-center justify-center overflow-hidden tablet:h-115 tablet:items-center tablet:rounded-3xl">
        <Image src="/images/banner.png" alt="" fill className="object-cover" />

        <div className="relative z-10 flex flex-col items-center gap-6 p-6 text-center tablet:max-w-160 tablet:gap-8 desktop:max-w-200">
          <h2 className="font-heading text-[35px] font-semibold uppercase leading-none tracking-[-0.01em] text-balance text-white lining-nums proportional-nums tablet:text-[48px] desktop:text-[60px]">
            {t("title")}
          </h2>

          <div className="flex flex-col gap-[5px] tablet:flex-row tablet:gap-3">
            <Button onClick={onHasDesignClick} className="h-11.25 w-67.5 tablet:h-13.75 tablet:w-75">
              {t("hasDesign")}
            </Button>
            <Button
              variant="white"
              onClick={onNoDesignClick}
              className="h-11.25 w-67.5 text-brand-dark! hover:text-white! tablet:h-13.75 tablet:w-75"
            >
              {t("noDesign")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
