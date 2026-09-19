import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";

const POINTS = ["p1", "p2", "p3", "p4", "p5"] as const;

export function AboutUs() {
  const t = useTranslations("about.aboutUs");

  return (
    <section className="bg-brand-gray px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="mx-auto max-w-[1300px] tablet:grid tablet:grid-cols-[auto_1fr_1fr] tablet:items-start tablet:gap-10">
        <Badge className="tablet:self-start">{t("title")}</Badge>

        <div className="relative mt-6 aspect-4/3 overflow-hidden rounded-lg tablet:order-3 tablet:mt-0 tablet:aspect-auto tablet:min-h-[360px]">
          <Image
            src="/images/about/build.png"
            alt=""
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>

        <ol className="mt-2.5 grid grid-cols-2 gap-2.5 tablet:order-2 tablet:mt-0 tablet:flex tablet:flex-col">
          {POINTS.map((key, i) => (
            <li
              key={key}
              className="flex flex-col gap-4 rounded-lg bg-white p-4 last:col-span-2 tablet:flex-row tablet:items-center tablet:py-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-dark text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[18px] leading-tight tracking-[-0.01em] text-brand-dark">
                {t(key)}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
