"use client";

import {
  Briefcase,
  ChevronDown,
  Drill,
  Edit2,
  FileSpreadsheet,
  HardHat,
  Plus,
  Ruler,
  Search,
  Trash2,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { MONO_STACK } from "../shared";

type Category = "power" | "measure" | "hand" | "safety";
type Ownership = "company" | "rented" | "employee";
type Status = "active" | "repair" | "rented" | "written-off";

type ToolRow = {
  name: string;
  category: Category;
  sku: string;
  internalSku: string;
  engraved: string;
  ownership: Ownership;
  responsible: { initial: string; name: string };
  status: Status;
  rentalEnd: string;
};

const CATEGORY_META: Record<
  Category,
  { Icon: LucideIcon; bg: string; color: string }
> = {
  power: { Icon: Drill, bg: "#FEF3C7", color: "#B45309" },
  measure: { Icon: Ruler, bg: "#DBEAFE", color: "#1D4ED8" },
  hand: { Icon: Wrench, bg: "#F3F4F6", color: "#374151" },
  safety: { Icon: HardHat, bg: "#D1FAE5", color: "#047857" },
};

const OWNERSHIP_META: Record<
  Ownership,
  { label: string; bg: string; color: string }
> = {
  company: { label: "Uzņēmuma", bg: "#EFF6FF", color: "#1D4ED8" },
  rented: { label: "Nomāts", bg: "#F5F3FF", color: "#6D28D9" },
  employee: { label: "Darbinieka", bg: "#F3F4F6", color: "#374151" },
};

const STATUS_META: Record<
  Status,
  { label: string; bg: string; color: string }
> = {
  active: { label: "Aktīvs", bg: "#ECFDF5", color: "#047857" },
  repair: { label: "Remontā", bg: "#FFFBEB", color: "#B45309" },
  rented: { label: "Iznomāts", bg: "#EFF6FF", color: "#1D4ED8" },
  "written-off": { label: "Norakstīts", bg: "#F3F4F6", color: "#6B7280" },
};

const ROWS: ToolRow[] = [
  {
    name: "Hilti TE 6-A36 perforators",
    category: "power",
    sku: "HLT-2032174",
    internalSku: "OO-INS-001",
    engraved: "F2-2024-001",
    ownership: "company",
    responsible: { initial: "K", name: "Kaspars B." },
    status: "active",
    rentalEnd: "—",
  },
  {
    name: "Makita DGA504 leņķa slīpmašīna",
    category: "power",
    sku: "MKT-DGA504",
    internalSku: "OO-INS-002",
    engraved: "F2-2024-002",
    ownership: "company",
    responsible: { initial: "E", name: "Edgars L." },
    status: "active",
    rentalEnd: "—",
  },
  {
    name: "Bosch GBH 2-26 perforators",
    category: "power",
    sku: "BSH-GBH226",
    internalSku: "OO-INS-003",
    engraved: "—",
    ownership: "company",
    responsible: { initial: "J", name: "Jānis O." },
    status: "repair",
    rentalEnd: "—",
  },
  {
    name: "Stabila 196-2 līmenis 80cm",
    category: "measure",
    sku: "STB-1962-80",
    internalSku: "OO-INS-004",
    engraved: "F2-2024-004",
    ownership: "company",
    responsible: { initial: "T", name: "Toms K." },
    status: "active",
    rentalEnd: "—",
  },
  {
    name: "Mitutoyo digitālais bīdmērs 150mm",
    category: "measure",
    sku: "MTY-500-196",
    internalSku: "OO-INS-005",
    engraved: "F2-2024-005",
    ownership: "company",
    responsible: { initial: "I", name: "Imants P." },
    status: "active",
    rentalEnd: "—",
  },
  {
    name: "Festool TS 55 ripzāģis",
    category: "power",
    sku: "FST-TS55-LV",
    internalSku: "OO-INS-006",
    engraved: "—",
    ownership: "rented",
    responsible: { initial: "M", name: "Mārtiņš V." },
    status: "rented",
    rentalEnd: "28.05.2026",
  },
  {
    name: "Stihl MS 180 motorzāģis",
    category: "power",
    sku: "STH-MS180",
    internalSku: "OO-INS-007",
    engraved: "F2-2025-007",
    ownership: "company",
    responsible: { initial: "A", name: "Andris K." },
    status: "repair",
    rentalEnd: "—",
  },
  {
    name: "DeWalt DCD791 akumulatora urbjmašīna",
    category: "power",
    sku: "DW-DCD791",
    internalSku: "OO-INS-008",
    engraved: "F2-2025-008",
    ownership: "company",
    responsible: { initial: "R", name: "Renārs O." },
    status: "active",
    rentalEnd: "—",
  },
  {
    name: "3M Peltor X5A dzirdes aizsardzība",
    category: "safety",
    sku: "3M-X5A",
    internalSku: "OO-INS-009",
    engraved: "—",
    ownership: "company",
    responsible: { initial: "P", name: "Pēteris J." },
    status: "active",
    rentalEnd: "—",
  },
  {
    name: "Knipex 03 02 180 universālās kombinētās knaibles",
    category: "hand",
    sku: "KNX-0302-180",
    internalSku: "OO-INS-010",
    engraved: "F2-2025-010",
    ownership: "company",
    responsible: { initial: "K", name: "Kaspars B." },
    status: "active",
    rentalEnd: "—",
  },
];

const DESKTOP_COLS =
  "minmax(160px,1fr) 110px 100px 100px 100px 140px 100px 100px 70px";

export function InstrumentiPage() {
  return (
    <main className="flex-1 min-w-0 bg-white p-4 md:p-6">
      <PageHeader />
      <StatsCards />
      <FilterRow />
      <ToolsTable />
    </main>
  );
}

/* ──────────────────────────────────────────────────────────
   HEADER
   ────────────────────────────────────────────────────────── */
function PageHeader() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
      <div className="flex items-start gap-3 min-w-0">
        <div className="shrink-0 mt-1">
          <Briefcase className="w-6 h-6 text-gray-700" />
        </div>
        <div className="min-w-0">
          <h2 className="text-[22px] md:text-[28px] font-semibold text-gray-900 leading-tight">
            Instrumentu uzskaite
          </h2>
          <p className="text-[13px] md:text-[14px] text-gray-500 mt-1 max-w-[640px]">
            Pārvaldiet uzņēmuma un nomātos instrumentus, piesaistiet
            atbildīgos darbiniekus, sekojiet remontam un nomas termiņiem.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap mt-2 lg:mt-0 w-full lg:w-auto">
        <button className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <FileSpreadsheet className="w-4 h-4 text-gray-500" />
          <span>Eksportēt XLSX</span>
        </button>
        <button
          className="inline-flex items-center justify-center gap-1.5 text-white text-[13px] md:text-[14px] font-medium px-3 md:px-4 py-2 rounded-xl shadow-md w-full md:w-auto"
          style={{
            background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
          }}
        >
          <Plus className="w-[18px] h-[18px]" />
          <span>Pievienot instrumentu</span>
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   STATS CARDS
   ────────────────────────────────────────────────────────── */
function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <StatCard leftBorder="#3B82F6" label="KOPĀ INSTRUMENTU" value="47" />
      <StatCard leftBorder="#10B981" label="AKTĪVI" value="39" />
      <StatCard leftBorder="#F59E0B" label="REMONTĀ" value="5" />
    </div>
  );
}

