"use client";

import { useState } from "react";
import { AboutHero } from "./AboutHero";
import { Footer } from "@/components/layout/Footer";
import { LeadFormPopup } from "@/components/popups/LeadFormPopup";
import { AboutUs } from "./AboutUs";
import { Numbers } from "./Numbers";
import { StagesSlider } from "./StagesSlider";
import { Advantages } from "@/components/sections/prices/Advantages";
import { ProjectsHighlight } from "@/components/sections/prices/ProjectsHighlight";

export function AboutView() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  return (
    <>
      <main className="flex flex-1 flex-col">
        <AboutHero onCtaClick={() => setLeadFormOpen(true)} />
        <Numbers />
        <Advantages onRequestQuote={() => setLeadFormOpen(true)} />
        <AboutUs />
        <StagesSlider />
        <ProjectsHighlight redResult />
      </main>
      <Footer />

      <LeadFormPopup open={leadFormOpen} onClose={() => setLeadFormOpen(false)} />
    </>
  );
}
