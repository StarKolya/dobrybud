"use client";

import { useTranslations } from "next-intl";
import { useExitIntent } from "@/hooks/useExitIntent";
import { Modal } from "@/components/ui/Modal";

export function ExitIntentPopup({ onSendRequest }: { onSendRequest: () => void }) {
  const t = useTranslations("exitPopup");
  const { triggered, dismiss } = useExitIntent();

  return (
    <Modal open={triggered} onClose={dismiss} className="overflow-hidden bg-brand-red text-white desktop:h-auto">
      <div className="flex h-full flex-col items-center gap-6 p-8 text-center desktop:h-auto">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          {t("badge")}
        </span>
        <h2 className="font-heading text-2xl font-semibold uppercase leading-tight">{t("title")}</h2>
        <button
          type="button"
          onClick={() => {
            dismiss();
            onSendRequest();
          }}
          className="rounded-full bg-white px-6 py-3 text-sm font-medium text-brand-red hover:bg-white/90"
        >
          {t("cta")}
        </button>
        {/* TODO: interior photo background per Figma */}
      </div>
    </Modal>
  );
}
