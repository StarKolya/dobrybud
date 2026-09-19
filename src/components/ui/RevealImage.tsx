"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

  // Listen on the enclosing section so the effect also works beneath overlaid content.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const target: HTMLElement = container.closest("section") ?? container;

    const move = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      setPointer({ x: clientX - rect.left, y: clientY - rect.top });
      setVisible(true);
    };
    const onMouseMove = (e: MouseEvent) => move(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) move(touch.clientX, touch.clientY);
    };
    const hide = () => setVisible(false);

    target.addEventListener("mousemove", onMouseMove);
    target.addEventListener("mouseleave", hide);
    target.addEventListener("touchstart", onTouch, { passive: true });
    target.addEventListener("touchmove", onTouch, { passive: true });
    target.addEventListener("touchend", hide);
    return () => {
      target.removeEventListener("mousemove", onMouseMove);
      target.removeEventListener("mouseleave", hide);
      target.removeEventListener("touchstart", onTouch);
      target.removeEventListener("touchmove", onTouch);
      target.removeEventListener("touchend", hide);
    };
  }, []);

  const maskImage = pointer
    ? `radial-gradient(circle ${radiusPx}px at ${pointer.x}px ${pointer.y}px, black 55%, transparent 100%)`
    : "none";

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
    >
      <Image
        src={afterSrc}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-[calc(50%+124px)_center] tablet:object-center"
      />
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
          className="object-cover object-[calc(50%+120px)_center] tablet:object-center"
        />
        <div className="absolute inset-0 bg-[#00000059]" />
      </div>
    </div>
  );
}
