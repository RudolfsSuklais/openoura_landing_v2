"use client";

import { Edit2, Plus, Trash2, Truck } from "lucide-react";
import { MONO_STACK } from "../shared";

type Carrier = {
  name: string;
  regNo: string;
  address: string;
  contact: string;
  active: string;
};

const ROWS: Carrier[] = [
  {
    name: "SIA ZIEMEĻU PĀRVADĀJUMI",
    regNo: "40103284172",
    address: "Brīvības gatve 218, Rīga, LV-1039, LV",
    contact: "—",
    active: "Jā",
  },
  {
    name: "Baltic Logistic SIA",
    regNo: "LV40203451829",
    address: "Daugavpils iela 14, Jelgava, LV-3001, LV",
    contact: "—",
    active: "Jā",
  },
  {
    name: 'SIA "KURZEMES KRAVA"',
    regNo: "LV41503072384",
    address: "Klaipēdas iela 87, Liepāja, LV-3416, LV",
    contact: "—",
    active: "Jā",
  },
  {
    name: "ExpressTrans SIA",
    regNo: "LV40103657291",
    address: "Bukultu iela 9, Rīga, LV-1005, LV",
    contact: "—",
    active: "Jā",
  },
];

export function ParvadatajiPage() {
  return (
    <main className="flex-1 min-w-0 bg-white p-4 md:p-6">
      <PageHeader />
      <CarriersTable />
    </main>
  );
}

function PageHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <Truck className="w-[26px] h-[26px] text-gray-700 shrink-0" />
        <h2 className="text-[22px] md:text-[28px] font-semibold text-gray-900 leading-tight">
          Pārvadātāji
        </h2>
      </div>
      <p className="text-[13px] md:text-[14px] text-gray-500 mb-4">
        Pārvaldiet CMR pavadzīmēs izmantotos pārvadātājus
      </p>
      <button
        className="inline-flex items-center justify-center gap-1.5 w-full md:w-auto text-white text-[14px] font-medium px-4 py-2.5 rounded-xl shadow-md"
        style={{
          background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
          boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
        }}
      >
        <Plus className="w-4 h-4" />
        Pievienot pārvadātāju
      </button>
    </div>
  );
}

const DESKTOP_COLS = "1fr 200px 1.5fr 200px 100px 100px";
const MOBILE_COLS = "1fr 1fr 80px 80px";

function CarriersTable() {
  return (
    <div className="border-t border-gray-200 overflow-x-auto">
      {/* Desktop header */}
      <div
        className="hidden md:grid bg-white border-b border-gray-200 px-5 py-3 text-[11px] uppercase font-semibold tracking-[0.05em] text-gray-500 items-center min-w-[1000px]"
        style={{ gridTemplateColumns: DESKTOP_COLS }}
      >
        <span>Nosaukums</span>
        <span>Reģ. nr.</span>
        <span>Adrese</span>
        <span className="text-right">Kontakti</span>
        <span>Aktīvs</span>
        <span>Darbības</span>
      </div>

      {/* Mobile header */}
      <div
        className="md:hidden grid bg-white border-b border-gray-200 px-3 py-3 text-[10px] uppercase font-semibold tracking-[0.05em] text-gray-500 items-center gap-2"
        style={{ gridTemplateColumns: MOBILE_COLS }}
      >
        <span>Nosaukums</span>
        <span>Adrese</span>
        <span>Aktīvs</span>
        <span>Darbības</span>
      </div>

      {ROWS.map((row, i) => (
        <CarrierRow key={i} row={row} />
      ))}
    </div>
  );
}

function CarrierRow({ row }: { row: Carrier }) {
  return (
    <div className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Desktop */}
      <div
        className="hidden md:grid px-5 py-5 items-center text-[14px] text-gray-900 min-w-[1000px]"
        style={{ gridTemplateColumns: DESKTOP_COLS }}
      >
        <div className="text-[14px] font-semibold text-gray-900 truncate pr-3">
          {row.name}
        </div>
        <div
          className="text-[13px] text-gray-600 tabular-nums truncate pr-3"
          style={{ fontFamily: MONO_STACK }}
        >
          {row.regNo}
        </div>
        <div className="text-[13px] text-gray-700 truncate pr-3">
          {row.address}
        </div>
        <div className="text-[13px] text-gray-700 text-right pr-3">
          {row.contact}
        </div>
        <div className="text-[13px] text-gray-700">{row.active}</div>
        <RowActions />
      </div>

      {/* Mobile */}
      <div
        className="md:hidden grid px-3 py-4 items-center text-[13px] text-gray-900 gap-2"
        style={{ gridTemplateColumns: MOBILE_COLS }}
      >
        <div className="text-[13px] font-semibold text-gray-900 truncate">
          {row.name}
        </div>
        <div className="text-[12px] text-gray-700 truncate">{row.address}</div>
        <div className="text-[12px] text-gray-700">{row.active}</div>
        <RowActions compact />
      </div>
    </div>
  );
}

function RowActions({ compact = false }: { compact?: boolean }) {
  const size = compact ? "h-7 w-7" : "h-8 w-8";
  const iconSize = compact ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-1">
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
