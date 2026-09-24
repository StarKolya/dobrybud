import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AdvantageCard, ITEMS } from "@/components/sections/home/Advantages";

export function Advantages({ onRequestQuote }: { onRequestQuote: () => void }) {
  const t = useTranslations("prices.advantages");
  const tCta = useTranslations("home.projects");
  const tNav = useTranslations("nav");

  // Phones: "РОЗРАХУЄМО / ВАРТІСТЬ РЕМОНТУ / ВАШОЇ КВАРТИРИ / ЗА 1 ДЕНЬ", per design.
  const [firstWord, ...restWords] = tCta("ctaHeadingMain").split(" ");
  const headingLines = [firstWord, restWords.slice(0, 2).join(" "), restWords.slice(2).join(" ")].filter(Boolean);

  return (
    <section className="px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="mx-auto max-w-[1300px]">
        <Badge className="mb-6 tablet:hidden">{t("title")}</Badge>

        <div className="flex gap-6">
          <div className="hidden shrink-0 tablet:block tablet:w-60">
            <Badge>{t("title")}</Badge>
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-1 gap-2.5 tablet:grid-cols-2">
            {ITEMS.map((item) => (
              <AdvantageCard key={item.id} id={item.id} icon={item.icon} />
            ))}

            <div className="@container relative flex flex-col justify-between gap-8 rounded-lg bg-brand-red p-7.5 text-white">
              <span
                className="absolute right-5 top-5 hidden h-1.5 w-1.5 rounded-full bg-white tablet:block"
                aria-hidden
              />
              {/* Shrinks on narrow phones so the longest (Russian) line still fits. */}
              <h3 className="font-heading text-[min(25px,8cqw)] font-medium uppercase leading-none tracking-[-0.01em] tablet:text-[25px]">
                {headingLines.map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br className="tablet:hidden" />}
                    {i > 0 && " "}
                    {line}
                  </span>
                ))}{" "}
                <span className="block font-semibold tablet:inline">
                  {tCta("ctaHeadingHighlight")}
                </span>
              </h3>
              <Button
                variant="white"
                onClick={onRequestQuote}
                className="w-[250px] max-w-full text-brand-dark! hover:text-white! tablet:w-full"
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
