import { Badge } from "@/components/ui/Badge";
import Image from "next/image";
import { useTranslations } from "next-intl";

const PARTNERS = [
  { name: "Knauf", src: "/images/partners/knauf.png" },
  { name: "Kubala", src: "/images/partners/kubala.png" },
  { name: "Kerakoll", src: "/images/partners/kerakoll.png" },
  { name: "Atlas", src: "/images/partners/atlas.png" },
];

export function Partners() {
  const t = useTranslations("home.partners");
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <section className="overflow-hidden bg-brand-gray py-8">
      <div className="mb-6 px-6 desktop:px-16">
        <Badge>{t("title")}</Badge>
      </div>

      <div className="flex w-max animate-marquee items-center gap-16 whitespace-nowrap px-8">
        {loop.map((partner, index) => (
          <div key={`${partner.name}-${index}`} className="relative h-10 w-28 shrink-0 desktop:h-12 desktop:w-36">
            <Image
              src={partner.src}
              alt={partner.name}
              fill
              className="object-contain"
              sizes="150px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
