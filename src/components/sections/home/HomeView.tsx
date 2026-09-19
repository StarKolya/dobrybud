"use client";

import { useState } from "react";
import { Hero } from "./Hero";
import { ConsultationBanner } from "./ConsultationBanner";
import { AboutStats } from "./AboutStats";
import { ProjectsSlider } from "./ProjectsSlider";
import { Partners } from "./Partners";
import { PackagesTable } from "@/components/sections/prices/PackagesTable";
import { Advantages } from "./Advantages";
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
  const [exitTestOpen, setExitTestOpen] = useState(false);

  return (
    <>
      <Hero onCtaClick={() => setLeadFormOpen(true)} />
      
      <AboutStats />
      <ProjectsSlider onCtaClick={() => setLeadFormOpen(true)} />
      <Partners />
      <PackagesTable onRequestQuote={() => setLeadFormOpen(true)} />
      <Advantages />
      <ConsultationBanner
        onHasDesignClick={() => setLeadFormUploadOpen(true)}
        onNoDesignClick={() => setLeadFormOpen(true)}
      />
      <Testimonials />
      <Calculator onGetQuote={() => setLeadFormOpen(true)} />
      <FAQ />
      <Footer />

      <LeadFormPopup open={leadFormOpen} onClose={() => setLeadFormOpen(false)} />
      <LeadFormUploadPopup open={leadFormUploadOpen} onClose={() => setLeadFormUploadOpen(false)} />
      <ExitIntentPopup
        onSendRequest={() => setLeadFormOpen(true)}
        forceOpen={exitTestOpen}
        onForceClose={() => setExitTestOpen(false)}
      />

      {/* TEMP: remove once the exit popup is approved. */}
      <button
        type="button"
        onClick={() => setExitTestOpen(true)}
        className="fixed bottom-4 left-4 z-40 rounded-md bg-brand-dark px-3 py-2 text-xs text-white opacity-80 hover:opacity-100"
      >
        Test exit popup
      </button>
    </>
  );
}
