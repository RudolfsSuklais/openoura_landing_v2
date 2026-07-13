"use client";

import { useEffect, useState } from "react";

type Event = {
  time: string;
  text: string;
};

const EVENTS: Event[] = [
  { time: "08:34", text: "#2614 uzsākts · Jānis" },
  { time: "08:30", text: "Pavadzīme apstrādāta · 12 sek." },
  { time: "08:27", text: "#2613 → Ražo" },
  { time: "08:21", text: "Furnitūra · auto-rezerve (8 gab.)" },
  { time: "08:15", text: "Tāme apstiprināta · €5,240" },
  { time: "08:09", text: "CMR ģenerēts · #4127" },
  { time: "08:02", text: "#2612 pabeigts · 4 ned. 1 d." },
];

const TICK_MS = 4200;

export function LiveTicker({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [i, setI] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const dark = variant === "dark";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setI((prev) => (prev + 1) % EVENTS.length);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const current = EVENTS[i];

  return (
    <div
      className={
        dark
          ? "flex items-center gap-4 md:gap-6 py-3 px-4 md:px-5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm"
          : "flex items-center gap-4 md:gap-6 py-3.5 border-y hairline"
      }
    >
      <div className="flex items-center gap-2.5 shrink-0">
        <span aria-hidden className="relative inline-flex h-2 w-2">
          <span
            className={`absolute inline-flex h-full w-full rounded-full motion-safe:animate-ping ${
              dark ? "bg-emerald-400/60" : "bg-marker/60"
            }`}
          />
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${
              dark ? "bg-emerald-400" : "bg-marker"
            }`}
          />
        </span>
        <span
          className={`mono text-[10px] uppercase tracking-[0.22em] ${
            dark ? "text-white/45" : "text-muted"
          }`}
        >
          Šobrīd · Finestra
        </span>
      </div>

      <div className="relative flex-1 min-w-0 h-5 overflow-hidden" aria-live="polite">
        {EVENTS.map((ev, idx) => {
          const isActive = idx === i;
          return (
            <div
              key={`${ev.time}-${ev.text}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 flex items-center gap-3 mono text-[12px] md:text-[13px] tabular-nums transition-all duration-500 ease-out ${
                isActive
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              <span className={dark ? "text-white/40" : "text-muted"}>{ev.time}</span>
              <span aria-hidden className={dark ? "text-white/20" : "text-muted/40"}>·</span>
              <span className={dark ? "text-white/85 truncate" : "text-ink truncate"}>
                {ev.text}
              </span>
            </div>
          );
        })}
        <span className="sr-only">{`${current.time} ${current.text}`}</span>
      </div>

      <div
        className={`hidden sm:block mono text-[10px] uppercase tracking-[0.18em] shrink-0 ${
          dark ? "text-white/30" : "text-muted/70"
        }`}
      >
        Paraugs · 13.05.2026
      </div>
    </div>
  );
}
