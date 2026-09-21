"use client";

import { useEffect, useRef, useState } from "react";
import { SESSION_STORAGE_KEYS } from "@/lib/constants";

/**
 * Fires once per session: on desktop when the cursor moves toward the top
 * of the viewport, on touch devices when the tab is about to be hidden.
 */
export function useExitIntent() {
  const [triggered, setTriggered] = useState(false);
  const hasFiredRef = useRef(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_STORAGE_KEYS.exitPopupShown)) hasFiredRef.current = true;
    } catch {}

    const fire = () => {
      if (hasFiredRef.current) return;
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
