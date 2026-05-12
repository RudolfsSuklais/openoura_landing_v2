"use client";

import { FadeUp } from "./FadeUp";
import { trackCtaClick, type CtaLocation } from "@/lib/analytics";
import { useSectionView } from "./analytics/useSectionView";

type Plan = {
  key: "starter" | "professional" | "enterprise";
  label: string;
  name: string;
  cta: string;
  price: number;
  audience: string;
  roi: string;
  features: string[];
  recommended: boolean;
  ctaLocation: CtaLocation;
};

const PLANS: Plan[] = [
  {
    key: "starter",
    label: "Mazam uzņēmumam",
    name: "Starter",
    cta: "14 dienu izmēģinājums",
    price: 69,
    audience: "Mazākiem ražotājiem · līdz 10 lietotājiem",
    roi: "Atpelnās aptuveni 14 stundu ietaupījumā mēnesī.",
    features: [
      "10 lietotāji",
      "50 projekti",
      "5 GB failu glabātuve",
      "Noliktava un atskaites",
      "Darbinieku laika uzskaite",
      "100 AI pavadzīmes/mēn",
    ],
    recommended: false,
    ctaLocation: "pricing_sakums",
  },
  {
    key: "professional",
    label: "Populārākais",
    name: "Professional",
    cta: "14 dienu izmēģinājums",
    price: 199,
    audience: "Augošiem uzņēmumiem · līdz 30 lietotājiem",
    roi: "Atpelnās ar plānotāju un reāllaika monitoringu.",
    features: [
      "30 lietotāji",
      "100 projekti",
      "20 GB failu glabātuve",
      "Viss no Starter +",
      "Reāllaika monitorings",
      "Plānotājs un Tāmes",
      "CMR pavadzīmes",
      "1000 AI pavadzīmes/mēn",
    ],
    recommended: true,
    ctaLocation: "pricing_cehs",
  },
  {
    key: "enterprise",
    label: "Bez limitiem",
    name: "Enterprise",
    cta: "Sazināties",
    price: 499,
    audience: "Lielajiem · neierobežoti lietotāji, vairākas ražotnes",
    roi: "Atpelnās ar pilnu komandas redzamību.",
    features: [
      "Neierobežoti lietotāji",
      "Neierobežoti projekti",
      "100 GB failu glabātuve",
      "Viss no Professional +",
      "5000 AI pavadzīmes/mēn",
      "Prioritārais atbalsts",
    ],
    recommended: false,
    ctaLocation: "pricing_razotne",
  },
];

