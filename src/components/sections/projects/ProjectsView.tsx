"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadFormPopup } from "@/components/popups/LeadFormPopup";
import { ProjectsScroll } from "./ProjectsScroll";

export function ProjectsView() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  return (
    <>
      <Header variant="solid" sticky onCtaClick={() => setLeadFormOpen(true)} />
      <main className="flex flex-1 flex-col">
        <ProjectsScroll />
      </main>
      <Footer />

      <LeadFormPopup open={leadFormOpen} onClose={() => setLeadFormOpen(false)} />
    </>
  );
}
