"use client";

import { useEffect, useRef, useState } from "react";
import {
  Clock,
  Coffee,
  Folder,
  Hammer,
  Hourglass,
  PauseCircle,
  Sparkles,
  Target,
  TrendingUp,
  X,
  ZoomIn,
} from "lucide-react";
import { MONO_STACK } from "./shared";

export type WorkerDetail = {
  initial: string;
  name: string;
  worked: string;
  planned: string;
  over: string;
  saved: string;
};

type Day = {
  label: string;
  hours: string;
};

const DAYS: Day[] = [
  { label: "Pr 11.05", hours: "3h 37m" },
  { label: "Pk 08.05", hours: "8h 18m" },
  { label: "Ce 07.05", hours: "9h 17m" },
  { label: "Tr 06.05", hours: "9h 9m" },
  { label: "Ot 05.05", hours: "9h 7m" },
  { label: "Ce 30.04", hours: "8h 0m" },
  { label: "Tr 29.04", hours: "9h 9m" },
  { label: "Ot 28.04", hours: "8h 59m" },
  { label: "Pr 27.04", hours: "9h 9m" },
  { label: "Pk 24.04", hours: "9h 28m" },
  { label: "Ce 23.04", hours: "9h 27m" },
  { label: "Tr 22.04", hours: "7h 4m" },
  { label: "Ot 21.04", hours: "7h 57m" },
  { label: "Pr 20.04", hours: "8h 40m" },
];

const ACTIVE_DAY_INDEX = 4; // "Ot 05.05"

// Timeline spans 07:00 → 19:00 = 720 minutes from start.
// Block start/end values are minutes since 07:00.
type Block =
  | {
      kind: "work";
      label: string;
      fullLabel?: string;
      duration: string;
      startMin: number;
      endMin: number;
      project?: string;
      planned?: string;
      highlighted?: boolean;
    }
  | {
      kind: "pause";
      startMin: number;
      endMin: number;
      reason?: string;
    }
  | {
      kind: "lunch";
      startMin: number;
      endMin: number;
    };

const BLOCKS: Block[] = [
  {
    kind: "work",
    label: "Frēzēšana",
    duration: "2h 1m",
    startMin: 58,
    endMin: 179,
    project: "P-26.48 Privātmāja Mārupē (3.etaps)",
    planned: "0h 40m",
    highlighted: true,
  },
  { kind: "pause", startMin: 179, endMin: 184, reason: "Īsa pauze" },
  {
    kind: "work",
    label: "Frēzēš…",
    fullLabel: "Frēzēšana",
    duration: "1h 44m",
    startMin: 184,
    endMin: 288,
    project: "P-26.48 Privātmāja Mārupē — Durvju rāmji",
    planned: "1h 20m",
  },
  { kind: "pause", startMin: 288, endMin: 300, reason: "Īsa pauze" },
  { kind: "lunch", startMin: 300, endMin: 330 },
  { kind: "pause", startMin: 330, endMin: 335, reason: "Īsa pauze" },
  {
    kind: "work",
    label: "Frēzēš…",
    fullLabel: "Frēzēšana",
    duration: "0h 30m",
    startMin: 335,
    endMin: 365,
    project: "P-26.51 Mēbeļu salons Rīga — Skapja sāni",
    planned: "0h 25m",
  },
  { kind: "pause", startMin: 365, endMin: 370, reason: "Īsa pauze" },
  {
    kind: "work",
    label: "Frēzēš…",
    fullLabel: "Frēzēšana",
    duration: "1h 4m",
    startMin: 370,
    endMin: 434,
    project: "P-26.51 Mēbeļu salons Rīga — Plauktu detaļas",
    planned: "0h 50m",
  },
  { kind: "pause", startMin: 434, endMin: 439, reason: "Īsa pauze" },
  {
    kind: "work",
    label: "Frēzēš…",
    fullLabel: "Frēzēšana",
    duration: "1h 45m",
    startMin: 439,
    endMin: 544,
    project: "P-26.49 Birojs Brīvības 85 — Iekšdurvis",
    planned: "1h 30m",
  },
  { kind: "pause", startMin: 544, endMin: 549, reason: "Īsa pauze" },
  {
    kind: "work",
    label: "F",
    fullLabel: "Frēzēšana",
    duration: "1h 14m",
    startMin: 549,
    endMin: 623,
    project: "P-26.49 Birojs Brīvības 85 — Furnitūras priekšsagataves",
    planned: "1h 0m",
  },
];

