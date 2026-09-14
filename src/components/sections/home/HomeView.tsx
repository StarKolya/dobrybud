"use client";

import { useState } from "react";
import { Hero } from "./Hero";
import { AboutStats } from "./AboutStats";
import { ProjectsShowcase } from "./ProjectsShowcase";
import { Partners } from "./Partners";
import { Testimonials } from "./Testimonials";
import { Calculator } from "./Calculator";
import { Footer } from "@/components/layout/Footer";
import { LeadFormPopup } from "@/components/popups/LeadFormPopup";
import { ExitIntentPopup } from "@/components/popups/ExitIntentPopup";

export function HomeView() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  return (
    <>
      <Hero onCtaClick={() => setLeadFormOpen(true)} />
      <AboutStats />
      <ProjectsShowcase onRequestQuote={() => setLeadFormOpen(true)} />
      <Partners />
      <Testimonials />
      <Calculator onGetQuote={() => setLeadFormOpen(true)} />
      <Footer />

      <LeadFormPopup open={leadFormOpen} onClose={() => setLeadFormOpen(false)} />
      <ExitIntentPopup onSendRequest={() => setLeadFormOpen(true)} />
    </>
  );
}
