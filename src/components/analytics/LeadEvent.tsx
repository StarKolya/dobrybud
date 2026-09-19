"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fires the Meta Pixel `Lead` conversion once when the thank-you page opens. */
export function LeadEvent() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    window.fbq?.("track", "Lead");
  }, []);

  return null;
}
