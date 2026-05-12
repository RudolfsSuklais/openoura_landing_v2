"use client";

import {
  ChevronDown,
  ChevronsUpDown,
  Download,
  FileCheck,
  FileSpreadsheet,
  FileText,
  FolderClosed,
  FolderOpen,
  Image as ImageIcon,
  Info,
  ListChecks,
  Receipt,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { MONO_STACK } from "../shared";

type FileKind = "pdf" | "xlsx" | "docx" | "img";

type ContextKey =
  | "cits"
  | "tame"
  | "projekta"
  | "pavadzime"
  | "logo"
  | "izdevums"
  | "bom";

type FileRow = {
  name: string;
  kind: FileKind;
  meta: string;
  context: ContextKey;
  contextLabel: string;
  link?: string;
  uploader: string;
  date: string;
  size: string;
};

const ROWS: FileRow[] = [
  {
    name: "RG62107944_INV-2026-04127.pdf",
    kind: "pdf",
    meta: "PDF · APPLICATION/PDF",
    context: "cits",
    contextLabel: "Cits",
    uploader: "santa",
    date: "11.05.2026 14:22",
    size: "38.71 KB",
  },
  {
    name: "tame_durvis_K1_2026-05.xlsx",
    kind: "xlsx",
    meta: "XLSX · APPLICATION/VND.MS-EXCEL",
    context: "tame",
    contextLabel: "Tāmes fails",
    link: "P-26.42",
    uploader: "edgars",
    date: "11.05.2026 11:45",
    size: "127.04 KB",
  },
  {
    name: "RG62107944_INV-2026-04128.pdf",
    kind: "pdf",
    meta: "PDF · APPLICATION/PDF",
    context: "cits",
    contextLabel: "Cits",
    uploader: "santa",
    date: "10.05.2026 16:18",
    size: "44.92 KB",
  },
  {
    name: "logu_ramji_specifikacija.docx",
    kind: "docx",
    meta: "DOCX · APPLICATION/MSWORD",
    context: "projekta",
    contextLabel: "Projekta fails",
    link: "P-26.48",
    uploader: "antonija",
    date: "09.05.2026 09:34",
    size: "82.55 KB",
  },
  {
    name: "pavadzime_WDT_2026-03864.pdf",
    kind: "pdf",
    meta: "PDF · APPLICATION/PDF",
    context: "pavadzime",
    contextLabel: "Pavadzīme",
    link: "WDT-2026-03864",
    uploader: "santa",
    date: "08.05.2026 13:07",
    size: "67.32 KB",
  },
  {
    name: "openoura_logo_violet.png",
    kind: "img",
    meta: "PNG · IMAGE/PNG",
    context: "logo",
    contextLabel: "Uzņēmuma logo",
    uploader: "rudolfs",
    date: "05.05.2026 10:12",
    size: "85.84 KB",
  },
  {
    name: "BOM_K1_furnitura_v3.xlsx",
    kind: "xlsx",
    meta: "XLSX · APPLICATION/VND.MS-EXCEL",
    context: "bom",
    contextLabel: "BOM saraksts",
    link: "P-26.51",
    uploader: "edgars",
    date: "03.05.2026 15:53",
    size: "7.93 KB",
  },
  {
    name: "rekins_majaslapa_marts.pdf",
    kind: "pdf",
    meta: "PDF · APPLICATION/PDF",
    context: "izdevums",
    contextLabel: "Uzņēmuma izdevums",
    link: "OO-2026-0011",
    uploader: "antonija",
    date: "01.05.2026 08:29",
    size: "146.66 KB",
  },
];

const KIND_BADGE: Record<
  FileKind,
  { Icon: typeof FileText; bg: string; text: string }
> = {
  pdf: { Icon: FileText, bg: "bg-red-50", text: "text-red-500" },
  xlsx: {
    Icon: FileSpreadsheet,
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  docx: { Icon: FileText, bg: "bg-blue-50", text: "text-blue-600" },
  img: { Icon: ImageIcon, bg: "bg-pink-50", text: "text-pink-600" },
};

const CONTEXT_PILL: Record<ContextKey, string> = {
  cits: "bg-gray-100 text-gray-700",
  tame: "bg-emerald-50 text-emerald-700",
  projekta: "bg-blue-50 text-blue-700",
  pavadzime: "bg-lime-50 text-lime-700",
  logo: "bg-pink-50 text-pink-700",
  izdevums: "bg-amber-50 text-amber-700",
  bom: "bg-cyan-50 text-cyan-700",
};

export function FailiPage() {
  return (
    <main className="flex-1 min-w-0 bg-white p-4 md:p-6">
      <PageHeader />
      <StorageCard />
      <FilterRow />
      <FilesTable />
    </main>
  );
}

function PageHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <FolderOpen className="w-6 h-6 text-gray-700" />
        <h2 className="text-[22px] md:text-[28px] font-semibold text-gray-900 leading-tight">
          Faili
        </h2>
      </div>
      <p className="text-[13px] md:text-[14px] text-gray-500">
        Visi uzņēmuma faili vienuviet — projekti, pavadzīmes, materiāli un citi.
      </p>
    </div>
  );
}

