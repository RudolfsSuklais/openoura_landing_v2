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

function CarriersTable() {
  return (
    <div className="border-t border-gray-200 overflow-x-auto">
      <div
        className="grid bg-white border-b border-gray-200 px-5 py-3 text-[11px] uppercase font-semibold tracking-[0.05em] text-gray-500 items-center min-w-[1000px]"
        style={{ gridTemplateColumns: DESKTOP_COLS }}
      >
        <span>Nosaukums</span>
        <span>Reģ. nr.</span>
        <span>Adrese</span>
        <span className="pr-6">Kontakti</span>
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
    <div
      className="grid border-b border-gray-100 hover:bg-gray-50 transition-colors px-5 py-5 items-center text-[14px] text-gray-900 min-w-[1000px]"
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
      <div className="text-[13px] text-gray-700 pr-6">{row.contact}</div>
      <div className="text-[13px] text-gray-700">{row.active}</div>
      <RowActions />
    </div>
  );
}

function RowActions() {
  return (
    <div className="flex items-center gap-1">
      <button
        aria-label="Labot"
        className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-500"
      >
        <Edit2 className="w-4 h-4" />
      </button>
      <button
        aria-label="Dzēst"
        className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-500"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
