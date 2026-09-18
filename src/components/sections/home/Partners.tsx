import { Badge } from "@/components/ui/Badge";
import Image from "next/image";
import { useTranslations } from "next-intl";

const PARTNERS = [
  { name: "Knauf", src: "/images/partners/knauf.png", width: 232, height: 138, heightClass: "h-10 desktop:h-12" },
  { name: "Kubala", src: "/images/partners/kubala.png", width: 344, height: 106, heightClass: "h-10 desktop:h-12" },
  { name: "Kerakoll", src: "/images/partners/kerakoll.png", width: 466, height: 106, heightClass: "h-10 desktop:h-12" },
  { name: "Atlas", src: "/images/partners/atlas.png", width: 190, height: 200, heightClass: "h-14 desktop:h-16" },
];

export function Partners() {
  const t = useTranslations("home.partners");
  // Keep in sync with the -12.5% (100 / REPEAT_COUNT) offset in the .animate-marquee keyframes.
  const REPEAT_COUNT = 8;
  const loop = Array.from({ length: REPEAT_COUNT }, () => PARTNERS).flat();

  return (
    <section className="overflow-hidden bg-brand-gray py-8 ">
      <div className="mb-6 px-6 desktop:px-16">
        <div className="mx-auto max-w-[1300px]">
          <Badge>{t("title")}</Badge>
        </div>
      </div>

      <div className="flex h-16 w-max animate-marquee items-center whitespace-nowrap">
        {loop.map((partner, index) => (
          <Image
            key={`${partner.name}-${index}`}
            src={partner.src}
            alt={partner.name}
            width={partner.width}
            height={partner.height}
            className={`mr-8 w-auto shrink-0 object-contain ${partner.heightClass}`}
          />
        ))}
      </div>
    </section>
  );
}
