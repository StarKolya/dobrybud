"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const POLL_INTERVAL_MS = 200;
const MAX_WAIT_MS = 10000;

/**
 * Fires the Meta Pixel `Lead` conversion when the thank-you page opens. On a
 * direct load the pixel script arrives after hydration, so wait for `fbq`.
 */
export function LeadEvent() {
  useEffect(() => {
    let waited = 0;
    let timer: ReturnType<typeof setTimeout>;

    const track = () => {
      if (window.fbq) {
        window.fbq("track", "Lead");
        return;
      }
      waited += POLL_INTERVAL_MS;
      if (waited < MAX_WAIT_MS) timer = setTimeout(track, POLL_INTERVAL_MS);
    };

    track();
    return () => clearTimeout(timer);
  }, []);

  return null;
}
