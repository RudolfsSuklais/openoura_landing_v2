"use client";

import dynamic from "next/dynamic";
import { FadeUp } from "./FadeUp";
import { Arrow } from "./Arrow";
import { DashboardSkeleton } from "./sketches/DashboardSkeleton";
import { LiveTicker } from "./LiveTicker";
import { trackCtaClick, trackWhatsAppClick } from "@/lib/analytics";
import { getWhatsAppUrl } from "@/lib/whatsapp";

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
    <section className="gb-hero overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-40 md:pb-52">
      {/* ── ambient layers — one asymmetric glow, filmic grain ──── */}
      <div aria-hidden className="gb-noise" />
      <div
        aria-hidden
        className="gb-aura"
        style={{
          top: "-180px",
          left: "-80px",
          width: "780px",
          height: "700px",
          background:
            "radial-gradient(closest-side, rgba(139,92,246,0.26), rgba(139,92,246,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="gb-aura"
        style={{
          top: "220px",
          right: "-120px",
          width: "560px",
          height: "520px",
          background:
            "radial-gradient(closest-side, rgba(236,72,153,0.12), rgba(236,72,153,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-page px-6 md:px-10">
        {/* ── LEDGER BAR ─────────────────────────────────────────── */}
        <FadeUp>
          <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-6">
            <div className="mono flex items-center gap-3 pt-0.5 text-[11px] uppercase tracking-[0.18em] text-white/50">
              <span className="inline-block h-px w-8 bg-white/25" />
              Manifests · 01
            </div>
            <div className="mono hidden text-right text-[11px] uppercase leading-[1.7] tracking-[0.18em] text-white/40 sm:block">
              <div>Nr. 001</div>
              <div>04.07.2026</div>
              <div>Liepāja, LV</div>
            </div>
          </div>
        </FadeUp>

        {/* ── HEADLINE + MARKER ─────────────────────────────────── */}
        <div className="relative mt-12 w-fit max-w-full md:mt-16">
          <FadeUp delay={0.05}>
            <h1 className="font-medium leading-[0.9] tracking-[-0.04em] text-white text-[3.25rem] sm:text-[5rem] md:text-[6rem] lg:text-[7.5rem]">
              <span className="block">Excel ir tavs</span>
              <span className="block">
                <span className="serif-italic gradient-text">sliktākais</span>{" "}
                <span className="text-white/85">darbinieks</span>
              </span>
            </h1>
          </FadeUp>

          {/* red marker scrawl — desktop only, hangs off the top-right */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-40px] top-[-18px] hidden w-[210px] lg:block xl:right-[-90px]"
          >
            <span className="serif-italic block -rotate-[6deg] text-[27px] leading-[1.05] text-marker">
              tā nu gan —
              <br />
              atlaid to.
            </span>
            <Arrow
              variant={3}
              rotate={125}
              className="ml-8 mt-1 h-10 w-[120px]"
            />
          </div>
        </div>

        {/* ── SUBHEAD ────────────────────────────────────────────── */}
        <FadeUp delay={0.15}>
          <p className="mt-10 max-w-[42ch] text-[17px] leading-[1.5] text-white/55 md:mt-12 md:text-[20px]">
            OpenOura —{" "}
            <span className="text-white/90">vienkārša ražošanas vadība</span>{" "}
            Latvijas mazajiem ražotājiem. Bez ieviešanas projekta. Bez
            konsultantiem. Bez Excel.
          </p>
        </FadeUp>

        {/* ── CTAs ───────────────────────────────────────────────── */}
        <FadeUp delay={0.25}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="#demo"
              onClick={() => trackCtaClick("hero")}
              className="group inline-flex items-center justify-center gap-2 self-start rounded-full bg-white px-6 py-3.5 text-[15px] font-medium tracking-tight text-[#09090e] transition-transform hover:-translate-y-0.5"
            >
              Pieprasi demo
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
            <HeroWhatsAppLink />
          </div>
          <div className="mono mt-4 text-[11px] uppercase tracking-[0.15em] text-white/35">
            25 min · bez maksas · bez saistībām
          </div>
        </FadeUp>

        {/* ── LIVE TICKER ────────────────────────────────────────── */}
        <FadeUp delay={0.4}>
          <div className="mt-14 max-w-[640px]">
            <LiveTicker variant="dark" />
          </div>
        </FadeUp>
      </div>

      {/* ── PRODUCT MOCKUP — tilted, framed, annotated ──────────── */}
      <div
        id="dashboard"
        className="relative mx-auto mt-20 max-w-page px-6 scroll-mt-24 md:mt-28 md:px-10"
      >
        <div
          aria-hidden
          className="gb-aura"
          style={{
            top: "-20px",
            left: "50%",
            width: "860px",
            height: "520px",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(closest-side, rgba(139,92,246,0.2), rgba(139,92,246,0) 72%)",
          }}
        />

        {/* marker: "this is real — click it" pointing into the frame */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-8 top-[-72px] z-10 hidden w-[240px] lg:block"
        >
          <span className="serif-italic block -rotate-2 text-[23px] leading-[1.1] text-marker">
            īsts dashboard —
            <br />
            spied, tas strādā.
          </span>
          <Arrow variant={1} rotate={34} className="ml-10 mt-1 h-9 w-[120px]" />
        </div>

        <FadeUp delay={0.3}>
          <div className="relative mx-auto max-w-[1200px] rotate-0 md:rotate-[0.5deg]">
            <div className="relative rounded-[18px] border border-white/10 bg-white/[0.04] p-1.5 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0d12]">
                {/* browser chrome */}
                <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="mx-auto flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className="text-white/30"
                    >
                      <path
                        d="M6 10V8a6 6 0 1 1 12 0v2M5 10h14v10H5z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="mono text-[11px] tracking-tight text-white/45">
                      app.openoura.com/projekti
                    </span>
                  </div>
                  <div className="w-14" aria-hidden />
                </div>

                {/* the real product, presented as a screenshot */}
                <div className="relative min-h-[700px] bg-white md:min-h-[800px]">
                  <InteractiveDashboard />
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ── FOOTER LEDGER ─────────────────────────────────────── */}
        <FadeUp delay={0.5}>
          <div className="mt-14 flex items-center justify-between gap-6">
            <div className="mono flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
              <span className="inline-block h-px w-6 bg-white/25" />
              Ritini ↓ vairāk
            </div>
            <div className="mono hidden text-[10px] uppercase tracking-[0.18em] text-white/30 sm:block">
              Made in Liepāja
            </div>
          </div>
        </FadeUp>
      </div>

      {/* seam back into the paper page below */}
      <div aria-hidden className="gb-seam" />
    </section>
  );
}

function HeroWhatsAppLink() {
  const url = getWhatsAppUrl();
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick({ location: "hero", scroll_position: 0 })}
      className="group inline-flex items-baseline gap-2 self-start text-[15px] text-white/55 transition-colors hover:text-white"
    >
      <span>Vai vienkārši uzraksti</span>
      <span className="font-medium text-white underline decoration-white/30 underline-offset-4 transition group-hover:decoration-white">
        WhatsApp
      </span>
      <span
        aria-hidden
        className="transition-transform group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}
