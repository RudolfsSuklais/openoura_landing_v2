"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Download,
  Search,
  Users,
} from "lucide-react";
import { MONO_STACK } from "../shared";
import { WorkerDetailModal, type WorkerDetail } from "../WorkerDetailModal";

type Verdict =
  | { tone: "down"; pct: string; label: string }
  | { tone: "up"; pct: string; label: string };

type WorkerRow = {
  initial: string;
  name: string;
  id: number;
  worked: string;
  planned: string;
  over: string;
  saved: string;
  verdict: Verdict;
};

const ROWS: WorkerRow[] = [
  {
    initial: "R",
    name: "Reinis",
    id: 41,
    worked: "155h 12m",
    planned: "140h 30m",
    over: "14h 42m",
    saved: "0h 0m",
    verdict: { tone: "down", pct: "88.4%", label: "Zem plāna" },
  },
  {
    initial: "A",
    name: "Aigars",
    id: 28,
    worked: "162h 45m",
    planned: "195h 10m",
    over: "0h 0m",
    saved: "29h 25m",
    verdict: { tone: "up", pct: "118.2%", label: "Ļoti efektīvs" },
  },
  {
    initial: "N",
    name: "Normunds",
    id: 53,
    worked: "148h 33m",
    planned: "82h 15m",
    over: "66h 18m",
    saved: "0h 0m",
    verdict: { tone: "down", pct: "55.3%", label: "Zem plāna" },
  },
  {
    initial: "G",
    name: "Gunārs",
    id: 71,
    worked: "144h 50m",
    planned: "52h 04m",
    over: "92h 46m",
    saved: "0h 0m",
    verdict: { tone: "down", pct: "35.9%", label: "Zem plāna" },
  },
  {
    initial: "V",
    name: "Valdis",
    id: 39,
    worked: "147h 22m",
    planned: "121h 36m",
    over: "25h 46m",
    saved: "0h 0m",
    verdict: { tone: "down", pct: "82.6%", label: "Zem plāna" },
  },
  {
    initial: "I",
    name: "Imants",
    id: 44,
    worked: "143h 18m",
    planned: "198h 42m",
    over: "0h 0m",
    saved: "55h 24m",
    verdict: { tone: "up", pct: "138.7%", label: "Ļoti efektīvs" },
  },
  {
    initial: "O",
    name: "Oskars",
    id: 62,
    worked: "139h 51m",
    planned: "132h 12m",
    over: "7h 39m",
    saved: "0h 0m",
    verdict: { tone: "down", pct: "94.5%", label: "Zem plāna" },
  },
  {
    initial: "M",
    name: "Modris",
    id: 50,
    worked: "138h 04m",
    planned: "97h 18m",
    over: "40h 46m",
    saved: "0h 0m",
    verdict: { tone: "down", pct: "70.5%", label: "Zem plāna" },
  },
];

const DESKTOP_COLS = "1fr 130px 130px 130px 130px 220px";

export function ParskatiPage({
  onAnyRowClick,
}: {
  onAnyRowClick?: () => void;
}) {
  const [selectedWorker, setSelectedWorker] = useState<WorkerDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openRow = (row: WorkerRow) => {
    onAnyRowClick?.();
    setSelectedWorker({
      initial: row.initial,
      name: row.name,
      worked: row.worked,
      planned: row.planned,
      over: row.over,
      saved: row.saved,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.setTimeout(() => setSelectedWorker(null), 350);
  };

  return (
    <main className="relative flex-1 min-w-0 bg-white p-4 md:p-6">
      <PageHeader />
      <FilterRow />
      <WorkersTable onRowClick={openRow} />
      <WorkerDetailModal worker={selectedWorker} isOpen={isModalOpen} onClose={closeModal} />
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
          Pārskati
        </h2>
        <p className="text-[13px] md:text-[14px] text-gray-500 mt-1">
          Darbinieku efektivitāte pret plānoto
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap mt-2 lg:mt-0">
        <OutlineBtn>
          <Users className="w-4 h-4 text-gray-500" />
          <span>Visi darbinieki</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </OutlineBtn>
        <OutlineBtn>
          <Download className="w-4 h-4 text-gray-500" />
          <span>Eksportēt</span>
        </OutlineBtn>
      </div>
    </div>
  );
}

function OutlineBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
      {children}
    </button>
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
          placeholder="Meklēt darbinieku..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400"
        />
      </div>
      <div className="grid grid-cols-2 md:flex md:items-center gap-2 md:gap-3">
        <FilterBtn label="Periods: Maijs" />
        <FilterBtn label="Visas nodaļas" />
      </div>
    </div>
  );
}

