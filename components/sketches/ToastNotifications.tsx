"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Info,
  type LucideIcon,
} from "lucide-react";

type ToastType = "info" | "success" | "warning" | "violet";

type Toast = {
  type: ToastType;
  title: string;
  description: string;
  time: string;
};

const TOASTS: Toast[] = [
  {
    type: "info",
    title: "Uzdevums sākts",
    description: 'Mārtiņš sāka darbu pie "Detaļu zāģēšana"',
    time: "Pirms 1 min",
  },
  {
    type: "success",
    title: "Uzdevums pabeigts",
    description: 'Edgars pabeidza "Malu līmēšana"',
    time: "Pirms 2 min",
  },
  {
    type: "warning",
    title: "Pārsniegts plānotais laiks",
    description: '"Avārijas remonts" pārsniedz plānoto laiku',
    time: "Pirms 3 min",
  },
  {
    type: "info",
    title: "Jauns pasūtījums",
    description: 'P-26.51 "Mēbeļu salons Rīga" pievienots sistēmā',
    time: "Pirms 4 min",
  },
  {
    type: "success",
    title: "Pavadzīme apstiprināta",
    description: "WDT/2026/03861 (SIA Kalnabērzs) — Pilnībā noliktavā",
    time: "Pirms 5 min",
  },
  {
    type: "violet",
    title: "AI parsēšana pabeigta",
    description: 'Rēķins no "SIA Liepkalni Pro" automātiski ievadīts',
    time: "Pirms 6 min",
  },
  {
    type: "info",
    title: "Uzdevums sākts",
    description: 'Jānis sāka darbu pie "Logu rāmju montāža"',
    time: "Pirms 7 min",
  },
  {
    type: "warning",
    title: "Zems atlikums noliktavā",
    description: "Bērza saplāksnis 18mm — atlicis tikai 6 m²",
    time: "Pirms 8 min",
  },
  {
    type: "success",
    title: "Rēķins izrakstīts",
    description: 'OO-2026-0024 SIA "Saules Stikls" — 2 643.25 EUR',
    time: "Pirms 9 min",
  },
  {
    type: "info",
    title: "Uzdevums sākts",
    description: 'Toms sāka darbu pie "Furnitūras stiprināšana"',
    time: "Pirms 10 min",
  },
  {
    type: "violet",
    title: "Sūtījums plānots",
    description: 'S-26.91 "Birojs Brīvības 85" — 15.05.2026',
    time: "Pirms 12 min",
  },
  {
    type: "warning",
    title: "Pārsniegts plānotais laiks",
    description: '"Kraušana/Izkraušana" pārsniedz plānoto laiku par 3h 43m',
    time: "Pirms 14 min",
  },
];

const TYPE_STYLES: Record<
  ToastType,
  { bg: string; fg: string; Icon: LucideIcon }
> = {
  info: { bg: "bg-blue-50", fg: "text-blue-500", Icon: Info },
  success: { bg: "bg-emerald-50", fg: "text-emerald-500", Icon: CheckCircle2 },
  warning: { bg: "bg-amber-50", fg: "text-amber-500", Icon: AlertTriangle },
  violet: { bg: "bg-violet-50", fg: "text-violet-500", Icon: Bell },
};

const ENTER_DELAY_MS = 2000;
const VISIBLE_MS = 4000;
const EXIT_MS = 300;
const GAP_MS = 800;

export function ToastNotifications() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timerId: number | undefined;
    let i = 0;

    const setLater = (fn: () => void, ms: number) => {
      timerId = window.setTimeout(() => {
        if (cancelled) return;
        fn();
      }, ms);
    };

    const showNext = () => {
      setIndex(i);
      setVisible(true);
      setLater(() => {
        setVisible(false);
        setLater(() => {
          i = (i + 1) % TOASTS.length;
          setLater(showNext, GAP_MS);
        }, EXIT_MS);
      }, VISIBLE_MS);
    };

    setLater(showNext, ENTER_DELAY_MS);

    return () => {
      cancelled = true;
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

  const toast = TOASTS[index];
  const { bg, fg, Icon } = TYPE_STYLES[toast.type];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-20 left-4 right-4 md:left-auto md:right-6 md:w-[360px] z-20"
    >
      <div
        className={`bg-white border border-gray-200 rounded-2xl p-4 shadow-xl shadow-gray-900/10 flex items-start gap-3 transition-all duration-300 ease-out motion-reduce:translate-x-0 ${
          visible
            ? "translate-x-0 opacity-100"
            : "translate-x-[400px] opacity-0"
        }`}
      >
        <div
          className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`}
        >
          <Icon className={`w-[18px] h-[18px] ${fg}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold text-gray-900 leading-tight mb-1">
            {toast.title}
          </div>
          <div className="text-[13px] text-gray-600 leading-snug line-clamp-2">
            {toast.description}
          </div>
          <div className="text-[11px] text-gray-400 mt-1.5">{toast.time}</div>
        </div>
      </div>
    </div>
  );
}
