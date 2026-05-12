"use client";

import {
  AlertTriangle,
  Clock,
  FileText,
  Folder,
  Layers,
  Package,
  PauseCircle,
  PlayCircle,
  RotateCw,
  Search,
} from "lucide-react";
import { MONO_STACK } from "../shared";

type OpType = "STANDARTA" | "GAISMAS" | "ĪPAŠS";

type Worker = {
  initials: string;
  name: string;
  avatarBg: string;
  project: string;
  operation: string;
  opType: OpType;
  position: string;
  timeLabel: string;
  pct: number;
  overtime?: string;
  startedAt: string;
  pauses?: number;
  sessions: number;
};

const WORKERS: Worker[] = [
  {
    initials: "KB",
    name: "Kaspars Bērziņš",
    avatarBg: "#10B981",
    project: "P-26.51 — Mēbeļu salons Rīga",
    operation: "Detaļu zāģēšana",
    opType: "STANDARTA",
    position: "Poz.3.1 Skapīši - korpuss - sāni",
    timeLabel: "12m 18s / 45m 00s",
    pct: 27,
    startedAt: "09:11",
    sessions: 1,
  },
  {
    initials: "EL",
    name: "Edgars Liepa",
    avatarBg: "#14B8A6",
    project: "P-26.51 — Mēbeļu salons Rīga",
    operation: "Malu līmēšana",
    opType: "STANDARTA",
    position: "Poz.3.2 Skapīši - durvis - vidusdaļa",
    timeLabel: "34m 52s / 1h 20m",
    pct: 44,
    startedAt: "08:49",
    sessions: 2,
  },
  {
    initials: "JO",
    name: "Jānis Ozols",
    avatarBg: "#3B82F6",
    project: "P-26.48 — Privātmāja Mārupē",
    operation: "Logu rāmju montāža",
    opType: "STANDARTA",
    position: "Poz.1.4 Logi - tips A-200 - rāmis",
    timeLabel: "47m 03s / 1h 00m",
    pct: 78,
    startedAt: "08:36",
    sessions: 1,
  },
  {
    initials: "TK",
    name: "Toms Kalniņš",
    avatarBg: "#8B5CF6",
    project: "P-26.49 — Birojs Brīvības 85",
    operation: "Furnitūras stiprināšana",
    opType: "STANDARTA",
    position: "Poz.2.1 Iekšdurvis - eņģu komplekts",
    timeLabel: "16m 41s / 30m 00s",
    pct: 56,
    startedAt: "09:07",
    sessions: 1,
  },
  {
    initials: "MV",
    name: "Mārtiņš Vilks",
    avatarBg: "#10B981",
    project: "P-26.50 — Veikals Stockmann",
    operation: "Krāsošana",
    opType: "GAISMAS",
    position: "Poz.4.2 Plaukti - virsma - matēta",
    timeLabel: "2h 15m / 2h 15m",
    pct: 100,
    startedAt: "06:55",
    pauses: 1,
    sessions: 2,
  },
  {
    initials: "AK",
    name: "Andris Krūmiņš",
    avatarBg: "#14B8A6",
    project: "P-26.47 — Noliktavas pārkārtošana",
    operation: "Pakošana eksportam",
    opType: "STANDARTA",
    position: "Poz.6 Loģistika - galda virsmas - 12 gab",
    timeLabel: "1h 28m / 3h 00m",
    pct: 49,
    startedAt: "07:42",
    pauses: 1,
    sessions: 2,
  },
  {
    initials: "RO",
    name: "Renārs Ozoliņš",
    avatarBg: "#EF4444",
    project: "P-26.46 — Steiga: Skola Talsos",
    operation: "Avārijas remonts",
    opType: "ĪPAŠS",
    position: "Poz.1 Ārdurvis - bojāts rāmis - atjaunošana",
    timeLabel: "5h 12m / 2h 30m",
    pct: 208,
    overtime: "+2h 42m",
    startedAt: "04:18",
    pauses: 2,
    sessions: 3,
  },
  {
    initials: "PJ",
    name: "Pēteris Jansons",
    avatarBg: "#EF4444",
    project: "P-26.45 — Kafejnīca Centrs",
    operation: "Bāra letes uzstādīšana",
    opType: "STANDARTA",
    position: "Poz.8 Iekārtošana - lete - galaapdare",
    timeLabel: "4h 50m / 3h 00m",
    pct: 161,
    overtime: "+1h 50m",
    startedAt: "05:34",
    pauses: 3,
    sessions: 3,
  },
];

