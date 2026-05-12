"use client";

import {
  CheckCircle,
  ChevronDown,
  Download,
  Edit2,
  Eye,
  FileCode,
  FileText,
  Info,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { MONO_STACK } from "../shared";

type InvoiceRow = {
  nr: string;
  date: string;
  supplier: string;
  amount: string;
  currency: string;
  lines: string;
  project: string;
};

const ROWS: InvoiceRow[] = [
  { nr: "WDT /2026/03859", date: "2026-05-05", supplier: "Kalnabērzs SIA", amount: "192.78", currency: "EUR", lines: "4/4", project: "P-26.41" },
  { nr: "WDT /2026/03861", date: "2026-05-05", supplier: "Liepkalni Pro", amount: "664.60", currency: "EUR", lines: "2/2", project: "P-26.42" },
  { nr: "WDT /2026/03852", date: "2026-05-05", supplier: "Vārpa Mēbeles", amount: "368.76", currency: "EUR", lines: "7/7", project: "P-26.43" },
  { nr: "WDT /2026/03851", date: "2026-05-05", supplier: "Ozolkrasti", amount: "2040.16", currency: "EUR", lines: "18/18", project: "P-26.44" },
  { nr: "WDT /2026/03849", date: "2026-05-05", supplier: "Sēnītes Trade", amount: "107191.07", currency: "EUR", lines: "140/140", project: "P-26.45" },
];

export function PavadzimesPage() {
  return (
    <main className="flex-1 min-w-0 bg-white p-4 md:p-6">
      <PageHeader />
      <StatsCards />
      <FilterRow />
      <InvoicesTable />
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
          Pavadzīmes
        </h2>
        <p className="text-[13px] md:text-[14px] text-gray-500 mt-1">
          Piegādātāju pavadzīmju pārvaldība
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap mt-4 lg:mt-0">
        <OutlineBtn>
          <Download className="w-4 h-4 text-gray-500" />
          <span>Eksportēt</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </OutlineBtn>
        <OutlineBtn>
          <FileCode className="w-4 h-4 text-gray-500" />
          <span>XML imports</span>
        </OutlineBtn>
        <OutlineBtn>
          <FileText className="w-4 h-4 text-violet-600" />
          <span>Parsēt PDF</span>
        </OutlineBtn>
        <button
          className="inline-flex items-center gap-1.5 text-white text-[13px] font-medium px-4 py-2 rounded-xl shadow-md shrink-0"
          style={{
            background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
          }}
        >
          <Plus className="w-[18px] h-[18px]" />
          <span className="hidden sm:inline">Jauna pavadzīme</span>
          <span className="sm:hidden">Jauna</span>
        </button>
      </div>
    </div>
  );
}

function OutlineBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
      {children}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────
   STATS
   ────────────────────────────────────────────────────────── */
function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-6">
      <StatCard label="Kopā pavadzīmes" value="52" />
      <StatCard label="Jaunas / Neapstiprinātas" value="15" withInfo />
      <StatCard label="Mēneša summa" value="111098.95 €" />
      <AiBudgetCard />
    </div>
  );
}

function StatCard({
  label,
  value,
  withInfo = false,
}: {
  label: string;
  value: string;
  withInfo?: boolean;
}) {
  return (
    <div className="border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center gap-1 mb-2">
        <span className="text-[11px] uppercase font-semibold tracking-[0.05em] text-gray-500">
          {label}
        </span>
        {withInfo && <Info className="w-3 h-3 text-gray-400" />}
      </div>
      <div className="text-[28px] md:text-[32px] font-semibold leading-none text-gray-900">
        {value}
      </div>
    </div>
  );
}

function AiBudgetCard() {
  return (
    <div className="border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center gap-1 mb-2">
        <Sparkles className="w-3.5 h-3.5 text-violet-600" />
        <span className="text-[11px] uppercase font-semibold tracking-[0.05em] text-gray-500">
          AI budžets šomēnes
        </span>
        <Info className="w-3 h-3 text-gray-400" />
      </div>
      <div
        className="text-[18px] font-semibold leading-none text-gray-900"
        style={{ fontFamily: MONO_STACK }}
      >
        $1.3780 / $10.00
      </div>
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-3">
        <div
          className="h-full rounded-full"
          style={{
            width: "13.8%",
            background: "linear-gradient(90deg, #8B5CF6, #06B6D4)",
          }}
        />
      </div>
      <div className="text-[11px] text-gray-500 mt-1.5">
        13.8% izlietots · Atlicis $8.6220
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   FILTERS
   ────────────────────────────────────────────────────────── */
function FilterRow() {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
      <div className="relative w-full md:flex-1 md:max-w-[400px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
        <input
          type="text"
          placeholder="Meklēt pēc numura vai piegādātāja..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400"
        />
      </div>

      <div className="grid grid-cols-2 md:flex md:items-center gap-2 md:gap-3">
        <SelectBox label="Visi statusi" />
        <SelectBox label="Visi avoti" />
        <SelectBox label="Visi piegādātāji" className="col-span-2 md:col-auto" />
      </div>

      <div className="grid grid-cols-2 md:flex md:items-center gap-2 md:gap-3">
        <DateBox placeholder="No datuma" />
        <DateBox placeholder="Līdz datumam" />
      </div>
    </div>
  );
}

function SelectBox({ label, className = "" }: { label: string; className?: string }) {
  return (
    <button
      className={`inline-flex items-center justify-between gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-xl text-[14px] text-gray-700 hover:bg-gray-50 ${className}`}
    >
      <span>{label}</span>
      <ChevronDown className="w-4 h-4 text-gray-400" />
    </button>
  );
}

function DateBox({ placeholder }: { placeholder: string }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-500 placeholder:text-gray-500 focus:outline-none focus:border-violet-400"
    />
  );
}

