"use client";

import {
  AlertTriangle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Monitor,
  Plus,
  Sparkles,
} from "lucide-react";

type ChipStatus = "planned" | "working" | "ready" | "shipped" | "delayed";

type Chip = {
  code: string;
  status: ChipStatus;
  warning?: boolean;
};

type DayCell = {
  day?: number;
  today?: boolean;
  chips?: Chip[];
};

const STATUS_STYLE: Record<
  ChipStatus,
  { dot: string; bg: string; border: string; text: string }
> = {
  planned: { dot: "#9CA3AF", bg: "#F9FAFB", border: "#E5E7EB", text: "#374151" },
  working: { dot: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A", text: "#92400E" },
  ready: { dot: "#10B981", bg: "#ECFDF5", border: "#A7F3D0", text: "#047857" },
  shipped: { dot: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE", text: "#1D4ED8" },
  delayed: { dot: "#EF4444", bg: "#FEF2F2", border: "#FECACA", text: "#B91C1C" },
};

// May 2026 — May 1 is a Friday. Week starts Monday (P).
// 5 rows × 7 columns = 35 cells.
const CALENDAR: DayCell[] = [
  // Row 1: 4 empty + May 1, 2, 3
  {},
  {},
  {},
  {},
  { day: 1 },
  { day: 2 },
  { day: 3 },
  // Row 2: May 4-10
  { day: 4 },
  { day: 5 },
  { day: 6 },
  {
    day: 7,
    chips: [{ code: "S-26.81", status: "shipped" }],
  },
  {
    day: 8,
    chips: [
      { code: "S-26.31", status: "working", warning: true },
      { code: "S-25.165", status: "ready", warning: true },
      { code: "S-26.52", status: "working", warning: true },
    ],
  },
  { day: 9 },
  { day: 10 },
  // Row 3: May 11 (today) - May 17
  {
    day: 11,
    today: true,
    chips: [
      { code: "S-26.58", status: "working" },
      { code: "S-26.58", status: "working" },
      { code: "S-26.58", status: "working" },
      { code: "S-26.88", status: "working" },
    ],
  },
  {
    day: 12,
    chips: [
      { code: "S-25.301-3", status: "working" },
      { code: "S-26.85", status: "working" },
      { code: "S-26.77-1", status: "working" },
    ],
  },
  {
    day: 13,
    chips: [
      { code: "S-26.55", status: "working" },
      { code: "S-26.92", status: "working" },
    ],
  },
  {
    day: 14,
    chips: [
      { code: "S-26.33", status: "working" },
      { code: "S-26.95", status: "working" },
      { code: "S-26.91", status: "working" },
    ],
  },
  {
    day: 15,
    chips: [
      { code: "S-26.87", status: "working" },
      { code: "S-26.79", status: "working" },
      { code: "S-26.96", status: "working" },
    ],
  },
  { day: 16 },
  { day: 17 },
  // Row 4: May 18-24
  { day: 18 },
  {
    day: 19,
    chips: [
      { code: "S-26.99", status: "working" },
      { code: "S-26.100", status: "planned" },
    ],
  },
  { day: 20 },
  { day: 21 },
  {
    day: 22,
    chips: [{ code: "S-24.245", status: "working" }],
  },
  { day: 23 },
  { day: 24 },
  // Row 5: May 25-31
  { day: 25 },
  { day: 26 },
  { day: 27 },
  { day: 28 },
  { day: 29 },
  { day: 30 },
  { day: 31 },
];

const DAY_LABELS = ["P", "O", "T", "C", "PK", "S", "SV"];

export function SutijumiPlanotajsPage() {
  return (
    <main className="flex-1 min-w-0 bg-white p-4 md:p-6">
      <PageHeader />
      <CalendarNav />
      <StatusLegend />
      <CalendarGrid />
    </main>
  );
}

/* ──────────────────────────────────────────────────────────
   HEADER
   ────────────────────────────────────────────────────────── */
function PageHeader() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
      <div>
        <h2 className="text-[22px] md:text-[28px] font-semibold text-gray-900 leading-tight">
          Plānotājs
        </h2>
        <p className="text-[13px] md:text-[14px] text-gray-500 mt-1">
          Sūtījumu kalendārs
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap mt-2 lg:mt-0">
        <PrimaryViolet>
          <Plus className="w-[18px] h-[18px]" />
          <span className="hidden sm:inline">Jauns sūtījums</span>
          <span className="sm:hidden">Sūtījums</span>
        </PrimaryViolet>
        <OutlineBtn className="hidden md:inline-flex">
          <Monitor className="w-4 h-4 text-gray-700" />
          <span>Display Mode</span>
        </OutlineBtn>
        <OutlineBtn className="hidden md:inline-flex">
          <FileText className="w-4 h-4 text-gray-500" />
          <span>Dokumentu veidnes</span>
        </OutlineBtn>
        <OutlineBtn className="hidden md:inline-flex">
          <ClipboardList className="w-4 h-4 text-violet-600" />
          <span>Packing list šabloni</span>
        </OutlineBtn>
        <button
          className="inline-flex items-center gap-1.5 text-white text-[13px] md:text-[14px] font-medium px-3 md:px-4 py-2 rounded-xl shadow-md shrink-0"
          style={{
            background: "linear-gradient(135deg, #10B981, #059669)",
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
          }}
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">Jauns brauciens</span>
          <span className="sm:hidden">Brauciens</span>
        </button>
      </div>
    </div>
  );
}

