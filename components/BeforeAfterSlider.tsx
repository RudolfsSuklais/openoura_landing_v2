"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const ORDERS = [
  { id: "#2614", title: "Logu rāmji, ozols", customer: "SIA Finestra", deadline: "13.05", status: "RAŽO" },
  { id: "#2613", title: "Durvju komplekts", customer: "Koks & Co", deadline: "14.05", status: "TĀME" },
  { id: "#2612", title: "Galda virsmas", customer: "Ozols SIA", deadline: "15.05", status: "RAŽO" },
  { id: "#2611", title: "Plauktu sistēma", customer: "Mājīgi.lv", deadline: "17.05", status: "GAIDA" },
];

export function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  // Auto-nudge on first mount so users notice it's interactive.
  const [hasNudged, setHasNudged] = useState(false);
  useEffect(() => {
    if (hasNudged) return;
    if (typeof IntersectionObserver === "undefined") return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasNudged) {
          setHasNudged(true);
          // Nudge: 50 → 65 → 35 → 50
          setTimeout(() => setPosition(65), 700);
          setTimeout(() => setPosition(35), 1500);
          setTimeout(() => setPosition(50), 2300);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNudged]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative w-full aspect-[5/4] sm:aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-md border hairline bg-paper select-none cursor-ew-resize"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="slider"
        aria-label="Pirms un pēc — Excel salīdzinājumā ar OpenOura"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% Excel rāda kreisajā pusē, pārējais — OpenOura`}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {/* AFTER LAYER (always full) — OpenOura, clean */}
        <div className="absolute inset-0">
          <OpenOuraSide />
        </div>

        {/* BEFORE LAYER (clipped from the right) — Excel chaos */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <ExcelSide />
        </div>

        {/* DIVIDER + HANDLE */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0 w-px bg-ink/80 pointer-events-none"
          style={{ left: `${position}%` }}
        />
        <button
          type="button"
          aria-hidden
          tabIndex={-1}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-11 w-11 rounded-full bg-ink text-paper shadow-[0_8px_24px_rgba(10,10,10,0.25)] flex items-center justify-center transition-transform duration-150 hover:scale-105 active:scale-95"
          style={{ left: `${position}%` }}
        >
          <span aria-hidden className="mono text-[12px] tracking-tight">
            ‹ ›
          </span>
        </button>

        {/* LABELS — top corners */}
        <div className="absolute top-3 left-3 md:top-4 md:left-5 mono text-[10px] uppercase tracking-[0.22em] text-ink/80 bg-paper/85 backdrop-blur-sm rounded-[2px] px-2 py-1 pointer-events-none">
          Pirms · Excel
        </div>
        <div className="absolute top-3 right-3 md:top-4 md:right-5 mono text-[10px] uppercase tracking-[0.22em] bg-ink/90 text-paper rounded-[2px] px-2 py-1 pointer-events-none">
          Pēc · OpenOura
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between mono text-[10px] uppercase tracking-[0.18em] text-muted">
        <span>Velc, lai salīdzinātu</span>
        <span className="hidden sm:inline">Tā pati informācija · divas pasaules</span>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   EXCEL SIDE — chaotic spreadsheet aesthetic
   ─────────────────────────────────────────────────────────── */
function ExcelSide() {
  return (
    <div className="absolute inset-0 bg-[#FDFDF7] flex flex-col">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[#D4D4CB] bg-[#F3F2EC] text-[11px] text-[#3A3A35]">
        <div className="w-3 h-3 border border-[#107C41] bg-[#107C41]/10 rounded-[1px] shrink-0" aria-hidden />
        <span className="mono truncate">Pasūtījumi_2025_v3_FINAL_v2_REAL.xlsx</span>
      </div>

      {/* Toolbar strip */}
      <div className="flex items-center gap-3 px-3 py-1.5 border-b border-[#D4D4CB] text-[10px] text-[#5C5C57]">
        <span>Sākums</span>
        <span>Ievietot</span>
        <span>Formulas</span>
        <span>Dati</span>
        <span className="text-[#107C41] font-medium">Pārskats</span>
      </div>

      {/* Sheet tabs */}
      <div className="flex items-end gap-1 px-2 pt-1 border-b border-[#D4D4CB] text-[10px] text-[#3A3A35]">
        <div className="px-2.5 py-1 bg-white border border-[#D4D4CB] border-b-0 rounded-t-[2px]">Pasūt.</div>
        <div className="px-2.5 py-1 bg-[#E8E7DF] rounded-t-[2px]">Sheet1</div>
        <div className="px-2.5 py-1 bg-[#E8E7DF] rounded-t-[2px]">Anna_versija</div>
        <div className="px-2.5 py-1 bg-[#E8E7DF] rounded-t-[2px]">old</div>
        <div className="px-2.5 py-1 bg-[#E8E7DF] rounded-t-[2px]">DELETE_PIRMS</div>
      </div>

      {/* Cell grid */}
      <div className="flex-1 overflow-hidden bg-white">
        {/* Column headers */}
        <div className="grid grid-cols-[28px_minmax(0,1.2fr)_minmax(0,1.4fr)_minmax(0,1.1fr)_60px_72px] bg-[#F3F2EC] border-b border-[#D4D4CB] text-[10px] text-[#5C5C57]">
          <div className="text-center py-1 border-r border-[#D4D4CB]" />
          <div className="px-2 py-1 border-r border-[#D4D4CB]">A</div>
          <div className="px-2 py-1 border-r border-[#D4D4CB]">B</div>
          <div className="px-2 py-1 border-r border-[#D4D4CB]">C</div>
          <div className="px-2 py-1 border-r border-[#D4D4CB]">D</div>
          <div className="px-2 py-1">E</div>
        </div>

        {/* Rows — note the chaos */}
        <ExcelRow n={1} a="#2614" b="logi ozols" c="finestra" d="13/5" e="ražo" />
        <ExcelRow n={2} a="2613" b="durvis???" c="Koks&Co" d="14.05.2026" e="tame" warn />
        <ExcelRow n={3} a="2612" b="galda virsmas" c="Ozols sia" d="15-MAY" e="ražo" />
        <ExcelRow n={4} a="#REF!" b="—" c="—" d="—" e="—" error />
        <ExcelRow n={5} a="2611" b="plauktu sistēma" c="Majigi.lv" d="17/05/26" e="gaida" />
        <ExcelRow n={6} a="2610" b="Logi ozols" c="finestra" d="13.05" e="PABEIGTS" />
        <ExcelRow n={7} a="2610" b="logi-OZOLS" c="Finestra" d="13/5" e="?" warn />
        <ExcelRow n={8} a="" b="anna sūta jaunu" c="(WhatsApp)" d="—" e="—" muted />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between gap-3 px-3 py-1 border-t border-[#D4D4CB] bg-[#F3F2EC] text-[10px] text-[#5C5C57]">
        <span className="truncate">Saglabāts: Anna · pirms 2 dienām</span>
        <span className="text-[#991B1B] font-medium shrink-0">2 kļūdas</span>
      </div>
    </div>
  );
}

function ExcelRow({
  n,
  a,
  b,
  c,
  d,
  e,
  warn,
  error,
  muted,
}: {
  n: number;
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  warn?: boolean;
  error?: boolean;
  muted?: boolean;
}) {
  const bg = error ? "bg-[#FEE2E2]" : warn ? "bg-[#FEF3C7]" : "bg-white";
  const text = error ? "text-[#991B1B]" : muted ? "text-[#9CA3AF] italic" : "text-[#1A1A18]";
  return (
    <div
      className={`grid grid-cols-[28px_minmax(0,1.2fr)_minmax(0,1.4fr)_minmax(0,1.1fr)_60px_72px] ${bg} border-b border-[#E8E7DF] text-[11px] ${text}`}
    >
      <div className="text-center py-1 bg-[#F3F2EC] border-r border-[#D4D4CB] text-[#5C5C57] text-[10px]">
        {n}
      </div>
      <div className="px-2 py-1 border-r border-[#D4D4CB] truncate mono">{a}</div>
      <div className="px-2 py-1 border-r border-[#D4D4CB] truncate">{b}</div>
      <div className="px-2 py-1 border-r border-[#D4D4CB] truncate">{c}</div>
      <div className="px-2 py-1 border-r border-[#D4D4CB] truncate mono">{d}</div>
      <div className="px-2 py-1 truncate">{e}</div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   OPENOURA SIDE — clean, editorial product mock
   ─────────────────────────────────────────────────────────── */
function OpenOuraSide() {
  return (
    <div className="absolute inset-0 bg-paper flex flex-col">
      {/* Header */}
      <div className="flex items-baseline justify-between gap-3 px-4 md:px-6 pt-4 md:pt-5 pb-3 border-b hairline">
        <div className="flex items-baseline gap-3 min-w-0">
          <div className="serif-italic text-[18px] md:text-[22px] tracking-tight text-ink leading-none -rotate-1">
            openoura
          </div>
          <span aria-hidden className="text-muted/30">/</span>
          <span className="mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-muted truncate">
            Projekti · Aktīvi
          </span>
        </div>
        <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink shrink-0">
          47
        </div>
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-hidden">
        <ul className="divide-y hairline">
          {ORDERS.map((o, i) => (
            <li
              key={o.id}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-3.5"
            >
              <span className="mono tabular-nums text-[12px] md:text-[13px] text-ink shrink-0 w-12 md:w-14">
                {o.id}
              </span>
              <div className="min-w-0">
                <div className="text-[13px] md:text-[14px] text-ink leading-tight truncate">
                  {o.title}
                </div>
                <div className="mono text-[10px] md:text-[11px] uppercase tracking-[0.12em] text-muted mt-0.5 truncate">
                  {o.customer} · {o.deadline}
                </div>
              </div>
              <StatusPill status={o.status} highlight={i === 0} />
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 px-4 md:px-6 py-2.5 border-t hairline mono text-[10px] uppercase tracking-[0.18em] text-muted">
        <span>Atjaunots tūlīt · auto</span>
        <span className="text-ink">0 kļūdas</span>
      </div>
    </div>
  );
}

function StatusPill({ status, highlight }: { status: string; highlight?: boolean }) {
  const style = (() => {
    switch (status) {
      case "RAŽO":
        return highlight
          ? "bg-ink text-paper"
          : "bg-ink/[0.04] text-ink border hairline";
      case "TĀME":
        return "bg-[#DBEAFE] text-[#1E40AF]";
      case "GAIDA":
        return "bg-[#F3F4F6] text-[#4B5563]";
      default:
        return "bg-[#F3F4F6] text-[#4B5563]";
    }
  })();
  return (
    <span
      className={`mono text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full shrink-0 ${style}`}
    >
      {status}
    </span>
  );
}
