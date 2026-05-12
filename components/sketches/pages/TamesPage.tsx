"use client";

import {
  BarChart3,
  Building2,
  Calculator,
  ChevronDown,
  ChevronsUpDown,
  Edit2,
  Info,
  Plus,
  Search,
  Settings2,
  Trash2,
} from "lucide-react";
import { MONO_STACK } from "../shared";

type Status =
  | "Gaidīšana"
  | "Iesākta"
  | "Pārdota"
  | "Realizēta"
  | "Nerealizēta";

type Row = {
  nr: string;
  project: string;
  client: string;
  worker: { initial: string; name: string };
  status: Status;
  date: string;
};

const ROWS: Row[] = [
  {
    nr: "TK260512_1",
    project: "Skaidkalni, fasāde",
    client: "SIA Liepupes Loģistika",
    worker: { initial: "K", name: "KasparsB" },
    status: "Gaidīšana",
    date: "11.05.2026.",
  },
  {
    nr: "T26-05-11-3",
    project: "Egons 22451 3 part",
    client: "Nordbygg Trä AS",
    worker: { initial: "E", name: "EdgarsL" },
    status: "Gaidīšana",
    date: "11.05.2026.",
  },
  {
    nr: "TM26/05/10-3",
    project: "Krasta iela 14, Saldus",
    client: "SIA Vilkmežs Būve",
    worker: { initial: "J", name: "JānisO" },
    status: "Iesākta",
    date: "10.05.2026.",
  },
  {
    nr: "T26-05-09-2",
    project: "Pēteris",
    client: "SIA Saules Stikls",
    worker: { initial: "T", name: "TomsK" },
    status: "Pārdota",
    date: "9.05.2026.",
  },
  {
    nr: "CR26/05/08/1",
    project: "RHM Park Liepāja A",
    client: "SIA Baltā Egle",
    worker: { initial: "I", name: "ImantsP" },
    status: "Gaidīšana",
    date: "8.05.2026.",
  },
  {
    nr: "CR26/05/08/2",
    project: "RHM Park Liepāja C",
    client: "SIA Baltā Egle",
    worker: { initial: "I", name: "ImantsP" },
    status: "Pārdota",
    date: "8.05.2026.",
  },
  {
    nr: "26-05-08-5",
    project: "Bjornsundskolan F22",
    client: "Skogen Möbler AB",
    worker: { initial: "M", name: "MartiņšV" },
    status: "Realizēta",
    date: "8.05.2026.",
  },
  {
    nr: "26-05-07-1",
    project: "Riekstu iela 8B",
    client: "SIA Kurzemes Mēbeles",
    worker: { initial: "A", name: "AndrisK" },
    status: "Nerealizēta",
    date: "7.05.2026.",
  },
];

const STATUS_CLASS: Record<Status, string> = {
  "Gaidīšana": "bg-amber-50 text-amber-700",
  Iesākta: "bg-blue-50 text-blue-700",
  Pārdota: "bg-emerald-50 text-emerald-700",
  Realizēta: "bg-violet-100 text-violet-700",
  Nerealizēta: "bg-gray-100 text-gray-600",
};

const FILTER_TABS: Array<{ label: string; active?: boolean }> = [
  { label: "Visas", active: true },
  { label: "Iesāktas" },
  { label: "Pārdotas" },
  { label: "Realizētas" },
  { label: "Nerealizētas" },
];

export function TamesPage() {
  return (
    <main className="flex-1 min-w-0 bg-white p-4 md:p-6">
      <PageHeader />
      <FilterCard />
      <ActiveTimersBar />
      <QuickActions />
      <TamesTable />
    </main>
  );
}

function PageHeader() {
  return (
    <div className="flex justify-between items-start mb-6 gap-4">
      <div className="flex items-center gap-2 min-w-0">
        <Calculator className="w-[22px] h-[22px] text-gray-700 shrink-0" />
        <h2 className="text-[22px] md:text-[28px] font-semibold text-gray-900 leading-tight">
          Tāmēšana
        </h2>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Settings2 className="w-4 h-4 text-gray-500" />
          <span className="hidden lg:inline">Tāmes import šabloni</span>
        </button>
        <button
          className="inline-flex items-center gap-1.5 text-white text-[13px] md:text-[14px] font-medium px-3 md:px-4 py-2 md:py-2.5 rounded-xl shadow-md shrink-0"
          style={{
            background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
          }}
        >
          <Plus className="w-[18px] h-[18px]" />
          <span className="hidden sm:inline">Sākt jaunu tāmēšanu</span>
          <span className="sm:hidden">Jauna</span>
        </button>
      </div>
    </div>
  );
}

