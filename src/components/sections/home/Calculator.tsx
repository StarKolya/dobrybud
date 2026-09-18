"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select, type SelectGroup } from "@/components/ui/Select";
import { CalculatorResultPopup } from "@/components/popups/CalculatorResultPopup";
import { CALCULATOR_PACKAGES, calculateEstimate } from "@/lib/calculator";
import type { PackageId } from "@/types";

const PACKAGE_IDS: PackageId[] = ["basic", "design", "premium"];

const LABEL_CLASSNAME = "font-sans text-[22px] font-medium leading-none tracking-[-0.01em] text-white";

const DISTRICT_GROUPS: SelectGroup[] = [
  {
    label: "Лівий берег",
    options: [
      "Bemowo",
      "Białołęka",
      "Bielany",
      "Mokotów",
      "Ochota",
      "Śródmieście",
      "Ursus",
      "Ursynów",
      "Wilanów",
      "Włochy",
      "Wola",
      "Żoliborz",
    ],
  },
  {
    label: "Правий берег",
    options: ["Praga-Południe", "Praga-Północ", "Rembertów", "Targówek", "Wawer", "Wesoła"],
  },
];

export function Calculator({ onGetQuote }: { onGetQuote: (estimate: number) => void }) {
  const t = useTranslations("home.calculator");
  const [packageId, setPackageId] = useState<PackageId>("basic");
  const [area, setArea] = useState(50);
  const [district, setDistrict] = useState("");
  const [estimate, setEstimate] = useState<number | null>(null);
  const [resultOpen, setResultOpen] = useState(false);

  const handleSubmit = () => {
    const result = calculateEstimate({ packageId, areaSqm: area, district });
    setEstimate(result);
    setResultOpen(true);
  };

  return (
    <section className="px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="mb-6 tablet:hidden">
        <Badge>{t("badge")}</Badge>
      </div>

      <div className="flex flex-col gap-6 tablet:flex-row">
        <div className="hidden tablet:block tablet:w-40 tablet:shrink-0 desktop:w-52">
          <Badge>{t("badge")}</Badge>
        </div>

        <div className="flex-1 rounded-3xl bg-brand-dark p-6 text-white desktop:p-10">
          <h2 className="mb-6 font-heading text-[40px] font-medium uppercase leading-none tracking-[-0.01em]">
            {t("title")}
          </h2>

          <p className={`mb-3 ${LABEL_CLASSNAME}`}>{t("step1")}</p>
          <div className="mb-6 grid grid-cols-1 gap-2.5 tablet:grid-cols-3">
            {PACKAGE_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setPackageId(id)}
                className={`flex h-25 items-center justify-between gap-3 rounded-lg border bg-white px-4 py-3 text-left text-brand-dark transition-colors tablet:flex-col tablet:items-start tablet:justify-center tablet:gap-2 ${
                  packageId === id ? "border-brand-red" : "border-transparent hover:border-black/10"
                }`}
              >
                <span className="flex items-center gap-2 text-[30px] font-medium uppercase leading-none tracking-[-0.01em]">
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full border transition-colors ${
                      packageId === id ? "border-brand-red bg-brand-red" : "border-black/30 bg-transparent"
                    }`}
                  />
                  {t(`packages.${id}`)}
                </span>
                <span
                  className={`font-heading text-[20px] font-medium leading-none tracking-[-0.01em] ${
                    packageId === id ? "text-brand-red" : "text-brand-dark/50"
                  }`}
                >
                  від {CALCULATOR_PACKAGES[id].pricePerSqm} zł/m²
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 desktop:grid-cols-[200fr_250fr_520fr] desktop:items-end">
            <label className="flex flex-col gap-2">
              <span className={LABEL_CLASSNAME}>{t("step2")}</span>
              <span className="flex h-15 items-center gap-1 rounded-lg bg-white px-4 text-brand-dark">
                <input
                  type="number"
                  min={1}
                  value={area}
                  onChange={(event) => setArea(Number(event.target.value))}
                  className="w-full bg-transparent outline-none"
                />
                <span className="shrink-0 text-sm text-brand-dark/50">м²</span>
              </span>
            </label>

            <label className="flex flex-col gap-2">
              <span className={LABEL_CLASSNAME}>{t("step3")}</span>
              <Select
                value={district}
                onChange={setDistrict}
                groups={DISTRICT_GROUPS}
                triggerClassName="h-15 rounded-lg bg-white px-4 text-brand-dark"
              />
            </label>

            <Button onClick={handleSubmit} className="h-15 w-full py-0">
              {t("submit")}
            </Button>
          </div>
        </div>
      </div>

      {estimate !== null && (
        <CalculatorResultPopup
          open={resultOpen}
          onClose={() => setResultOpen(false)}
          onLeaveRequest={() => {
            setResultOpen(false);
            onGetQuote(estimate);
          }}
          packageId={packageId}
          area={area}
          district={district}
          estimate={estimate}
        />
      )}
    </section>
  );
}
