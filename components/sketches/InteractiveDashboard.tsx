"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Activity,
  BarChart3,
  Bell,
  Building2,
  Calendar,
  Clock,
  FileBarChart,
  FileCheck,
  FileText,
  FolderOpen,
  Layers,
  LogOut,
  Menu,
  Package,
  PackageOpen,
  Receipt,
  TrendingUp,
  Truck,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { INTER_STACK } from "./shared";
import { ProjektiPage } from "./pages/ProjektiPage";
import { NoliktavaPage } from "./pages/NoliktavaPage";
import { PavadzimesPage } from "./pages/PavadzimesPage";
import { IzdevumiPage } from "./pages/IzdevumiPage";
import { PlanotajsPage } from "./pages/PlanotajsPage";
import { MonitoringsPage } from "./pages/MonitoringsPage";
import { SutijumiPlanotajsPage } from "./pages/SutijumiPlanotajsPage";
import { KomplektacijasPage } from "./pages/KomplektacijasPage";
import { TamesPage } from "./pages/TamesPage";
import { RekiniPage } from "./pages/RekiniPage";
import { ParskatiPage } from "./pages/ParskatiPage";
import { LietotajiPage } from "./pages/LietotajiPage";
import { FailiPage } from "./pages/FailiPage";
import { PartneriPage } from "./pages/PartneriPage";
import { ParvadatajiPage } from "./pages/ParvadatajiPage";
import { TransportsPage } from "./pages/TransportsPage";
import { InstrumentiPage } from "./pages/InstrumentiPage";
import { ComingSoonPage } from "./pages/ComingSoonPage";
import { ToastNotifications } from "./ToastNotifications";
import { ParskatiHint } from "./ParskatiHint";
import { SidebarHint } from "./SidebarHint";

type Page =
  | "projekti"
  | "noliktava"
  | "pavadzimes"
  | "izdevumi"
  | "rekini"
  | "forma2"
  | "planotajs"
  | "monitorings"
  | "parskati"
  | "sutijumi-planotajs"
  | "komplektacijas"
  | "tames"
  | "lietotaji"
  | "faili"
  | "partneri"
  | "parvadataji"
  | "transports"
  | "instrumenti";

type SidebarItem = {
  label: string;
  Icon: typeof Layers;
  page: Page;
};

type SidebarSection = {
  label: string;
  items: SidebarItem[];
};

const SIDEBAR: SidebarSection[] = [
  {
    label: "Darba pārvaldība",
    items: [{ label: "Projekti", Icon: Layers, page: "projekti" }],
  },
  {
    label: "Resursi",
    items: [
      { label: "Noliktava", Icon: Package, page: "noliktava" },
      { label: "Pavadzīmes", Icon: FileText, page: "pavadzimes" },
    ],
  },
  {
    label: "Finanses",
    items: [
      { label: "Uzņēmuma izdevumi", Icon: Receipt, page: "izdevumi" },
      { label: "Izrakstītie rēķini", Icon: FileBarChart, page: "rekini" },
      { label: "Forma 2 akti", Icon: FileCheck, page: "forma2" },
    ],
  },
  {
    label: "Ražotnes noslodze",
    items: [{ label: "Plānotājs", Icon: TrendingUp, page: "planotajs" }],
  },
  {
    label: "Analītika",
    items: [
      { label: "Monitorings", Icon: Activity, page: "monitorings" },
      { label: "Pārskati", Icon: BarChart3, page: "parskati" },
    ],
  },
  {
    label: "Projektu sagatavošana",
    items: [
      { label: "Plānotājs", Icon: Calendar, page: "sutijumi-planotajs" },
      { label: "Komplektācijas veidnes", Icon: PackageOpen, page: "komplektacijas" },
      { label: "Tāmes", Icon: FileText, page: "tames" },
    ],
  },
  {
    label: "Administrācija",
    items: [
      { label: "Lietotāji", Icon: Users, page: "lietotaji" },
      { label: "Faili", Icon: FolderOpen, page: "faili" },
      { label: "Partneri", Icon: Building2, page: "partneri" },
      { label: "Pārvadātāji", Icon: Truck, page: "parvadataji" },
      { label: "Transports", Icon: Truck, page: "transports" },
      { label: "Instrumenti", Icon: Wrench, page: "instrumenti" },
    ],
  },
];