function formatTime(minutesFromStart: number): string {
  const total = 7 * 60 + minutesFromStart;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function formatDuration(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m}m`;
}

const TIMELINE_TOTAL_MIN = 720; // 07:00 – 19:00
const TIMELINE_HOURS = [
  "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
];

const PAUSE_REASONS = [
  {
    date: "2026-05-05",
    reason: "DEVOS MĀJĀS",
    activity: "Frēzēšana",
    project: "P-26.48 Privātmāja Mārupē (3. etaps)",
  },
  {
    date: "2026-05-03",
    reason: "MAIŅAS BEIGAS",
    activity: "Malu līmēšana",
    project: "P-26.51 Mēbeļu salons Rīga",
  },
];

export function WorkerDetailModal({
  worker,
  isOpen,
  onClose,
}: {
  worker: WorkerDetail | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [animateIn, setAnimateIn] = useState(false);
  const [activeDay, setActiveDay] = useState(ACTIVE_DAY_INDEX);
  const [activeFilter, setActiveFilter] = useState<"visi" | "sistemas" | "gabaldarbi">("visi");
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Trigger slide-in transition on the frame after mount.
  useEffect(() => {
    if (isOpen && worker) {
      const id = requestAnimationFrame(() => setAnimateIn(true));
      return () => cancelAnimationFrame(id);
    }
    setAnimateIn(false);
  }, [isOpen, worker]);

  // ESC to close + focus the close button on open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const focusId = window.setTimeout(() => closeBtnRef.current?.focus(), 100);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusId);
    };
  }, [isOpen, onClose]);

  if (!worker) return null;

  const overIsZero = worker.over === "0h 0m";
  const savedIsZero = worker.saved === "0h 0m";

  return (
    <>
      <button
        type="button"
        aria-label="Aizvērt"
        onClick={onClose}
        className={`absolute inset-0 z-30 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-200 cursor-default ${
          animateIn ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="worker-modal-title"
        className={`absolute inset-0 md:left-auto md:top-0 md:bottom-0 md:right-0 z-40 w-full md:max-w-[920px] bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ease-out ${
          animateIn
            ? "[transform:translateY(0)] md:[transform:translateX(0)]"
            : "[transform:translateY(100%)] md:[transform:translateY(0)] md:[transform:translateX(100%)]"
        }`}
      >
        <Header worker={worker} onClose={onClose} closeBtnRef={closeBtnRef} />

        <div className="p-4 md:p-6 space-y-6">
          <StatsCards worker={worker} overIsZero={overIsZero} savedIsZero={savedIsZero} />

          <DayPills activeDay={activeDay} onSelect={setActiveDay} />

          <TimelineCard activeFilter={activeFilter} onFilterChange={setActiveFilter} />

          <PauseReasonsCard />
        </div>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────────────────
   HEADER
   ────────────────────────────────────────────────────────── */
function Header({
  worker,
  onClose,
  closeBtnRef,
}: {
  worker: WorkerDetail;
  onClose: () => void;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
}) {
  return (
    <div className="sticky top-0 bg-white border-b border-gray-100 z-10 flex items-center justify-between p-4 md:p-6">
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-violet-600 text-white text-[20px] md:text-[22px] font-semibold flex items-center justify-center shrink-0">
          {worker.initial}
        </div>
        <div className="min-w-0">
          <h2
            id="worker-modal-title"
            className="text-[20px] md:text-[24px] font-semibold text-gray-900 leading-tight truncate"
          >
            {worker.name}
          </h2>
          <p className="text-[12px] md:text-[13px] text-gray-500 mt-0.5">
            19 dienas ar aktivitāti
          </p>
        </div>
      </div>
      <button
        ref={closeBtnRef}
        onClick={onClose}
        aria-label="Aizvērt"
        className="h-10 w-10 rounded-xl hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 flex items-center justify-center text-gray-500 shrink-0"
      >
        <X className="w-[22px] h-[22px]" />
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   STATS CARDS
   ────────────────────────────────────────────────────────── */
function StatsCards({
  worker,
  overIsZero,
  savedIsZero,
}: {
  worker: WorkerDetail;
  overIsZero: boolean;
  savedIsZero: boolean;
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      <StatCard
        topBorder="#10B981"
        Icon={Clock}
        iconColor="#10B981"
        label="NOSTRĀDĀTS"
        value={worker.worked}
      />
      <StatCard
        topBorder="#3B82F6"
        Icon={Target}
        iconColor="#3B82F6"
        label="PLĀNOTS"
        value={worker.planned}
      />
      <StatCard
        topBorder="#EF4444"
        Icon={TrendingUp}
        iconColor="#EF4444"
        label="PĀRSNIEGTS"
        value={worker.over}
        valueClass={overIsZero ? "text-gray-400" : "text-red-600"}
      />
      <StatCard
        topBorder="#F59E0B"
        Icon={Sparkles}
        iconColor="#F59E0B"
        label="IETAUPĪTS"
        value={worker.saved}
        valueClass={savedIsZero ? "text-gray-400" : "text-emerald-600"}
      />
    </div>
  );
}

function StatCard({
  topBorder,
  Icon,
  iconColor,
  label,
  value,
  valueClass = "text-gray-900",
}: {
  topBorder: string;
  Icon: typeof Clock;
  iconColor: string;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5"
      style={{ borderTop: `4px solid ${topBorder}` }}
    >
      <div className="flex items-center gap-1.5 text-[11px] uppercase font-semibold tracking-wider text-gray-500 mb-2">
        <Icon className="w-3.5 h-3.5" style={{ color: iconColor }} />
        {label}
      </div>
      <div
        className={`text-[22px] md:text-[26px] font-semibold tabular-nums leading-tight ${valueClass}`}
        style={{ fontFamily: MONO_STACK }}
      >
        {value}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   DAY PILLS
   ────────────────────────────────────────────────────────── */
function DayPills({
  activeDay,
  onSelect,
}: {
  activeDay: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="-mx-1 overflow-x-auto">
      <div className="inline-flex gap-2 px-1 flex-nowrap">
        {DAYS.map((day, i) => {
          const isActive = i === activeDay;
          return (
            <button
              key={day.label}
              onClick={() => onSelect(i)}
              className={`shrink-0 min-w-[100px] text-center rounded-xl border px-4 py-3 transition-colors ${
                isActive
                  ? "bg-violet-100 border-violet-400"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div
                className={`text-[12px] font-medium ${
                  isActive ? "text-violet-700" : "text-gray-700"
                }`}
              >
                {day.label}
              </div>
              <div
                className={`text-[13px] mt-1 tabular-nums ${
                  isActive ? "text-violet-900 font-bold" : "text-gray-900 font-semibold"
                }`}
                style={{ fontFamily: MONO_STACK }}
              >
                {day.hours}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   TIMELINE
   ────────────────────────────────────────────────────────── */
function TimelineCard({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: "visi" | "sistemas" | "gabaldarbi";
  onFilterChange: (f: "visi" | "sistemas" | "gabaldarbi") => void;
}) {
  return (
    <div className="border border-gray-200 rounded-2xl bg-white p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 gap-2">
        <button
          aria-label="Tuvināt"
          className="h-8 w-8 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-400"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <div className="inline-flex gap-1 p-1 rounded-xl bg-gray-50">
          <FilterTab label="Visi" active={activeFilter === "visi"} onClick={() => onFilterChange("visi")} />
          <FilterTab label="Sistēmas" active={activeFilter === "sistemas"} onClick={() => onFilterChange("sistemas")} />
          <FilterTab label="Gabaldarbi" active={activeFilter === "gabaldarbi"} onClick={() => onFilterChange("gabaldarbi")} />
        </div>
      </div>

      <div className="w-full">
        <div className="hidden sm:grid grid-cols-12 text-[11px] text-gray-400 tabular-nums mb-2">
          {TIMELINE_HOURS.slice(0, 12).map((h) => (
            <div key={h} className="px-0.5">{h}</div>
          ))}
        </div>
        <div className="grid sm:hidden grid-cols-6 text-[10px] text-gray-400 tabular-nums mb-2">
          {["07:00", "09:00", "11:00", "13:00", "15:00", "17:00"].map((h) => (
            <div key={h} className="px-0.5">{h}</div>
          ))}
        </div>

        <div className="h-px bg-gray-200 mb-3" />

        <div className="relative h-14">
          {BLOCKS.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-[13px] font-medium ${
        active ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:bg-white/50"
      }`}
    >
      {label}
    </button>
  );
}

function BlockView({ block }: { block: Block }) {
  const left = (block.startMin / TIMELINE_TOTAL_MIN) * 100;
  const width = ((block.endMin - block.startMin) / TIMELINE_TOTAL_MIN) * 100;
  const style: React.CSSProperties = {
    left: `${left}%`,
    width: `${width}%`,
  };

  const startTime = formatTime(block.startMin);
  const endTime = formatTime(block.endMin);
  const duration = formatDuration(block.endMin - block.startMin);

  if (block.kind === "pause") {
    return (
      <div
        className="group absolute top-1 bottom-1 hover:z-30"
        style={style}
      >
        <div
          className="h-full w-full rounded-md bg-amber-300 hover:bg-amber-400 transition-colors cursor-help"
          aria-label="Pauze"
        />
        <BlockTooltip
          title="Pauze"
          accent="amber"
          startTime={startTime}
          endTime={endTime}
          duration={duration}
          subtitle={block.reason}
        />
      </div>
    );
  }

  if (block.kind === "lunch") {
    return (
      <div
        className="group absolute top-1 bottom-1 hover:z-30"
        style={style}
      >
        <div
          className="h-full w-full rounded-md bg-amber-300 hover:bg-amber-400 transition-colors flex items-center justify-center cursor-help"
          aria-label="Pusdienas"
        >
          <Coffee className="w-3.5 h-3.5 text-amber-900" />
        </div>
        <BlockTooltip
          title="Pusdienas"
          accent="amber"
          startTime={startTime}
          endTime={endTime}
          duration={duration}
        />
      </div>
    );
  }

  const isFirst = block.highlighted === true;
  const fullTitle = block.fullLabel ?? block.label;

  return (
    <div className="group absolute top-0 bottom-0 hover:z-30" style={style}>
      <div
        className={`h-full px-2 py-1.5 rounded-lg flex items-center gap-1.5 text-[12px] font-medium overflow-hidden cursor-help transition-colors ${
          isFirst
            ? "bg-violet-200 border-2 border-violet-400 text-violet-900 hover:bg-violet-300"
            : "bg-violet-100 border border-violet-300 text-violet-800 hover:bg-violet-200 hover:border-violet-400"
        }`}
      >
        <Hammer className="w-3 h-3 shrink-0" />
        <span className="truncate min-w-0">{block.label}</span>
        <span
          className="ml-auto shrink-0 text-[10px] font-semibold tabular-nums opacity-80 hidden sm:inline"
          style={{ fontFamily: MONO_STACK }}
        >
          {block.duration}
        </span>
      </div>
      <BlockTooltip
        title={fullTitle}
        accent="violet"
        startTime={startTime}
        endTime={endTime}
        duration={duration}
        project={block.project}
        planned={block.planned}
      />
    </div>
  );
}

function BlockTooltip({
  title,
  accent,
  startTime,
  endTime,
  duration,
  project,
  planned,
  subtitle,
}: {
  title: string;
  accent: "violet" | "amber";
  startTime: string;
  endTime: string;
  duration: string;
  project?: string;
  planned?: string;
  subtitle?: string;
}) {
  const titleColor = accent === "violet" ? "text-violet-300" : "text-amber-300";
  return (
    <div
      role="tooltip"
      className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-gray-900 text-white rounded-xl px-3.5 py-2.5 shadow-2xl w-[240px] max-w-[260px] z-40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
    >
      <div className={`text-[13px] font-semibold mb-1 ${titleColor}`}>
        {title}
      </div>
      {project && <TooltipLine Icon={Folder}>{project}</TooltipLine>}
      {subtitle && !project && <TooltipLine Icon={Folder}>{subtitle}</TooltipLine>}
      <TooltipLine Icon={Clock}>
        {startTime} – {endTime}
      </TooltipLine>
      <TooltipLine Icon={Hourglass}>Ilgums: {duration}</TooltipLine>
      {planned && <TooltipLine Icon={Target}>Plānots: {planned}</TooltipLine>}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-2 w-2 bg-gray-900 rotate-45"
        aria-hidden
      />
    </div>
  );
}

function TooltipLine({
  Icon,
  children,
}: {
  Icon: typeof Clock;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-1.5 text-[12.5px] text-white/90 leading-snug py-0.5">
      <Icon className="w-3 h-3 text-violet-300/80 shrink-0 mt-0.5" />
      <span className="break-words min-w-0">{children}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   PAUSE REASONS
   ────────────────────────────────────────────────────────── */
function PauseReasonsCard() {
  return (
    <div className="border border-gray-200 rounded-2xl bg-white p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
            <PauseCircle className="w-[18px] h-[18px] text-amber-600" />
          </div>
          <h3 className="text-[15px] md:text-[16px] font-semibold text-gray-900">
            Pauzes iemesli periodā
          </h3>
        </div>
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-[12px] font-semibold shrink-0">
          {PAUSE_REASONS.length}
        </span>
      </div>

      <div>
        {PAUSE_REASONS.map((p, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row md:items-start gap-2 md:gap-3 p-3 hover:bg-gray-50 rounded-xl ${
              i < PAUSE_REASONS.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <Coffee className="w-4 h-4 text-amber-600" />
              </div>
              <div className="min-w-0">
                <div
                  className="text-[12px] text-gray-500 tabular-nums"
                  style={{ fontFamily: MONO_STACK }}
                >
                  {p.date}
                </div>
                <div className="text-[14px] font-semibold text-gray-900 tracking-wide">
                  {p.reason}
                </div>
              </div>
            </div>
            <div className="text-[12px] text-gray-500 md:text-right md:max-w-[280px] pl-11 md:pl-0">
              <div className="flex items-center gap-1 md:justify-end">
                <Hammer className="w-3 h-3 text-violet-500 shrink-0" />
                <span className="truncate">{p.activity}</span>
              </div>
              <div className="flex items-center gap-1 md:justify-end mt-0.5">
                <Folder className="w-3 h-3 text-gray-400 shrink-0" />
                <span className="truncate">{p.project}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
