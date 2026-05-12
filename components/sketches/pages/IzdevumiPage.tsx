"use client";

import {
  ArrowLeftRight,
  Book,
  ChevronDown,
  Download,
  Edit2,
  FileCode,
  FileSpreadsheet,
  FileText,
  Info,
  ListChecks,
  PieChart,
  Plus,
  RotateCw,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { MONO_STACK } from "../shared";

type Status = "draft" | "paid";

type ExpenseRow = {
  nr: string;
  supplier: string;
  recurring?: boolean;
  category: "Cits" | "Īre" | "Līzings";
  date: string;
  deadline: string;
  net: string;
  total: string;
  status: Status;
};

const ROWS: ExpenseRow[] = [
  {
    nr: "GTN-261521",
    supplier: 'SIA "GAITA tehniskais nodrošinājums"',
    category: "Cits",
    date: "2026-05-05",
    deadline: "2026-06-19",
    net: "360.00 EUR",
    total: "435.60 EUR",
    status: "draft",
  },
  {
    nr: "9488",
    supplier: "SIA Liepupes Loģistika",
    category: "Īre",
    date: "2026-05-05",
    deadline: "2026-05-08",
    net: "7 191.32 EUR",
    total: "8 701.50 EUR",
    status: "paid",
  },
  {
    nr: "3011640505",
    supplier: "SIA Eiroprofili",
    category: "Cits",
    date: "2026-05-04",
    deadline: "2026-06-03",
    net: "10.24 EUR",
    total: "10.24 EUR",
    status: "draft",
  },
  {
    nr: "LAT221227",
    supplier: "SIA Tehnika Plus",
    category: "Līzings",
    date: "2026-05-01",
    deadline: "2026-05-31",
    net: "129.77 EUR",
    total: "157.02 EUR",
    status: "draft",
  },
  {
    nr: "LAT221228",
    supplier: "SIA Tehnika Plus",
    recurring: true,
    category: "Līzings",
    date: "2026-05-01",
    deadline: "2026-05-31",
    net: "10.06 EUR",
    total: "12.17 EUR",
    status: "draft",
  },
  {
    nr: "LAT221226",
    supplier: "SIA Tehnika Plus",
    recurring: true,
    category: "Līzings",
    date: "2026-05-01",
    deadline: "2026-05-31",
    net: "122.68 EUR",
    total: "148.44 EUR",
    status: "draft",
  },
];

const CATEGORY_ICON: Record<ExpenseRow["category"], typeof FileText> = {
  Cits: FileText,
  Īre: Book,
  Līzings: FileSpreadsheet,
};

export function IzdevumiPage() {
  return (
    <main className="flex-1 min-w-0 bg-white p-4 md:p-6">
      <TabSwitcher />
      <PageHeader />
      <StatsCards />
      <Filters />
      <ExpensesTable />
    </main>
  );
}

function TabSwitcher() {
  return (
    <div className="border-b border-gray-200 mb-6 flex items-center gap-6">
      <button className="flex items-center gap-2 py-3 px-1 text-[14px] font-medium text-violet-700 border-b-2 border-violet-700 -mb-px">
        <ListChecks className="w-4 h-4 text-violet-600" />
        Saraksts
      </button>
      <button className="flex items-center gap-2 py-3 px-1 text-[14px] font-medium text-gray-500 hover:text-gray-700">
        <PieChart className="w-4 h-4 text-gray-400" />
        Statistika
      </button>
    </div>
  );
}

function PageHeader() {
  return (
    <div className="flex justify-between items-start mb-6 gap-4">
      <div>
        <h2 className="text-[22px] md:text-[28px] font-semibold text-gray-900 leading-tight">
          Uzņēmuma izdevumi
        </h2>
        <p className="text-[13px] md:text-[14px] text-gray-500 mt-1">
          Iekšējo pavadzīmju pārvaldība
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-end">
        <button className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4 text-gray-500" />
          <span className="hidden lg:inline">Eksportēt</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>
        <button className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <FileCode className="w-4 h-4 text-gray-500" />
          <span className="hidden lg:inline">XML imports</span>
        </button>
        <button className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <span className="hidden lg:inline">AI parsēšana</span>
        </button>
        <button
          className="inline-flex items-center gap-1.5 text-white text-[13px] md:text-[14px] font-medium px-3 md:px-4 py-2 md:py-2.5 rounded-xl shadow-md shrink-0"
          style={{
            background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
          }}
        >
          <Plus className="w-[18px] h-[18px]" />
          <span className="hidden sm:inline">Jauns izdevums</span>
          <span className="sm:hidden">Jauns</span>
        </button>
      </div>
    </div>
  );
}

function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
      <StatCard label="Šomēnes kopā" value="9 464.97 €" />
      <StatCard
        label="Gaida apstiprinājumu"
        value="0"
        valueClass="text-amber-500"
      />
      <StatCard label="Kavētās" value="3" valueClass="text-red-500" />
      <StatCard
        label="Apmaksātās šomēnes"
        value="32 503.01 €"
        valueClass="text-emerald-600"
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  valueClass = "text-gray-900",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="border border-gray-200 rounded-2xl p-5">
      <div className="text-[11px] uppercase font-semibold tracking-[0.05em] text-gray-500 mb-2">
        {label}
      </div>
      <div
        className={`text-[28px] md:text-[32px] font-semibold leading-none tabular-nums ${valueClass}`}
      >
        {value}
      </div>
    </div>
  );
}

