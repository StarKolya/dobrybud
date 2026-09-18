"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadFormPopup } from "@/components/popups/LeadFormPopup";
import { PackagesScroll } from "./PackagesScroll";
import { PackagesTable } from "./PackagesTable";
import { Advantages } from "./Advantages";
import { PackageBanner } from "./PackageBanner";
import { ProjectsHighlight } from "./ProjectsHighlight";

export function PricesView() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  return (
    <>
      <Header variant="solid" sticky onCtaClick={() => setLeadFormOpen(true)} />
      <main className="flex flex-1 flex-col">
        <PackagesScroll />
        <PackagesTable onRequestQuote={() => setLeadFormOpen(true)} />
        <Advantages onRequestQuote={() => setLeadFormOpen(true)} />
        <PackageBanner onCtaClick={() => setLeadFormOpen(true)} />
        <ProjectsHighlight />
      </main>
      <Footer />

      <LeadFormPopup open={leadFormOpen} onClose={() => setLeadFormOpen(false)} />
    </>
  );
}
