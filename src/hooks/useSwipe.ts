"use client";

import { useRef, useState } from "react";

// How far (px) the finger must travel before the gesture counts as a horizontal drag.
const DRAG_THRESHOLD = 6;
// How far (px) the track must be dragged on release to change slide.
const SWIPE_DISTANCE = 50;

/**
 * Finger drag for translate-based sliders. Spread `handlers` on the slider viewport, add
 * `var(--swipe-offset, 0px)` to the track's translateX and turn its transition off while `dragging`.
 *
 * The offset is written straight to a CSS variable on the viewport rather than React state,
 * so following the finger doesn't re-render the slider on every pointer move.
 *
 * The handlers set `touch-action: pan-y`, so the browser keeps vertical page scrolling but
 * leaves horizontal gestures to the slider instead of panning the page sideways.
 * Touches starting inside a `data-no-swipe` element (e.g. the before/after handle) are ignored.
 */
export function useSwipe({
  onSwipe,
  canPrev,
  canNext,
}: {
  onSwipe: (direction: 1 | -1) => void;
  canPrev: boolean;
  canNext: boolean;
}) {
  const start = useRef<{ x: number; pointerId: number } | null>(null);
  const dragOffset = useRef(0);
  const [dragging, setDragging] = useState(false);

  const setOffset = (el: HTMLElement, dx: number) => {
    dragOffset.current = dx;
    el.style.setProperty("--swipe-offset", `${dx}px`);
  };

  const reset = (e: React.PointerEvent<HTMLElement>) => {
    start.current = null;
    setDragging(false);
    setOffset(e.currentTarget, 0);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "mouse") return;
    if ((e.target as HTMLElement).closest("[data-no-swipe]")) return;
    start.current = { x: e.clientX, pointerId: e.pointerId };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const from = start.current;
    if (!from || from.pointerId !== e.pointerId) return;
    let dx = e.clientX - from.x;
    if (!dragging) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    // Rubber-band past the first/last slide.
    if ((dx > 0 && !canPrev) || (dx < 0 && !canNext)) dx /= 3;
    setOffset(e.currentTarget, dx);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (dragging && Math.abs(dragOffset.current) >= SWIPE_DISTANCE) {
      const direction = dragOffset.current < 0 ? 1 : -1;
      if (direction === 1 ? canNext : canPrev) onSwipe(direction);
    }
    reset(e);
  };

  return {
    dragging,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: reset,
      style: { touchAction: "pan-y" } as const,
    },
  };
}