function StatCard({
  leftBorder,
  label,
  value,
}: {
  leftBorder: string;
  label: string;
  value: string;
}) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-5"
      style={{ borderLeft: `4px solid ${leftBorder}` }}
    >
      <div className="text-[11px] uppercase font-semibold tracking-wider text-gray-500 mb-2">
        {label}
      </div>
      <div
        className="text-[28px] md:text-[32px] font-semibold text-gray-900 tabular-nums leading-none"
        style={{ fontFamily: MONO_STACK }}
      >
        {value}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   FILTER ROW
   ────────────────────────────────────────────────────────── */
function FilterRow() {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
      <div className="relative flex-1 md:max-w-[500px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
        <input
          type="text"
          placeholder="Meklēt pēc nosaukuma, artikula, iegravētā nr..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400"
        />
      </div>
      <div className="grid grid-cols-2 md:flex md:items-center gap-2 md:gap-3">
        <FilterBtn label="Statuss..." />
        <FilterBtn label="Īpašuma tips..." />
        <FilterBtn label="Visi darbinieki" />
        <button
          aria-label="Notīrīt filtrus"
          className="h-10 w-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500 col-span-2 md:col-span-1 md:shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function FilterBtn({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center justify-between gap-2 px-3 md:px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-700 hover:bg-gray-50 w-full md:w-auto md:min-w-[160px]">
      <span className="truncate">{label}</span>
      <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
    </button>
  );
}

