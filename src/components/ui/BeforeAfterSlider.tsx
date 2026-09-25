"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
}

/** "Before/after" comparison, used inside review cards. Only the arrows handle can be dragged. */
export function BeforeAfterSlider({ beforeSrc, afterSrc, alt }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50); // percent

  const updateFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, percent)));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.buttons !== 1) return;
    updateFromClientX(event.clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl bg-brand-gray"
    >
      <Image src={afterSrc} alt={alt} fill sizes="(min-width: 768px) 340px, 100vw" className="pointer-events-none object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={beforeSrc} alt="" fill sizes="(min-width: 768px) 340px, 100vw" className="pointer-events-none object-cover" draggable={false} />
      </div>
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        data-no-swipe
        className="absolute inset-y-0 flex w-8 -translate-x-1/2 cursor-ew-resize touch-none items-center justify-center"
        style={{ left: `${position}%` }}
      >
        <span className="h-full w-0.5 bg-white" />
        <span className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
          <Image src="/icons/double-arrows.svg" alt="" width={19} height={8} className="pointer-events-none h-auto w-[19px]" draggable={false} />
        </span>
      </div>
    </div>
  );
}
