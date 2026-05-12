"use client";

import { useMemo, useState } from "react";

const FINESTRA_REDUCTION = 0.7;
const WEEKS_PER_MONTH = 4.33;
const OPENOURA_PRICE = 69;

function format(n: number) {
  return new Intl.NumberFormat("lv-LV", { maximumFractionDigits: 0 }).format(n);
}

type StepperProps = {
  label: string;
  suffix: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
};

function Stepper({ label, suffix, value, min, max, step, onChange }: StepperProps) {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  return (
    <div className="border-t hairline py-6 md:py-7 flex items-baseline justify-between gap-6">
      <div className="flex-1 min-w-0">
        <label className="block mono text-[11px] uppercase tracking-[0.18em] text-muted mb-2">
          {label}
        </label>
        <div className="flex items-baseline gap-3">
          <button
            type="button"
            onClick={() => onChange(clamp(value - step))}
            aria-label="Mazāk"
            className="mono text-[18px] text-muted hover:text-ink transition-colors w-6 h-6 flex items-center justify-center"
          >
            −
          </button>
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (Number.isFinite(next)) onChange(clamp(next));
            }}
            className="mono tabular-nums text-[2.5rem] md:text-[3rem] leading-none tracking-[-0.03em] text-ink bg-transparent border-0 focus:outline-none w-[5ch] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
          />
          <span className="mono text-[13px] text-muted">{suffix}</span>
          <button
            type="button"
            onClick={() => onChange(clamp(value + step))}
            aria-label="Vairāk"
            className="mono text-[18px] text-muted hover:text-ink transition-colors w-6 h-6 flex items-center justify-center ml-2"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export function Calculator() {
  const [hours, setHours] = useState(12);
  const [rate, setRate] = useState(15);

  const { savedHoursMonth, savedEur, netEur } = useMemo(() => {
    const savedHoursMonth = hours * FINESTRA_REDUCTION * WEEKS_PER_MONTH;
    const savedEur = savedHoursMonth * rate;
    const netEur = savedEur - OPENOURA_PRICE;
    return { savedHoursMonth, savedEur, netEur };
  }, [hours, rate]);

  return (
    <div className="mt-28 md:mt-36 border-t hairline pt-16 md:pt-20">
      <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted mb-10 flex items-center gap-3">
        <span className="inline-block h-px w-8 bg-ink/40" />
        Tavs skaitlis · kalkulators
      </div>

      <h3 className="font-medium leading-[0.95] tracking-[-0.03em] text-ink text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] max-w-[18ch]">
        Cik tas <span className="serif-italic gradient-text">tev</span> ietaupītu mēnesī?
      </h3>

      <p className="mt-6 md:mt-8 max-w-[44ch] text-[15px] md:text-[17px] leading-[1.45] text-ash">
        Aprēķins balstīts uz Finestra datiem — vidēji 70% no Excel/papīru stundām pazūd, kad ražotne pāriet uz OpenOura.
      </p>

      <div className="mt-12 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12">
        {/* INPUTS — left */}
        <div className="lg:col-span-5">
          <Stepper
            label="Stundas nedēļā uz Excel un pavadzīmēm"
            suffix="h / ned."
            value={hours}
            min={1}
            max={60}
            step={1}
            onChange={setHours}
          />
          <Stepper
            label="Vidējās izmaksas par stundu (alga + nodokļi)"
            suffix="€ / h"
            value={rate}
            min={5}
            max={50}
            step={1}
            onChange={setRate}
          />
          <div className="border-t hairline pt-5 mono text-[10px] uppercase tracking-[0.18em] text-muted/80">
            Pielāgo skaitļus savai realitātei. Mēs neredzam, ko tu ievadi.
          </div>
        </div>

        {/* OUTPUT — right */}
        <div className="lg:col-span-7 lg:pl-6">
          <div className="border hairline rounded-md bg-paper px-6 md:px-10 py-10 md:py-12 relative overflow-hidden">
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted mb-8">
              Rezultāts · aptuvens
            </div>

            <div className="space-y-7 md:space-y-9">
              <Line
                label="Ietaupīts laiks"
                value={`~${format(savedHoursMonth)}h`}
                suffix="/ mēn."
              />
              <Line
                label="Vērtība pie tavām izmaksām"
                value={`€${format(savedEur)}`}
                suffix="/ mēn."
              />
              <Line
                label="OpenOura Starter"
                value={`−€${OPENOURA_PRICE}`}
                suffix="/ mēn."
                muted
              />
            </div>

            <div className="mt-10 md:mt-12 pt-8 border-t hairline">
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
                Tev paliek
              </div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span
                  className={`mono tabular-nums leading-[0.85] tracking-[-0.04em] text-[3.5rem] md:text-[5rem] ${
                    netEur >= 0 ? "" : "text-marker"
                  }`}
                >
                  {netEur >= 0 ? "" : "−"}€{format(Math.abs(netEur))}
                </span>
                <span className="mono text-[14px] text-muted">/ mēn.</span>
              </div>
              {netEur >= 0 ? (
                <p className="mt-4 serif-italic text-[18px] md:text-[20px] leading-[1.3] text-ink max-w-[34ch]">
                  Tas ir <span className="gradient-text">€{format(netEur * 12)}</span> gadā,
                  ko tu vairs nepērc Excel haosā.
                </p>
              ) : (
                <p className="mt-4 text-[14px] leading-[1.4] text-ash max-w-[40ch]">
                  Pie šādiem skaitļiem ietaupījums ir mazāks par OpenOura cenu — bet skaidrība un mazāk kļūdu joprojām ir vērtas naudu.
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 mono text-[10px] uppercase tracking-[0.16em] text-muted">
            * Avots: SIA Finestra · 8h/ned. ietaupītas no ~12h/ned. uz pavadzīmju ievades, 2025
          </div>
        </div>
      </div>
    </div>
  );
}

function Line({
  label,
  value,
  suffix,
  muted,
}: {
  label: string;
  value: string;
  suffix: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b hairline pb-5 md:pb-7 last:border-b-0 last:pb-0">
      <span className={`text-[14px] md:text-[15px] ${muted ? "text-muted" : "text-ash"}`}>
        {label}
      </span>
      <span className="text-right shrink-0">
        <span
          className={`mono tabular-nums text-[1.5rem] md:text-[2rem] leading-none tracking-[-0.02em] ${
            muted ? "text-muted" : "text-ink"
          }`}
        >
          {value}
        </span>
        <span className="mono text-[12px] text-muted ml-1">{suffix}</span>
      </span>
    </div>
  );
}
