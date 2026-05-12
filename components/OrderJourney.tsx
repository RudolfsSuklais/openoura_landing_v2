"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FadeUp } from "./FadeUp";
import { trackCtaClick } from "@/lib/analytics";

type Stage = "gaida" | "tame" | "razo" | "pabeigts";

const ORDER = {
  STAGES: [
    { key: "gaida" as Stage, label: "Gaida", short: "GA" },
    { key: "tame" as Stage, label: "Tāme", short: "TĀ" },
    { key: "razo" as Stage, label: "Ražo", short: "RA" },
    { key: "pabeigts" as Stage, label: "Pabeigts", short: "PA" },
  ],
  CARD: {
    id: "#2614",
    title: "Logu rāmji, ozols",
    customer: "SIA Finestra",
    deadline: "13.05",
  },
};

function nextStage(s: Stage): Stage | null {
  const idx = ORDER.STAGES.findIndex((x) => x.key === s);
  return idx >= 0 && idx < ORDER.STAGES.length - 1
    ? ORDER.STAGES[idx + 1].key
    : null;
}

export function OrderJourney() {
  const [stage, setStage] = useState<Stage>("gaida");
  const [revealed, setRevealed] = useState<Set<Stage>>(new Set(["gaida"]));
  const liveRegionRef = useRef<HTMLSpanElement | null>(null);

  const advance = useCallback((to: Stage) => {
    setStage(to);
    setRevealed((prev) => {
      const next = new Set(prev);
      next.add(to);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setStage("gaida");
    setRevealed(new Set(["gaida"]));
  }, []);

  // Announce stage transitions for screen readers.
  useEffect(() => {
    if (!liveRegionRef.current) return;
    const label = ORDER.STAGES.find((s) => s.key === stage)?.label ?? "";
    liveRegionRef.current.textContent = `Pasūtījums ${ORDER.CARD.id} stadijā: ${label}`;
  }, [stage]);

  const upcoming = nextStage(stage);
  const isDone = upcoming === null;

  return (
    <section
      id="dzives-cikls"
      className="relative pt-32 md:pt-48 pb-32 md:pb-40 border-t hairline scroll-mt-20 md:scroll-mt-24"
      aria-labelledby="journey-heading"
    >
      <div className="mx-auto max-w-page px-6 md:px-10">
        <FadeUp>
          <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted mb-10 md:mb-12 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-ink/40" />
            Pasūtījums #2614 · Dzīves cikls
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h2
            id="journey-heading"
            className="font-medium leading-[0.9] tracking-[-0.04em] text-ink text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6rem]"
          >
            <span className="block">No pasūtījuma līdz</span>
            <span className="block">
              <span className="serif-italic gradient-text">faktiskai peļņai</span>.
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mt-8 md:mt-10 max-w-[44ch] text-[17px] md:text-[20px] leading-[1.45] text-ash">
            Klikšķini cauri četrām stadijām un redzi, kā viens pasūtījums kustas
            no saņemšanas līdz pabeigšanai. Visi skaitļi un dati ir no Finestra
            reālas plūsmas.
          </p>
        </FadeUp>

        {/* ── KANBAN ───────────────────────────────────────────── */}
        <FadeUp delay={0.15}>
          <div className="mt-16 md:mt-20 border hairline rounded-md bg-paper p-4 md:p-6">
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4 flex items-center justify-between">
              <span>Ražošanas plānotājs · TV Display</span>
              <span className="text-muted/60 hidden sm:inline">13.05 · 08:30</span>
            </div>

            <ol className="grid grid-cols-4 gap-2 md:gap-3" aria-label="Pasūtījuma stadijas">
              {ORDER.STAGES.map((col, idx) => {
                const isCurrent = col.key === stage;
                const isNext = col.key === upcoming;
                const isPast =
                  idx < ORDER.STAGES.findIndex((s) => s.key === stage);
                return (
                  <li key={col.key} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => {
                        if (isNext) advance(col.key);
                      }}
                      disabled={!isNext}
                      aria-current={isCurrent ? "step" : undefined}
                      aria-label={
                        isNext
                          ? `Pārvietot uz ${col.label}`
                          : `${col.label} · ${
                              isCurrent ? "tagad" : isPast ? "pabeigts" : "vēl nepieejams"
                            }`
                      }
                      className={`group relative w-full text-left rounded-md px-2 md:px-3 py-3 md:py-4 transition-all duration-200 ${
                        isCurrent
                          ? "border-2 border-ink bg-paper shadow-[0_3px_0_0_rgba(10,10,10,0.06)]"
                          : isNext
                          ? "border-2 border-dashed border-violet bg-violet/[0.06] hover:bg-violet/[0.12] hover:border-solid cursor-pointer"
                          : isPast
                          ? "border border-ink/15 bg-ink/[0.03]"
                          : "border border-ink/10 bg-paper opacity-40 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-3 md:mb-4">
                        <span
                          className={`mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] truncate ${
                            isCurrent
                              ? "text-ink font-semibold"
                              : isNext
                              ? "text-violet font-semibold"
                              : "text-muted"
                          }`}
                        >
                          <span className="sm:hidden">{col.short}</span>
                          <span className="hidden sm:inline">{col.label}</span>
                        </span>
                        {isCurrent && (
                          <span className="mono text-[9px] uppercase tracking-[0.14em] bg-ink text-paper px-1.5 py-0.5 rounded-full shrink-0">
                            Tagad
                          </span>
                        )}
                        {isPast && (
                          <span
                            aria-hidden
                            className="mono text-[13px] leading-none text-ink/45 shrink-0"
                          >
                            ✓
                          </span>
                        )}
                      </div>

                      <div className="min-h-[68px] md:min-h-[88px] flex flex-col justify-end">
                        {isCurrent && <OrderCard />}
                        {isNext && (
                          <div className="flex items-center gap-1.5 md:gap-2 mono text-[11px] md:text-[12px] uppercase tracking-[0.14em] text-violet font-semibold">
                            <span aria-hidden className="motion-safe:animate-pulse">
                              →
                            </span>
                            <span>Klikšķini</span>
                          </div>
                        )}
                        {isPast && (
                          <div className="mono text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-muted/70">
                            Pabeigts
                          </div>
                        )}
                        {!isCurrent && !isNext && !isPast && (
                          <div
                            aria-hidden
                            className="mono text-[14px] text-muted/30"
                          >
                            ·
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-5 pt-4 border-t hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mono text-[11px] md:text-[12px] uppercase tracking-[0.16em]">
              <span className="text-muted">1 aktīvs · 46 pārējie</span>
              {isDone ? (
                <span className="text-ink font-semibold">
                  Pabeigts · sākt no jauna ↓
                </span>
              ) : (
                <span>
                  <span className="text-muted">Stadija</span>{" "}
                  <span className="text-ink font-semibold">
                    {ORDER.STAGES.findIndex((s) => s.key === stage) + 1}/4
                  </span>
                  <span aria-hidden className="mx-2 text-muted/40">·</span>
                  <span className="text-violet font-semibold">
                    Klikšķini violet kolonnu →
                  </span>
                </span>
              )}
            </div>

            <span ref={liveRegionRef} role="status" aria-live="polite" className="sr-only" />
          </div>
        </FadeUp>

        {/* ── STAGE-DEPENDENT REVEAL PANEL ─────────────────────── */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8">
          {/* LEFT: narrative */}
          <div className="lg:col-span-5">
            <FadeUp delay={0.2}>
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
                Stadijā · {ORDER.STAGES.find((s) => s.key === stage)?.label}
              </div>
              <StageHeadline stage={stage} />
              <StageBody stage={stage} />
            </FadeUp>
          </div>

          {/* RIGHT: stage-specific reveal */}
          <div className="lg:col-span-7">
            <FadeUp delay={0.25}>
              <StageReveal stage={stage} key={stage} />
            </FadeUp>
          </div>
        </div>

        {/* ── FOOTER ACTIONS ───────────────────────────────────── */}
        <FadeUp delay={0.3}>
          <div className="mt-16 md:mt-20 pt-8 border-t hairline flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 mono text-[12px] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors self-start"
            >
              <span aria-hidden className="inline-block h-px w-6 bg-ink/25" />
              <span>↻ Sākt no jauna</span>
            </button>

            {isDone && (
              <a
                href="#demo"
                onClick={() => trackCtaClick("journey_pabeigts")}
                className="group inline-flex items-center justify-center gap-2 bg-ink text-paper px-5 py-3.5 rounded-full text-[14px] font-medium tracking-tight hover:opacity-90 transition-opacity self-start"
              >
                Tā tev der? Pieprasi demo
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────
   ORDER CARD — the draggable-feeling card that sits in a column
   ─────────────────────────────────────────────────────────── */
function OrderCard() {
  return (
    <div
      className="rounded-[3px] bg-paper border border-ink/30 shadow-[0_4px_12px_-6px_rgba(10,10,10,0.18)] px-2 md:px-2.5 py-2 transition-transform duration-300 ease-out"
      style={{ transform: "rotate(-1deg)" }}
    >
      <div className="mono text-[10px] md:text-[11px] tabular-nums text-ink leading-tight">
        {ORDER.CARD.id}
      </div>
      <div className="mt-1 text-[10px] md:text-[11px] leading-tight text-ink/80 truncate">
        {ORDER.CARD.title}
      </div>
      <div className="mt-1.5 mono text-[8px] md:text-[9px] uppercase tracking-[0.12em] text-muted/80 flex items-center justify-between gap-1">
        <span className="truncate">{ORDER.CARD.customer}</span>
        <span className="shrink-0">{ORDER.CARD.deadline}</span>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   STAGE COPY
   ─────────────────────────────────────────────────────────── */
function StageHeadline({ stage }: { stage: Stage }) {
  const copy: Record<Stage, React.ReactNode> = {
    gaida: (
      <h3 className="text-[1.75rem] md:text-[2.25rem] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
        Pasūtījums saņemts. Vēl <span className="serif-italic">nezini</span>, vai būs peļņa.
      </h3>
    ),
    tame: (
      <h3 className="text-[1.75rem] md:text-[2.25rem] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
        Sistēma <span className="serif-italic gradient-text">pārbauda</span> materiālus tāmes laikā.
      </h3>
    ),
    razo: (
      <h3 className="text-[1.75rem] md:text-[2.25rem] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
        Cehā Jānis strādā · tu <span className="serif-italic gradient-text">redzi</span>, pie kā.
      </h3>
    ),
    pabeigts: (
      <h3 className="text-[1.75rem] md:text-[2.25rem] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
        Tāme pret faktu — <span className="serif-italic gradient-text">+3,2%</span>. Paredzēts.
      </h3>
    ),
  };
  return copy[stage];
}

function StageBody({ stage }: { stage: Stage }) {
  const copy: Record<Stage, string> = {
    gaida: "Klients zvanījis pirmdien. Pasūtījums ievadīts plānotājā. Materiāli, izmaksas, termiņš — vēl nav aprēķināti.",
    tame: "Pirms tāmes apstiprināšanas BOM koks pārbauda noliktavu. Visi materiāli ir, izņemot vienu pozīciju, kas trūkst. Sistēma to pamana laikā, nevis ražošanas dienā.",
    razo: "Darbinieks planšetē atvēris uzdevumu un nospiedis Start. Tu redzi reālo laiku, ko viņš strādā pie šī pasūtījuma — nevis vidējās stundas vai pieņēmumus.",
    pabeigts: "Pēc pabeigšanas sistēma rāda starpību starp tāmi un reālajām izmaksām. Šoreiz +3,2% no plāna — paredzētās robežās. Nākamā tāme būs precīzāka.",
  };
  return (
    <p className="mt-6 max-w-[42ch] text-[16px] md:text-[17px] leading-[1.5] text-ash">
      {copy[stage]}
    </p>
  );
}

/* ───────────────────────────────────────────────────────────
   STAGE REVEAL — the visual artifact that appears at each stage
   ─────────────────────────────────────────────────────────── */
function StageReveal({ stage }: { stage: Stage }) {
  if (stage === "gaida") return <GaidaReveal />;
  if (stage === "tame") return <TameReveal />;
  if (stage === "razo") return <RazoReveal />;
  return <PabeigtsReveal />;
}

function GaidaReveal() {
  return (
    <div className="border hairline rounded-md bg-paper p-6 md:p-8">
      <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted mb-6">
        Pasūtījuma kartīte · #2614
      </div>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-[14px]">
        <Field label="Klients" value="SIA Finestra" />
        <Field label="Produkts" value="Logu rāmji, ozols" />
        <Field label="Daudzums" value="4 gab." />
        <Field label="Termiņš" value="13.05.2026" />
        <Field label="Tāme" value="—" muted />
        <Field label="Materiāli" value="—" muted />
      </dl>
      <div className="mt-7 pt-5 border-t hairline mono text-[10px] uppercase tracking-[0.16em] text-muted">
        Gaida tāmi
      </div>
    </div>
  );
}

function TameReveal() {
  return (
    <div className="border hairline rounded-md bg-paper p-6 md:p-8">
      <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted mb-6 flex items-center justify-between">
        <span>BOM · #LOGS-A200</span>
        <span className="text-muted/60">auto-pārbaude</span>
      </div>

      <div className="mono text-[12px] md:text-[13px] leading-[1.85] space-y-0.5">
        <div className="font-medium text-ink">LOGS · TIPS A-200 · 4 gab.</div>
        <BomLine label="├─ Rāmis (ozols) · 4 gab" status="ok" />
        <BomLine label="├─ Stikls 24mm · 2 gab" status="ok" />
        <BomLine label="├─ Furnitūra · 1 kompl" status="warn" detail="tikai 3 gab. noliktavā" />
        <BomLine label="└─ Blīve · 8 m" status="ok" />
      </div>

      <div className="mt-7 pt-5 border-t hairline grid grid-cols-2 gap-4 text-[12px]">
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.16em] text-muted mb-1.5">
            Tāme
          </div>
          <div className="mono tabular-nums text-[20px] md:text-[22px] text-ink leading-none">
            €1,824
          </div>
        </div>
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.16em] text-[#92400E] mb-1.5">
            Brīdinājums
          </div>
          <div className="text-[13px] text-[#92400E] leading-tight">
            Pasūti furnitūru pirms ražošanas
          </div>
        </div>
      </div>
    </div>
  );
}

function BomLine({
  label,
  status,
  detail,
}: {
  label: string;
  status: "ok" | "warn";
  detail?: string;
}) {
  if (status === "warn") {
    return (
      <div className="pl-1 -mx-1.5 px-1.5 bg-[#FEF3C7] rounded-[2px] text-[#92400E] flex items-baseline justify-between gap-3">
        <span>{label}</span>
        <span className="text-[11px] shrink-0">⚠ {detail}</span>
      </div>
    );
  }
  return (
    <div className="pl-1 text-ash flex items-baseline justify-between gap-3">
      <span>{label}</span>
      <span className="text-[11px] text-ink/55 shrink-0">✓ noliktavā</span>
    </div>
  );
}

function RazoReveal() {
  return (
    <div className="border hairline rounded-md bg-paper p-6 md:p-8">
      <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted mb-6 flex items-center justify-between">
        <span>Darba laiks · #2614</span>
        <span className="text-muted/60">cehs · 14:10</span>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <span className="mono text-[11px] uppercase tracking-[0.16em] text-muted">
            Progresa josla
          </span>
          <span className="mono text-[11px] tabular-nums text-ink">62%</span>
        </div>
        <div className="relative h-2 bg-ink/[0.06] rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 gradient-bg rounded-full"
            style={{ width: "62%" }}
          />
        </div>
      </div>

      <ul className="space-y-3">
        <TimeRow time="07:30" task="Materiālu sagatavošana" dur="2h 15m" />
        <TimeRow time="10:00" task="Rāmju izgatavošana" dur="3h 40m" />
        <TimeRow time="14:10" task="Stikla montāža" dur="2h 50m" active />
      </ul>

      <div className="mt-6 pt-4 border-t hairline grid grid-cols-2 gap-4 text-[12px]">
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.16em] text-muted mb-1">
            Strādā
          </div>
          <div className="text-[14px] text-ink">Jānis B.</div>
        </div>
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.16em] text-muted mb-1">
            Stundas šim pasūt.
          </div>
          <div className="mono tabular-nums text-[18px] md:text-[20px] text-ink leading-none">
            8h 45m
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeRow({
  time,
  task,
  dur,
  active,
}: {
  time: string;
  task: string;
  dur: string;
  active?: boolean;
}) {
  return (
    <li className="flex items-baseline gap-3">
      <span
        aria-hidden
        className={`inline-block w-[7px] h-[7px] rounded-full shrink-0 ${
          active ? "gradient-bg" : "bg-ink/25"
        }`}
      />
      <span className="mono text-[11px] tabular-nums text-ink/90 w-12 shrink-0">
        {time}
      </span>
      <span
        className={`text-[13px] flex-1 min-w-0 truncate ${
          active ? "text-ink font-medium" : "text-ash"
        }`}
      >
        {task}
      </span>
      <span className="mono text-[11px] text-muted shrink-0">{dur}</span>
    </li>
  );
}

function PabeigtsReveal() {
  return (
    <div className="border hairline rounded-md bg-paper p-6 md:p-8">
      <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted mb-6 flex items-center justify-between">
        <span>Tāme · fakts · #2614</span>
        <span className="text-muted/60">pabeigts 13.05</span>
      </div>

      <div className="mb-5">
        <div className="mono text-[10px] uppercase tracking-[0.16em] text-muted mb-2">
          Plāns
        </div>
        <div
          className="relative h-9 bg-paper border hairline rounded-[2px]"
          style={{ width: "78%" }}
        >
          <div className="absolute inset-y-0 left-3 flex items-center mono text-[12px] text-ink whitespace-nowrap">
            €1,824 · 4 ned.
          </div>
        </div>
      </div>

      <div className="mb-7">
        <div className="mono text-[10px] uppercase tracking-[0.16em] text-[#065F46] mb-2">
          Reāli
        </div>
        <div
          className="relative h-9 bg-[#D1FAE5] rounded-[2px]"
          style={{ width: "81%" }}
        >
          <div className="absolute inset-y-0 left-3 flex items-center mono text-[12px] text-[#065F46] whitespace-nowrap">
            €1,883 · 4 ned. 1 d.
          </div>
        </div>
      </div>

      <div className="pt-5 border-t hairline grid grid-cols-2 gap-4 text-[12px]">
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.16em] text-muted mb-1">
            Atšķirība
          </div>
          <div className="text-[14px] text-[#065F46]">+3,2% · paredzēts</div>
        </div>
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.16em] text-muted mb-1">
            Peļņa
          </div>
          <div className="mono tabular-nums text-[18px] md:text-[20px] text-ink leading-none">
            €417
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div>
      <dt className="mono text-[10px] uppercase tracking-[0.16em] text-muted mb-1">
        {label}
      </dt>
      <dd className={`${muted ? "text-muted" : "text-ink"} font-medium`}>{value}</dd>
    </div>
  );
}
