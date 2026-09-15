import type { CalculatorInput, CalculatorPackage, PackageId } from "@/types";

export const CALCULATOR_PACKAGES: Record<PackageId, CalculatorPackage> = {
  basic: { id: "basic", pricePerSqm: 890 },
  design: { id: "design", pricePerSqm: 1200 },
  premium: { id: "premium", pricePerSqm: 1490 },
};

export function calculateEstimate({ packageId, areaSqm }: CalculatorInput): number {
  const pkg = CALCULATOR_PACKAGES[packageId];
  return Math.round(pkg.pricePerSqm * areaSqm);
}
