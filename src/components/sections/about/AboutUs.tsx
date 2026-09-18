import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";

const POINTS = ["p1", "p2", "p3", "p4", "p5"] as const;

export function AboutUs() {
  const t = useTranslations("about.aboutUs");

  return (
    <section className="bg-brand-gray px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="desktop:grid desktop:grid-cols-[auto_1fr_1fr] desktop:items-start desktop:gap-10">
        <Badge className="desktop:self-start">{t("title")}</Badge>

        <div className="relative mt-6 aspect-4/3 overflow-hidden rounded-lg desktop:order-3 desktop:mt-0 desktop:aspect-auto desktop:min-h-[360px]">
          <Image
            src="/images/about/build.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>

        <ol className="mt-2.5 grid grid-cols-2 gap-2.5 desktop:order-2 desktop:mt-0 desktop:flex desktop:flex-col">
          {POINTS.map((key, i) => (
            <li
              key={key}
              className="flex flex-col gap-4 rounded-lg bg-white p-4 last:col-span-2 desktop:flex-row desktop:items-center desktop:py-3"
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
