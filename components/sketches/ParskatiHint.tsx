"use client";

import { useEffect, useState } from "react";

const AUTO_DISMISS_MS = 8000;
const EXIT_MS = 280;

const KEYFRAMES = `
@keyframes parskati-hint-enter {
  0%   { opacity: 0; transform: rotate(-4deg) scale(0.7) translateX(36px); }
  55%  { opacity: 1; transform: rotate(-4deg) scale(1.07) translateX(-3px); }
  100% { opacity: 1; transform: rotate(-4deg) scale(1) translateX(0); }
}
@keyframes parskati-hint-exit {
  from { opacity: 1; transform: rotate(-4deg) scale(1) translateX(0); }
  to   { opacity: 0; transform: rotate(-4deg) scale(0.94) translateX(14px); }
}
@keyframes parskati-hint-text-reveal {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0% 0 0); }
}
@keyframes parskati-hint-draw {
  from { stroke-dashoffset: 170; }
  to   { stroke-dashoffset: 0; }
}

.parskati-hint-enter { animation: parskati-hint-enter 0.75s cubic-bezier(0.16, 1, 0.3, 1) both; }
.parskati-hint-exit  { animation: parskati-hint-exit 0.28s ease-in both; }
.parskati-hint-text  { animation: parskati-hint-text-reveal 0.55s cubic-bezier(0.65, 0, 0.35, 1) 0.3s both; }
.parskati-hint-arrow path {
  stroke-dasharray: 170;
  animation: parskati-hint-draw 0.7s cubic-bezier(0.65, 0, 0.35, 1) 0.55s both;
}

@media (prefers-reduced-motion: reduce) {
  .parskati-hint-enter,
  .parskati-hint-exit,
  .parskati-hint-text,
  .parskati-hint-arrow path { animation: none; }
}
`;

export function ParskatiHint({ onDismiss }: { onDismiss: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setExiting(true);
      window.setTimeout(onDismiss, EXIT_MS);
    }, AUTO_DISMISS_MS);
    return () => window.clearTimeout(t);
  }, [onDismiss]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      <div
        aria-hidden
        className={`hidden lg:block absolute pointer-events-none z-20 ${
          exiting ? "parskati-hint-exit" : "parskati-hint-enter"
        }`}
        style={{
          top: "210px",
          right: "-12px",
          transformOrigin: "right center",
        }}
      >
        <div className="flex flex-col items-end gap-0">
          <span className="parskati-hint-text serif-italic text-marker text-[26px] leading-none whitespace-nowrap">
            spied uz Reini
          </span>
          <svg
            viewBox="0 0 160 80"
            className="parskati-hint-arrow scribble w-[160px] h-[80px] -mt-2 -mr-2"
            fill="none"
            stroke="#D93838"
            strokeWidth="1.8"
            aria-hidden
          >
            <path d="M 148 6 C 130 14 90 18 60 38 C 38 52 22 60 10 70 L 22 66 M 10 70 L 14 58" />
          </svg>
        </div>
      </div>
    </>
  );
}
