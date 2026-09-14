"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadFormPopup } from "@/components/popups/LeadFormPopup";
import { StagesSlider } from "./StagesSlider";

export function AboutView() {
  const t = useTranslations("about");
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  return (
    <>
      <Header variant="solid" onCtaClick={() => setLeadFormOpen(true)} />
      <main className="flex flex-1 flex-col">
        <h1 className="px-6 pt-8 text-3xl font-semibold desktop:px-16 desktop:text-5xl">
          {t("title")}
        </h1>
        <StagesSlider />
      </main>
      <Footer />

      <LeadFormPopup open={leadFormOpen} onClose={() => setLeadFormOpen(false)} />
    </>
  );
}
