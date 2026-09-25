"use client";

import { useEffect, useRef, useState } from "react";
import { EXIT_POPUP_MIN_TIME_ON_SITE_MS, SESSION_STORAGE_KEYS } from "@/lib/constants";

/**
 * Fires once per session: on desktop when the cursor moves toward the top
 * of the viewport, on touch devices when the tab is about to be hidden.
 * Only arms after the visitor has spent EXIT_POPUP_MIN_TIME_ON_SITE_MS on the site.
 */
export function useExitIntent() {
  const [triggered, setTriggered] = useState(false);
  const hasFiredRef = useRef(false);

  useEffect(() => {
    let sessionStartedAt = Date.now();
    try {
      if (sessionStorage.getItem(SESSION_STORAGE_KEYS.exitPopupShown)) hasFiredRef.current = true;
      const stored = Number(sessionStorage.getItem(SESSION_STORAGE_KEYS.sessionStartedAt));
      if (stored > 0) sessionStartedAt = stored;
      else sessionStorage.setItem(SESSION_STORAGE_KEYS.sessionStartedAt, String(sessionStartedAt));
    } catch {}

    const fire = () => {
      if (hasFiredRef.current) return;
      if (Date.now() - sessionStartedAt < EXIT_POPUP_MIN_TIME_ON_SITE_MS) return;
      hasFiredRef.current = true;
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEYS.exitPopupShown, "1");
      } catch {}
      setTriggered(true);
    };

    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) fire();
    };

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const onVisibilityChange = () => {
      if (isTouch && document.visibilityState === "hidden") fire();
    };

    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return { triggered, dismiss: () => setTriggered(false) };
}
