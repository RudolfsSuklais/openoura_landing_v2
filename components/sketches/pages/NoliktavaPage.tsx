"use client";

import {
  Box,
  CheckCircle,
  ChevronDown,
  Download,
  History,
  Plus,
  ScanLine,
  Scale,
  Search,
  Truck,
  Upload,
} from "lucide-react";
import { Checkbox, HeaderCell, MONO_STACK } from "../shared";

type StockRow = {
  sku: string;
  name: string;
  category: string;
  qty: number;
  unit: string;
  avgBuy: string;
  salePrice: string;
  profit: string;
  supplier: string;
  lastRestock: string;
  status: "ok";
};

const ROWS: StockRow[] = [
  {
    sku: "283061020",
    name: "10.20mm Universālais urbis HSS-GK Tornado",
    category: "Urbji",
    qty: 5,
    unit: "PCS",
    avgBuy: "8.40 €",
    salePrice: "12.60 €",
    profit: "+50% Peļņa:",
    supplier: "Würth Latvia",
    lastRestock: "14.04.2026.",
    status: "ok",
  },
  {
    sku: "415702040",
    name: "Kokskrūve 4×40mm DIN 7505 cinkota",
    category: "Skrūves",
    qty: 1240,
    unit: "PCS",
    avgBuy: "0.04 €",
    salePrice: "0.07 €",
    profit: "+75% Peļņa:",
    supplier: "Liepkalni Pro",
    lastRestock: "02.05.2026.",
    status: "ok",
  },
  {
    sku: "807425800000",
    name: "10mm Ovālā cilindra pagarinātājs ASSA",
    category: "Slēdzenes",
    qty: 26,
    unit: "PCS",
    avgBuy: "14.20 €",
    salePrice: "21.50 €",
    profit: "+51% Peļņa:",
    supplier: "Kalnabērzs SIA",
    lastRestock: "21.04.2026.",
    status: "ok",
  },
  {
    sku: "BLM110T",
    name: "Eņģe Blum CLIP top 110° ar plāksni",
    category: "Eņģes",
    qty: 184,
    unit: "PCS",
    avgBuy: "2.85 €",
    salePrice: "4.30 €",
    profit: "+51% Peļņa:",
    supplier: "Vārpa Mēbeles",
    lastRestock: "29.04.2026.",
    status: "ok",
  },
  {
    sku: "D3PVA1000",
    name: "D3 PVA līme ūdensizturīga 1kg",
    category: "Līmes",
    qty: 32,
    unit: "PCS",
    avgBuy: "6.10 €",
    salePrice: "9.80 €",
    profit: "+60% Peļņa:",
    supplier: "Ozolkrasti",
    lastRestock: "07.05.2026.",
    status: "ok",
  },
  {
    sku: "SLP120P80",
    name: "Slīpripa Ø125mm P80 (10 gab.)",
    category: "Slīpmateriāli",
    qty: 18,
    unit: "PCS",
    avgBuy: "3.40 €",
    salePrice: "5.50 €",
    profit: "+62% Peļņa:",
    supplier: "Sēnītes Trade",
    lastRestock: "05.05.2026.",
    status: "ok",
  },
];

export function NoliktavaPage() {
  return (
    <main className="flex-1 min-w-0 bg-white p-4 md:p-6">
      <PageHeader />
      <StatsCards />
      <SearchFilters />
      <StockTable />
    </main>
  );
}

function PageHeader() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
      <div>
        <h2 className="text-[22px] md:text-[28px] font-semibold text-gray-900 leading-tight">
          Noliktava
        </h2>
        <p className="text-[13px] md:text-[14px] text-gray-500 mt-1">
          Pārvaldiet uzņēmuma materiālus un krājumus
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <OutlineBtn Icon={Download} label="Eksportēt" />
        <OutlineBtn Icon={Scale} label="Cenu salīdzinājums" />
        <OutlineBtn Icon={Truck} label="Piegādātāji" />
        <OutlineBtn Icon={History} label="Vēsture" />
        <OutlineBtn Icon={Upload} label="Importēt" />
        <button
          className="inline-flex items-center gap-1.5 text-white text-[13px] font-medium px-4 py-2 rounded-xl shadow-md shrink-0"
          style={{
            background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
          }}
        >
          <Plus className="w-[18px] h-[18px]" />
          <span className="hidden sm:inline">Jauns materiāls</span>
          <span className="sm:hidden">Jauns</span>
        </button>
      </div>
    </div>
  );
}

function OutlineBtn({
  Icon,
  label,
}: {
  Icon: typeof Download;
  label: string;
}) {
  return (
    <button
      className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
    >
      <Icon className="w-4 h-4 text-gray-500" />
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
}

function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6">
      <StatCard label="Kopējā noliktavas vērtība" value="86 705,03 €" />
      <StatCard label="Zems atlikums" value="525" valueClass="text-red-500" trailing={<ChevronDown className="w-3.5 h-3.5 text-gray-400" />} />
      <StatCard label="Materiālu veidi" value="1260" />
    </div>
  );
}

function StatCard({
  label,
  value,
  valueClass = "text-gray-900",
  trailing,
}: {
  label: string;
  value: string;
  valueClass?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center gap-1 mb-2">
        <span className="text-[11px] uppercase font-semibold tracking-[0.05em] text-gray-500">
          {label}
        </span>
        {trailing}
      </div>
      <div className={`text-[28px] md:text-[32px] font-semibold leading-none ${valueClass}`}>
        {value}
      </div>
    </div>
  );
}

