"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface RevealImageProps {
  afterSrc: string;
  beforeSrc: string;
  alt: string;
  priority?: boolean;
  radiusPx?: number;
}

/**
 * Cursor-follow "reveal" effect: the after-renovation image is masked by a
 * soft circle that follows the pointer, uncovering the before photo beneath.
 */
export function RevealImage({ afterSrc, beforeSrc, alt, priority, radiusPx = 140 }: RevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setPointer(null)}
      className="relative h-full w-full overflow-hidden"
    >
      <Image src={afterSrc} alt={alt} fill priority={priority} className="object-cover" />
      <div
        className="absolute inset-0"
        style={{
          maskImage: pointer
            ? `radial-gradient(circle ${radiusPx}px at ${pointer.x}px ${pointer.y}px, black 55%, transparent 100%)`
            : "none",
          WebkitMaskImage: pointer
            ? `radial-gradient(circle ${radiusPx}px at ${pointer.x}px ${pointer.y}px, black 55%, transparent 100%)`
            : "none",
          opacity: pointer ? 1 : 0,
          transition: "opacity 150ms ease",
        }}
      >
        <Image src={beforeSrc} alt="" fill priority={priority} className="object-cover" />
      </div>
    </div>
  );
}
