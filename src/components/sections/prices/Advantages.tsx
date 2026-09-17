import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";

const ITEM_IDS = ["deadline", "contract", "warranty"] as const;

function DeadlineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10.5" r="7" className="stroke-brand-red" strokeWidth="1.5" />
      <path d="M10 6.5v4l2.5 1.5" className="stroke-brand-red" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 2h6" className="stroke-brand-red" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ContractIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 2.5h7l3 3v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-14a.5.5 0 0 1 .5-.5Z" className="stroke-brand-red" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 9h6M7 12h6M7 15h3.5" className="stroke-brand-red" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WarrantyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 2.5 16 5v5c0 4.2-2.7 6.9-6 8.5-3.3-1.6-6-4.3-6-8.5V5l6-2.5Z" className="stroke-brand-red" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7.3 10 9.3 12l3.4-4.2" className="stroke-brand-red" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ITEM_ICONS: Record<(typeof ITEM_IDS)[number], () => React.JSX.Element> = {
  deadline: DeadlineIcon,
  contract: ContractIcon,
  warranty: WarrantyIcon,
};

export function Advantages() {
  const t = useTranslations("prices.advantages");

  return (
    <section className="px-6 py-16 desktop:px-16 desktop:py-24">
      <Badge className="mb-4 tablet:mb-6">{t("title")}</Badge>

      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3 tablet:gap-6">
        {ITEM_IDS.map((id) => {
          const Icon = ITEM_ICONS[id];
          return (
            <div key={id} className="flex flex-col gap-4 rounded-2xl bg-white p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-red/10">
                <Icon />
              </span>
              <div>
                <p className="mb-1.5 font-heading text-sm font-semibold uppercase leading-tight tracking-[-0.01em]">
                  {t(`items.${id}.title`)}
                </p>
                <p className="text-sm leading-5 text-brand-dark/50">
                  {t(`items.${id}.description`)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