function SearchFilters() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
      <div className="relative flex-1 md:max-w-[500px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
        <input
          type="text"
          placeholder="Meklēt pēc nosaukuma vai SKU..."
          className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-gray-200 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-violet-400"
        />
        <button
          aria-label="Skenēt"
          className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg text-white flex items-center justify-center hover:opacity-90"
          style={{ background: "#8B5CF6" }}
        >
          <ScanLine className="w-[18px] h-[18px]" />
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        <FilterDropdown label="Visas kategorijas" />
        <FilterDropdown label="Visi statusi" />
      </div>
    </div>
  );
}

function FilterDropdown({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-xl text-[14px] text-gray-700 hover:bg-gray-50">
      <span>{label}</span>
      <ChevronDown className="w-4 h-4 text-gray-400" />
    </button>
  );
}

function StockTable() {
  return (
    <div className="border-t border-gray-200 overflow-x-auto">
      {/* Desktop header */}
      <div
        className="hidden md:grid bg-gray-50 border-b border-gray-200 px-4 py-3 text-[11px] uppercase font-semibold tracking-[0.05em] text-gray-500 items-center min-w-[1380px]"
        style={{
          gridTemplateColumns:
            "40px 140px 1fr 120px 90px 90px 140px 140px 160px 140px 90px",
        }}
      >
        <Checkbox />
        <HeaderCell label="SKU" withInfo />
        <HeaderCell label="Nosaukums" withInfo />
        <HeaderCell label="Kategorija" withInfo />
        <HeaderCell label="Atlikums" sortable={false} />
        <HeaderCell label="Mērv." withInfo sortable={false} />
        <HeaderCell label="Vid. iepirkums" withInfo sortable={false} />
        <HeaderCell label="Pārdošanas cena" withInfo sortable={false} />
        <HeaderCell label="Galv. piegādātājs" withInfo sortable={false} />
        <HeaderCell label="Pēdējais papild." sortable={false} />
        <HeaderCell label="Statuss" sortable={false} />
      </div>

      {/* Mobile header */}
      <div
        className="md:hidden grid bg-gray-50 border-b border-gray-200 px-3 py-3 text-[10px] uppercase font-semibold tracking-[0.05em] text-gray-500 items-center"
        style={{ gridTemplateColumns: "100px 1fr 60px 80px" }}
      >
        <HeaderCell label="SKU" sortable={false} />
        <HeaderCell label="Nosaukums" sortable={false} />
        <HeaderCell label="Atl." sortable={false} />
        <HeaderCell label="Statuss" sortable={false} />
      </div>

      {ROWS.map((row, i) => (
        <StockTableRow key={i} row={row} />
      ))}
    </div>
  );
}

function StockTableRow({ row }: { row: StockRow }) {
  return (
    <div className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Desktop row */}
      <div
        className="hidden md:grid px-4 py-4 items-center text-[14px] text-gray-900 min-w-[1380px]"
        style={{
          gridTemplateColumns:
            "40px 140px 1fr 120px 90px 90px 140px 140px 160px 140px 90px",
        }}
      >
        <Checkbox />
        <div
          className="text-[13px] text-gray-600 truncate pr-2"
          style={{ fontFamily: MONO_STACK }}
        >
          {row.sku}
        </div>
        <div className="flex items-center gap-2 min-w-0 pr-3 overflow-hidden">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
            style={{ background: "#EDE9FE" }}
          >
            <Box className="w-4 h-4" style={{ color: "#7C3AED" }} />
          </div>
          <span className="truncate text-[14px] text-gray-900">{row.name}</span>
        </div>
        <div className="pr-3">
          <CategoryPill>{row.category}</CategoryPill>
        </div>
        <div className="text-[16px] font-semibold text-gray-900">{row.qty}</div>
        <div className="text-[12px] text-gray-500 uppercase">{row.unit}</div>
        <div className="text-[14px] text-gray-600">{row.avgBuy}</div>
        <div>
          <div className="text-[14px] font-medium" style={{ color: "#6D28D9" }}>
            {row.salePrice}
          </div>
          <div className="text-[10px]" style={{ color: "#A78BFA" }}>
            {row.profit}
          </div>
        </div>
        <div className="text-[14px] text-gray-400">{row.supplier}</div>
        <div className="text-[13px] text-gray-600">{row.lastRestock}</div>
        <div>
          <StatusPill />
        </div>
      </div>

      {/* Mobile row */}
      <div
        className="md:hidden grid px-3 py-3 items-center text-[13px] text-gray-900 gap-2"
        style={{ gridTemplateColumns: "100px 1fr 60px 80px" }}
      >
        <div
          className="text-[11px] text-gray-600 truncate"
          style={{ fontFamily: MONO_STACK }}
        >
          {row.sku}
        </div>
        <div className="flex items-center gap-1.5 min-w-0">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
            style={{ background: "#EDE9FE" }}
          >
            <Box className="w-3 h-3" style={{ color: "#7C3AED" }} />
          </div>
          <span className="truncate text-[12px]">{row.name}</span>
        </div>
        <div className="text-[14px] font-semibold text-gray-900">{row.qty}</div>
        <div>
          <StatusPill compact />
        </div>
      </div>
    </div>
  );
}

function CategoryPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap">
      {children}
    </span>
  );
}

function StatusPill({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg font-medium ${
        compact ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-[12px]"
      }`}
      style={{ background: "#ECFDF5", color: "#047857" }}
    >
      <CheckCircle className="w-3.5 h-3.5" />
      OK
    </span>
  );
}
