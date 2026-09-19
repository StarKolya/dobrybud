"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

const TEXT = "font-sans text-[20px] tablet:text-base desktop:text-[20px] font-normal leading-none tracking-[-0.01em]";

export function NewsletterForm() {
  const t = useTranslations("footer");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitted) return;
    const email = new FormData(event.currentTarget).get("email");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) return;
    } catch {
      return;
    }
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex transition-[gap] duration-500 ${submitted ? "gap-0" : "gap-[5px]"}`}
    >
      <input
        type="email"
        name="email"
        required
        tabIndex={submitted ? -1 : 0}
        placeholder={t("emailPlaceholder")}
        aria-label={t("emailPlaceholder")}
        className={`min-w-0 overflow-hidden rounded-md bg-brand-gray py-2.5 text-[#2C2C2C] outline-none transition-all duration-500 placeholder:text-brand-dark/50 font-sans text-sm font-normal leading-none tracking-[-0.01em] ${
          submitted ? "pointer-events-none grow-0 basis-0 px-0 opacity-0" : "grow basis-0 px-4"
        }`}
      />
      <Button
        type="submit"
        aria-disabled={submitted}
        className={`whitespace-nowrap px-4 py-2.5 transition-all duration-500 ${TEXT} ${
          submitted ? "grow cursor-default" : "grow-0"
        }`}
      >
        {submitted ? t("subscribeThanks") : t("subscribe")}
      </Button>
    </form>
  );
}
