"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, Search, TrendingUp } from "lucide-react";
import { INTER_STACK, MONO_STACK } from "./sketches/shared";

type Row = {
  tag: string;
  name: string;
  client: string;
  pct: number;
  hours: string;
  bom: "ok" | "warn";
};

const ROWS: Row[] = [
  { tag: "P-26.41", name: "K1 stūra elements", client: "SIA Kalnabērzs", pct: 100, hours: "113.9h / 113.9h", bom: "ok" },
  { tag: "P-26.42", name: "Logu rāmji, ozols", client: "SIA Finestra", pct: 62, hours: "31.0h / 50.0h", bom: "ok" },
  { tag: "P-26.43", name: "Durvju komplekts · M-12", client: "Koks & Co", pct: 18, hours: "8.5h / 47.2h", bom: "warn" },
  { tag: "P-26.44", name: "Sienas panelis 18mm", client: "SIA Ozolkrasti", pct: 94, hours: "49.5h / 52.8h", bom: "ok" },
  { tag: "P-26.45", name: "Galda virsmas", client: "Ozols SIA", pct: 41, hours: "17.0h / 41.5h", bom: "ok" },
  { tag: "P-26.46", name: "Plauktu sistēma", client: "Mājīgi.lv", pct: 0, hours: "0.0h / 22.5h", bom: "warn" },
  { tag: "P-26.47", name: "Logu rāmji · sērija B", client: "SIA Finestra", pct: 97, hours: "175.2h / 181.3h", bom: "ok" },
  { tag: "P-26.48", name: "Sienu paneļi · A2", client: "SIA Liepkalni Pro", pct: 8, hours: "4.2h / 52.8h", bom: "ok" },
];

