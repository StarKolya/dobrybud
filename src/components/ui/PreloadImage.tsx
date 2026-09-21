"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const PRELOAD_DELAY_MS = 3000;

/**
 * Popup images only mount when the popup opens, so they would start loading late.
 * Renders a hidden copy after a short delay so the browser has it cached by then.
 * `sizes` must match the popup's own <Image> so both resolve to the same URL.
 */
export function PreloadImage({ src, sizes }: { src: string; sizes: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setReady(true), PRELOAD_DELAY_MS);
    return () => clearTimeout(id);
  }, []);

  if (!ready) return null;
  return <Image src={src} alt="" width={1} height={1} sizes={sizes} loading="eager" className="hidden" />;
}
