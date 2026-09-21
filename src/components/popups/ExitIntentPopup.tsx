"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useExitIntent } from "@/hooks/useExitIntent";
import { Modal } from "@/components/ui/Modal";

export function ExitIntentPopup({
  onSendRequest,
}: {
  onSendRequest: () => void;
}) {
  const t = useTranslations("exitPopup");
  const { triggered, dismiss } = useExitIntent();

  return (
    <Modal
      open={triggered}
      onClose={dismiss}
      maxWidthClassName="max-w-full tablet:max-w-[600px]"
      closeButtonClassName="z-20 rounded-md bg-white text-xl text-brand-dark hover:bg-white/90"
      closeButtonSizeClassName="h-9 w-9"
      closeButtonPositionClassName="right-3 top-3"
      className="h-[652px] max-h-full overflow-hidden rounded-xl! bg-brand-red! text-white tablet:h-[690px]"
    >
      <div className="pointer-events-none absolute left-1/2 top-[43%] h-[613px] w-[603px] tablet:h-[740px] tablet:w-[740px] -translate-x-1/2">
        <Image src="/images/popups/3d-house-3.png" alt="" fill sizes="740px" className="object-cover" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 pt-[56px] text-center tablet:px-10 tablet:pt-[64px]">
        <p className="flex items-center gap-2 font-sans text-sm font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
          {t("badge")}
        </p>
        <h2 className="mt-4 whitespace-pre-line font-heading text-[30px] font-medium uppercase leading-[1.1] tracking-[-0.01em] lining-nums proportional-nums">
          {t("title")}
        </h2>
        <button
          type="button"
          onClick={() => {
            dismiss();
            onSendRequest();
          }}
          className="mt-6 h-[47px] w-full max-w-[350px] rounded-md bg-white px-4 font-sans text-base font-normal text-black transition-colors hover:bg-brand-gray tablet:mt-8"
        >
          {t("cta")}
        </button>
      </div>
    </Modal>
  );
}
