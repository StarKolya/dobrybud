"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { CALCULATOR_PACKAGES, calculateEstimate } from "@/lib/calculator";
import type { PackageId } from "@/types";

const PACKAGE_IDS: PackageId[] = ["basic", "design", "premium"];

export function Calculator({ onGetQuote }: { onGetQuote: (estimate: number) => void }) {
  const t = useTranslations("home.calculator");
  const [packageId, setPackageId] = useState<PackageId>("basic");
  const [area, setArea] = useState(50);
  const [district, setDistrict] = useState("");
  const [estimate, setEstimate] = useState<number | null>(null);

  const pricePerSqm = useMemo(() => CALCULATOR_PACKAGES[packageId].pricePerSqm, [packageId]);

  const handleSubmit = () => {
    const result = calculateEstimate({ packageId, areaSqm: area, district });
    setEstimate(result);
  };

  return (
    <section className="px-6 py-16 desktop:px-16 desktop:py-24">
      <div className="mx-auto max-w-2xl rounded-3xl bg-brand-dark p-6 text-white desktop:p-10">
        <h2 className="mb-6 font-heading text-2xl font-semibold">{t("title")}</h2>

        <p className="mb-3 text-sm text-white/60">{t("step1")}</p>
        <div className="mb-6 grid grid-cols-1 gap-3 desktop:grid-cols-3">
          {PACKAGE_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setPackageId(id)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                packageId === id
                  ? "border-brand-red bg-white/5"
                  : "border-white/15 hover:border-white/30"
              }`}
            >
              <span className="flex items-center gap-2 font-medium">
                <span
                  className={`h-2 w-2 rounded-full ${
                    packageId === id ? "bg-brand-red" : "bg-white/30"
                  }`}
                />
                {t(`packages.${id}`)}
              </span>
              <span className="text-xs text-brand-red">
                від {CALCULATOR_PACKAGES[id].pricePerSqm} zł/m²
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 desktop:grid-cols-[1fr_1fr_auto]">
          <label className="flex flex-col gap-1 text-sm text-white/60">
            {t("step2")}
            <input
              type="number"
              min={1}
              value={area}
              onChange={(event) => setArea(Number(event.target.value))}
              className="rounded-lg bg-white/10 px-3 py-2 text-white outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-white/60">
            {t("step3")}
            <input
              type="text"
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
              className="rounded-lg bg-white/10 px-3 py-2 text-white outline-none"
            />
          </label>

          <Button onClick={handleSubmit} className="self-end">
            {t("submit")}
          </Button>
        </div>

        {estimate !== null && (
          <div className="mt-6 rounded-xl bg-white/5 p-4">
            <p className="text-sm text-white/60">{t("resultTitle")}</p>
            <p className="font-heading text-3xl font-semibold text-brand-red">
              {estimate.toLocaleString("uk-UA")} ZŁ
            </p>
            <p className="mb-4 text-xs text-white/40">
              {area} m² × {pricePerSqm} zł/m²
            </p>
            <Button onClick={() => onGetQuote(estimate)}>{t("leadCta")}</Button>
          </div>
        )}
      </div>
    </section>
  );
}
