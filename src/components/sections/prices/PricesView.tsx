"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadFormPopup } from "@/components/popups/LeadFormPopup";
import { PackagesScroll } from "./PackagesScroll";
import { PackagesTable } from "./PackagesTable";
import { PackageBanner } from "./PackageBanner";
import { ProjectsHighlight } from "./ProjectsHighlight";

export function PricesView() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  return (
    <>
      <Header variant="solid" sticky compact onCtaClick={() => setLeadFormOpen(true)} />
      <main className="flex flex-1 flex-col">
        <PackagesScroll />
        <PackagesTable onRequestQuote={() => setLeadFormOpen(true)} />
        <ProjectsHighlight compact />
        <PackageBanner onCtaClick={() => setLeadFormOpen(true)} />
      </main>
      <Footer />

      <LeadFormPopup open={leadFormOpen} onClose={() => setLeadFormOpen(false)} />
    </>
  );
}
