"use client";

import { useEffect, useState } from "react";

const AUTO_DISMISS_MS = 12000;
const EXIT_MS = 280;

const KEYFRAMES = `
@keyframes sidebar-hint-enter {
  0%   { opacity: 0; transform: rotate(-4deg) scale(0.7) translateY(-12px); }
  55%  { opacity: 1; transform: rotate(-4deg) scale(1.06) translateY(2px); }
  100% { opacity: 1; transform: rotate(-4deg) scale(1) translateY(0); }
}
@keyframes sidebar-hint-exit {
  from { opacity: 1; transform: rotate(-4deg) scale(1) translateY(0); }
  to   { opacity: 0; transform: rotate(-4deg) scale(0.94) translateY(-6px); }
}
@keyframes sidebar-hint-text-reveal {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0% 0 0); }
}
@keyframes sidebar-hint-draw {
  from { stroke-dashoffset: 240; }
  to   { stroke-dashoffset: 0; }
}

.sidebar-hint-enter { animation: sidebar-hint-enter 0.75s cubic-bezier(0.16, 1, 0.3, 1) both; }
.sidebar-hint-exit  { animation: sidebar-hint-exit 0.28s ease-in both; }
.sidebar-hint-text  { animation: sidebar-hint-text-reveal 0.55s cubic-bezier(0.65, 0, 0.35, 1) 0.35s both; }
.sidebar-hint-arrow path {
  stroke-dasharray: 240;
  animation: sidebar-hint-draw 0.7s cubic-bezier(0.65, 0, 0.35, 1) 0.65s both;
}

@media (prefers-reduced-motion: reduce) {
  .sidebar-hint-enter,
  .sidebar-hint-exit,
  .sidebar-hint-text,
  .sidebar-hint-arrow path { animation: none; }
}
`;

export function SidebarHint({ onDismiss }: { onDismiss: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setExiting(true);
      window.setTimeout(onDismiss, EXIT_MS);
    }, AUTO_DISMISS_MS);
    return () => window.clearTimeout(t);
  }, [onDismiss]);

  const animClass = exiting ? "sidebar-hint-exit" : "sidebar-hint-enter";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* ── Desktop: text + arrow OUTSIDE dashboard on the left, points right into sidebar ── */}
      <div
        aria-hidden
        className={`hidden md:block absolute pointer-events-none z-20 ${animClass}`}
        style={{
          top: "92px",
          right: "calc(100% + 8px)",
          transformOrigin: "right top",
        }}
      >
        <div className="flex flex-col items-end gap-0">
          <span className="sidebar-hint-text serif-italic text-marker text-[26px] lg:text-[30px] leading-none whitespace-nowrap pr-6">
            klikšķini moduli
          </span>
          <svg
            viewBox="0 0 220 110"
            className="sidebar-hint-arrow scribble w-[220px] h-[110px] -mt-1"
            fill="none"
            stroke="#D93838"
            strokeWidth="1.8"
            aria-hidden
          >
            <path d="M 18 8 C 56 22 104 36 152 52 C 176 60 196 76 212 94 L 198 92 M 212 94 L 206 80" />
          </svg>
        </div>
      </div>

      {/* ── Mobile: arrow points up-left at hamburger, text below ─────── */}
      <div
        aria-hidden
        className={`md:hidden absolute pointer-events-none z-20 ${animClass}`}
        style={{
          top: "20px",
          left: "44px",
          transformOrigin: "left top",
        }}
      >
        <div className="flex flex-col items-start gap-0">
          <svg
            viewBox="0 0 130 70"
            className="sidebar-hint-arrow scribble w-[130px] h-[70px]"
            fill="none"
            stroke="#D93838"
            strokeWidth="1.8"
            aria-hidden
          >
            <path d="M 120 64 C 90 48 60 32 32 18 C 22 13 16 10 8 6 L 18 12 M 8 6 L 6 18" />
          </svg>
          <span className="sidebar-hint-text serif-italic text-marker text-[22px] leading-none whitespace-nowrap -mt-1 ml-12">
            atver moduļus
          </span>
        </div>
      </div>
    </>
  );
}
