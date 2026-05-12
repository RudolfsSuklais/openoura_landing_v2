"use client";

import {
  Activity,
  Calendar,
  ChevronDown,
  Download,
  FileBarChart,
  Layers,
  LineChart,
  Settings2,
  TrendingUp,
  Zap,
} from "lucide-react";

export function PlanotajsPage() {
  return (
    <main className="flex-1 min-w-0 bg-white p-4 md:p-6">
      <PageHeader />
      <ViewTabs />
      <RangeAndStats />
      <CapacityChartCard />
      <ProjectsChartCard />
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
          Ražotnes noslodze, kapacitāte un automātiskais plāns
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap mt-2 lg:mt-0">
        <OutlineBtn className="hidden md:inline-flex">
          <Download className="w-4 h-4 text-gray-500" />
          <span>Eksportēt</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </OutlineBtn>
        <OutlineBtn className="hidden md:inline-flex">
          <Zap className="w-4 h-4 text-violet-600" />
          <span>Pārplānot</span>
        </OutlineBtn>
        <OutlineBtn>
          <Settings2 className="w-4 h-4 text-gray-500" />
          <span className="hidden sm:inline">Iestatījumi</span>
        </OutlineBtn>
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
   VIEW TABS
   ────────────────────────────────────────────────────────── */
function ViewTabs() {
  const tabs = [
    { label: "Noslodze", Icon: TrendingUp },
    { label: "Grafiks", Icon: LineChart, active: true },
    { label: "Projekti", Icon: Layers },
    { label: "Šodien", Icon: Calendar },
    { label: "Pārskats", Icon: FileBarChart },
  ];
  return (
    <div className="mb-6 -mx-1 overflow-x-auto">
      <div className="inline-flex gap-1 p-1 rounded-xl bg-gray-50 mx-1">
        {tabs.map((tab) => {
          const Icon = tab.Icon;
          return (
            <button
              key={tab.label}
              className={`inline-flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-[13px] md:text-[14px] font-medium whitespace-nowrap ${
                tab.active
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:bg-white/50"
              }`}
            >
              <Icon
                className="w-[16px] h-[16px]"
                style={{ color: tab.active ? "#7C3AED" : "#6B7280" }}
              />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   DATE RANGE PILLS + STATS
   ────────────────────────────────────────────────────────── */
function RangeAndStats() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
      <div className="inline-flex p-1 rounded-full bg-gray-100 self-start">
        <RangePill label="30" active />
        <RangePill label="60" />
        <RangePill label="90" />
      </div>
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <span
          className="px-3 md:px-4 py-1.5 rounded-full text-[12px] md:text-[13px] font-medium"
          style={{ background: "#ECFDF5", color: "#047857" }}
        >
          <span className="hidden sm:inline">
            2676.4h pieprasījums / 3688h kapacitāte (73%)
          </span>
          <span className="sm:hidden">2676.4h / 3688h · 73%</span>
        </span>
        <span className="px-3 md:px-4 py-1.5 rounded-full text-[12px] md:text-[13px] font-medium bg-gray-100 text-gray-700">
          30 projekti
        </span>
      </div>
    </div>
  );
}

function RangePill({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      className={`px-3 py-1.5 rounded-full text-[13px] font-medium ${
        active ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
      }`}
    >
      {label}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────
   CHART 1 — KAPACITĀTE VS PIEPRASĪJUMS
   ────────────────────────────────────────────────────────── */
function CapacityChartCard() {
  return (
    <div className="border border-gray-200 rounded-2xl p-4 md:p-6 mb-6 bg-white">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-[18px] h-[18px] text-violet-600 shrink-0" />
            <h3 className="text-[16px] font-semibold text-gray-900">
              Kapacitāte vs Pieprasījums
            </h3>
          </div>
          <p className="text-[13px] text-gray-500 max-w-[60ch]">
            Pelēkā josla = pieejamā kapacitāte. Violetā līnija =
            nepieciešamais darba apjoms uz katru dienu.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[13px] shrink-0">
          <LegendSquare color="#E5E7EB" label="Kapacitāte" labelClass="text-gray-600" />
          <LegendSquare color="#7C3AED" label="Pieprasījums" labelClass="text-violet-700" />
        </div>
      </div>

      <CapacityChart />
    </div>
  );
}

function LegendSquare({
  color,
  label,
  labelClass,
}: {
  color: string;
  label: string;
  labelClass: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block w-3 h-3 rounded-sm"
        style={{ background: color }}
      />
      <span className={labelClass}>{label}</span>
    </span>
  );
}

const X_POSITIONS = [50, 152, 254, 356, 458, 560, 662, 764, 866, 970];
const X_LABELS = [
  "11.05",
  "14.05",
  "17.05",
  "20.05",
  "23.05",
  "26.05",
  "29.05",
  "01.06",
  "04.06",
  "07.06",
];

const Y_TICKS = [
  { value: "3000h", y: 20, primary: true },
  { value: "2500h", y: 70, primary: false },
  { value: "2000h", y: 120, primary: true },
  { value: "1500h", y: 170, primary: false },
  { value: "1000h", y: 220, primary: true },
  { value: "500h", y: 270, primary: false },
  { value: "0h", y: 315, primary: true },
];

function ChartAxes() {
  return (
    <>
      {Y_TICKS.map((tick) => (
        <text
          key={tick.value}
          x={6}
          y={tick.y + 4}
          fontSize={11}
          fill="#9CA3AF"
          className={tick.primary ? "" : "hidden sm:block"}
        >
          {tick.value}
        </text>
      ))}
      {X_POSITIONS.map((x, i) => (
        <text
          key={X_LABELS[i]}
          x={x}
          y={335}
          fontSize={11}
          fill="#9CA3AF"
          textAnchor="middle"
        >
          {X_LABELS[i]}
        </text>
      ))}
      {Y_TICKS.filter((t) => t.primary).map((tick) => (
        <line
          key={`grid-${tick.value}`}
          x1={45}
          x2={985}
          y1={tick.y}
          y2={tick.y}
          stroke="#F3F4F6"
          strokeWidth={1}
        />
      ))}
    </>
  );
}

function CapacityChart() {
  // Capacity band: roughly y=270-280 across width (a near-flat gray ribbon)
  const capacityTop =
    "M 50,278 Q 150,272 250,276 Q 350,280 450,274 Q 550,278 650,272 Q 750,276 850,280 L 970,274";
  const capacityArea =
    capacityTop +
    " L 970,290 Q 850,294 750,290 Q 650,288 550,292 Q 450,290 350,294 Q 250,290 150,292 L 50,294 Z";

  // Demand line: huge spike at start, then ripples near baseline
  const demandPath =
    "M 50,80 L 100,200 L 150,282 Q 200,280 254,286 Q 305,290 356,282 Q 407,278 458,288 Q 509,286 560,280 Q 611,286 662,284 Q 713,280 764,288 Q 815,286 866,282 L 970,286";

  return (
    <svg
      viewBox="0 0 1000 345"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="auto"
      role="img"
      aria-label="Kapacitāte vs Pieprasījums diagramma"
      className="block"
    >
      <ChartAxes />
      <path d={capacityArea} fill="#E5E7EB" fillOpacity={0.6} />
      <path
        d={demandPath}
        fill="none"
        stroke="#7C3AED"
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────
   CHART 2 — DARBS PA PROJEKTIEM
   ────────────────────────────────────────────────────────── */
type ProjectLayer = {
  color: string;
  name: string;
  thickness: number[];
};

// Layers from BOTTOM (drawn first) to TOP (drawn last).
const PROJECT_LAYERS: ProjectLayer[] = [
  { color: "#34D399", name: "P-26.47", thickness: [30, 5, 2, 1, 0, 0, 0, 0, 0, 0] },
  { color: "#FBBF24", name: "P-26.46", thickness: [30, 5, 1, 0, 0, 0, 0, 0, 0, 0] },
  { color: "#FB923C", name: "P-26.45", thickness: [30, 6, 2, 0, 0, 0, 0, 0, 0, 0] },
  { color: "#F472B6", name: "P-26.44", thickness: [35, 10, 4, 1, 0, 0, 0, 0, 0, 0] },
  { color: "#C084FC", name: "P-26.43", thickness: [30, 5, 2, 0, 0, 0, 0, 0, 0, 0] },
  { color: "#A78BFA", name: "P-26.42", thickness: [35, 8, 3, 0, 0, 0, 0, 0, 0, 0] },
  { color: "#7C3AED", name: "P-26.41", thickness: [30, 5, 2, 0, 0, 0, 0, 0, 0, 0] },
];

const BASELINE_Y = 300;

function buildCumulativeTops(): number[][] {
  const tops: number[][] = [];
  let prev = X_POSITIONS.map(() => BASELINE_Y);
  tops.push(prev);
  for (const layer of PROJECT_LAYERS) {
    const next = prev.map((y, i) => y - layer.thickness[i]);
    tops.push(next);
    prev = next;
  }
  return tops;
}

function layerPath(top: number[], bottom: number[]): string {
  const forward = X_POSITIONS.map((x, i) => `${i === 0 ? "M" : "L"} ${x},${top[i]}`).join(" ");
  const back = X_POSITIONS.slice()
    .reverse()
    .map((x, i) => {
      const idx = X_POSITIONS.length - 1 - i;
      return `L ${x},${bottom[idx]}`;
    })
    .join(" ");
  return `${forward} ${back} Z`;
}

function ProjectsChartCard() {
  const cumTops = buildCumulativeTops();

  return (
    <div className="border border-gray-200 rounded-2xl p-4 md:p-6 bg-white">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-[18px] h-[18px] text-violet-600 shrink-0" />
          <h3 className="text-[16px] font-semibold text-gray-900">
            Darbs pa projektiem
          </h3>
        </div>
        <p className="text-[13px] text-gray-500 max-w-[70ch]">
          Stacked area parāda, cik stundas dienā tērē katrs projekts.
          Klikšķini uz projekta legendā lai paslēptu.
        </p>
      </div>

      <svg
        viewBox="0 0 1000 345"
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="auto"
        role="img"
        aria-label="Darbs pa projektiem diagramma"
        className="block"
      >
        <ChartAxes />
        {PROJECT_LAYERS.map((layer, i) => (
          <path
            key={layer.name}
            d={layerPath(cumTops[i + 1], cumTops[i])}
            fill={layer.color}
            fillOpacity={0.8}
          />
        ))}
      </svg>

      <div className="flex flex-wrap gap-2 mt-4">
        {PROJECT_LAYERS.slice()
          .reverse()
          .map((layer) => (
            <span
              key={layer.name}
              className="inline-flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md text-[11px] text-gray-700"
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: layer.color }}
              />
              {layer.name}
            </span>
          ))}
      </div>
    </div>
  );
}
