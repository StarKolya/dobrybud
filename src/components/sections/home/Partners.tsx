import { useTranslations } from "next-intl";

const PARTNERS = ["Knauf", "Kubala", "Kerakoll", "Atlas"];

export function Partners() {
  const t = useTranslations("home.partners");
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <section className="overflow-hidden bg-brand-gray py-8">
      <div className="mb-6 px-6 desktop:px-16">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
          {t("title")}
        </span>
      </div>

      <div className="flex w-max animate-marquee gap-16 whitespace-nowrap px-8">
        {loop.map((partner, index) => (
          <span key={`${partner}-${index}`} className="text-2xl font-semibold text-brand-dark/70">
            {partner}
          </span>
        ))}
      </div>
    </section>
  );
}