function Filters() {
  return (
    <div className="mb-4 flex flex-col gap-3">
      <div className="relative w-full md:max-w-[500px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
        <input
          type="text"
          placeholder="Meklēt pēc piegādātāja..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400"
        />
      </div>

      <div className="grid grid-cols-2 md:flex md:items-center gap-2 md:gap-3">
        <select
          defaultValue=""
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-700 md:max-w-[160px] focus:outline-none focus:border-violet-400"
        >
          <option value="">Visi statusi</option>
          <option value="draft">Melnraksts</option>
          <option value="paid">Apmaksāts</option>
        </select>
        <select
          defaultValue=""
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-700 md:max-w-[180px] focus:outline-none focus:border-violet-400"
        >
          <option value="">Visas kategorijas</option>
          <option value="Cits">Cits</option>
          <option value="Īre">Īre</option>
          <option value="Līzings">Līzings</option>
        </select>
        <input
          type="date"
          placeholder="No datuma"
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-500 md:max-w-[160px] focus:outline-none focus:border-violet-400"
        />
        <input
          type="date"
          placeholder="Līdz datumam"
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-500 md:max-w-[160px] focus:outline-none focus:border-violet-400"
        />
        <label className="col-span-2 md:col-span-1 flex items-center gap-2 md:ml-1">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-400"
          />
          <span className="text-[13px] text-gray-700">Tikai kavētās</span>
        </label>
      </div>
    </div>
  );
}

const DESKTOP_COLS =
  "140px 1fr 120px 110px 120px 100px 100px 110px 110px";

function ExpensesTable() {
  return (
    <div className="border-t border-gray-200 overflow-x-auto">
      <div
        className="grid bg-gray-50 border-b border-gray-200 px-4 py-3 text-[11px] uppercase font-semibold tracking-[0.05em] text-gray-500 items-center min-w-[1080px]"
        style={{ gridTemplateColumns: DESKTOP_COLS }}
      >
        <span>Nr.</span>
        <span>Piegādātājs</span>
        <span>Kategorija</span>
        <span>Datums</span>
        <span className="flex items-center gap-1">
          Termiņš
          <Info className="w-3 h-3 text-gray-400" />
        </span>
        <span className="text-right">Bez PVN</span>
        <span className="text-right">Kopā</span>
        <span>Statuss</span>
        <span>Darbības</span>
      </div>

      {ROWS.map((row, i) => (
        <ExpenseTableRow key={i} row={row} />
      ))}
    </div>
  );
}

function ExpenseTableRow({ row }: { row: ExpenseRow }) {
  const CategoryIcon = CATEGORY_ICON[row.category];
  return (
    <div
      className="grid border-b border-gray-100 hover:bg-gray-50 transition-colors px-4 py-4 items-center text-[14px] text-gray-900 min-w-[1080px]"
      style={{ gridTemplateColumns: DESKTOP_COLS }}
    >
      <div
        className="text-[12px] text-gray-700 truncate pr-2 tabular-nums"
        style={{ fontFamily: MONO_STACK }}
      >
        {row.nr}
      </div>
      <div className="flex items-center gap-2 min-w-0 pr-3">
        <span className="truncate text-[14px] text-gray-900">
          {row.supplier}
        </span>
        {row.recurring && (
          <RotateCw className="w-3.5 h-3.5 text-violet-500 shrink-0" />
        )}
      </div>
      <div className="flex items-center gap-2 min-w-0">
        <CategoryIcon className="w-4 h-4 text-gray-500 shrink-0" />
        <span className="text-[14px] text-gray-700 truncate">
          {row.category}
        </span>
      </div>
      <div className="text-[13px] text-gray-600 tabular-nums">{row.date}</div>
      <div className="text-[13px] text-gray-600 tabular-nums">
        {row.deadline}
      </div>
      <div className="text-right text-[14px] text-gray-700 tabular-nums">
        {row.net}
      </div>
      <div className="text-right text-[14px] font-semibold text-gray-900 tabular-nums">
        {row.total}
      </div>
      <div>
        <StatusPill status={row.status} />
      </div>
      <div className="flex items-center gap-1">
        <IconBtn Icon={ArrowLeftRight} label="Pārvietot" />
        <IconBtn Icon={Edit2} label="Labot" />
        <IconBtn Icon={Trash2} label="Dzēst" />
      </div>
    </div>
  );
}

function IconBtn({
  Icon,
  label,
}: {
  Icon: typeof Edit2;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-500"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

function StatusPill({
  status,
  compact = false,
}: {
  status: Status;
  compact?: boolean;
}) {
  const isPaid = status === "paid";
  const label = isPaid ? "Apmaksāts" : "Melnraksts";
  const cls = isPaid
    ? "bg-emerald-50 text-emerald-700"
    : "bg-gray-100 text-gray-700";
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${cls} ${
        compact ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-[11px]"
      }`}
    >
      {label}
    </span>
  );
}
