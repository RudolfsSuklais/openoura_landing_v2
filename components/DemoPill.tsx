"use client";

import { useEffect, useState } from "react";
import { trackCtaClick } from "@/lib/analytics";

// Once dismissed, never reappear in the same tab session. We do NOT
// persist across tabs (localStorage) — a returning visitor in a new
// session is a legitimate retargeting opportunity.
const DISMISS_KEY = "openoura_demo_pill_dismissed";

// Reveal threshold: 70% of the document scrolled. Picked deliberately —
// past the Pricing section but before FinalCTA, so the nudge lands on
// readers who got far without converting. Earlier than this and it
// interrupts the read; later and it's redundant with #demo.
const REVEAL_AT_SCROLL_PCT = 0.7;

export function DemoPill() {
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [demoInView, setDemoInView] = useState(false);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") {
        setDismissed(true);
      }
    } catch {
      // sessionStorage unavailable (private mode, etc.) — show normally
    }
  }, []);

  // Watch scroll, flip `revealed` once past the threshold. Sticky:
  // once revealed, stays revealed (until dismissed or #demo in view).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (dismissed) return;

    const check = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = window.scrollY / scrollable;
      if (pct >= REVEAL_AT_SCROLL_PCT) {
        setRevealed(true);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [dismissed]);

  // Hide whenever the #demo section is in view — the form is right
  // there, so a floating duplicate just adds noise. Same pattern as
  // WhatsAppButton / StickyMobileCTA.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof IntersectionObserver === "undefined") return;
    const target = document.getElementById("demo");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setDemoInView(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!mounted || dismissed) return null;

  const hidden = !revealed || demoInView;

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
    setDismissed(true);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dismiss();
  };

  const handleClick = () => {
    trackCtaClick("scroll_pill");
    // Don't re-nudge on backtrack — they've already engaged.
    dismiss();
  };

  return (
    <div
      aria-hidden={hidden}
      className={[
        // Desktop-only: mobile bottom is owned by StickyMobileCTA.
        "hidden md:flex fixed z-50",
        "md:bottom-[max(1.5rem,env(safe-area-inset-bottom))] md:left-[max(1.5rem,env(safe-area-inset-left))]",
        "items-center gap-2",
        "transition-[opacity,transform] duration-300 ease-out",
        hidden
          ? "opacity-0 translate-y-4 pointer-events-none"
          : "opacity-100 translate-y-0",
        reduceMotion ? "transition-none transform-none" : "",
      ].join(" ")}
    >
      <a
        href="#demo"
        onClick={handleClick}
        tabIndex={hidden ? -1 : 0}
        className={[
          "inline-flex items-center gap-2",
          "bg-ink text-paper",
          "rounded-full",
          "px-5 py-3.5",
          "text-[14px] font-medium tracking-tight",
          "shadow-[0_8px_24px_rgba(10,10,10,0.12)]",
          "hover:shadow-[0_12px_32px_rgba(10,10,10,0.18)]",
          "hover:scale-[1.04] origin-bottom-left",
          "transition-[transform,box-shadow] duration-200 ease-out",
          "focus-visible:outline-2 focus-visible:outline-ink/30 focus-visible:outline-offset-2",
          "whitespace-nowrap",
        ].join(" ")}
      >
        Pieprasi demo · 25 min
        <span aria-hidden>→</span>
      </a>
      <button
        type="button"
        onClick={handleDismiss}
        tabIndex={hidden ? -1 : 0}
        aria-label="Aizvērt"
        className={[
          "inline-flex items-center justify-center",
          "h-9 w-9 rounded-full",
          "bg-paper border border-[rgba(10,10,10,0.12)]",
          "text-muted hover:text-ink",
          "hover:border-[rgba(10,10,10,0.24)]",
          "transition-colors duration-150",
          "focus-visible:outline-2 focus-visible:outline-ink/30 focus-visible:outline-offset-2",
          "shadow-[0_4px_12px_rgba(10,10,10,0.08)]",
        ].join(" ")}
      >
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M3 3 L13 13 M13 3 L3 13" />
        </svg>
      </button>
    </div>
  );
}
