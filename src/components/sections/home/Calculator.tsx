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
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Badge>{t("badge")}</Badge>
        </div>

        <div className="rounded-3xl bg-brand-dark p-6 text-white desktop:p-10">
          <h2 className="mb-6 font-heading text-2xl font-semibold uppercase">{t("title")}</h2>

          <p className="mb-3 text-sm text-white/60">{t("step1")}</p>
          <div className="mb-6 flex flex-col divide-y divide-white/10 tablet:flex-row tablet:divide-x tablet:divide-y-0">
            {PACKAGE_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setPackageId(id)}
                className="flex flex-1 items-center justify-between gap-3 py-3 text-left transition-colors tablet:flex-col tablet:items-start tablet:justify-start tablet:px-5 tablet:py-0 tablet:first:pl-0 tablet:last:pr-0"
              >
                <span className="flex items-center gap-2 font-medium">
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full border transition-colors ${
                      packageId === id ? "border-brand-red bg-brand-red" : "border-white/40 bg-transparent"
                    }`}
                  />
                  {t(`packages.${id}`)}
                </span>
                <span className={`text-xs ${packageId === id ? "text-brand-red" : "text-white/50"}`}>
                  від {CALCULATOR_PACKAGES[id].pricePerSqm} zł/m²
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 desktop:grid-cols-[1fr_1fr_auto] desktop:items-end desktop:gap-3">
            <label className="flex flex-col gap-1 border-b border-white/20 pb-2 text-sm text-white/60">
              {t("step2")}
              <span className="flex items-baseline gap-1">
                <input
                  type="number"
                  min={1}
                  value={area}
                  onChange={(event) => setArea(Number(event.target.value))}
                  className="w-full bg-transparent text-white outline-none"
                />
                <span className="shrink-0 text-white/60">м²</span>
              </span>
            </label>

            <label className="flex flex-col gap-1 text-sm text-white/60">
              {t("step3")}
              <Select
                value={district}
                onChange={setDistrict}
                groups={DISTRICT_GROUPS}
                triggerClassName="border-b border-white/20 pb-2"
              />
            </label>

            <Button onClick={handleSubmit} className="w-full desktop:w-auto">
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
