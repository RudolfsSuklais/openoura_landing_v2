"use client";

import { useMemo, useState } from "react";

type Tool = {
  key: string;
  label: string;
  sub: string;
  hoursPerWeek: number;
};

const TOOLS: Tool[] = [
  { key: "excel", label: "Excel", sub: "Pasūtījumi · tāmes · krājumi", hoursPerWeek: 5 },
  { key: "paper", label: "Papīrs / Word", sub: "Akti · pavadzīmes · piezīmes", hoursPerWeek: 3 },
  { key: "whatsapp", label: "WhatsApp grupas", sub: "Uzdevumi · statusi · jautājumi", hoursPerWeek: 2 },
  { key: "emails", label: "Atskaites e-pastā", sub: "Pirmdienas rīta vēstules", hoursPerWeek: 2 },
];

const HOURLY_RATE = 15;
const WEEKS_PER_MONTH = 4.33;
const OPENOURA_PRICE = 69;

function formatEur(n: number) {
  return new Intl.NumberFormat("lv-LV", { maximumFractionDigits: 0 }).format(n);
}

export function CurrentSetupMatrix() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (key: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const { weeklyHours, monthlyEur } = useMemo(() => {
    let h = 0;
    TOOLS.forEach((t) => {
      if (checked.has(t.key)) h += t.hoursPerWeek;
    });
    return {
      weeklyHours: h,
      monthlyEur: Math.round(h * WEEKS_PER_MONTH * HOURLY_RATE),
    };
  }, [checked]);

  const anyChecked = checked.size > 0;

  return (
    <div className="border-y hairline py-10 md:py-14">
      <div className="mono text-[12px] md:text-[13px] uppercase tracking-[0.18em] text-muted mb-5 flex items-center gap-2.5">
        <span aria-hidden className="inline-block h-px w-5 bg-ink/30" />
        <span>Kāda ir tava pašreizējā sistēma?</span>
      </div>

      <h3 className="font-medium leading-[1] tracking-[-0.03em] text-ink text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] max-w-[22ch]">
        Atzīmē, ko tu šobrīd lieto.
      </h3>

      <div
        className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
        role="group"
        aria-label="Pašreizējie rīki"
      >
        {TOOLS.map((tool) => {
          const isChecked = checked.has(tool.key);
          return (
            <button
              key={tool.key}
              type="button"
              role="checkbox"
              aria-checked={isChecked}
              onClick={() => toggle(tool.key)}
              className={`group flex items-start gap-3 md:gap-4 text-left rounded-md px-4 md:px-5 py-3.5 md:py-4 border-2 transition-colors duration-150 cursor-pointer ${
                isChecked
                  ? "border-ink bg-ink/[0.03]"
                  : "border-ink/15 bg-paper hover:border-ink/40 hover:bg-ink/[0.02]"
              }`}
            >
              <span
                aria-hidden
                className={`mt-0.5 inline-flex items-center justify-center h-5 w-5 md:h-6 md:w-6 rounded-[3px] border-2 shrink-0 transition-colors ${
                  isChecked
                    ? "bg-ink border-ink text-paper"
                    : "bg-paper border-ink/30 group-hover:border-ink"
                }`}
              >
                {isChecked && (
                  <svg
                    viewBox="0 0 16 16"
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8.5L6.5 12L13 4.5" />
                  </svg>
                )}
              </span>
              <div className="min-w-0">
                <div
                  className={`text-[15px] md:text-[16px] leading-tight font-medium ${
                    isChecked ? "text-ink" : "text-ink"
                  }`}
                >
                  {tool.label}
                </div>
                <div className="mono text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-muted mt-1">
                  {tool.sub}
                </div>
              </div>
              <span
                aria-hidden
                className="ml-auto mono text-[10px] md:text-[11px] text-muted shrink-0 self-center whitespace-nowrap"
              >
                ~{tool.hoursPerWeek}h/ned.
              </span>
            </button>
          );
        })}
      </div>

      {/* REVEAL */}
      <div
        className="mt-8 md:mt-10 pt-6 border-t hairline grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-5 items-baseline"
        aria-live="polite"
      >
        <div className="lg:col-span-7">
          {anyChecked ? (
            <p className="text-[17px] md:text-[20px] leading-[1.35] text-ink max-w-[42ch]">
              Tava reālā cena ir aptuveni{" "}
              <span className="mono font-medium">{weeklyHours}h</span> nedēļā ={" "}
              <span className="serif-italic gradient-text font-medium">
                €{formatEur(monthlyEur)}/mēn
              </span>{" "}
              pie €{HOURLY_RATE}/h.
            </p>
          ) : (
            <p className="text-[17px] md:text-[20px] leading-[1.35] text-ash max-w-[42ch]">
              Atzīmē vismaz vienu, lai redzētu, cik tas{" "}
              <span className="serif-italic text-ink">reāli</span> tev maksā.
            </p>
          )}
        </div>

        {anyChecked && (
          <div className="lg:col-span-5 lg:text-right">
            <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted mb-1.5">
              OpenOura
            </div>
            <div className="mono tabular-nums text-[1.75rem] md:text-[2.25rem] leading-none tracking-[-0.02em] text-ink">
              €{OPENOURA_PRICE}
              <span className="mono text-[14px] text-muted">/mēn</span>
            </div>
            {monthlyEur > OPENOURA_PRICE && (
              <div className="mt-2 mono text-[11px] uppercase tracking-[0.16em] text-ink">
                Tu paliek ar ~€{formatEur(monthlyEur - OPENOURA_PRICE)}/mēn
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
