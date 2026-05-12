"use client";

import { useEffect, useState } from "react";
import { trackCtaClick, trackWhatsAppClick } from "@/lib/analytics";
import { getWhatsAppUrl } from "@/lib/whatsapp";

// Threshold (in viewport heights) below which the bar stays hidden.
// 0.6vh = "user has scrolled past the hero text" on most phones, so the
// bar only appears after they've engaged with the page.
const REVEAL_AT = 0.6;

export function StickyMobileCTA() {
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [demoInView, setDemoInView] = useState(false);
  const whatsAppUrl = getWhatsAppUrl();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reveal once the user has scrolled past the hero opener.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => {
      const triggered = window.scrollY > window.innerHeight * REVEAL_AT;
      setRevealed((prev) => (prev === triggered ? prev : triggered));
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  // Hide once the #demo section is on screen — the form is right there,
  // a sticky bar would just overlap it.
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

  if (!mounted) return null;

  const scrollPct = (() => {
    if (typeof window === "undefined") return 0;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    return scrollable > 0
      ? Math.round((window.scrollY / scrollable) * 100)
      : 0;
  });

  const hidden = !revealed || demoInView;

  return (
    <div
      role="region"
      aria-label="Tūlītēja darbība"
      aria-hidden={hidden}
      className={`md:hidden fixed inset-x-0 bottom-0 z-30 transition-transform duration-300 ease-out ${
        hidden ? "translate-y-full pointer-events-none" : "translate-y-0"
      }`}
    >
      <div
        className="bg-paper/95 backdrop-blur-md border-t hairline px-4 pt-3 flex items-center gap-3"
        style={{
          paddingBottom: `max(0.75rem, env(safe-area-inset-bottom))`,
        }}
      >
        <a
          href="#demo"
          onClick={() => trackCtaClick("sticky_mobile")}
          className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] bg-ink text-paper px-5 py-3 rounded-full text-[14px] font-medium tracking-tight hover:opacity-90 transition-opacity"
        >
          Pieprasi demo · 25 min
          <span aria-hidden>→</span>
        </a>
        {whatsAppUrl && (
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                location: "sticky_mobile",
                scroll_position: scrollPct(),
              })
            }
            aria-label="Uzraksti WhatsApp"
            className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-paper border-2 border-ink text-ink shrink-0 hover:bg-ink hover:text-paper transition-colors"
          >
            <WhatsAppGlyph className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
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
