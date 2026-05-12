"use client";

import { useEffect, useState } from "react";
import { trackWhatsAppClick } from "@/lib/analytics";

// Sentinel fallback. If NEXT_PUBLIC_WHATSAPP_NUMBER is unset or still
// matches this value, the button hides itself (see below) so we never
// route real users to a nonexistent number.
const FALLBACK_PHONE = "37100000000";
const PREFILLED_MESSAGE = "Sveiks! Gribu uzzināt vairāk par OpenOura.";

// Desktop collapses the label to an icon-only circle after this much idle time
// to reduce visual fatigue for long-scroll readers.
const COLLAPSE_AFTER_MS = 30_000;

export function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const isPhoneInvalid = !phone || phone === FALLBACK_PHONE;

  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [demoInView, setDemoInView] = useState(false);

  // Respect prefers-reduced-motion — skip fade-in entirely.
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    setMounted(true);

    if (isPhoneInvalid && process.env.NODE_ENV !== "production") {
      console.warn(
        "NEXT_PUBLIC_WHATSAPP_NUMBER not set — WhatsApp button hidden",
      );
    }

    if (reduceMotion) {
      setRevealed(true);
      return;
    }
    // 600ms delay lets the hero render first, then the button appears subtly.
    const t = setTimeout(() => setRevealed(true), 600);
    return () => clearTimeout(t);
  }, [reduceMotion, isPhoneInvalid]);

  useEffect(() => {
    if (!revealed) return;
    const t = setTimeout(() => setCollapsed(true), COLLAPSE_AFTER_MS);
    return () => clearTimeout(t);
  }, [revealed]);

  // Hide the button whenever the demo form is in viewport — its
  // bottom-right position physically overlaps the form's full-width
  // submit button on mobile, and an accidental tap would steal a
  // conversion. Falls back gracefully if #demo isn't on the page.
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

  // Desktop default: expanded. Mobile: always compact (Tailwind controls
  // mobile via `md:` breakpoints in the markup). After 30s, desktop collapses
  // unless currently hovered.
  const showLabelOnDesktop = !collapsed || hovered;
  const isHidden = demoInView;

  const handleClick = () => {
    if (typeof window === "undefined") return;
    const doc = document.documentElement;
    const totalScrollable = doc.scrollHeight - window.innerHeight;
    const scrollPct =
      totalScrollable > 0
        ? Math.round((window.scrollY / totalScrollable) * 100)
        : 0;
    // Fire before opening (not awaited) so the event is captured even if
    // the tab swap interrupts JS execution.
    trackWhatsAppClick({
      location: "floating_button",
      scroll_position: scrollPct,
    });
  };

  // SSR-safe: render nothing until mounted, so hydration matches.
  if (!mounted) return null;
  // No real number configured — never expose the fake fallback to users.
  if (isPhoneInvalid) return null;

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(
    PREFILLED_MESSAGE,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Sazinies ar mums WhatsApp"
      aria-hidden={isHidden || undefined}
      tabIndex={isHidden ? -1 : 0}
      className={[
        "group fixed z-50",
        // Safe-area-aware positioning so we clear the iOS home indicator
        // (≈21–34px tall) on notched iPhones.
        "bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))]",
        "md:bottom-[max(1.5rem,env(safe-area-inset-bottom))] md:right-[max(1.5rem,env(safe-area-inset-right))]",
        "inline-flex items-center justify-center gap-3",
        "bg-ink text-paper",
        "rounded-full",
        "shadow-[0_8px_24px_rgba(10,10,10,0.12)]",
        "hover:shadow-[0_12px_32px_rgba(10,10,10,0.18)]",
        "hover:scale-[1.04] origin-bottom-right",
        "transition-[transform,box-shadow,opacity] duration-200 ease-out",
        "focus-visible:outline-2 focus-visible:outline-ink/30 focus-visible:outline-offset-2",
        // Mobile: always compact 56x56 circle.
        "h-14 w-14 p-0",
        // Desktop: depending on collapsed state, expand to pill or stay 56x56.
        showLabelOnDesktop
          ? "md:h-auto md:w-auto md:px-5 md:py-3.5"
          : "md:h-14 md:w-14 md:p-0",
        // Visibility: hidden when #demo is in viewport, else respect reveal delay.
        isHidden
          ? "opacity-0 pointer-events-none"
          : revealed
          ? "opacity-100"
          : "opacity-0 pointer-events-none",
        reduceMotion ? "transition-none" : "",
      ].join(" ")}
    >
      <WhatsAppGlyph
        className={[
          "shrink-0 text-paper",
          // Mobile: always 22px (compact circle). Desktop: 18px when expanded
          // pill, 22px when collapsed circle.
          "h-[22px] w-[22px]",
          showLabelOnDesktop
            ? "md:h-[18px] md:w-[18px]"
            : "md:h-[22px] md:w-[22px]",
        ].join(" ")}
      />
      {/* Label only on desktop when expanded. Hidden on mobile entirely. */}
      <span
        className={[
          "hidden",
          showLabelOnDesktop ? "md:inline" : "md:hidden",
          "text-[14px] font-medium tracking-tight text-paper",
          "whitespace-nowrap",
        ].join(" ")}
      >
        Sazinies WhatsApp
      </span>
    </a>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  // Monochromatic WhatsApp glyph — no green, pure currentColor (set to paper).
  // Path simplified from the canonical WhatsApp speech-bubble-with-handset.
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M27.18 4.78A15.86 15.86 0 0 0 16 .25C7.27.25.18 7.34.18 16.06c0 2.79.73 5.5 2.11 7.9L0 31.75l7.97-2.08a15.85 15.85 0 0 0 8.03 2.16h.01c8.72 0 15.81-7.09 15.81-15.8 0-4.22-1.64-8.19-4.64-11.25Zm-11.18 24.3a13.1 13.1 0 0 1-6.7-1.83l-.48-.28-4.73 1.23 1.26-4.6-.32-.49a13.06 13.06 0 0 1-2-6.95c0-7.25 5.91-13.13 13.18-13.13a13.1 13.1 0 0 1 13.18 13.13c0 7.24-5.91 13.12-13.39 13.12Zm7.21-9.83c-.39-.2-2.34-1.15-2.7-1.29-.36-.13-.62-.2-.89.2-.27.39-1.02 1.29-1.25 1.55-.23.27-.46.3-.86.1-.39-.2-1.66-.61-3.17-1.95a11.93 11.93 0 0 1-2.2-2.73c-.23-.39-.02-.6.17-.8.18-.18.39-.46.59-.69.2-.23.27-.39.4-.66.13-.27.06-.5-.03-.69-.1-.2-.89-2.14-1.22-2.93-.32-.77-.65-.66-.89-.68-.23-.01-.5-.01-.76-.01-.27 0-.7.1-1.07.5s-1.4 1.36-1.4 3.33c0 1.96 1.43 3.86 1.63 4.13.2.27 2.82 4.32 6.84 6.05.96.41 1.7.65 2.28.84.96.31 1.83.27 2.52.16.77-.11 2.34-.96 2.67-1.88.33-.92.33-1.71.23-1.88-.1-.16-.36-.27-.76-.46Z" />
    </svg>
  );
}
