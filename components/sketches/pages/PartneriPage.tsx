"use client";

import {
  Boxes,
  ChevronRight,
  Clock,
  Edit2,
  Info,
  ListChecks,
  Plus,
  RotateCw,
  Settings2,
  Trash2,
} from "lucide-react";

type Variance =
  | { kind: "none" }
  | {
      kind: "history";
      avg: string;
      delta: { value: string; sign: "pos" | "neg" };
      runs: number;
      showApply: boolean;
    };

type Task = {
  name: string;
  description?: string;
  skill: string;
  estimated: string;
  history: Variance;
};

const TASKS: Task[] = [
  {
    name: "Materiālu sagatavošana",
    skill: "Materiālu sagatavošana",
    estimated: "0h 12m",
    history: { kind: "none" },
  },
  {
    name: "Profila griešana",
    skill: "Profila griešana",
    estimated: "0h 18m",
    history: {
      kind: "history",
      avg: "0h 17m / m²",
      delta: { value: "-6%", sign: "neg" },
      runs: 3,
      showApply: false,
    },
  },
  {
    name: "Detaļu montāža",
    skill: "Detaļu montāža",
    estimated: "0h 22m",
    history: {
      kind: "history",
      avg: "0h 28m / m²",
      delta: { value: "+27%", sign: "pos" },
      runs: 2,
      showApply: true,
    },
  },
  {
    name: "Pulēšana",
    skill: "Pulēšana",
    estimated: "0h 8m",
    history: {
      kind: "history",
      avg: "0h 6m / m²",
      delta: { value: "-25%", sign: "neg" },
      runs: 4,
      showApply: true,
    },
  },
];

export function PartneriPage() {
  return (
    <main className="flex-1 min-w-0 bg-white p-4 md:p-6">
      <Breadcrumb />
      <PageHeader />
      <Tabs />
      <SectionHeader />
      <TasksTable />
    </main>
  );
}

function Breadcrumb() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-[13px] text-gray-500 mb-4 overflow-x-auto"
    >
      <button className="hover:text-gray-700 shrink-0">Partneri</button>
      <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
      <button className="hover:text-gray-700 shrink-0 hidden sm:inline">
        Ražotājs: Sentora
      </button>
      <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0 hidden sm:inline" />
      <button className="hover:text-gray-700 shrink-0 hidden sm:inline">
        Sistēmas
      </button>
      <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0 hidden sm:inline" />
      <span className="sm:hidden text-gray-400 shrink-0">…</span>
      <span className="sm:hidden">
        <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0 inline" />
      </span>
      <span className="text-violet-700 font-medium truncate">
        AL62 - Vitrīna
      </span>
    </nav>
  );
}

function PageHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <Settings2 className="w-[26px] h-[26px] text-violet-600 shrink-0" />
        <h2 className="text-[22px] md:text-[28px] font-semibold text-gray-900 leading-tight">
          AL62 - Vitrīna
        </h2>
      </div>
      <p className="text-[13px] md:text-[14px] text-gray-500">Vitrīna</p>
    </div>
  );
}

function Tabs() {
  return (
    <div className="border-b border-gray-200 mb-6 flex items-center gap-6 overflow-x-auto">
      <button className="flex items-center py-3 px-1 text-[14px] font-semibold text-violet-700 border-b-2 border-violet-700 -mb-px whitespace-nowrap">
        Ražošanas uzdevumi
      </button>
      <button className="flex items-center py-3 px-1 text-[14px] font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap">
        Montāžas uzdevumi
      </button>
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="flex items-center justify-between mb-4 gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <ListChecks className="w-5 h-5 text-violet-600 shrink-0" />
        <h3 className="text-[16px] md:text-[18px] font-semibold text-gray-900 truncate">
          Pozīciju uzdevumi
        </h3>
      </div>
      <button
        className="inline-flex items-center gap-1.5 text-white text-[13px] md:text-[14px] font-medium px-3 md:px-4 py-2 md:py-2.5 rounded-xl shadow-md shrink-0"
        style={{
          background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
          boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
        }}
      >
        <Plus className="w-[18px] h-[18px]" />
        <span className="hidden sm:inline">Jauns uzdevums</span>
        <span className="sm:hidden">Jauns</span>
      </button>
    </div>
  );
}

const DESKTOP_COLS = "1fr 1fr 200px 140px 200px 100px";
function TasksTable() {
  return (
    <div className="border-t border-gray-200 overflow-x-auto">
      <div
        className="grid bg-white border-b border-gray-200 px-4 py-3 text-[11px] uppercase font-semibold tracking-[0.05em] text-gray-500 items-center min-w-[1040px]"
        style={{ gridTemplateColumns: DESKTOP_COLS }}
      >
        <span>Nosaukums</span>
        <span>Apraksts</span>
        <HeaderInfo label="Prasmes" />
        <HeaderInfo label="Paredzētais laiks" />
        <HeaderInfo label="Vēsture (vid. uz m²)" />
        <span>Darbības</span>
      </div>

      {TASKS.map((task, i) => (
        <TaskRow key={i} task={task} />
      ))}
    </div>
  );
}

