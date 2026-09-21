"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from "@/lib/constants";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import type { PackageId } from "@/types";

function PhoneIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a1.03 1.03 0 0 0-1.06.24l-1.57 1.97a15.05 15.05 0 0 1-6.59-6.59l1.95-1.66c.29-.29.39-.71.25-1.08a11.36 11.36 0 0 1-.56-3.53c0-.55-.45-1-1-1H4.19c-.55 0-1 .45-1 1C3.19 13.06 10.94 20.81 20.01 20.81c.55 0 1-.45 1-1v-3.43c0-.55-.45-1-1-1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CalculatorResultPopup({
  open,
  onClose,
  onLeaveRequest,
  packageId,
  area,
  district,
  estimate,
}: {
  open: boolean;
  onClose: () => void;
  onLeaveRequest: () => void;
  packageId: PackageId;
  area: number;
  district: string;
  estimate: number;
}) {
  const t = useTranslations("home.calculator");

  const summaryLine = [
    t(`packageNames.${packageId}`),
    `${area} м²`,
    district ? `${t("districtLabel")} ${district}` : null,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidthClassName="max-w-3xl"
      closeButtonClassName="rounded-md bg-brand-red text-white hover:bg-brand-dark"
    >
      <div className="flex flex-col divide-y divide-brand-dark/10 p-6 tablet:flex-row tablet:divide-x tablet:divide-y-0 tablet:p-10">
        <div className="flex flex-col items-center pb-6 text-center tablet:w-1/2 tablet:pb-0 tablet:pr-10">
          <Image src="/icons/calculator.svg" alt="" width={24} height={31} className="mb-4 h-8 w-auto" />
          <p className="mb-2 text-sm text-brand-dark">{t("resultTitle")}</p>
          <p className="mb-2 font-heading text-4xl font-semibold text-brand-red">
            {estimate.toLocaleString("uk-UA")} ZŁ
          </p>
          <p className="mb-6 text-xs text-brand-dark">{summaryLine}</p>
          <Button onClick={onLeaveRequest} className="w-full tablet:w-auto">
            {t("leadCta")}
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center pt-6 text-center tablet:w-1/2 tablet:pt-0 tablet:pl-10">
          <span className="mb-4 text-brand-red">
            <PhoneIcon />
          </span>
          <p className="mb-4 max-w-56 text-sm text-brand-dark">{t("resultPopup.contactTitle")}</p>
          <Link href={`tel:${CONTACT_PHONE_HREF}`} className="mb-1 font-heading text-2xl font-semibold text-brand-dark">
            {CONTACT_PHONE_DISPLAY}
          </Link>
          <p className="text-xs text-brand-dark">{t("resultPopup.privacyNote")}</p>
        </div>
      </div>
    </Modal>
  );
}