export function Pricing() {
  const sectionRef = useSectionView<HTMLElement>("viewed_pricing");

  return (
    <section
      ref={sectionRef}
      id="cenas"
      className="relative pt-32 md:pt-48 lg:pt-56 pb-32 md:pb-40 border-t hairline"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-page px-6 md:px-10">
        {/* ── A. SECTION HEADER ─────────────────────────────────── */}
        <FadeUp>
          <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted mb-12 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-ink/40" />
            Cenas · 07
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h2
            id="pricing-heading"
            className="font-medium leading-[0.9] tracking-[-0.04em] text-ink text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem]"
          >
            <span className="block">Vienkāršas cenas.</span>
            <span className="block">
              <span className="serif-italic gradient-text">Bez pārsteigumiem</span>
              .
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mt-8 max-w-[44ch] text-[17px] md:text-[20px] leading-[1.45] text-ash">
            Trīs plāni, viena cena katram līmenim. Bez ieviešanas izmaksām,
            bez konsultantu rēķiniem, bez gada līgumiem. Tu zini, cik cilvēku
            tev strādā — izvēlies pats.
          </p>
        </FadeUp>

        {/* ── B. ANTI-ERP CONTEXT BAR ───────────────────────────── */}
        <FadeUp delay={0.1}>
          <div className="mt-20 md:mt-28 border-y hairline">
            {/* Row 1: classical ERP (muted) */}
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-6 py-5 border-b hairline">
              <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted shrink-0">
                Klasiskais ERP
              </div>
              <div className="mono text-[14px] text-muted md:text-right">
                €15,000–€50,000 sākotnēji  ·  +6 mēneši ieviešana  ·  +konsultanti
              </div>
            </div>
            {/* Row 2: OpenOura (full contrast) */}
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-6 py-5">
              <div className="mono text-[11px] uppercase tracking-[0.18em] text-ink shrink-0">
                OpenOura
              </div>
              <div className="mono text-[14px] text-ink md:text-right">
                no €69/mēnesī  ·  šodien  ·  bez konsultantiem
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ── C. TRUST STRIP ───────────────────────────────────── */}
        <FadeUp delay={0.15}>
          <div className="mt-24 md:mt-32 mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="text-violet-500">✓</span>
              Bez kredītkartes
            </span>
            <span aria-hidden className="inline-block h-3 w-px bg-ink/15" />
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="text-violet-500">✓</span>
              Bez saistībām
            </span>
            <span aria-hidden className="inline-block h-3 w-px bg-ink/15" />
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="text-violet-500">✓</span>
              Atcel jebkurā brīdī
            </span>
          </div>
        </FadeUp>

        {/* ── D. THREE PLAN COLUMNS ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/[0.08]">
          {PLANS.map((plan, i) => (
            <FadeUp key={plan.key} delay={0.2 + i * 0.1}>
              <PlanColumn plan={plan} />
            </FadeUp>
          ))}
        </div>

        {/* ── E. RISK REVERSAL FOOTER ───────────────────────────── */}
        <FadeUp delay={0.5}>
          <div className="mt-24 md:mt-32">
            <div className="border-t hairline" />
            <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted text-center pt-6 leading-relaxed">
              Bez gada līgumiem  ·  Atcel jebkurā brīdī  ·  14 dienas bezmaksas
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────
   PLAN COLUMN
   ─────────────────────────────────────────────────────────── */

function PlanColumn({ plan }: { plan: Plan }) {
  const priceWeight = plan.recommended ? "font-medium" : "font-normal";

  return (
    <div className="relative bg-paper py-12 md:py-10 px-6 md:px-8">
      {plan.recommended && (
        <span
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-[2px] gradient-bg"
        />
      )}

      <div
        className={`mono text-[11px] uppercase tracking-[0.18em] flex items-center gap-2 ${
          plan.recommended ? "text-ink font-semibold" : "text-muted"
        }`}
      >
        {plan.recommended && (
          <span aria-hidden className="inline-block h-px w-5 bg-ink/60" />
        )}
        {plan.recommended && <span aria-hidden>★</span>}
        {plan.label}
      </div>

      <div className="mt-3 font-serif text-[3rem] md:text-[3.5rem] leading-[0.95] text-ink">
        {plan.name}
      </div>

      <div className="mt-6 flex items-baseline gap-2">
        <span className={`text-[3.5rem] leading-none tracking-tight text-ink ${priceWeight}`}>
          €{plan.price}
        </span>
        <span className="mono text-[14px] text-muted">/ mēn.</span>
      </div>

      <div className="mt-4 text-[14px] text-ash">{plan.audience}</div>

      <p className="mt-6 serif-italic text-[16px] leading-[1.35] text-ink max-w-[32ch]">
        {plan.roi}
      </p>

      <div className="mt-8 mb-8 border-t hairline" />

      <ul className="space-y-2.5">
        {plan.features.map((feat) => (
          <li
            key={feat}
            className="flex items-baseline gap-2 text-[14px] leading-relaxed text-ash"
          >
            <span aria-hidden className="text-muted/70 shrink-0">—</span>
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <a
          href="#demo"
          onClick={() => trackCtaClick(plan.ctaLocation)}
          className="group inline-flex items-center justify-center gap-2 bg-ink text-paper px-5 py-3.5 rounded-full text-[14px] font-medium tracking-tight hover:opacity-90 transition-opacity"
        >
          {plan.cta}
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </a>
      </div>
    </div>
  );
}
