"use client";

import { useEffect, useState } from "react";

type Counter = {
  key: string;
  label: string;
  base: number;
  jitter: number;
  format: (n: number) => string;
};

const COUNTERS: Counter[] = [
  {
    key: "active",
    label: "aktīvi pasūtījumi",
    base: 47,
    jitter: 3,
    format: (n) => String(Math.round(n)),
  },
  {
    key: "today",
    label: "šodien pabeigti",
    base: 5,
    jitter: 2,
    format: (n) => String(Math.max(0, Math.round(n))),
  },
  {
    key: "sku",
    label: "SKU noliktavā",
    base: 2400,
    jitter: 12,
    format: (n) =>
      new Intl.NumberFormat("lv-LV", { maximumFractionDigits: 0 }).format(
        Math.round(n),
      ),
  },
  {
    key: "invoice",
    label: "sek. pēdējā pavadzīme",
    base: 12,
    jitter: 4,
    format: (n) => String(Math.max(4, Math.round(n))),
  },
];

const ROTATE_MS = 22_000;

function jitterValue(base: number, jitter: number) {
  return base + (Math.random() * 2 - 1) * jitter;
}

export function FinestraCounters() {
  const [values, setValues] = useState<number[]>(() => COUNTERS.map((c) => c.base));
  const [pulseIdx, setPulseIdx] = useState<number | null>(null);

  useEffect(() => {
    // Respect reduced motion — skip auto-rotation, render base values.
    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduceMotion) return;

    let i = 0;
    const tick = () => {
      const idx = i % COUNTERS.length;
      setValues((prev) => {
        const next = [...prev];
        const c = COUNTERS[idx];
        next[idx] = jitterValue(c.base, c.jitter);
        return next;
      });
      setPulseIdx(idx);
      window.setTimeout(() => setPulseIdx(null), 700);
      i += 1;
    };
    const id = window.setInterval(tick, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mt-10 md:mt-12 pt-6 border-t hairline">
      <div className="flex items-center gap-2.5 mb-5">
        <span aria-hidden className="relative inline-flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-marker/60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-marker" />
        </span>
        <span className="mono text-[10px] uppercase tracking-[0.22em] text-muted">
          Šobrīd · Finestra · cehs
        </span>
      </div>

      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5"
        aria-live="polite"
      >
        {COUNTERS.map((c, idx) => (
          <div key={c.key}>
            <div
              className={`mono tabular-nums leading-none tracking-[-0.02em] text-ink text-[22px] sm:text-[26px] transition-colors duration-500 ${
                pulseIdx === idx ? "text-violet" : ""
              }`}
            >
              {c.format(values[idx])}
            </div>
            <div className="mt-2 mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-muted leading-tight">
              {c.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
