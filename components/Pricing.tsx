"use client";

import { useState } from "react";
import { FadeUp } from "./FadeUp";
import { trackCtaClick, type CtaLocation } from "@/lib/analytics";
import { useSectionView } from "./analytics/useSectionView";

type PlanKey = "starter" | "professional" | "enterprise";

type Plan = {
  key: PlanKey;
  label: string;
  name: string;
  cta: string;
  price: number;
  audience: string;
  roi: string;
  features: string[];
  ctaLocation: CtaLocation;
};

const PLANS: Plan[] = [
  {
    key: "starter",
    label: "Mazam uzņēmumam",
    name: "Starter",
    cta: "Pieprasi demo",
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
    ctaLocation: "pricing_sakums",
  },
  {
    key: "professional",
    label: "Augošajam",
    name: "Professional",
    cta: "Pieprasi demo",
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
    ctaLocation: "pricing_razotne",
  },
];

function recommendFor(employees: number): PlanKey {
  if (employees <= 10) return "starter";
  if (employees <= 30) return "professional";
  return "enterprise";
}

export function Pricing() {
  const sectionRef = useSectionView<HTMLElement>("viewed_pricing");
  const [employees, setEmployees] = useState(10);
  const recommended = recommendFor(employees);
  const recommendedPlan = PLANS.find((p) => p.key === recommended)!;

  return (
    <section
      ref={sectionRef}
      id="cenas"
      className="relative pt-32 md:pt-48 lg:pt-56 pb-32 md:pb-40 border-t hairline scroll-mt-20 md:scroll-mt-24"
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
          <div className="mt-24 md:mt-32 mb-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="text-violet-500">✓</span>
              Bez ieviešanas izmaksām
            </span>
            <span aria-hidden className="inline-block h-3 w-px bg-ink/15" />
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="text-violet-500">✓</span>
              Bez gada līgumiem
            </span>
            <span aria-hidden className="inline-block h-3 w-px bg-ink/15" />
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="text-violet-500">✓</span>
              Atcel jebkurā brīdī
            </span>
          </div>
        </FadeUp>

        {/* ── C.5 TIER RECOMMENDER ─────────────────────────────── */}
        <FadeUp delay={0.18}>
          <PlanRecommender
            employees={employees}
            onChange={setEmployees}
            recommended={recommendedPlan}
          />
        </FadeUp>

        {/* ── D. THREE PLAN COLUMNS ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/[0.08]">
          {PLANS.map((plan, i) => (
            <FadeUp key={plan.key} delay={0.2 + i * 0.1}>
              <PlanColumn plan={plan} isRecommended={plan.key === recommended} />
            </FadeUp>
          ))}
        </div>

        {/* ── E. RISK REVERSAL FOOTER ───────────────────────────── */}
        <FadeUp delay={0.5}>
          <div className="mt-24 md:mt-32">
            <div className="border-t hairline" />
            <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted text-center pt-6 leading-relaxed">
              Bez gada līgumiem  ·  Atcel jebkurā brīdī  ·  25 min demo · WhatsApp vai e-pasts
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

function PlanColumn({ plan, isRecommended }: { plan: Plan; isRecommended: boolean }) {
  const priceWeight = isRecommended ? "font-medium" : "font-normal";

  return (
    <div
      className={`relative bg-paper py-12 md:py-10 px-6 md:px-8 transition-opacity duration-300 ${
        isRecommended ? "opacity-100" : "opacity-70"
      }`}
    >
      {isRecommended && (
        <span
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-[2px] gradient-bg"
        />
      )}

      <div
        className={`mono text-[11px] uppercase tracking-[0.18em] flex items-center gap-2 ${
          isRecommended ? "text-ink font-semibold" : "text-muted"
        }`}
      >
        {isRecommended && (
          <span aria-hidden className="inline-block h-px w-5 bg-ink/60" />
        )}
        {isRecommended && <span aria-hidden>★</span>}
        {isRecommended ? "Tev der" : plan.label}
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

/* ───────────────────────────────────────────────────────────
   PLAN RECOMMENDER
   ─────────────────────────────────────────────────────────── */

function PlanRecommender({
  employees,
  onChange,
  recommended,
}: {
  employees: number;
  onChange: (n: number) => void;
  recommended: Plan;
}) {
  const clamp = (n: number) => Math.min(150, Math.max(1, n));
  return (
    <div className="mb-6 md:mb-8 border-y hairline">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-8 py-5 md:py-6">
        <div className="flex items-baseline gap-4 md:gap-5">
          <label className="mono text-[11px] uppercase tracking-[0.18em] text-muted shrink-0">
            Tavā uzņēmumā strādā
          </label>
          <div className="flex items-baseline gap-2">
            <button
              type="button"
              onClick={() => onChange(clamp(employees - 1))}
              aria-label="Mazāk cilvēku"
              className="mono text-[18px] text-muted hover:text-ink transition-colors w-6 h-6 flex items-center justify-center"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              max={150}
              step={1}
              value={employees}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (Number.isFinite(v)) onChange(clamp(v));
              }}
              className="mono tabular-nums text-[2rem] md:text-[2.5rem] leading-none tracking-[-0.03em] text-ink bg-transparent border-0 focus:outline-none w-[4ch] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
            />
            <span className="mono text-[12px] text-muted">cilvēki</span>
            <button
              type="button"
              onClick={() => onChange(clamp(employees + 1))}
              aria-label="Vairāk cilvēku"
              className="mono text-[18px] text-muted hover:text-ink transition-colors w-6 h-6 flex items-center justify-center ml-1"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-baseline gap-3 md:text-right md:ml-auto" aria-live="polite">
          <span aria-hidden className="hidden md:inline-block h-px w-8 bg-ink/25" />
          <span className="mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Tev der
          </span>
          <span className="text-[18px] md:text-[20px] tracking-tight text-ink font-medium">
            {recommended.name}
          </span>
          <span className="mono text-[13px] tabular-nums text-muted">
            €{recommended.price}/mēn
          </span>
        </div>
      </div>
    </div>
  );
}
