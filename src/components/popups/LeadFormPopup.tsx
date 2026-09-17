"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ROUTES } from "@/lib/constants";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { PhoneInput } from "@/components/ui/PhoneInput";

export function LeadFormPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations("leadForm");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: wire to lead-submission API
    onClose();
    router.push(ROUTES.thankYou);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidthClassName="max-w-[850px]"
      closeButtonClassName="rounded-md bg-brand-red text-white hover:bg-brand-dark"
      className="overflow-hidden"
    >
      <div className="flex flex-col tablet:h-92.5 tablet:flex-row">
        <div className="flex flex-col tablet:w-1/2">
          <div className="tablet:pt-16.25 tablet:pl-19 ">
            <div className="mb-2 flex items-center gap-2">
              <span aria-hidden className="h-3 w-3 rounded-full bg-brand-red" />
              <h2 className="font-heading text-3xl font-medium leading-none tracking-[-0.01em] lining-nums proportional-nums">
                {t("title")}
              </h2>
            </div>
            <p className="font-sans text-base font-normal leading-none tracking-[-0.01em] lining-nums proportional-nums text-foreground mt-2.5">
              {t("description")}
            </p>
          </div>

          <div className="relative h-56 flex-1 overflow-hidden tablet:h-auto tablet:min-h-45">
            <div className="absolute -left-20 h-119.5 w-119.5 rotate-15">
              <Image src="/images/popups/3d-house.png" alt="" fill className="object-cover" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-6 tablet:pt-16.25 tablet:w-1/2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-1.25">
            <input
              required
              name="name"
              placeholder={t("name")}
              className="rounded-lg bg-brand-gray px-4 py-3 text-sm font-normal text-[#5c5c5c] placeholder:text-[#5c5c5c]"
            />
            <PhoneInput required name="phone" placeholder={t("phoneMask")} />
            <div className="relative">
              <input
                name="area"
                type="number"
                placeholder={t("area")}
                className="w-full rounded-lg bg-brand-gray px-4 py-3 pr-12 text-sm font-normal text-[#5c5c5c] placeholder:text-[#5c5c5c]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-brand-dark/40">
                {t("areaUnit")}
              </span>
            </div>
            <Button type="submit" className="mt-5 h-11.75">
              {t("submit")}
            </Button>
            <p className="mt-2.5 text-center font-sans text-xs font-light text-brand-dark">@{t("privacyNote")}</p>
          </form>
        </div>
      </div>
    </Modal>
  );
}