function StorageCard() {
  return (
    <div className="border border-gray-200 rounded-2xl bg-white p-5 md:p-6 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">
          Krātuves izlietojums
        </span>
        <Info className="w-3.5 h-3.5 text-cyan-500" />
      </div>

      <div className="text-[28px] md:text-[36px] font-bold leading-none bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-2">
        106.57 MB
      </div>

      <div className="text-[13px] text-gray-500 mb-4">
        no 20 GB · brīvi 19.9 GB
      </div>

      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
          style={{ width: "0.5%" }}
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <span className="text-[12px] text-gray-500 tabular-nums">0.5%</span>
        <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-500">
          <FileText className="w-3.5 h-3.5 text-gray-400" />
          433 faili
        </span>
      </div>

      <TypeBreakdown />
    </div>
  );
}

type TypeCard = {
  label: string;
  size: string;
  count: number;
  Icon: typeof FileText;
  border: string;
  iconBg: string;
  iconText: string;
};

const TYPE_CARDS: TypeCard[] = [
  {
    label: "Cits",
    size: "88.93 MB",
    count: 332,
    Icon: FileText,
    border: "border-l-gray-400",
    iconBg: "bg-gray-50",
    iconText: "text-gray-500",
  },
  {
    label: "Tāmes fails",
    size: "12.69 MB",
    count: 69,
    Icon: FileSpreadsheet,
    border: "border-l-emerald-500",
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
  },
  {
    label: "Projekta fails",
    size: "4.21 MB",
    count: 21,
    Icon: FolderClosed,
    border: "border-l-blue-500",
    iconBg: "bg-blue-50",
    iconText: "text-blue-600",
  },
  {
    label: "Pavadzīme",
    size: "519.17 KB",
    count: 8,
    Icon: FileCheck,
    border: "border-l-lime-500",
    iconBg: "bg-lime-50",
    iconText: "text-lime-600",
  },
  {
    label: "Uzņēmuma izdevums",
    size: "146.66 KB",
    count: 1,
    Icon: Receipt,
    border: "border-l-amber-500",
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
  },
  {
    label: "Uzņēmuma logo",
    size: "85.84 KB",
    count: 1,
    Icon: ImageIcon,
    border: "border-l-pink-500",
    iconBg: "bg-pink-50",
    iconText: "text-pink-600",
  },
  {
    label: "BOM saraksts",
    size: "7.93 KB",
    count: 1,
    Icon: ListChecks,
    border: "border-l-cyan-500",
    iconBg: "bg-cyan-50",
    iconText: "text-cyan-600",
  },
];

function TypeBreakdown() {
  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <div className="grid grid-cols-7 gap-2 min-w-[1080px] lg:min-w-0">
        {TYPE_CARDS.map((c) => (
          <TypeMiniCard key={c.label} card={c} />
        ))}
      </div>
    </div>
  );
}

function TypeMiniCard({ card }: { card: TypeCard }) {
  const { Icon } = card;
  return (
    <div
      className={`bg-white border border-gray-200 border-l-4 ${card.border} rounded-xl p-3 flex items-center gap-3 min-w-[160px]`}
    >
      <div
        className={`h-9 w-9 rounded-lg ${card.iconBg} flex items-center justify-center shrink-0`}
      >
        <Icon className={`w-[18px] h-[18px] ${card.iconText}`} />
      </div>
      <div className="min-w-0">
        <div className="text-[12px] text-gray-500 font-medium truncate">
          {card.label}
        </div>
        <div className="flex items-baseline gap-1 mt-0.5 truncate">
          <span className="text-[14px] font-semibold text-gray-900 tabular-nums">
            {card.size}
          </span>
          <span className="text-[12px] text-gray-400">·</span>
          <span className="text-[12px] text-gray-500 tabular-nums">
            {card.count}
          </span>
        </div>
      </div>
    </div>
  );
}

function FilterRow() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-3 mb-4 flex flex-col md:flex-row md:items-center gap-2 md:flex-wrap">
      <div className="relative flex-1 md:min-w-[280px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
        <input
          type="text"
          placeholder="Meklēt failu pēc nosaukuma..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400"
        />
      </div>

      <NativeSelect label="Visi konteksti" />
      <NativeSelect label="Visi augšupielādētāji" />

      <input
        type="text"
        placeholder="dd.mm.gggg"
        className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-[14px] text-gray-500 md:min-w-[120px] focus:outline-none focus:border-violet-400"
      />
      <input
        type="text"
        placeholder="dd.mm.gggg"
        className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-[14px] text-gray-500 md:min-w-[120px] focus:outline-none focus:border-violet-400"
      />
      <input
        type="text"
        placeholder="pdf, jpg..."
        className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-[14px] text-gray-500 md:min-w-[100px] focus:outline-none focus:border-violet-400"
      />
      <button
        aria-label="Notīrīt filtrus"
        className="h-9 w-9 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
}

