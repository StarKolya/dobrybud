"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Natively scrolling horizontal slider (touch momentum, trackpad swipes) with arrow paging,
 * edge tracking and mouse drag-to-scroll. Put `ref` and `handlers` on the scroll container; its
 * children are the slides. While `dragging`, turn scroll-snap and scroll-smooth off on it,
 * they would fight the pointer.
 * Drags starting inside a `data-no-swipe` element (e.g. the before/after handle) are ignored.
 */
export function useScrollSlider<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  // Distance between the left edges of two neighbouring slides.
  const slideStep = () => {
    const el = ref.current;
    const first = el?.children[0] as HTMLElement | undefined;
    const second = el?.children[1] as HTMLElement | undefined;
    return first && second ? second.offsetLeft - first.offsetLeft : 0;
  };

  const scrollBySlides = (count: number) => {
    ref.current?.scrollBy({ left: count * slideStep(), behavior: "smooth" });
  };

  // Mouse drag-to-scroll. Touch and trackpads already scroll natively.
  const drag = useRef<{ startX: number; startLeft: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent<T>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    if ((e.target as HTMLElement).closest("[data-no-swipe]")) return;
    e.preventDefault(); // stops text selection while dragging
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startX: e.clientX, startLeft: e.currentTarget.scrollLeft };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<T>) => {
    if (!drag.current) return;
    e.currentTarget.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };

  const onPointerUp = (e: React.PointerEvent<T>) => {
    const from = drag.current;
    if (!from) return;
    drag.current = null;
    setDragging(false);

    const el = e.currentTarget;
    const step = slideStep();
    if (!step) return;
    // A deliberate drag advances at least one slide in its direction; a tiny one settles on the nearest.
    const dx = e.clientX - from.startX;
    const position = el.scrollLeft / step;
    const index = dx < -40 ? Math.ceil(position) : dx > 40 ? Math.floor(position) : Math.round(position);
    el.scrollTo({ left: index * step, behavior: "smooth" });
  };

  return {
    ref,
    atStart,
    atEnd,
    scrollBySlides,
    dragging,
    handlers: {
      onScroll: updateEdges,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
}
