"use client";

import dynamic from "next/dynamic";
import { FadeUp } from "./FadeUp";
import { DashboardSkeleton } from "./sketches/DashboardSkeleton";
import { LiveTicker } from "./LiveTicker";
import { trackCtaClick } from "@/lib/analytics";

const InteractiveDashboard = dynamic(
  () =>
    import("./sketches/InteractiveDashboard").then((m) => ({
      default: m.InteractiveDashboard,
    })),
  {
    ssr: true,
    loading: () => <DashboardSkeleton />,
  }
);

export function Hero() {
  return (
    <section className="relative pt-20 sm:pt-28 md:pt-36 lg:pt-44 pb-24 md:pb-36 overflow-hidden">
      {/* ── TEXT BLOCK ────────────────────────────────────────────── */}
      <div className="mx-auto max-w-page px-6 md:px-10">
        <FadeUp>
          <div className="mb-10 md:mb-14 flex items-start justify-between gap-6">
            <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted flex items-center gap-3 pt-0.5">
              <span className="inline-block h-px w-8 bg-ink/40" />
              Manifests · 01
            </div>
            <div className="hidden sm:block text-right mono text-[11px] uppercase tracking-[0.18em] text-muted leading-[1.7]">
              <div>Nr. 001</div>
              <div>11.05.2026</div>
              <div>Liepāja, LV</div>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h1 className="font-medium leading-[0.9] tracking-[-0.04em] text-ink text-[3.25rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem]">
            <span className="block">Excel ir tavs</span>
            <span className="block">
              <span className="serif-italic gradient-text">sliktākais</span>{" "}
              <span>darbinieks</span>
            </span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.15}>
          <p className="mt-10 md:mt-12 max-w-[36ch] md:max-w-[42ch] lg:max-w-[46ch] text-[17px] md:text-[20px] leading-[1.45] text-ash">
            OpenOura — <span className="text-ink">vienkārša ražošanas vadība</span>{" "}
            Latvijas mazajiem ražotājiem. Bez ieviešanas projekta. Bez konsultantiem.
            Bez Excel.
          </p>
        </FadeUp>

        <FadeUp delay={0.25}>
          <div className="mt-10">
            <a
              href="#demo"
              onClick={() => trackCtaClick("hero")}
              className="group inline-flex items-center justify-center gap-2 bg-ink text-paper px-5 py-3.5 rounded-full text-[14px] font-medium tracking-tight hover:opacity-90 transition-opacity"
            >
              Pieprasi demo
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <div className="mt-3 mono text-[11px] uppercase tracking-[0.15em] text-muted">
              25 min · bez maksas · bez saistībām · WhatsApp vai e-pasts
            </div>
          </div>
        </FadeUp>

        {/* ── SOCIAL PROOF ───────────────────────────────────────── */}
        <FadeUp delay={0.4}>
          <div className="mt-16 md:mt-24 pt-7 border-t hairline">
            <div className="flex items-center gap-5 mb-6">
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted">
                Pirmais klients
              </div>
              <span className="h-px flex-1 bg-ink/[0.08]" />
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <div className="inline-flex items-center border hairline rounded-md px-3 py-2 text-ash">
                <span className="text-[13px] font-medium tracking-[0.04em]">FINESTRA</span>
              </div>
              <span className="mono text-[12px] text-muted">
                Liepāja · ražo logus un durvis · kopš 2025
              </span>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* ── LIVE TICKER — Finestra activity sample, ties social proof to dashboard ── */}
      <div className="mx-auto max-w-page px-6 md:px-10 mt-12 md:mt-16">
        <FadeUp delay={0.45}>
          <LiveTicker />
        </FadeUp>
      </div>

      {/* ── PROJEKTI DASHBOARD BELOW TEXT, FULL WIDTH, SLIGHTLY TILTED ──────────── */}
      <div
        id="dashboard"
        className="mx-auto max-w-page px-6 md:px-10 mt-10 md:mt-14 lg:mt-16 scroll-mt-20 md:scroll-mt-24"
      >
        <FadeUp delay={0.3}>
          <div className="relative rotate-0 md:rotate-[0.6deg] min-h-[700px] md:min-h-[800px]">
            <InteractiveDashboard />
          </div>
        </FadeUp>
      </div>

      {/* ── SCROLL HINT — replaces previous '01' numeral ─────────── */}
      <div className="mx-auto max-w-page px-6 md:px-10 mt-12 md:mt-20">
        <FadeUp delay={0.5}>
          <div className="flex items-center justify-between gap-6">
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-muted flex items-center gap-3">
              <span className="inline-block h-px w-6 bg-ink/30" />
              Ritini ↓ vairāk
            </div>
            <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted hidden sm:block">
              Made in Liepāja
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