export function MonitoringsPage() {
  return (
    <main className="flex-1 min-w-0 bg-white p-4 md:p-6">
      <PageHeader />
      <StatsCards />
      <FilterRow />
      <WorkerGrid />
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
          Reāllaika monitorings
        </h2>
        <p className="text-[13px] md:text-[14px] text-gray-500 mt-1">
          Visi aktīvie procesi un darbinieku aktivitāte
        </p>
      </div>
      <div className="flex items-center gap-3 flex-wrap mt-2 lg:mt-0">
        <button className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <FileText className="w-4 h-4 text-gray-500" />
          <span>Eksportēt PDF</span>
        </button>
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold tracking-wide"
          style={{ background: "#ECFDF5", color: "#047857" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          LIVE
        </span>
        <span
          className="text-[12px] text-gray-400 tabular-nums"
          style={{ fontFamily: MONO_STACK }}
        >
          Atjaunots: 09:24:18
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   STATS CARDS
   ────────────────────────────────────────────────────────── */
function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        topBorder="#10B981"
        iconBg="#ECFDF5"
        iconColor="#059669"
        Icon={PlayCircle}
        value="8"
        label="AKTĪVI"
      />
      <StatCard
        topBorder="#F59E0B"
        iconBg="#FFFBEB"
        iconColor="#D97706"
        Icon={PauseCircle}
        value="5"
        label="PAUZĒTI"
      />
      <StatCard
        topBorder="#EF4444"
        iconBg="#FEF2F2"
        iconColor="#DC2626"
        Icon={AlertTriangle}
        value="2"
        label="PĀRSNIEGTS LAIKS"
      />
      <StatCard
        topBorder="#6D28D9"
        iconBg="#F5F3FF"
        iconColor="#7C3AED"
        Icon={Layers}
        value="15"
        label="KOPĀ SISTĒMĀ"
      />
    </div>
  );
}

function StatCard({
  topBorder,
  iconBg,
  iconColor,
  Icon,
  value,
  label,
}: {
  topBorder: string;
  iconBg: string;
  iconColor: string;
  Icon: typeof PlayCircle;
  value: string;
  label: string;
}) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-5"
      style={{ borderTop: `3px solid ${topBorder}` }}
    >
      <div className="flex items-center gap-4">
        <div
          className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: iconBg }}
        >
          <Icon className="w-6 h-6" style={{ color: iconColor }} />
        </div>
        <div className="min-w-0">
          <div className="text-[26px] md:text-[28px] font-semibold text-gray-900 leading-tight">
            {value}
          </div>
          <div className="text-[11px] uppercase font-semibold tracking-wider text-gray-500 mt-0.5">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   FILTER ROW
   ────────────────────────────────────────────────────────── */
function FilterRow() {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
      <div className="relative flex-1 md:max-w-[500px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
        <input
          type="text"
          placeholder="Meklēt darbinieku, uzdevumu vai projektu"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400"
        />
      </div>
      <div className="grid grid-cols-2 md:flex md:items-center gap-2 md:gap-3">
        <FilterSelect label="Visi statusi" />
        <FilterSelect label="Visi tipi" />
      </div>
    </div>
  );
}

function FilterSelect({ label }: { label: string }) {
  return (
    <div className="relative">
      <select
        className="w-full md:w-auto md:max-w-[180px] appearance-none pl-4 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-700 focus:outline-none focus:border-violet-400"
        defaultValue=""
      >
        <option value="">{label}</option>
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden
      >
        <path d="M3 4.5 L6 7.5 L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   WORKER GRID
   ────────────────────────────────────────────────────────── */
function WorkerGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {WORKERS.map((w) => (
        <WorkerCard key={w.initials + w.name} worker={w} />
      ))}
    </div>
  );
}

function WorkerCard({ worker }: { worker: Worker }) {
  const isOvertime = !!worker.overtime;

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-5"
      style={
        isOvertime
          ? {
              borderLeft: "3px solid #F87171",
              background: "rgba(254, 242, 242, 0.3)",
            }
          : { borderLeft: "2px solid #E5E7EB" }
      }
    >
      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center text-white text-[14px] font-semibold shrink-0"
            style={{ background: worker.avatarBg }}
          >
            {worker.initials}
          </div>
          <div className="min-w-0">
            <div className="text-[15px] font-semibold text-gray-900 truncate">
              {worker.name}
            </div>
            <div className="flex items-center gap-1 text-[12px] text-gray-500 mt-0.5">
              <Folder className="w-3 h-3 text-gray-400 shrink-0" />
              <span className="truncate">{worker.project}</span>
            </div>
          </div>
        </div>
        <span
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0"
          style={{ background: "#ECFDF5", color: "#047857" }}
        >
          <PlayCircle className="w-3 h-3" />
          AKTĪVS
        </span>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <div className="text-[14px] font-semibold text-gray-900">
            {worker.operation}
          </div>
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase">
            {worker.opType}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[12px] text-gray-500 mb-3">
          <Package className="w-3 h-3 text-gray-400 shrink-0" />
          <span className="truncate">{worker.position}</span>
        </div>

        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`text-[18px] font-semibold tabular-nums ${
                  isOvertime ? "text-red-500" : "text-emerald-600"
                }`}
                style={{ fontFamily: MONO_STACK }}
              >
                {worker.timeLabel}
              </span>
              {isOvertime && (
                <span className="inline-flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-md shrink-0">
                  <AlertTriangle className="w-3 h-3 text-red-500" />
                  <span className="text-[12px] font-semibold text-red-600 tabular-nums">
                    {worker.overtime}
                  </span>
                </span>
              )}
            </div>
            <span
              className={`text-[13px] font-semibold tabular-nums shrink-0 ${
                isOvertime ? "text-red-600" : "text-gray-700"
              }`}
            >
              {worker.pct}%
            </span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(worker.pct, 100)}%`,
                background: isOvertime ? "#EF4444" : "#10B981",
              }}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 mt-4 pt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-500">
        <FooterMeta Icon={Clock} text={`Sākts: ${worker.startedAt}`} />
        {worker.pauses != null && (
          <FooterMeta Icon={PauseCircle} text={`Pauzes: ${worker.pauses}`} />
        )}
        <FooterMeta Icon={RotateCw} text={`Sesijas: ${worker.sessions}`} />
      </div>
    </div>
  );
}

function FooterMeta({
  Icon,
  text,
}: {
  Icon: typeof Clock;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-1">
      <Icon className="w-3 h-3 text-gray-400" />
      {text}
    </span>
  );
}
