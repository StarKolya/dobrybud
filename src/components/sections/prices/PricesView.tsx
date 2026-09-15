"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadFormPopup } from "@/components/popups/LeadFormPopup";
import { PackagesScroll } from "./PackagesScroll";
import { PackagesTable } from "./PackagesTable";
import { ProjectsHighlight } from "./ProjectsHighlight";

export function PricesView() {
  const t = useTranslations("prices");
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  return (
    <>
      <Header variant="solid" onCtaClick={() => setLeadFormOpen(true)} />
      <main className="flex flex-1 flex-col">
        <h1 className="px-6 pt-8 font-heading text-3xl font-semibold uppercase leading-tight desktop:px-16 desktop:text-5xl">
          {t("title")}
          <br />
          <span className="mt-2 inline-block rounded-md bg-brand-dark px-4 py-2 text-white">
            {t("titleHighlight")}
          </span>
        </h1>
        <PackagesScroll />
        <PackagesTable onRequestQuote={() => setLeadFormOpen(true)} />
        <ProjectsHighlight />
      </main>
      <Footer />

      <LeadFormPopup open={leadFormOpen} onClose={() => setLeadFormOpen(false)} />
    </>
  );
}
