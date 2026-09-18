"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadFormPopup } from "@/components/popups/LeadFormPopup";
import { AboutUs } from "./AboutUs";
import { Numbers } from "./Numbers";
import { StagesSlider } from "./StagesSlider";
import { Advantages } from "@/components/sections/prices/Advantages";

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
        <Numbers />
        <StagesSlider />
        <Advantages onRequestQuote={() => setLeadFormOpen(true)} />
        <AboutUs />
      </main>
      <Footer />

      <LeadFormPopup open={leadFormOpen} onClose={() => setLeadFormOpen(false)} />
    </>
  );
}
