import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AdvantageCard, ITEMS } from "@/components/sections/home/Advantages";

export function Advantages({ onRequestQuote }: { onRequestQuote: () => void }) {
  const t = useTranslations("prices.advantages");
  const tCta = useTranslations("home.projects");
  const tNav = useTranslations("nav");

  return (
    <section className="px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="mx-auto max-w-[1300px]">
        <Badge className="mb-6 tablet:hidden">{t("title")}</Badge>

        <div className="flex gap-6">
          <div className="hidden w-40 shrink-0 tablet:block desktop:w-52">
            <Badge>{t("title")}</Badge>
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-1 gap-2.5 tablet:grid-cols-2">
            {ITEMS.map((item) => (
              <AdvantageCard key={item.id} id={item.id} icon={item.icon} />
            ))}

            <div className="relative flex flex-col justify-between gap-8 rounded-lg bg-brand-red p-7.5 text-white">
              <span
                className="absolute right-5 top-5 h-1.5 w-1.5 rounded-full bg-white"
                aria-hidden
              />
              <h3 className="font-heading text-[25px] font-medium uppercase leading-none tracking-[-0.01em]">
                {tCta("ctaHeadingMain")}{" "}
                <span className="font-semibold">
                  {tCta("ctaHeadingHighlight")}
                </span>
              </h3>
              <Button
                variant="white"
                onClick={onRequestQuote}
                className="w-full"
              >
                {tNav("cta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
