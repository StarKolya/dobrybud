"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useExitIntent } from "@/hooks/useExitIntent";
import { Modal } from "@/components/ui/Modal";

export function ExitIntentPopup({
  onSendRequest,
  forceOpen = false,
  onForceClose,
}: {
  onSendRequest: () => void;
  /** Manual override, used by the temporary test button. */
  forceOpen?: boolean;
  onForceClose?: () => void;
}) {
  const t = useTranslations("exitPopup");
  const { triggered, dismiss: dismissAuto } = useExitIntent();
  const dismiss = () => {
    dismissAuto();
    onForceClose?.();
  };

  return (
    <Modal
      open={triggered || forceOpen}
      onClose={dismiss}
      maxWidthClassName="max-w-[300px] tablet:max-w-[460px]"
      closeButtonClassName="rounded-md bg-white text-xl text-brand-dark hover:bg-white/90"
      closeButtonSizeClassName="h-9 w-9"
      closeButtonPositionClassName="right-3 top-3"
      className="h-[500px] overflow-hidden rounded-xl! bg-brand-red text-white tablet:h-[527px]"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 aspect-square translate-y-[6%]">
        <Image src="/images/popups/3d-house-3.png" alt="" fill sizes="460px" className="object-contain" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 pt-14 text-center tablet:px-10 tablet:pt-16">
        <p className="flex items-center gap-2 font-sans text-sm font-medium tablet:text-base">
          <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
          {t("badge")}
        </p>
        <h2 className="mt-4 font-heading text-[24px] font-medium uppercase leading-none tracking-[-0.01em] lining-nums proportional-nums tablet:mt-5 tablet:text-[34px]">
          {t("title")}
        </h2>
        <button
          type="button"
          onClick={() => {
            dismiss();
            onSendRequest();
          }}
          className="mt-6 w-full max-w-[220px] rounded-md bg-white px-4 py-3 font-sans text-base font-normal text-brand-dark transition-colors hover:bg-brand-gray tablet:mt-8 tablet:max-w-[270px]"
        >
          {t("cta")}
        </button>
      </div>
    </Modal>
  );
}