function flatLabel(page: Page): string {
  for (const section of SIDEBAR) {
    for (const item of section.items) {
      if (item.page === page) return item.label;
    }
  }
  return "";
}

const VALID_PAGES: ReadonlySet<Page> = new Set([
  "projekti",
  "noliktava",
  "pavadzimes",
  "izdevumi",
  "rekini",
  "forma2",
  "planotajs",
  "monitorings",
  "parskati",
  "sutijumi-planotajs",
  "komplektacijas",
  "tames",
  "lietotaji",
  "faili",
  "partneri",
  "parvadataji",
  "transports",
  "instrumenti",
]);

export function InteractiveDashboard() {
  const [active, setActive] = useState<Page>("projekti");
  const [hintDismissed, setHintDismissed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHintDismissed, setSidebarHintDismissed] = useState(false);

  const dismissHint = () => setHintDismissed(true);
  const dismissSidebarHint = () => setSidebarHintDismissed(true);

  const handleSelect = (page: Page) => {
    setActive(page);
    setSidebarOpen(false);
    setSidebarHintDismissed(true);
  };

  const handleOpenMobileMenu = () => {
    setSidebarOpen(true);
    setSidebarHintDismissed(true);
  };

  // Listen for external requests to switch the active page (e.g. Solution
  // module rows linking down here). Fires through a custom window event so
  // we don't need shared state across sections or URL coupling.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ page?: string }>).detail;
      const page = detail?.page;
      if (page && VALID_PAGES.has(page as Page)) {
        setActive(page as Page);
        setSidebarOpen(false);
      }
    };
    window.addEventListener("openoura:show-page", handler);
    return () => window.removeEventListener("openoura:show-page", handler);
  }, []);

  // Lock background scroll while the mobile sidebar is open.
  useEffect(() => {
    if (!sidebarOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [sidebarOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!sidebarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sidebarOpen]);

  return (
    <div className="relative w-full max-w-[1400px] mx-auto">
      <div
        className="relative w-full bg-white text-gray-900 rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
        style={{ fontFamily: INTER_STACK }}
      >
        <TopBar onOpenMenu={handleOpenMobileMenu} />
        <div className="relative flex">
          {/* Mobile backdrop */}
          {sidebarOpen && (
            <button
              type="button"
              aria-label="Aizvērt izvēlni"
              onClick={() => setSidebarOpen(false)}
              className="md:hidden absolute inset-0 bg-gray-900/40 z-10 transition-opacity duration-200"
            />
          )}
          <Sidebar
            active={active}
            onSelect={handleSelect}
            mobileOpen={sidebarOpen}
            onCloseMobile={() => setSidebarOpen(false)}
          />
          {renderPage(active, dismissHint)}
        </div>
        <ToastNotifications />
      </div>
      {active === "parskati" && !hintDismissed && (
        <ParskatiHint onDismiss={dismissHint} />
      )}
      {!sidebarHintDismissed && (
        <SidebarHint onDismiss={dismissSidebarHint} />
      )}
    </div>
  );
}

function renderPage(page: Page, onDismissHint: () => void) {
  switch (page) {
    case "projekti":
      return <ProjektiPage />;
    case "noliktava":
      return <NoliktavaPage />;
    case "pavadzimes":
      return <PavadzimesPage />;
    case "izdevumi":
      return <IzdevumiPage />;
    case "planotajs":
      return <PlanotajsPage />;
    case "monitorings":
      return <MonitoringsPage />;
    case "sutijumi-planotajs":
      return <SutijumiPlanotajsPage />;
    case "komplektacijas":
      return <KomplektacijasPage />;
    case "tames":
      return <TamesPage />;
    case "rekini":
      return <RekiniPage />;
    case "parskati":
      return <ParskatiPage onAnyRowClick={onDismissHint} />;
    case "lietotaji":
      return <LietotajiPage />;
    case "faili":
      return <FailiPage />;
    case "partneri":
      return <PartneriPage />;
    case "parvadataji":
      return <ParvadatajiPage />;
    case "transports":
      return <TransportsPage />;
    case "instrumenti":
      return <InstrumentiPage />;
    default:
      return <ComingSoonPage title={flatLabel(page)} />;
  }
}

/* ──────────────────────────────────────────────────────────
   TOP BAR
   ────────────────────────────────────────────────────────── */
function TopBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          aria-label="Atvērt izvēlni"
          onClick={onOpenMenu}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50"
        >
          <Menu className="w-5 h-5" />
        </button>
        <button
          aria-label="Aizvērt"
          className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <Image
            src="/openoura_logo.png"
            alt="OpenOura"
            width={28}
            height={34}
            priority={false}
            className="h-8 w-auto shrink-0"
          />
          <span className="text-[20px] md:text-[22px] font-semibold text-gray-900 tracking-tight leading-none">
            openoura
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <button
          aria-label="Laiks"
          className="hidden md:flex w-10 h-10 rounded-xl border border-gray-200 items-center justify-center text-gray-500 hover:bg-gray-50"
        >
          <Clock className="w-[18px] h-[18px]" />
        </button>
        <button
          aria-label="Paziņojumi"
          className="hidden md:flex relative w-10 h-10 rounded-xl border border-gray-200 items-center justify-center text-gray-500 hover:bg-gray-50"
        >
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute -top-1 -right-1 h-[18px] min-w-[22px] px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            99+
          </span>
        </button>

        <div className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-gray-200">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[12px] font-semibold"
            style={{ background: "#8B5CF6" }}
          >
            RU
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-[13px] font-medium text-gray-900">rudolfs</span>
            <span className="text-[11px] text-gray-500">Īpašnieks</span>
          </div>
        </div>

        <button
          aria-label="Iziet"
          className="hidden md:flex w-10 h-10 rounded-xl border border-gray-200 items-center justify-center text-gray-500 hover:bg-gray-50"
        >
          <LogOut className="w-[18px] h-[18px]" />
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   SIDEBAR
   ────────────────────────────────────────────────────────── */
function Sidebar({
  active,
  onSelect,
  mobileOpen,
  onCloseMobile,
}: {
  active: Page;
  onSelect: (p: Page) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  return (
    <aside
      aria-label="Moduļu izvēlne"
      className={`flex flex-col w-[260px] md:w-[240px] shrink-0 border-r border-gray-200 px-3 py-4 overflow-y-auto z-20 transition-transform duration-300 ease-out
        absolute md:relative inset-y-0 left-0
        md:translate-x-0 ${mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}`}
      style={{ background: "#F9FAFB" }}
    >
      <div className="md:hidden flex items-center justify-between pb-3 mb-2 border-b border-gray-200">
        <span className="px-2 text-[11px] font-semibold tracking-[0.05em] uppercase text-gray-400">
          Moduļi
        </span>
        <button
          type="button"
          aria-label="Aizvērt izvēlni"
          onClick={onCloseMobile}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {SIDEBAR.map((section, i) => (
        <div key={section.label} className={i === 0 ? "" : "mt-4"}>
          <div className="px-2 mb-1.5 text-[11px] font-semibold tracking-[0.05em] uppercase text-gray-400">
            {section.label}
          </div>
          {section.items.map((item) => {
            const Icon = item.Icon;
            const isActive = active === item.page;
            return (
              <button
                key={item.label}
                onClick={() => onSelect(item.page)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[14px] font-medium text-left transition-colors duration-150 ${
                  isActive
                    ? "text-violet-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                style={isActive ? { background: "#EDE9FE" } : undefined}
              >
                <Icon
                  className="w-[18px] h-[18px] shrink-0"
                  style={{ color: isActive ? "#7C3AED" : "#6B7280" }}
                />
                <span style={isActive ? { color: "#6D28D9" } : undefined}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