function FilterCard() {
  return (
    <div className="border border-gray-200 rounded-2xl bg-white p-4 md:p-5 mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 md:flex-wrap">
        <div className="relative flex-1 md:max-w-[500px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
          <input
            type="text"
            placeholder="Meklēt pēc tāmes numura vai darbinieka..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Manas tāmes"
            className="relative w-10 h-5 rounded-full bg-gray-200 cursor-pointer"
          >
            <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm" />
          </button>
          <span className="text-[14px] font-medium text-gray-700">
            Manas tāmes
          </span>
          <Info className="w-3.5 h-3.5 text-violet-500" />
        </div>

        <div className="md:ml-auto overflow-x-auto -mx-1 px-1">
          <div className="bg-gray-50 rounded-xl p-1 inline-flex gap-1">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.label}
                className={`px-4 py-1.5 rounded-lg text-[13px] whitespace-nowrap transition-colors ${
                  tab.active
                    ? "bg-violet-100 text-violet-700 font-semibold"
                    : "text-gray-600 font-medium hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActiveTimersBar() {
  return (
    <button className="w-full border border-gray-200 rounded-2xl bg-white px-5 py-3 flex items-center justify-between hover:bg-gray-50 mb-4 text-left">
      <div className="flex items-center gap-3">
        <span className="h-6 w-6 rounded-full bg-violet-50 flex items-center justify-center">
          <Info className="w-4 h-4 text-violet-500" />
        </span>
        <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-700">
          Aktīvo taimeru apzīmējumi
        </span>
      </div>
      <ChevronDown className="w-[18px] h-[18px] text-gray-400" />
    </button>
  );
}

function QuickActions() {
  return (
    <div className="mb-3">
      <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        <BarChart3 className="w-3.5 h-3.5 text-gray-500" />
        Pārskats
      </button>
    </div>
  );
}

const DESKTOP_COLS = "40px 140px 1fr 200px 140px 130px 120px 80px";
const MOBILE_COLS = "40px 120px 1fr 110px 100px 60px";

function TamesTable() {
  return (
    <div className="border-t border-gray-200 overflow-x-auto">
      {/* Desktop header */}
      <div
        className="hidden md:grid bg-white border-b border-gray-200 px-4 py-3 text-[11px] uppercase font-semibold tracking-[0.05em] text-gray-500 items-center min-w-[1000px]"
        style={{ gridTemplateColumns: DESKTOP_COLS }}
      >
        <span aria-hidden />
        <SortHeader label="Nr." />
        <SortHeader label="Projekts" />
        <SortHeader label="Pasūtītājs" />
        <SortHeader label="Darbinieks" />
        <SortHeader label="Statuss" />
        <SortHeader label="Datums" />
        <span>Darbības</span>
      </div>

      {/* Mobile header */}
      <div
        className="md:hidden grid bg-white border-b border-gray-200 px-3 py-3 text-[10px] uppercase font-semibold tracking-[0.05em] text-gray-500 items-center gap-2"
        style={{ gridTemplateColumns: MOBILE_COLS }}
      >
        <span aria-hidden />
        <span>Nr.</span>
        <span>Projekts</span>
        <span>Darbinieks</span>
        <span>Statuss</span>
        <span aria-hidden />
      </div>

      {ROWS.map((row, i) => (
        <TamesRow key={i} row={row} />
      ))}
    </div>
  );
}

function SortHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1 min-w-0">
      <span className="truncate">{label}</span>
      <ChevronsUpDown className="w-3 h-3 text-gray-400 shrink-0" />
    </div>
  );
}

function TamesRow({ row }: { row: Row }) {
  return (
    <div className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Desktop row */}
      <div
        className="hidden md:grid px-4 py-4 items-center text-[14px] text-gray-900 min-w-[1000px]"
        style={{ gridTemplateColumns: DESKTOP_COLS }}
      >
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300"
        />
        <div
          className="text-[13px] text-gray-700 truncate pr-2 tabular-nums"
          style={{ fontFamily: MONO_STACK }}
        >
          {row.nr}
        </div>
        <div className="text-[14px] text-gray-900 truncate pr-3">
          {row.project}
        </div>
        <div className="flex items-center gap-2 min-w-0 pr-3">
          <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-[14px] text-gray-700 truncate">
            {row.client}
          </span>
        </div>
        <Worker worker={row.worker} />
        <div>
          <StatusPill status={row.status} />
        </div>
        <div className="text-[13px] text-gray-600 tabular-nums">
          {row.date}
        </div>
        <RowActions />
      </div>

      {/* Mobile row */}
      <div
        className="md:hidden grid px-3 py-3 items-center text-[13px] text-gray-900 gap-2"
        style={{ gridTemplateColumns: MOBILE_COLS }}
      >
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300"
        />
        <div
          className="text-[12px] text-gray-700 truncate tabular-nums"
          style={{ fontFamily: MONO_STACK }}
        >
          {row.nr}
        </div>
        <div className="text-[13px] text-gray-900 truncate">
          {row.project}
        </div>
        <Worker worker={row.worker} compact />
        <div>
          <StatusPill status={row.status} compact />
        </div>
        <RowActions compact />
      </div>
    </div>
  );
}

function Worker({
  worker,
  compact = false,
}: {
  worker: Row["worker"];
  compact?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <div
        className={`rounded-full bg-violet-600 text-white font-semibold flex items-center justify-center shrink-0 ${
          compact ? "h-6 w-6 text-[10px]" : "h-7 w-7 text-[11px]"
        }`}
      >
        {worker.initial}
      </div>
      <span
        className={`text-gray-700 truncate ${
          compact ? "text-[12px]" : "text-[13px]"
        }`}
      >
        {worker.name}
      </span>
    </div>
  );
}

function StatusPill({
  status,
  compact = false,
}: {
  status: Status;
  compact?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${STATUS_CLASS[status]} ${
        compact ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-[11px]"
      }`}
    >
      {status}
    </span>
  );
}

function RowActions({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-1">
      <button
        aria-label="Labot"
        className={`rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-500 ${
          compact ? "w-6 h-6" : "w-7 h-7"
        }`}
      >
        <Edit2 className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
      </button>
      <button
        aria-label="Dzēst"
        className={`rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-500 ${
          compact ? "w-6 h-6" : "w-7 h-7"
        }`}
      >
        <Trash2 className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
      </button>
    </div>
  );
}
