"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ROUTES } from "@/lib/constants";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { FileUpload } from "@/components/ui/FileUpload";

export function LeadFormUploadPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations("leadForm");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: wire to lead-submission API (multipart, includes uploaded file)
    onClose();
    router.push(ROUTES.thankYou);
  };

  return (
    <Modal open={open} onClose={onClose} className="flex h-full flex-col p-6 desktop:h-auto desktop:p-10">
      <h2 className="mb-2 font-heading text-2xl font-semibold">{t("title")}</h2>
      <p className="mb-6 text-sm text-brand-dark/60">{t("description")}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          required
          name="name"
          placeholder={t("name")}
          className="rounded-lg border border-brand-dark/15 px-4 py-3"
        />
        <input
          required
          name="phone"
          type="tel"
          placeholder={t("phone")}
          className="rounded-lg border border-brand-dark/15 px-4 py-3"
        />
        <input
          name="area"
          type="number"
          placeholder={t("area")}
          className="rounded-lg border border-brand-dark/15 px-4 py-3"
        />
        <FileUpload />
        <Button type="submit">{t("submit")}</Button>
      </form>
    </Modal>
  );
}
