"use client";

import type { FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function NewsletterForm() {
  const t = useTranslations("footer");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        placeholder={t("emailPlaceholder")}
        aria-label={t("emailPlaceholder")}
        className="min-w-0 flex-1 rounded-md bg-brand-gray px-4 py-2.5 text-sm text-brand-dark outline-none placeholder:text-brand-dark/50"
      />
      <Button type="submit" className="px-4 py-2.5 text-sm">
        {t("subscribe")}
      </Button>
    </form>
  );
}
