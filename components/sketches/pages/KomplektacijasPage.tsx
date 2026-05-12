"use client";

import {
  AlignJustify,
  ClipboardList,
  Copy,
  GripVertical,
  Info,
  ListChecks,
  Plus,
  Save,
} from "lucide-react";

type Template = {
  id: string;
  name: string;
  count: number;
};

const TEMPLATES: Template[] = [
  { id: "durvis", name: "Durvis", count: 12 },
  { id: "fasade", name: "Fasāde", count: 34 },
  { id: "iekspe50", name: "Iekšdurvju sistēma (PE50)", count: 10 },
  { id: "montaza", name: "Montāžas materiāli", count: 22 },
  { id: "pe50", name: "PE50 (Vitrīnas)", count: 2 },
  { id: "pe68", name: "PE68+ Vitrīna", count: 3 },
  { id: "ugunsdurvis", name: "Ugunsdrošās durvis", count: 1 },
  { id: "vitrinas", name: "Vitrīnas", count: 5 },
];

type Item = {
  code: string;
  description: string;
  unit?: string;
};

const ITEMS: Item[] = [
  { code: "MZ001 7024MAT", description: "Drain hole cover" },
  { code: "MZ001 7015MAT", description: "Drain hole cover" },
  { code: "KL412 Black", description: "KL1600 sash drain hole cover" },
  { code: "MZ001 7016MAT", description: "Drain hole cover" },
  { code: "AB050", description: "Masking gasket" },
  { code: "200.481 7016MAT", description: "Sealing profile" },
  { code: "MZ001 6005MAT", description: "Drain hole cover" },
  { code: "MZ001 9016MAT", description: "Drain hole cover" },
  { code: "MZ001 9006", description: "Drain hole cover", unit: "gab." },
  {
    code: "222041",
    description: "Pelēki plastmasas čopiki 14mm.",
    unit: "gab.",
  },
  { code: "MZ001 9005MAT", description: "Drain hole cover", unit: "gab" },
];

export function KomplektacijasPage() {
  return (
    <main className="flex-1 min-w-0 bg-white p-4 md:p-6">
      <PageHeader />
      <div className="grid grid-cols-1 md:grid-cols-[320px,1fr] gap-4 md:gap-6">
        <TemplateList />
        <TemplateDetail />
      </div>
    </main>
  );
}

function PageHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-6">
      <div className="flex items-start gap-3 min-w-0">
        <div className="h-10 w-10 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
          <ClipboardList className="w-[22px] h-[22px] text-violet-600" />
        </div>
        <div className="min-w-0">
          <h2 className="text-[22px] md:text-[28px] font-semibold text-gray-900 leading-tight">
            Komplektācijas veidnes
          </h2>
          <div className="flex items-center gap-1.5 mt-1">
            <p className="text-[13px] md:text-[14px] text-gray-500">
              Sagatavojiet tipveida sarakstus ātrai lietošanai sūtījumos
            </p>
            <Info className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          </div>
        </div>
      </div>
      <button
        className="inline-flex items-center gap-1.5 text-white text-[13px] md:text-[14px] font-medium px-3 md:px-4 py-2 md:py-2.5 rounded-xl shadow-md shrink-0"
        style={{
          background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
          boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
        }}
      >
        <Plus className="w-[18px] h-[18px]" />
        <span className="hidden sm:inline">Jauna veidne</span>
        <span className="sm:hidden">Jauna</span>
      </button>
    </div>
  );
}

function TemplateList() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="text-[15px] font-semibold text-gray-900">Veidnes</div>
      </div>
      <div className="md:max-h-none max-h-[280px] overflow-y-auto">
        {TEMPLATES.map((t, i) => {
          const active = t.id === "durvis";
          const isLast = i === TEMPLATES.length - 1;
          return (
            <button
              key={t.id}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                isLast ? "" : "border-b border-gray-100"
              } ${
                active
                  ? "bg-violet-50 border-l-2 border-l-violet-600"
                  : "hover:bg-gray-50"
              }`}
            >
              <div
                className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                  active ? "bg-violet-100" : "bg-gray-100"
                }`}
              >
                <ListChecks
                  className={`w-4 h-4 ${
                    active ? "text-violet-600" : "text-gray-500"
                  }`}
                />
              </div>
              <div className="min-w-0">
                <div
                  className={`text-[14px] font-semibold truncate ${
                    active ? "text-violet-700" : "text-gray-900"
                  }`}
                >
                  {t.name}
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  {t.count} {t.count === 1 ? "ieraksts" : "ieraksti"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TemplateDetail() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200 flex items-center gap-3">
        <input
          type="text"
          defaultValue="Durvis"
          className="flex-1 min-w-0 border border-gray-200 rounded-xl px-4 py-2.5 text-[16px] font-medium text-gray-900 focus:outline-none focus:border-violet-400"
        />
        <button
          className="inline-flex items-center gap-1.5 text-white text-[14px] font-medium px-4 py-2.5 rounded-xl shrink-0"
          style={{
            background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
          }}
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">Saglabāt</span>
        </button>
        <button
          aria-label="Dublēt"
          className="h-10 w-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center shrink-0"
        >
          <Copy className="w-[18px] h-[18px] text-gray-500" />
        </button>
      </div>

      <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <div className="text-[13px] text-gray-600">12 ieraksti</div>
        <button className="inline-flex items-center gap-1.5 text-[13px] text-gray-700 font-medium hover:text-violet-700">
          <AlignJustify className="w-[14px] h-[14px]" />
          Masveida ievads
        </button>
      </div>

      <div className="px-5 py-4 relative">
        {ITEMS.map((item, i) => (
          <ItemRow key={i} index={i + 1} item={item} />
        ))}
        <div
          className="pointer-events-none absolute left-0 right-0 bottom-0 h-12"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.95))",
          }}
        />
      </div>
    </div>
  );
}

function ItemRow({ index, item }: { index: number; item: Item }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
      <GripVertical className="w-4 h-4 text-gray-400 cursor-grab shrink-0" />
      <div
        className="text-[13px] tabular-nums text-gray-500 min-w-[24px] shrink-0"
        aria-hidden
      >
        {index}.
      </div>
      <div className="flex-1 min-w-0 text-[13px] text-gray-700 truncate">
        <span className="font-medium text-gray-900">{item.code}</span>
        <span className="text-gray-500"> · {item.description}</span>
      </div>
      <div className="hidden sm:flex items-center gap-4 shrink-0">
        <span className="text-[11px] uppercase tracking-wider text-gray-400">
          Daudz.
        </span>
        {item.unit ? (
          <span className="text-[13px] font-medium text-gray-700 min-w-[40px]">
            {item.unit}
          </span>
        ) : (
          <span className="text-[11px] uppercase tracking-wider text-gray-400 min-w-[40px]">
            Mērv.
          </span>
        )}
      </div>
    </div>
  );
}
