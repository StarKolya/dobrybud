"use client";

import { useEffect, useRef, useState } from "react";

const NUMBER_PATTERN = /^(\D*)(\d+)(.*)$/;

export function AnimatedValue({
  value,
  durationMs = 700,
}: {
  value: string;
  durationMs?: number;
}) {
  const match = NUMBER_PATTERN.exec(value);
  const target = match ? Number(match[2]) : 0;
  const [display, setDisplay] = useState(0);
  const [visible, setVisible] = useState(false);
  const shown = useRef(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const from = shown.current;
    const start = performance.now();
    let frame = requestAnimationFrame(function step(now) {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      shown.current = Math.round(from + (target - from) * eased);
      setDisplay(shown.current);
      if (progress < 1) frame = requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(frame);
  }, [target, visible, durationMs]);

  if (!match) return <>{value}</>;
  return (
    <span ref={ref}>
      {match[1]}
      {display}
      {match[3]}
    </span>
  );
}