/* ──────────────────────────────────────────────────────────
   TABLE
   ────────────────────────────────────────────────────────── */
function ToolsTable() {
  return (
    <div className="border-t border-gray-200 overflow-x-auto">
      <div
        className="grid bg-white border-b border-gray-200 px-4 py-3 text-[11px] uppercase font-semibold tracking-wider text-gray-500 gap-x-3 min-w-[1100px]"
        style={{ gridTemplateColumns: DESKTOP_COLS }}
      >
        <span>Nosaukums</span>
        <span>Artikuls</span>
        <span>Mūsu artikuls</span>
        <span>Iegrav. nr.</span>
        <span>Īpašums</span>
        <span>Atbildīgais</span>
        <span>Statuss</span>
        <span>Nomas beigas</span>
        <span className="text-right">Darbības</span>
      </div>

      {ROWS.map((row) => (
        <ToolTableRow key={row.internalSku} row={row} />
      ))}
    </div>
  );
}

function ToolTableRow({ row }: { row: ToolRow }) {
  return (
    <div
      className="grid border-b border-gray-100 hover:bg-gray-50 transition-colors px-4 py-4 items-center text-[14px] text-gray-700 gap-x-3 min-w-[1100px]"
      style={{ gridTemplateColumns: DESKTOP_COLS }}
    >
      <NameCell row={row} />
      <MonoCell value={row.sku} />
      <MonoCell value={row.internalSku} />
      <MonoCell value={row.engraved} />
      <div className="min-w-0">
        <OwnershipPill ownership={row.ownership} />
      </div>
      <ResponsibleCell row={row} />
      <div className="min-w-0">
        <StatusPill status={row.status} />
      </div>
      <RentalEndCell value={row.rentalEnd} />
      <div className="flex items-center justify-end gap-1">
        <IconBtn Icon={Edit2} />
        <IconBtn Icon={Trash2} />
      </div>
    </div>
  );
}

function NameCell({ row, compact = false }: { row: ToolRow; compact?: boolean }) {
  const cat = CATEGORY_META[row.category];
  const Icon = cat.Icon;
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div
        className={`${
          compact ? "h-8 w-8" : "h-9 w-9"
        } rounded-lg flex items-center justify-center shrink-0`}
        style={{ background: cat.bg }}
      >
        <Icon
          className={compact ? "w-4 h-4" : "w-[18px] h-[18px]"}
          style={{ color: cat.color }}
        />
      </div>
      <div className="font-medium text-gray-900 truncate min-w-0">
        {row.name}
      </div>
    </div>
  );
}

function MonoCell({ value }: { value: string }) {
  return (
    <div
      className="text-[13px] text-gray-600 tabular-nums truncate pr-2"
      style={{ fontFamily: MONO_STACK }}
    >
      {value}
    </div>
  );
}

function OwnershipPill({ ownership }: { ownership: Ownership }) {
  const meta = OWNERSHIP_META[ownership];
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium"
      style={{ background: meta.bg, color: meta.color }}
    >
      {meta.label}
    </span>
  );
}

function ResponsibleCell({ row }: { row: ToolRow }) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <div className="h-7 w-7 rounded-full bg-violet-600 text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
        {row.responsible.initial}
      </div>
      <span className="text-[13px] text-gray-700 truncate">
        {row.responsible.name}
      </span>
    </div>
  );
}

function StatusPill({ status }: { status: Status }) {
  const meta = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium"
      style={{ background: meta.bg, color: meta.color }}
    >
      {meta.label}
    </span>
  );
}

function RentalEndCell({ value }: { value: string }) {
  if (value === "—") {
    return <div className="text-[13px] text-gray-400">—</div>;
  }
  const today = new Date(2026, 4, 12); // 12.05.2026 — page "current" date
  const [d, m, y] = value.split(".").map(Number);
  const target = new Date(y, m - 1, d);
  const diffDays = Math.floor(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  let toneClass = "text-gray-600";
  if (diffDays < 0) toneClass = "text-red-600 font-semibold";
  else if (diffDays <= 30) toneClass = "text-amber-600 font-medium";

  return (
    <div
      className={`text-[13px] tabular-nums ${toneClass}`}
      style={{ fontFamily: MONO_STACK }}
    >
      {value}
    </div>
  );
}

function IconBtn({ Icon }: { Icon: LucideIcon }) {
  return (
    <button className="h-8 w-8 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-500">
      <Icon className="w-4 h-4" />
    </button>
  );
}