/* ──────────────────────────────────────────────────────────
   TABLE
   ────────────────────────────────────────────────────────── */
const DESKTOP_GRID =
  "140px 110px 1fr 100px 80px 90px 120px 140px 90px 90px 90px";

function InvoicesTable() {
  return (
    <div className="border-t border-gray-200 overflow-x-auto">
      <div
        className="grid bg-gray-50 border-b border-gray-200 px-4 py-3 text-[11px] uppercase font-semibold tracking-wider text-gray-500 items-center min-w-[1200px]"
        style={{ gridTemplateColumns: DESKTOP_GRID }}
      >
        <TableHeader label="Nr." />
        <TableHeader label="Datums" />
        <TableHeader label="Piegādātājs" withInfo />
        <TableHeader label="Summa" />
        <TableHeader label="Valūta" />
        <TableHeader label="Rindas" />
        <TableHeader label="Projekti" withInfo />
        <TableHeader label="Statuss" />
        <TableHeader label="Avots" withInfo />
        <TableHeader label="Drošība" withInfo />
        <TableHeader label="Darbības" />
      </div>

      {ROWS.map((row, i) => (
        <InvoiceTableRow key={i} row={row} />
      ))}
    </div>
  );
}

function TableHeader({ label, withInfo = false }: { label: string; withInfo?: boolean }) {
  return (
    <div className="flex items-center gap-1 min-w-0">
      <span className="truncate">{label}</span>
      {withInfo && <Info className="w-3 h-3 text-gray-400 shrink-0" />}
    </div>
  );
}

function InvoiceTableRow({ row }: { row: InvoiceRow }) {
  return (
    <div
      className="grid border-b border-gray-100 hover:bg-gray-50 transition-colors px-4 py-4 items-center text-[14px] text-gray-900 min-w-[1200px]"
      style={{ gridTemplateColumns: DESKTOP_GRID }}
    >
      <div
        className="text-[12px] text-gray-700 tabular-nums truncate pr-2"
        style={{ fontFamily: MONO_STACK }}
      >
        {row.nr}
      </div>
      <div className="text-[13px] text-gray-600 tabular-nums">{row.date}</div>
      <div className="text-[14px] text-gray-900 font-medium truncate pr-3">
        {row.supplier}
      </div>
      <div className="text-right tabular-nums font-medium pr-3">
        {row.amount}
      </div>
      <div className="text-gray-600 text-[12px] uppercase">{row.currency}</div>
      <div className="tabular-nums text-gray-700">{row.lines}</div>
      <div>
        <ProjectPill>{row.project}</ProjectPill>
      </div>
      <div>
        <StatusPill />
      </div>
      <div>
        <AiPill />
      </div>
      <div>
        <ScorePill />
      </div>
      <div className="flex items-center gap-1">
        <RowIconBtn Icon={Eye} />
        <RowIconBtn Icon={Edit2} />
      </div>
    </div>
  );
}

function ProjectPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center bg-violet-100 text-violet-700 px-2.5 py-1 rounded-lg text-[12px] font-medium tabular-nums">
      {children}
    </span>
  );
}

function StatusPill({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-medium">
        <CheckCircle className="w-3 h-3" />
        OK
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap">
      <CheckCircle className="w-3 h-3" />
      Pilnībā noliktavā
    </span>
  );
}

function AiPill() {
  return (
    <span className="inline-flex items-center gap-1 bg-violet-100 text-violet-700 px-2.5 py-1 rounded-full text-[11px] font-medium">
      <Sparkles className="w-2.5 h-2.5" />
      AI
    </span>
  );
}

function ScorePill() {
  return (
    <span className="inline-flex items-center bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[11px] font-medium">
      90%
    </span>
  );
}

function RowIconBtn({ Icon }: { Icon: typeof Eye }) {
  return (
    <button className="w-7 h-7 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-500">
      <Icon className="w-4 h-4" />
    </button>
  );
}
