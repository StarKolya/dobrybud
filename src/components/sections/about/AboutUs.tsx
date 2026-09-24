import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";

const POINTS = ["p1", "p2", "p3", "p4", "p5"] as const;

export function AboutUs() {
  const t = useTranslations("about.aboutUs");
  const tAlt = useTranslations("seo.alt");

  return (
    <section className="bg-brand-gray px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="mx-auto max-w-[1300px] tablet:flex tablet:gap-6">
        <div className="tablet:w-60 tablet:shrink-0">
          <Badge>{t("title")}</Badge>
        </div>

        <div className="tablet:grid tablet:min-w-0 tablet:flex-1 tablet:grid-cols-2 tablet:items-stretch tablet:gap-x-[9px]">
          <div className="relative mt-6 aspect-4/3 overflow-hidden rounded-lg tablet:order-3 tablet:mt-0 tablet:aspect-auto tablet:min-h-[400px]">
            <Image
              src="/images/about/build.png"
              alt={tAlt("about")}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>

          <ol className="mt-2.5 grid grid-cols-2 gap-2.5 tablet:order-2 tablet:mt-0 tablet:flex tablet:flex-col">
            {POINTS.map((key, i) => (
              <li
                key={key}
                className="flex flex-col gap-4 rounded-lg bg-white p-4 last:col-span-2 tablet:flex-1 tablet:flex-row tablet:items-stretch tablet:gap-5 tablet:p-[5px]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-dark font-heading text-white lining-nums proportional-nums tablet:h-auto tablet:w-auto tablet:aspect-square tablet:text-[24px] tablet:font-light desktop:text-[30px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[18px] leading-tight tracking-[-0.01em] text-brand-dark tablet:self-center">
                  {t(key)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
