"use client";

import {
  ChevronDown,
  FileEdit,
  FileText,
  Globe,
  MoreVertical,
  Plane,
  Plus,
  Receipt,
  Search,
  Settings2,
} from "lucide-react";
import { MONO_STACK } from "../shared";

type InvoiceType = "Avansa" | "ES 0%" | "Eksports" | "Kredīts";

type Row = {
  nr: string;
  type: InvoiceType;
  date: string;
  recipient: string;
  netto: string;
  vat: string;
  total: string;
  negative?: boolean;
};

const ROWS: Row[] = [
  {
    nr: "OO-2026-0024",
    type: "Avansa",
    date: "2026-05-11",
    recipient: 'SIA "Saules Stikls"',
    netto: "2 184.50 EUR",
    vat: "458.75 EUR",
    total: "2 643.25 EUR",
  },
  {
    nr: "OO-2026-0023",
    type: "Avansa",
    date: "2026-05-11",
    recipient: 'SIA "Baltā Egle"',
    netto: "947.20 EUR",
    vat: "198.91 EUR",
    total: "1 146.11 EUR",
  },
  {
    nr: "OO-2026-0022",
    type: "Avansa",
    date: "2026-05-10",
    recipient: "Egons Liepiņš IK",
    netto: "318.65 EUR",
    vat: "66.92 EUR",
    total: "385.57 EUR",
  },
  {
    nr: "OO-2026-0021",
    type: "Kredīts",
    date: "2026-05-09",
    recipient: 'SIA "Kurzemes Mēbeles"',
    netto: "-540.00 EUR",
    vat: "-113.40 EUR",
    total: "-653.40 EUR",
    negative: true,
  },
  {
    nr: "OO-2026-0020",
    type: "Avansa",
    date: "2026-05-09",
    recipient: 'AS "Vidzemes Logi"',
    netto: "5 712.30 EUR",
    vat: "1 199.58 EUR",
    total: "6 911.88 EUR",
  },
  {
    nr: "FS-EU2026-0016",
    type: "ES 0%",
    date: "2026-05-07",
    recipient: "Skogen Möbler AB",
    netto: "14 380.95 SEK",
    vat: "0.00 SEK",
    total: "14 380.95 SEK",
  },
  {
    nr: "FS-EU2026-0015",
    type: "ES 0%",
    date: "2026-05-06",
    recipient: "Nordbygg Trä AS",
    netto: "27 845.10 NOK",
    vat: "0.00 NOK",
    total: "27 845.10 NOK",
  },
  {
    nr: "FS-EU2026-0014",
    type: "ES 0%",
    date: "2026-05-05",
    recipient: "Suomen Puutuote Oy",
    netto: "8 219.40 EUR",
    vat: "0.00 EUR",
    total: "8 219.40 EUR",
  },
  {
    nr: "FS-EX2026-0004",
    type: "Eksports",
    date: "2026-05-04",
    recipient: "Kalniņa Anita IK",
    netto: "41 320.75 EUR",
    vat: "0.00 EUR",
    total: "41 320.75 EUR",
  },
];

const TYPE_META: Record<
  InvoiceType,
  { Icon: typeof FileText; color: string }
> = {
  Avansa: { Icon: FileText, color: "#8B5CF6" },
  "ES 0%": { Icon: Globe, color: "#3B82F6" },
  Eksports: { Icon: Plane, color: "#06B6D4" },
  Kredīts: { Icon: Receipt, color: "#F59E0B" },
};

const DESKTOP_COLS = "150px 130px 130px 1fr 140px 120px 150px 120px 60px";
const MOBILE_COLS = "110px 1fr 100px 90px";

export function RekiniPage() {
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
          Izrakstītie rēķini
        </h2>
        <p className="text-[13px] md:text-[14px] text-gray-500 mt-1">
          Izejošo rēķinu pārvaldība
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap mt-2 lg:mt-0">
        <OutlineBtn className="hidden md:inline-flex">
          <FileEdit className="w-4 h-4 text-gray-500" />
          <span>Šabloni</span>
        </OutlineBtn>
        <OutlineBtn className="hidden md:inline-flex">
          <Settings2 className="w-4 h-4 text-gray-500" />
          <span>Iestatījumi</span>
        </OutlineBtn>
        <button
          className="inline-flex items-center gap-1.5 text-white text-[13px] md:text-[14px] font-medium px-3 md:px-4 py-2 rounded-xl shadow-md shrink-0"
          style={{
            background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
          }}
        >
          <Plus className="w-[18px] h-[18px]" />
          <span className="hidden sm:inline">Jauns rēķins</span>
          <span className="sm:hidden">Jauns</span>
        </button>
      </div>
    </div>
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
   STATS CARDS
   ────────────────────────────────────────────────────────── */
function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        leftBorder="#7C3AED"
        label="ŠOMĒNES IZRAKSTĪTS"
        value="67 218.40 €"
        sub="5 rēķini"
      />
      <StatCard
        leftBorder="#F59E0B"
        label="NEAPMAKSĀTIE"
        value="412 905.18 €"
        sub="19 rēķini"
      />
      <StatCard
        leftBorder="#EF4444"
        label="KAVĒTIE"
        value="58 472.93 €"
        sub="7 rēķini"
      />
      <StatCard
        leftBorder="#10B981"
        label="APMAKSĀTIE ŠOMĒNES"
        value="23 651.10 €"
        sub="3 rēķini"
      />
    </div>
  );
}

