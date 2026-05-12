"use client";

import {
  CheckCircle,
  ChevronRight,
  Edit2,
  Layers,
  LayoutGrid,
  Lightbulb,
  PlayCircle,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { Checkbox, HeaderCell, MONO_STACK, Tag } from "../shared";

type Row = {
  tag: string;
  name: string;
  client: string;
  pct: number;
  hours: string;
  bom: "dash" | "zero";
};

const ROWS: Row[] = [
  { tag: "P-26.41", name: "K1 stūra elements", client: "SIA Kalnabērzs", pct: 100, hours: "113.9h / 113.9h", bom: "dash" },
  { tag: "P-26.42", name: "Sienu paneļi · A2", client: "SIA Liepkalni Pro", pct: 94, hours: "49.5h / 52.8h", bom: "zero" },
  { tag: "P-26.43", name: "Durvju komplekts · M-12", client: "SIA Vārpa Mēbeles", pct: 0, hours: "0.0h / 0.0h", bom: "zero" },
  { tag: "P-26.44", name: "Sienas panelis 18mm", client: "SIA Ozolkrasti", pct: 63, hours: "13.5h / 21.5h", bom: "dash" },
  { tag: "P-26.45", name: "Logu rāmji · sērija B", client: "SIA Kalnabērzs", pct: 97, hours: "175.2h / 181.3h", bom: "dash" },
];

export function ProjektiPage() {
  return (
    <main className="flex-1 min-w-0 bg-white p-4 md:p-6">
      <PageHeader />
      <StatsCard />
      <FilterTabs />
      <SearchBar />
      <ProjectsTable />
    </main>
  );
}

function PageHeader() {
  return (
    <div className="flex justify-between items-start mb-6 gap-4">
      <div>
        <h2 className="text-[22px] md:text-[28px] font-semibold text-gray-900 leading-tight">
          Projekti
        </h2>
        <p className="text-[13px] md:text-[14px] text-gray-500 mt-1">
          Pārvaldiet visus sistēmas projektus
        </p>
      </div>
      <button
        className="inline-flex items-center gap-1.5 text-white text-[13px] md:text-[14px] font-medium px-3 md:px-4 py-2 md:py-2.5 rounded-xl shadow-md shrink-0"
        style={{
          background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
          boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
        }}
      >
        <Plus className="w-[18px] h-[18px]" />
        <span className="hidden sm:inline">Jauns projekts</span>
        <span className="sm:hidden">Jauns</span>
      </button>
    </div>
  );
}

function StatsCard() {
  return (
    <div className="border border-gray-200 rounded-2xl p-4 md:p-5 mb-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-5">
      <div
        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shrink-0"
        style={{
          background: "linear-gradient(135deg, #8B5CF6, #6366F1)",
          boxShadow: "0 10px 20px rgba(139, 92, 246, 0.3)",
        }}
      >
        <TrendingUp className="w-7 h-7 md:w-8 md:h-8 text-white" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase font-semibold tracking-[0.05em] text-gray-500 mb-1">
          Ražotnes noslodze · šī nedēļa
        </div>
        <div className="text-[15px] md:text-[18px] font-semibold text-gray-900 mb-3 leading-tight">
          322% noslodze · 2677.4h darbam, 832h pieejami
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
          <StatInline value="21" label="darbinieki" />
          <StatInline value="322%" label="slodze" />
          <StatInline value="1" label="pārslodzes dienas" />
          <StatInline value="0/130" label="šodien izpildīts" />
        </div>
      </div>

      <ChevronRight className="hidden md:block w-6 h-6 text-gray-400 self-center shrink-0" />
    </div>
  );
}

function StatInline({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-[15px] md:text-[16px] font-bold text-gray-900">{value}</span>
      <span className="text-[13px] text-gray-500">{label}</span>
    </div>
  );
}

function FilterTabs() {
  const tabs = [
    { label: "Visi", Icon: Layers, active: true },
    { label: "Plānošanā", Icon: Lightbulb },
    { label: "Aktīvie", Icon: PlayCircle },
    { label: "Pabeigtie", Icon: CheckCircle },
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

function SearchBar() {
  return (
    <div className="flex items-center gap-2 md:gap-3 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
        <input
          type="text"
          placeholder="Meklēt projektus..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400"
        />
      </div>
      <button
        aria-label="Skats"
        className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 shrink-0"
      >
        <LayoutGrid className="w-[18px] h-[18px]" />
      </button>
      <button
        aria-label="Atjaunot"
        className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 shrink-0"
      >
        <RefreshCw className="w-[18px] h-[18px]" />
      </button>
    </div>
  );
}

function ProjectsTable() {
  return (
    <div className="border-t border-gray-200 overflow-x-auto">
      <div
        className="grid bg-gray-50 border-b border-gray-200 px-4 py-3 text-[11px] uppercase font-semibold tracking-[0.05em] text-gray-500 items-center min-w-[920px]"
        style={{ gridTemplateColumns: "40px 140px 1fr 200px 1.2fr 80px 120px" }}
      >
        <Checkbox />
        <HeaderCell label="Numurēšana" />
        <HeaderCell label="Nosaukums" />
        <HeaderCell label="Uzņēmums / Klients" />
        <HeaderCell label="Izpilde" />
        <HeaderCell label="BOM" />
        <HeaderCell label="Darbības" sortable={false} />
      </div>

      {ROWS.map((row, i) => (
        <TableRow key={i} row={row} index={i} />
      ))}
    </div>
  );
}

function TableRow({ row, index }: { row: Row; index: number }) {
  return (
    <div
      data-row-index={index}
      className="grid border-b border-gray-100 hover:bg-gray-50 transition-colors px-4 py-4 items-center text-[14px] text-gray-900 min-w-[920px]"
      style={{ gridTemplateColumns: "40px 140px 1fr 200px 1.2fr 80px 120px" }}
    >
      <Checkbox />
      <div>
        <Tag>{row.tag}</Tag>
      </div>
      <div className="font-medium truncate pr-3">{row.name}</div>
      <div className="text-gray-700 truncate pr-3">{row.client}</div>
      <div className="pr-3">
        <ProgressBar pct={row.pct} hours={row.hours} />
      </div>
      <div className="flex items-center justify-center">
        <BomCell type={row.bom} />
      </div>
      <div className="flex items-center gap-1">
        <IconButton Icon={Layers} />
        <IconButton Icon={Edit2} />
        <IconButton Icon={Trash2} />
      </div>
    </div>
  );
}

function ProgressBar({
  pct,
  hours,
  compact = false,
}: {
  pct: number;
  hours: string;
  compact?: boolean;
}) {
  const zero = pct === 0;
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5 gap-2">
        <span
          className={`${compact ? "text-[12px]" : "text-[14px]"} font-semibold ${
            zero ? "text-gray-400" : "text-gray-900"
          }`}
        >
          {pct}%
        </span>
        <span
          className={`${compact ? "text-[10px]" : "text-[12px]"} text-gray-500 truncate`}
          style={{ fontFamily: MONO_STACK }}
        >
          {hours}
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "#E5E7EB" }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: "#14B8A6" }}
        />
      </div>
    </div>
  );
}

function BomCell({ type }: { type: "dash" | "zero" }) {
  if (type === "dash") {
    return <span className="text-gray-400 text-[14px]">—</span>;
  }
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-semibold"
      style={{ background: "#FEF2F2", color: "#B91C1C" }}
    >
      0%
    </div>
  );
}

function IconButton({ Icon }: { Icon: typeof Layers }) {
  return (
    <button className="w-7 h-7 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-500">
      <Icon className="w-4 h-4" />
    </button>
  );
}
