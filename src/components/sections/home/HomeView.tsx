"use client";

import { useState } from "react";
import { Hero } from "./Hero";
import { AboutStats } from "./AboutStats";
import { ProjectsShowcase } from "./ProjectsShowcase";
import { Partners } from "./Partners";
import { PackagesTable } from "@/components/sections/prices/PackagesTable";
import { Testimonials } from "./Testimonials";
import { Calculator } from "./Calculator";
import { FAQ } from "./FAQ";
import { Footer } from "@/components/layout/Footer";
import { LeadFormPopup } from "@/components/popups/LeadFormPopup";
import { LeadFormUploadPopup } from "@/components/popups/LeadFormUploadPopup";
import { ExitIntentPopup } from "@/components/popups/ExitIntentPopup";

export function HomeView() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [leadFormUploadOpen, setLeadFormUploadOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 left-4 z-40 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setLeadFormOpen(true)}
          className="rounded-md bg-brand-dark px-3 py-2 text-xs text-white"
        >
          Test: pop-up (без проєкту)
        </button>
        <button
          type="button"
          onClick={() => setLeadFormUploadOpen(true)}
          className="rounded-md bg-brand-dark px-3 py-2 text-xs text-white"
        >
          Test: pop-up (є дизайн-проєкт)
        </button>
      </div>

      <Hero onCtaClick={() => setLeadFormOpen(true)} />
      <AboutStats />
      <ProjectsShowcase onRequestQuote={() => setLeadFormOpen(true)} />
      <Partners />
      <PackagesTable onRequestQuote={() => setLeadFormOpen(true)} />
      <Testimonials />
      <Calculator onGetQuote={() => setLeadFormOpen(true)} />
      <FAQ />
      <Footer />

      <LeadFormPopup open={leadFormOpen} onClose={() => setLeadFormOpen(false)} />
      <LeadFormUploadPopup open={leadFormUploadOpen} onClose={() => setLeadFormUploadOpen(false)} />
      <ExitIntentPopup onSendRequest={() => setLeadFormOpen(true)} />
    </>
  );
}