const EXCEL_ROWS: Array<{
  n: number;
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  warn?: boolean;
  error?: boolean;
  muted?: boolean;
}> = [
  { n: 1, a: "P-26.41", b: "K1 stura elem.", c: "Kalnaberzs", d: "13/5", e: "pabeigts" },
  { n: 2, a: "26.42", b: "logi ozols", c: "finestra", d: "13.05.2026", e: "ražo" },
  { n: 3, a: "26.43", b: "durvis???", c: "Koks&Co", d: "14-MAY", e: "tame", warn: true },
  { n: 4, a: "#REF!", b: "—", c: "—", d: "—", e: "—", error: true },
  { n: 5, a: "26.44", b: "sienas panelis", c: "Ozolkrasti", d: "15/5", e: "ražo" },
  { n: 6, a: "26.45", b: "galda virsmas", c: "Ozols sia", d: "15-MAY", e: "ražo" },
  { n: 7, a: "26.45", b: "Galda VIRSMAS", c: "Ozols SIA", d: "15/5", e: "?", warn: true },
  { n: 8, a: "26.46", b: "plauktu sistēma", c: "Majigi.lv", d: "17/05/26", e: "gaida" },
  { n: 9, a: "26.47", b: "logi serija B", c: "finestra", d: "20.05", e: "PABEIGTS" },
  { n: 10, a: "", b: "anna sūta jaunu", c: "(WhatsApp)", d: "—", e: "—", muted: true },
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
        className="relative w-full aspect-[4/5] sm:aspect-[16/11] md:aspect-[16/10] overflow-hidden rounded-md border hairline bg-paper select-none cursor-ew-resize"
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
        <div className="absolute inset-0">
          <OpenOuraSide />
        </div>

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <ExcelSide />
        </div>

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

        <div className="absolute top-3 left-3 md:top-4 md:left-5 mono text-[10px] uppercase tracking-[0.22em] text-ink/80 bg-paper/85 backdrop-blur-sm rounded-[2px] px-2 py-1 pointer-events-none z-10">
          Pirms · Excel
        </div>
        <div className="absolute top-3 right-3 md:top-4 md:right-5 mono text-[10px] uppercase tracking-[0.22em] bg-ink/90 text-paper rounded-[2px] px-2 py-1 pointer-events-none z-10">
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
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[#D4D4CB] bg-[#F3F2EC] text-[11px] text-[#3A3A35]">
        <div className="w-3 h-3 border border-[#107C41] bg-[#107C41]/10 rounded-[1px] shrink-0" aria-hidden />
        <span className="mono truncate">Pasūtījumi_2025_v3_FINAL_v2_REAL.xlsx</span>
      </div>

      <div className="flex items-center gap-3 px-3 py-1.5 border-b border-[#D4D4CB] text-[10px] text-[#5C5C57]">
        <span>Sākums</span>
        <span>Ievietot</span>
        <span>Formulas</span>
        <span>Dati</span>
        <span className="text-[#107C41] font-medium">Pārskats</span>
      </div>

      <div className="flex items-end gap-1 px-2 pt-1 border-b border-[#D4D4CB] text-[10px] text-[#3A3A35]">
        <div className="px-2.5 py-1 bg-white border border-[#D4D4CB] border-b-0 rounded-t-[2px]">Pasūt.</div>
        <div className="px-2.5 py-1 bg-[#E8E7DF] rounded-t-[2px]">Sheet1</div>
        <div className="px-2.5 py-1 bg-[#E8E7DF] rounded-t-[2px]">Anna_versija</div>
        <div className="px-2.5 py-1 bg-[#E8E7DF] rounded-t-[2px]">old</div>
        <div className="px-2.5 py-1 bg-[#E8E7DF] rounded-t-[2px]">DELETE_PIRMS</div>
      </div>

      <div className="flex-1 overflow-hidden bg-white">
        <div className="grid grid-cols-[28px_minmax(0,1.2fr)_minmax(0,1.4fr)_minmax(0,1.1fr)_60px_72px] bg-[#F3F2EC] border-b border-[#D4D4CB] text-[10px] text-[#5C5C57]">
          <div className="text-center py-1 border-r border-[#D4D4CB]" />
          <div className="px-2 py-1 border-r border-[#D4D4CB]">A</div>
          <div className="px-2 py-1 border-r border-[#D4D4CB]">B</div>
          <div className="px-2 py-1 border-r border-[#D4D4CB]">C</div>
          <div className="px-2 py-1 border-r border-[#D4D4CB]">D</div>
          <div className="px-2 py-1">E</div>
        </div>

        {EXCEL_ROWS.map((row) => (
          <ExcelRow key={row.n} {...row} />
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 px-3 py-1 border-t border-[#D4D4CB] bg-[#F3F2EC] text-[10px] text-[#5C5C57]">
        <span className="truncate">Saglabāts: Anna · pirms 2 dienām</span>
        <span className="text-[#991B1B] font-medium shrink-0">2 kļūdas · 1 dublikāts</span>
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
   OPENOURA SIDE — mirror of the real Projekti page
   ─────────────────────────────────────────────────────────── */
function OpenOuraSide() {
  return (
    <div
      className="absolute inset-0 bg-white text-gray-900 overflow-hidden flex flex-col"
      style={{ fontFamily: INTER_STACK }}
    >
      <ChromeTopBar />
      <div className="flex-1 min-h-0 flex">
        <ChromeSidebar />
        <main className="flex-1 min-w-0 px-3 sm:px-5 py-3 sm:py-4 overflow-hidden">
          <PageHeader />
          <StatsCard />
          <FilterTabs />
          <SearchBar />
          <ProjectsTable />
        </main>
      </div>
    </div>
  );
}

function ChromeTopBar() {
  return (
    <div className="h-9 sm:h-10 bg-white border-b border-gray-200 flex items-center justify-between px-3 shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        <div className="serif-italic text-[16px] sm:text-[18px] tracking-tight text-gray-900 leading-none -rotate-1">
          openoura
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="hidden sm:flex w-6 h-6 rounded-md border border-gray-200" aria-hidden />
        <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-md border border-gray-200">
          <div
            className="w-5 h-5 rounded-[5px] flex items-center justify-center text-white text-[9px] font-semibold"
            style={{ background: "#8B5CF6" }}
          >
            RU
          </div>
          <span className="hidden sm:inline text-[10px] text-gray-700">rudolfs</span>
        </div>
      </div>
    </div>
  );
}

function ChromeSidebar() {
  const items = ["Projekti", "Noliktava", "Pavadzīmes", "Izdevumi", "Plānotājs", "Monitorings"];
  return (
    <aside
      className="hidden sm:flex flex-col w-[120px] md:w-[140px] shrink-0 border-r border-gray-200 py-2 px-1.5"
      style={{ background: "#F9FAFB" }}
    >
      <div className="px-1.5 mb-1 text-[8px] font-semibold tracking-[0.05em] uppercase text-gray-400">
        Darbs
      </div>
      {items.map((label, i) => {
        const active = i === 0;
        return (
          <div
            key={label}
            className={`px-2 py-1.5 rounded-md text-[11px] md:text-[12px] font-medium truncate mb-0.5 ${
              active ? "" : "text-gray-700"
            }`}
            style={
              active
                ? { background: "#EDE9FE", color: "#6D28D9" }
                : undefined
            }
          >
            {label}
          </div>
        );
      })}
    </aside>
  );
}

function PageHeader() {
  return (
    <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
      <div className="min-w-0">
        <h2 className="text-[16px] sm:text-[20px] font-semibold text-gray-900 leading-tight">
          Projekti
        </h2>
        <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 truncate">
          Pārvaldiet visus sistēmas projektus
        </p>
      </div>
      <button
        className="inline-flex items-center gap-1 text-white text-[10px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg shadow-sm shrink-0"
        style={{
          background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
          boxShadow: "0 4px 10px rgba(139, 92, 246, 0.25)",
        }}
      >
        <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        <span>Jauns</span>
      </button>
    </div>
  );
}

function StatsCard() {
  return (
    <div className="border border-gray-200 rounded-xl p-2.5 sm:p-3 mb-3 sm:mb-4 flex items-center gap-2.5 sm:gap-3">
      <div
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: "linear-gradient(135deg, #8B5CF6, #6366F1)",
          boxShadow: "0 6px 14px rgba(139, 92, 246, 0.25)",
        }}
      >
        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[8px] sm:text-[9px] uppercase font-semibold tracking-[0.05em] text-gray-500">
          Ražotnes noslodze · šī nedēļa
        </div>
        <div className="text-[11px] sm:text-[12px] font-semibold text-gray-900 truncate">
          82% · 21 darbinieks
        </div>
        <div className="flex gap-3 mt-0.5 text-[9px] sm:text-[10px] text-gray-500">
          <span><strong className="text-gray-900">8</strong> aktīvi</span>
          <span><strong className="text-gray-900">3</strong> tāmē</span>
          <span><strong className="text-gray-900">0</strong> pārslodze</span>
        </div>
      </div>
    </div>
  );
}

function FilterTabs() {
  const tabs = [
    { label: "Visi", count: 12, active: true },
    { label: "Plānošanā", count: 3 },
    { label: "Aktīvie", count: 8 },
    { label: "Pabeigtie", count: 1 },
  ];
  return (
    <div className="mb-2.5 sm:mb-3 overflow-hidden">
      <div className="inline-flex gap-0.5 p-0.5 rounded-md bg-gray-50">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-[5px] text-[10px] sm:text-[11px] font-medium whitespace-nowrap ${
              tab.active
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500"
            }`}
            style={tab.active ? { color: "#7C3AED" } : undefined}
          >
            {tab.label}
            <span className="text-gray-400">{tab.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex items-center gap-1.5 mb-2 sm:mb-3">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
        <div className="w-full pl-6 pr-2 py-1.5 rounded-md border border-gray-200 text-[10px] sm:text-[11px] text-gray-400">
          Meklēt projektus...
        </div>
      </div>
    </div>
  );
}

function ProjectsTable() {
  return (
    <div className="border-t border-gray-200">
      <div
        className="grid bg-gray-50 border-b border-gray-200 px-2 sm:px-3 py-1.5 text-[8px] sm:text-[9px] uppercase font-semibold tracking-[0.05em] text-gray-500 items-center"
        style={{ gridTemplateColumns: "minmax(0,72px) minmax(0,1fr) minmax(0,1fr) minmax(0,1.1fr) minmax(0,42px)" }}
      >
        <span>Numurs</span>
        <span>Nosaukums</span>
        <span className="hidden sm:inline">Klients</span>
        <span>Izpilde</span>
        <span className="text-center">BOM</span>
      </div>

      {ROWS.map((row) => (
        <TableRow key={row.tag} row={row} />
      ))}
    </div>
  );
}

function TableRow({ row }: { row: Row }) {
  return (
    <div
      className="grid border-b border-gray-100 px-2 sm:px-3 py-1.5 sm:py-2 items-center text-[10px] sm:text-[11px] text-gray-900"
      style={{ gridTemplateColumns: "minmax(0,72px) minmax(0,1fr) minmax(0,1fr) minmax(0,1.1fr) minmax(0,42px)" }}
    >
      <div>
        <span
          className="inline-flex items-center font-medium tabular-nums rounded-md px-1.5 py-0.5 text-[9px] sm:text-[10px]"
          style={{
            background: "#EDE9FE",
            color: "#6D28D9",
            fontFamily: MONO_STACK,
          }}
        >
          {row.tag}
        </span>
      </div>
      <div className="font-medium truncate pr-2">{row.name}</div>
      <div className="hidden sm:block text-gray-700 truncate pr-2">{row.client}</div>
      <div className="pr-2">
        <CompactProgress pct={row.pct} hours={row.hours} />
      </div>
      <div className="flex items-center justify-center">
        <BomCell type={row.bom} />
      </div>
    </div>
  );
}

function CompactProgress({ pct, hours }: { pct: number; hours: string }) {
  const zero = pct === 0;
  return (
    <div>
      <div className="flex justify-between items-baseline gap-1">
        <span
          className={`text-[10px] sm:text-[11px] font-semibold ${
            zero ? "text-gray-400" : "text-gray-900"
          }`}
        >
          {pct}%
        </span>
        <span
          className="text-[8px] sm:text-[9px] text-gray-500 truncate"
          style={{ fontFamily: MONO_STACK }}
        >
          {hours}
        </span>
      </div>
      <div
        className="w-full h-[3px] rounded-full overflow-hidden mt-0.5"
        style={{ background: "#E5E7EB" }}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: "#14B8A6" }}
        />
      </div>
    </div>
  );
}

function BomCell({ type }: { type: "ok" | "warn" }) {
  if (type === "ok") {
    return <span className="text-gray-400 text-[12px]">—</span>;
  }
  return (
    <div
      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[8px] sm:text-[9px] font-semibold"
      style={{ background: "#FEF2F2", color: "#B91C1C" }}
    >
      ⚠
    </div>
  );
}