function PrimaryViolet({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="inline-flex items-center gap-1.5 text-white text-[13px] md:text-[14px] font-medium px-3 md:px-4 py-2 rounded-xl shadow-md shrink-0"
      style={{
        background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
        boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
      }}
    >
      {children}
    </button>
  );
}

function OutlineBtn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────
   CALENDAR NAV
   ────────────────────────────────────────────────────────── */
function CalendarNav() {
  return (
    <div className="flex items-center gap-3 mb-4 flex-wrap">
      <button
        aria-label="Iepriekšējais mēnesis"
        className="h-9 w-9 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600"
      >
        <ChevronLeft className="w-[18px] h-[18px]" />
      </button>
      <div className="text-[16px] md:text-[18px] font-semibold text-gray-900">
        Maijs 2026
      </div>
      <button
        aria-label="Nākamais mēnesis"
        className="h-9 w-9 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600"
      >
        <ChevronRight className="w-[18px] h-[18px]" />
      </button>
      <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50">
        Šodien
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   STATUS LEGEND
   ────────────────────────────────────────────────────────── */
function StatusLegend() {
  const items: { label: string; status: ChipStatus }[] = [
    { label: "Plānots", status: "planned" },
    { label: "Darbā", status: "working" },
    { label: "Gatavs", status: "ready" },
    { label: "Nosūtīts", status: "shipped" },
    { label: "Aizkavēts", status: "delayed" },
  ];
  return (
    <div className="mb-4 -mx-1 overflow-x-auto">
      <div className="inline-flex items-center gap-3 px-1 flex-nowrap">
        {items.map((it) => (
          <span
            key={it.label}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-[13px] text-gray-700 whitespace-nowrap"
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: STATUS_STYLE[it.status].dot }}
            />
            {it.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   CALENDAR GRID
   ────────────────────────────────────────────────────────── */
function CalendarGrid() {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {DAY_LABELS.map((label, i) => (
          <div
            key={label}
            className={`px-2 md:px-3 py-2 md:py-2.5 text-center text-[11px] uppercase font-semibold tracking-wider text-gray-500 ${
              i < DAY_LABELS.length - 1 ? "border-r border-gray-200" : ""
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {CALENDAR.map((cell, i) => {
          const col = i % 7;
          const row = Math.floor(i / 7);
          const totalRows = Math.ceil(CALENDAR.length / 7);
          const isLastCol = col === 6;
          const isLastRow = row === totalRows - 1;
          const isEmpty = cell.day === undefined;

          return (
            <div
              key={i}
              className={`min-h-[80px] md:min-h-[120px] p-1.5 md:p-2 ${
                isLastCol ? "" : "border-r border-gray-100"
              } ${isLastRow ? "" : "border-b border-gray-100"} ${
                isEmpty ? "bg-gray-50/40" : ""
              }`}
            >
              {!isEmpty && <DayCellView cell={cell} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DayCellView({ cell }: { cell: DayCell }) {
  return (
    <div className="flex flex-col gap-1 h-full">
      <div className="flex justify-end">
        {cell.today ? (
          <div className="h-7 w-7 rounded-full bg-violet-600 text-white text-[13px] font-semibold flex items-center justify-center">
            {cell.day}
          </div>
        ) : (
          <div className="text-[13px] font-semibold text-gray-700 px-1">
            {cell.day}
          </div>
        )}
      </div>
      {cell.chips && cell.chips.length > 0 && (
        <div className="flex flex-col gap-1">
          {cell.chips.map((chip, i) => (
            <ChipView key={i} chip={chip} />
          ))}
        </div>
      )}
    </div>
  );
}

function ChipView({ chip }: { chip: Chip }) {
  const s = STATUS_STYLE[chip.status];
  return (
    <div
      className="w-full px-1.5 md:px-2 py-1 rounded-md text-[11px] font-medium flex items-center justify-between gap-1.5 border"
      style={{
        background: s.bg,
        borderColor: s.border,
        color: s.text,
      }}
    >
      <div className="flex items-center gap-1.5 min-w-0">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full shrink-0"
          style={{ background: s.dot }}
        />
        <span className="truncate hidden sm:inline">{chip.code}</span>
      </div>
      <div className="hidden sm:flex items-center gap-1 opacity-60 shrink-0">
        {chip.warning && <AlertTriangle className="w-3 h-3" />}
        <Calendar className="w-3 h-3" />
      </div>
    </div>
  );
}
