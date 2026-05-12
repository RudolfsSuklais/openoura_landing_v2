"use client";

import { useEffect, useMemo, useState } from "react";
import { Stepper } from "./ui/Stepper";

const FINESTRA_REDUCTION = 0.7;
const WEEKS_PER_MONTH = 4.33;
const OPENOURA_PRICE = 69;
const SAVINGS_KEY = "openoura:projected_savings";
const SAVINGS_EVENT = "openoura:savings-updated";

function format(n: number) {
  return new Intl.NumberFormat("lv-LV", { maximumFractionDigits: 0 }).format(n);
}

type FieldProps = {
  label: string;
  hint?: string;
  children: React.ReactNode;
};

function StepperField({ label, hint, children }: FieldProps) {
  return (
    <div className="border-t hairline py-7 md:py-8">
      <label className="flex items-center gap-2.5 mono text-[12px] md:text-[13px] uppercase tracking-[0.18em] text-muted mb-4">
        <span aria-hidden className="inline-block h-px w-5 bg-ink/30" />
        <span>{label}</span>
      </label>
      {children}
      {hint && (
        <p className="mt-3 mono text-[11px] uppercase tracking-[0.16em] text-muted/70">
          {hint}
        </p>
      )}
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

  // Persist the visitor's projected net savings so the FinalCTA can
  // greet them with their own number. sessionStorage scope keeps it
  // private to the tab and per-visit.
  useEffect(() => {
    const value = Math.round(netEur);
    try {
      sessionStorage.setItem(SAVINGS_KEY, String(value));
    } catch {
      // Storage disabled (private mode, blocked) — silently skip.
    }
    window.dispatchEvent(
      new CustomEvent(SAVINGS_EVENT, { detail: { value } }),
    );
  }, [netEur]);

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
          <StepperField label="Stundas nedēļā uz Excel un pavadzīmēm">
            <Stepper
              value={hours}
              min={1}
              max={60}
              step={1}
              suffix="h / ned."
              ariaLabel="Stundas nedēļā"
              onChange={setHours}
            />
          </StepperField>
          <StepperField label="Vidējās izmaksas par stundu · alga + nodokļi">
            <Stepper
              value={rate}
              min={5}
              max={50}
              step={1}
              suffix="€ / h"
              ariaLabel="Stundu likme"
              onChange={setRate}
            />
          </StepperField>
          <div className="border-t hairline pt-6 mono text-[12px] uppercase tracking-[0.16em] text-muted/80 leading-relaxed">
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