function FilterBtn({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center justify-between gap-2 px-3 md:px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-700 hover:bg-gray-50 w-full md:w-auto">
      <span className="truncate">{label}</span>
      <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
    </button>
  );
}

/* ──────────────────────────────────────────────────────────
   TABLE
   ────────────────────────────────────────────────────────── */
function WorkersTable({
  onRowClick,
}: {
  onRowClick: (row: WorkerRow) => void;
}) {
  return (
    <div className="border-t border-gray-200 overflow-x-auto">
      <div
        className="grid bg-gray-50 border-b border-gray-200 px-4 py-3 text-[11px] uppercase font-semibold tracking-wider text-gray-500 min-w-[900px]"
        style={{ gridTemplateColumns: DESKTOP_COLS }}
      >
        <span>Darbinieks</span>
        <span className="text-right">Nostrādātas</span>
        <span className="text-right">Plānotas</span>
        <span className="text-right">Pārsniegtas</span>
        <span className="text-right">Ietaupītas</span>
        <span className="text-right">Efektivitāte</span>
      </div>

      {ROWS.map((row) => (
        <RowView
          key={`${row.name}-${row.id}`}
          row={row}
          onClick={() => onRowClick(row)}
        />
      ))}
    </div>
  );
}

function RowView({
  row,
  onClick,
}: {
  row: WorkerRow;
  onClick: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="relative grid border-b border-gray-100 cursor-pointer hover:bg-violet-50/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-inset px-4 py-4 items-center text-[14px] text-gray-700 min-w-[900px]"
      style={{ gridTemplateColumns: DESKTOP_COLS }}
    >
      <WorkerCell initial={row.initial} name={row.name} id={row.id} />
      <HourCell value={row.worked} />
      <HourCell value={row.planned} />
      <HourCell
        value={row.over}
        tone={row.over === "0h 0m" ? "muted" : "danger"}
      />
      <HourCell
        value={row.saved}
        tone={row.saved === "0h 0m" ? "muted" : "success"}
      />
      <div className="flex justify-end">
        <VerdictPill verdict={row.verdict} />
      </div>
    </div>
  );
}

function WorkerCell({
  initial,
  name,
  id,
  compact = false,
}: {
  initial: string;
  name: string;
  id: number;
  compact?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div
        className={`${
          compact ? "h-9 w-9 text-[13px]" : "h-10 w-10 text-[14px]"
        } rounded-xl bg-violet-600 text-white font-semibold flex items-center justify-center shrink-0`}
      >
        {initial}
      </div>
      <div className="min-w-0">
        <div className="text-[14px] font-medium text-gray-900 truncate">
          {name}
        </div>
        <div
          className="text-[12px] text-gray-500 tabular-nums"
          style={{ fontFamily: MONO_STACK }}
        >
          ID {id}
        </div>
      </div>
    </div>
  );
}

function HourCell({
  value,
  tone = "default",
}: {
  value: string;
  tone?: "default" | "muted" | "danger" | "success";
}) {
  const color =
    tone === "danger"
      ? "text-red-600"
      : tone === "success"
      ? "text-emerald-600"
      : tone === "muted"
      ? "text-gray-400"
      : "text-gray-700";
  return (
    <div
      className={`text-right tabular-nums ${color}`}
      style={{ fontFamily: MONO_STACK }}
    >
      {value}
    </div>
  );
}

function VerdictPill({ verdict }: { verdict: Verdict }) {
  const isUp = verdict.tone === "up";
  const Icon = isUp ? ArrowUp : ArrowDown;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium"
      style={{
        background: isUp ? "#ECFDF5" : "#FEF2F2",
        color: isUp ? "#047857" : "#B91C1C",
      }}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="tabular-nums font-semibold">{verdict.pct}</span>
      <span className="opacity-80">{verdict.label}</span>
    </span>
  );
}