function StatCard({
  leftBorder,
  label,
  value,
  sub,
}: {
  leftBorder: string;
  label: string;
  value: string;
  sub: string;
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
        className="text-[24px] md:text-[28px] font-semibold text-gray-900 tabular-nums leading-tight"
        style={{ fontFamily: MONO_STACK }}
      >
        {value}
      </div>
      <div className="text-[12px] text-gray-500 mt-2">{sub}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   FILTER ROW
   ────────────────────────────────────────────────────────── */
function FilterRow() {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
      <div className="relative flex-1 md:max-w-[400px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
        <input
          type="text"
          placeholder="Meklēt pēc numura, saņēmēja..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400"
        />
      </div>
      <div className="grid grid-cols-2 md:flex md:items-center gap-2 md:gap-3">
        <SelectBtn label="Visi statusi" />
        <SelectBtn label="Visi tipi" />
        <DateBtn label="No datuma" />
        <DateBtn label="Līdz datumam" />
      </div>
    </div>
  );
}

function SelectBtn({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center justify-between gap-2 px-3 md:px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-700 hover:bg-gray-50 w-full md:w-auto">
      <span className="truncate">{label}</span>
      <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
    </button>
  );
}

function DateBtn({ label }: { label: string }) {
  return (
    <button className="px-3 md:px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-500 text-left hover:bg-gray-50 w-full md:w-auto">
      {label}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────
   TABLE
   ────────────────────────────────────────────────────────── */
function InvoicesTable() {
  return (
    <div className="border-t border-gray-200">
      <div
        className="hidden md:grid bg-white border-b border-gray-200 px-4 py-3 text-[11px] uppercase font-semibold tracking-wider text-gray-500"
        style={{ gridTemplateColumns: DESKTOP_COLS }}
      >
        <span>NR.</span>
        <span>TIPS</span>
        <span>DATUMS</span>
        <span>SAŅĒMĒJS</span>
        <span className="text-right">BEZ PVN</span>
        <span className="text-right">PVN</span>
        <span className="text-right">KOPĀ</span>
        <span>STATUSS</span>
        <span className="text-right">DARBĪBAS</span>
      </div>

      <div
        className="md:hidden grid bg-white border-b border-gray-200 px-3 py-3 text-[10px] uppercase font-semibold tracking-wider text-gray-500"
        style={{ gridTemplateColumns: MOBILE_COLS }}
      >
        <span>NR.</span>
        <span>SAŅĒMĒJS</span>
        <span className="text-right">KOPĀ</span>
        <span>STATUSS</span>
      </div>

      {ROWS.map((row) => (
        <InvoiceRow key={row.nr} row={row} />
      ))}
    </div>
  );
}

function InvoiceRow({ row }: { row: Row }) {
  const meta = TYPE_META[row.type];
  const TypeIcon = meta.Icon;
  const totalClass = row.negative
    ? "text-red-600 font-semibold"
    : "font-semibold text-gray-900";

  return (
    <div className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div
        className="hidden md:grid px-4 py-4 items-center text-[14px] text-gray-700"
        style={{ gridTemplateColumns: DESKTOP_COLS }}
      >
        <div
          className="font-medium text-gray-900 tabular-nums"
          style={{ fontFamily: MONO_STACK }}
        >
          {row.nr}
        </div>
        <div className="flex items-center gap-2 text-[13px]">
          <TypeIcon className="w-4 h-4 shrink-0" style={{ color: meta.color }} />
          <span>{row.type}</span>
        </div>
        <div
          className="tabular-nums text-gray-600"
          style={{ fontFamily: MONO_STACK }}
        >
          {row.date}
        </div>
        <div className="truncate pr-3 font-medium text-gray-900">
          {row.recipient}
        </div>
        <div
          className={`text-right tabular-nums ${
            row.negative ? "text-red-600" : "text-gray-700"
          }`}
          style={{ fontFamily: MONO_STACK }}
        >
          {row.netto}
        </div>
        <div
          className={`text-right tabular-nums ${
            row.negative ? "text-red-600" : "text-gray-700"
          }`}
          style={{ fontFamily: MONO_STACK }}
        >
          {row.vat}
        </div>
        <div
          className={`text-right tabular-nums ${totalClass}`}
          style={{ fontFamily: MONO_STACK }}
        >
          {row.total}
        </div>
        <div>
          <StatusPill />
        </div>
        <div className="flex justify-end">
          <ActionButton />
        </div>
      </div>

      <div
        className="md:hidden grid px-3 py-3 items-center text-[13px] gap-2"
        style={{ gridTemplateColumns: MOBILE_COLS }}
      >
        <div
          className="font-medium text-gray-900 tabular-nums truncate"
          style={{ fontFamily: MONO_STACK }}
        >
          {row.nr}
        </div>
        <div className="truncate font-medium text-gray-900">{row.recipient}</div>
        <div
          className={`text-right tabular-nums ${totalClass}`}
          style={{ fontFamily: MONO_STACK }}
        >
          {row.total}
        </div>
        <div>
          <StatusPill />
        </div>
      </div>
    </div>
  );
}

function StatusPill() {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium"
      style={{ background: "#EFF6FF", color: "#1D4ED8" }}
    >
      Izsniegts
    </span>
  );
}

function ActionButton() {
  return (
    <button
      aria-label="Darbības"
      className="w-7 h-7 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-400"
    >
      <MoreVertical className="w-5 h-5" />
    </button>
  );
}
