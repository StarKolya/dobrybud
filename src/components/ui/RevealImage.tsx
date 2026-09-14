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
  const [visible, setVisible] = useState(false);

  const updatePointer = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({ x: clientX - rect.left, y: clientY - rect.top });
  };

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    updatePointer(event.clientX, event.clientY);
    setVisible(true);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    updatePointer(touch.clientX, touch.clientY);
    setVisible(true);
  };

  const maskImage = pointer
    ? `radial-gradient(circle ${radiusPx}px at ${pointer.x}px ${pointer.y}px, black 55%, transparent 100%)`
    : "none";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setVisible(false)}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setVisible(false)}
      className="relative h-full w-full overflow-hidden"
    >
      <Image
        src={afterSrc}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="scale-x-[-1] object-cover"
      />
      <div className="absolute inset-0 bg-[#00000059]" />
      <div
        className="absolute inset-0"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          opacity: visible ? 1 : 0,
          transition: "opacity 150ms ease",
        }}
      >
        <Image
          src={beforeSrc}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="scale-x-[-1] object-cover"
        />
        <div className="absolute inset-0 bg-[#00000059]" />
      </div>
    </div>
  );
}
