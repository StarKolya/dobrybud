"use client";

import { useEffect, useRef, useState } from "react";

export interface SelectGroup {
  label: string;
  options: string[];
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  groups: SelectGroup[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
}

const DEFAULT_TRIGGER_CLASSNAME = "rounded-lg bg-white/10 px-3 py-2";

/** Custom dropdown trigger + panel, styled to match dark inputs (e.g. the calculator card). */
export function Select({
  value,
  onChange,
  groups,
  placeholder = "—",
  className = "",
  triggerClassName = DEFAULT_TRIGGER_CLASSNAME,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const select = (next: string) => {
    onChange(next);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 text-left text-white outline-none ${triggerClassName}`}
      >
        <span className={value ? "" : "text-white/40"}>{value || placeholder}</span>
        <span className={`text-white/50 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 max-h-64 overflow-y-auto rounded-xl bg-white p-2 text-brand-dark shadow-lg"
        >
          <button
            type="button"
            role="option"
            aria-selected={value === ""}
            onClick={() => select("")}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-brand-gray ${
              value === "" ? "text-brand-red" : ""
            }`}
          >
            {placeholder}
          </button>

          {groups.map((group) => (
            <div key={group.label} className="mt-1">
              <p className="px-3 py-1 text-xs uppercase tracking-wide text-brand-dark/40">{group.label}</p>
              {group.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={value === option}
                  onClick={() => select(option)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-brand-gray ${
                    value === option ? "font-medium text-brand-red" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