function HeaderInfo({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1 min-w-0">
      <span className="truncate">{label}</span>
      <Info className="w-3 h-3 text-gray-400 shrink-0" />
    </div>
  );
}

function TaskRow({ task }: { task: Task }) {
  return (
    <div
      className="grid border-b border-gray-100 hover:bg-gray-50 transition-colors px-4 py-4 items-start text-[14px] text-gray-900 min-w-[1040px]"
      style={{ gridTemplateColumns: DESKTOP_COLS }}
    >
      <div className="text-[14px] text-gray-900 font-medium pr-3 pt-1">
        {task.name}
      </div>
      <div className="text-[13px] text-gray-400 pr-3 pt-1">
        {task.description || "—"}
      </div>
      <div className="pr-3 pt-1">
        <SkillPill skill={task.skill} />
      </div>
      <div className="pr-3 pt-1">
        <EstimatedCell estimated={task.estimated} />
      </div>
      <div className="pr-3 pt-1">
        <HistoryCell variance={task.history} />
      </div>
      <div className="pt-1">
        <RowActions />
      </div>
    </div>
  );
}

function SkillPill({ skill }: { skill: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-amber-200 bg-amber-100 text-amber-700 text-[11px] font-medium">
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {skill}
    </span>
  );
}

function EstimatedCell({
  estimated,
  compact = false,
}: {
  estimated: string;
  compact?: boolean;
}) {
  return (
    <div>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 font-medium tabular-nums ${
          compact ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-[13px]"
        }`}
      >
        <Clock className={compact ? "w-3 h-3" : "w-3.5 h-3.5"} />
        {estimated}
      </span>
      <div
        className={`text-gray-400 mt-1 ${
          compact ? "text-[10px]" : "text-[11px]"
        }`}
      >
        uz m²
      </div>
    </div>
  );
}

function HistoryCell({
  variance,
  compact = false,
}: {
  variance: Variance;
  compact?: boolean;
}) {
  if (variance.kind === "none") {
    return (
      <div
        className={`inline-flex items-center gap-1 italic text-gray-400 ${
          compact ? "text-[11px]" : "text-[12px]"
        }`}
      >
        <Info className={compact ? "w-3 h-3" : "w-3.5 h-3.5"} />
        Nav vēstures datu
      </div>
    );
  }
  const deltaClass =
    variance.delta.sign === "pos"
      ? "bg-red-100 text-red-700"
      : "bg-emerald-100 text-emerald-700";
  return (
    <div>
      <div className="flex items-center gap-1.5 flex-wrap">
        <RotateCw className="w-3 h-3 text-gray-400" />
        <span
          className={`text-gray-500 ${compact ? "text-[10px]" : "text-[11px]"}`}
        >
          Vid:
        </span>
        <span
          className={`font-semibold text-gray-900 tabular-nums ${
            compact ? "text-[11px]" : "text-[13px]"
          }`}
        >
          {variance.avg}
        </span>
        <span
          className={`px-2 py-0.5 rounded font-bold tabular-nums ${deltaClass} ${
            compact ? "text-[9px]" : "text-[10px]"
          }`}
        >
          {variance.delta.value}
        </span>
      </div>
      <div
        className={`text-gray-500 mt-0.5 ${
          compact ? "text-[10px]" : "text-[11px]"
        }`}
      >
        {variance.runs} izpildes
      </div>
      {variance.showApply && (
        <button
          className={`inline-flex items-center gap-1 mt-1 rounded-md border border-violet-200 bg-violet-100 text-violet-700 hover:bg-violet-200 font-medium transition-colors ${
            compact ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-[11px]"
          }`}
        >
          <Edit2 className={compact ? "w-2.5 h-2.5" : "w-3 h-3"} />
          Piemērot vidējo
        </button>
      )}
    </div>
  );
}

function RowActions({ compact = false }: { compact?: boolean }) {
  const size = compact ? "h-7 w-7" : "h-8 w-8";
  const iconSize = compact ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-1">
      <button
        aria-label="Pozīcijas"
        className={`${size} rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-500`}
      >
        <Boxes className={iconSize} />
      </button>
      <button
        aria-label="Labot"
        className={`${size} rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-500`}
      >
        <Edit2 className={iconSize} />
      </button>
      <button
        aria-label="Dzēst"
        className={`${size} rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-500`}
      >
        <Trash2 className={iconSize} />
      </button>
    </div>
  );
}
