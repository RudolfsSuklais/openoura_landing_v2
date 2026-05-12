"use client";

import { Edit2, Plus, Trash2, Truck } from "lucide-react";
import { MONO_STACK } from "../shared";

type Vehicle = {
  truckPlate: string;
  trailerPlate: string;
  carrier: string;
  notes: string;
  active: boolean;
};

const ROWS: Vehicle[] = [
  {
    truckPlate: "LP4218",
    trailerPlate: "C2849",
    carrier: "SIA ZIEMEĻU PĀRVADĀJUMI",
    notes: "Volvo FH16 · 750HP",
    active: true,
  },
  {
    truckPlate: "JK7305",
    trailerPlate: "P4517",
    carrier: "Baltic Logistic SIA",
    notes: "Mercedes Actros · Tents",
    active: true,
  },
  {
    truckPlate: "GN9142",
    trailerPlate: "—",
    carrier: 'SIA "KURZEMES KRAVA"',
    notes: "Scania R450 · Tikai vilcējs",
    active: true,
  },
  {
    truckPlate: "TR3680",
    trailerPlate: "H8294",
    carrier: "ExpressTrans SIA",
    notes: "MAN TGX · Refrigerator",
    active: true,
  },
  {
    truckPlate: "FB5024",
    trailerPlate: "B1973",
    carrier: "SIA ZIEMEĻU PĀRVADĀJUMI",
    notes: "DAF XF · Plato 13.6m",
    active: true,
  },
  {
    truckPlate: "MD8451",
    trailerPlate: "K3082",
    carrier: "Baltic Logistic SIA",
    notes: "Renault T520 · Curtainsider",
    active: true,
  },
  {
    truckPlate: "AC6739",
    trailerPlate: "S5418",
    carrier: "ExpressTrans SIA",
    notes: "Iveco S-Way · ADR",
    active: true,
  },
  {
    truckPlate: "YL1296",
    trailerPlate: "M9054",
    carrier: 'SIA "KURZEMES KRAVA"',
    notes: "—",
    active: true,
  },
  {
    truckPlate: "EB4815",
    trailerPlate: "T6271",
    carrier: "SIA ZIEMEĻU PĀRVADĀJUMI",
    notes: "Volvo FH13 · 460HP",
    active: false,
  },
  {
    truckPlate: "RZ7038",
    trailerPlate: "—",
    carrier: "ExpressTrans SIA",
    notes: "Iznomāts · 2026.06",
    active: false,
  },
  {
    truckPlate: "OP2547",
    trailerPlate: "N4691",
    carrier: "Baltic Logistic SIA",
    notes: "Mercedes Atego · 7.5t",
    active: true,
  },
  {
    truckPlate: "WK9163",
    trailerPlate: "L8205",
    carrier: 'SIA "KURZEMES KRAVA"',
    notes: "Scania G410 · Box trailer",
    active: true,
  },
];

export function TransportsPage() {
  return (
    <main className="flex-1 min-w-0 bg-white p-4 md:p-6">
      <PageHeader />
      <VehiclesTable />
    </main>
  );
}

function PageHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <Truck className="w-[26px] h-[26px] text-gray-700 shrink-0" />
        <h2 className="text-[22px] md:text-[28px] font-semibold text-gray-900 leading-tight">
          Transports
        </h2>
      </div>
      <p className="text-[13px] md:text-[14px] text-gray-500 mb-4">
        Vilcēji un piekabes, kas izmantotas CMR pavadzīmēs
      </p>
      <button
        className="inline-flex items-center justify-center gap-1.5 w-full md:w-auto text-white text-[14px] font-medium px-4 py-2.5 rounded-xl shadow-md"
        style={{
          background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
          boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
        }}
      >
        <Plus className="w-4 h-4" />
        Pievienot transportu
      </button>
    </div>
  );
}

const DESKTOP_COLS = "180px 180px 1fr 1fr 100px 100px";

function VehiclesTable() {
  return (
    <div className="border-t border-gray-200 overflow-x-auto">
      <div
        className="grid bg-white border-b border-gray-200 px-5 py-3 text-[11px] uppercase font-semibold tracking-[0.05em] text-gray-500 items-center min-w-[1000px]"
        style={{ gridTemplateColumns: DESKTOP_COLS }}
      >
        <span>Vilcēja nr.</span>
        <span>Piekabes nr.</span>
        <span>Pārvadātājs</span>
        <span>Piezīmes</span>
        <span>Aktīvs</span>
        <span>Darbības</span>
      </div>

      {ROWS.map((row, i) => (
        <VehicleRow key={i} row={row} />
      ))}
    </div>
  );
}

function VehicleRow({ row }: { row: Vehicle }) {
  const noTrailer = row.trailerPlate === "—";
  return (
    <div
      className="grid border-b border-gray-100 hover:bg-gray-50 transition-colors px-5 py-4 items-center text-[14px] text-gray-900 min-w-[1000px]"
      style={{ gridTemplateColumns: DESKTOP_COLS }}
    >
      <div
        className="text-[14px] font-semibold text-gray-900 tabular-nums tracking-wide"
        style={{ fontFamily: MONO_STACK }}
      >
        {row.truckPlate}
      </div>
      <div
        className={`text-[14px] tabular-nums tracking-wide ${
          noTrailer ? "text-gray-400 font-normal" : "text-gray-700 font-medium"
        }`}
        style={{ fontFamily: noTrailer ? undefined : MONO_STACK }}
      >
        {row.trailerPlate}
      </div>
      <div className="text-[13px] text-gray-700 truncate pr-3">
        {row.carrier}
      </div>
      <div
        className={`text-[13px] truncate pr-3 ${
          row.notes === "—" ? "text-gray-400 not-italic" : "text-gray-500 italic"
        }`}
      >
        {row.notes}
      </div>
      <div
        className={`text-[13px] ${
          row.active ? "text-gray-700" : "text-gray-400"
        }`}
      >
        {row.active ? "Jā" : "Nē"}
      </div>
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