function NativeSelect({ label }: { label: string }) {
  return (
    <div className="relative md:min-w-[160px]">
      <select
        defaultValue=""
        className="w-full appearance-none px-3 py-2 pr-9 rounded-lg border border-gray-200 bg-white text-[14px] text-gray-700 focus:outline-none focus:border-violet-400"
      >
        <option value="">{label}</option>
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}

const DESKTOP_COLS = "40px 1fr 160px 1fr 140px 160px 120px 80px";

function FilesTable() {
  return (
    <div className="border-t border-gray-200 overflow-x-auto">
      <div
        className="grid bg-white border-b border-gray-200 px-4 py-3 text-[11px] uppercase font-semibold tracking-[0.05em] text-gray-500 items-center min-w-[1100px]"
        style={{ gridTemplateColumns: DESKTOP_COLS }}
      >
        <span aria-hidden />
        <SortHeader label="Nosaukums" />
        <SortHeader label="Konteksts" withInfo />
        <HeaderWithInfo label="Piesaistīts" />
        <SortHeader label="Augšupielādēja" />
        <SortHeader label="Datums" />
        <SortHeader label="Izmērs" />
        <span aria-hidden />
      </div>

      {ROWS.map((row, i) => (
        <FileTableRow key={i} row={row} />
      ))}
    </div>
  );
}

function SortHeader({
  label,
  withInfo = false,
}: {
  label: string;
  withInfo?: boolean;
}) {
  return (
    <div className="flex items-center gap-1 min-w-0">
      <span className="truncate">{label}</span>
      <ChevronsUpDown className="w-3 h-3 text-gray-400 shrink-0" />
      {withInfo && <Info className="w-3 h-3 text-gray-400 shrink-0" />}
    </div>
  );
}

function HeaderWithInfo({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1 min-w-0">
      <span className="truncate">{label}</span>
      <Info className="w-3 h-3 text-gray-400 shrink-0" />
    </div>
  );
}

function FileTableRow({ row }: { row: FileRow }) {
  const badge = KIND_BADGE[row.kind];
  const KindIcon = badge.Icon;
  return (
    <div
      className="grid border-b border-gray-100 hover:bg-gray-50 transition-colors px-4 py-4 items-center text-[14px] text-gray-900 min-w-[1100px]"
      style={{ gridTemplateColumns: DESKTOP_COLS }}
    >
      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
      <div className="flex items-center gap-3 min-w-0 pr-3">
        <div
          className={`h-10 w-10 rounded-lg ${badge.bg} flex items-center justify-center shrink-0`}
        >
          <KindIcon className={`w-5 h-5 ${badge.text}`} />
        </div>
        <div className="min-w-0">
          <div className="text-[14px] font-medium text-gray-900 truncate">
            {row.name}
          </div>
          <div
            className="text-[11px] uppercase tracking-wider text-gray-400 mt-0.5 truncate"
            style={{ fontFamily: MONO_STACK }}
          >
            {row.meta}
          </div>
        </div>
      </div>
      <div>
        <ContextPill row={row} />
      </div>
      <div className="text-[13px] text-gray-700 truncate pr-2">
        {row.link ? (
          <span
            className="text-violet-700 font-medium tabular-nums"
            style={{ fontFamily: MONO_STACK }}
          >
            {row.link}
          </span>
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </div>
      <div className="text-[13px] text-gray-700 truncate pr-2">
        {row.uploader}
      </div>
      <div className="text-[13px] text-gray-600 tabular-nums">{row.date}</div>
      <div className="text-[13px] font-medium text-gray-700 tabular-nums">
        {row.size}
      </div>
      <RowActions />
    </div>
  );
}

function ContextPill({ row }: { row: FileRow }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium ${CONTEXT_PILL[row.context]}`}
    >
      <FileText className="w-3 h-3" />
      {row.contextLabel}
    </span>
  );
}

function RowActions() {
  return (
    <div className="flex items-center gap-1">
      <button
        aria-label="Lejupielādēt"
        className="h-8 w-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500"
      >
        <Download className="w-4 h-4" />
      </button>
      <button
        aria-label="Dzēst"
        className="h-8 w-8 rounded-lg border border-gray-200 bg-white hover:bg-red-50 hover:border-red-200 flex items-center justify-center text-gray-500 hover:text-red-500"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
