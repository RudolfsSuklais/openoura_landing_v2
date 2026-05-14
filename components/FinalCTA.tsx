"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { FadeUp } from "./FadeUp";
import { demoRequestAction } from "@/app/actions/demo-request";
import {
  readSourceCtaFromHash,
  trackFormError,
  trackFormStarted,
  trackFormSubmitted,
} from "@/lib/analytics";
import { trackLead } from "@/lib/meta-pixel";
import { useSectionView } from "./analytics/useSectionView";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  employees: string;
};

const INITIAL: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  employees: "",
};

const SAVINGS_KEY = "openoura:projected_savings";
const SAVINGS_EVENT = "openoura:savings-updated";

export function FinalCTA() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");
  const [submitted, setSubmitted] = useState<FormState | null>(null);
  const [isPending, startTransition] = useTransition();
  const [projectedSavings, setProjectedSavings] = useState<number | null>(null);
  const formStartedRef = useRef(false);
  const sectionRef = useSectionView<HTMLElement>("viewed_demo_form");

  // Read the visitor's calculator projection (if any) and listen for live
  // updates while they're still on the page.
  useEffect(() => {
    const read = (raw: string | null) => {
      if (!raw) return null;
      const v = Number(raw);
      return Number.isFinite(v) && v > 0 ? v : null;
    };
    try {
      setProjectedSavings(read(sessionStorage.getItem(SAVINGS_KEY)));
    } catch {
      // ignore — storage unavailable
    }
    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent<{ value: number }>).detail;
      setProjectedSavings(
        typeof detail?.value === "number" && detail.value > 0
          ? detail.value
          : null,
      );
    };
    window.addEventListener(SAVINGS_EVENT, onUpdate);
    return () => window.removeEventListener(SAVINGS_EVENT, onUpdate);
  }, []);

  const fireFormStartedOnce = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackFormStarted();
  };

  const updateField =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      fireFormStartedOnce();
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setGeneralError("");
    const formEl = e.currentTarget;
    const sourceCta = readSourceCtaFromHash();
    startTransition(async () => {
      let result;
      try {
        result = await demoRequestAction(new FormData(formEl));
      } catch {
        trackFormError("network");
        setGeneralError(
          "Tīkla kļūda. Pārbaudi savienojumu vai raksti tieši: rudolfs@openoura.com",
        );
        return;
      }
      if (result.success) {
        const employees = form.employees as
          | "1-5"
          | "6-15"
          | "16-30"
          | "30+";
        trackFormSubmitted({
          email: form.email,
          name: form.name,
          company: form.company,
          employees,
          has_phone: form.phone.trim().length > 0,
          source_cta: sourceCta,
        });

        const [firstName, ...rest] = form.name.trim().split(/\s+/);
        trackLead(
          {
            content_name: "demo_request",
            ...(projectedSavings
              ? { value: projectedSavings, currency: "EUR" }
              : {}),
          },
          {
            email: form.email,
            phone: form.phone.trim() || undefined,
            first_name: firstName,
            last_name: rest.length ? rest.join(" ") : undefined,
          },
        );

        setSubmitted(form);
        return;
      }
      if (result.errorType === "validation") {
        setErrors(result.errors);
        return;
      }
      trackFormError(result.errorType);
      setGeneralError(result.error);
    });
  };

  const isSuccess = submitted !== null;

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="relative pt-32 md:pt-48 pb-32 md:pb-56 border-t hairline overflow-hidden scroll-mt-20 md:scroll-mt-24"
      aria-labelledby="demo-heading"
    >
      <div className="mx-auto max-w-page px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ── LEFT COLUMN ───────────────────────────────────────── */}
          <div className="lg:col-span-5">
            <FadeUp>
              <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted mb-10 md:mb-12 flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-ink/40" />
                Sākums · 09
              </div>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h2
                id="demo-heading"
                className="font-medium leading-[0.9] tracking-[-0.04em] text-ink text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem]"
              >
                <span className="block">Pieprasi demo.</span>
                <span className="block">
                  <span className="serif-italic gradient-text">Atbildēšu pats</span>
                  .
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="mt-8 md:mt-10 max-w-[36ch] text-[17px] md:text-[20px] leading-[1.45] text-ash">
                25 minūtes WhatsApp vai e-pastā. Bez automātiskiem pārdošanas
                zvaniem, bez slaidiem. Tikai īsa saruna, lai saprastu, vai
                OpenOura tev der.
              </p>
            </FadeUp>

            <FadeUp delay={0.12}>
              <ol className="mt-12 md:mt-14 max-w-[42ch] border-t hairline divide-y hairline">
                <NextStepRow num="01" label="Es atbildu 4 stundu laikā" />
                <NextStepRow num="02" label="25 min · WhatsApp vai Zoom" />
                <NextStepRow num="03" label="Bez slaidiem · tikai tavi jautājumi" />
                <NextStepRow num="04" label="Ja neder, es to pasaku" />
              </ol>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div id="kontakts" className="mt-10 space-y-1.5 scroll-mt-24">
                <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  — Rudolfs · OpenOura dibinātājs
                </div>
                <div className="text-[12px] text-ash">
                  <a
                    href="mailto:rudolfs@openoura.com"
                    className="hover:text-ink transition-colors"
                  >
                    rudolfs@openoura.com
                  </a>
                </div>
                <div className="text-[12px] text-ash">
                  <a
                    href="tel:+37120510502"
                    className="hover:text-ink transition-colors"
                  >
                    +371 20 510 502
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* ── RIGHT COLUMN — FORM or SUCCESS ────────────────────── */}
          <div className="lg:col-span-7">
            {isSuccess ? (
              <SuccessState
                firstName={submitted!.name.split(/\s+/)[0] || submitted!.name}
                email={submitted!.email}
              />
            ) : (
              <FadeUp delay={0.2}>
                {projectedSavings !== null && (
                  <SavingsCallback amount={projectedSavings} />
                )}
                <form
                  onSubmit={handleSubmit}
                  noValidate={false}
                  aria-labelledby="demo-heading"
                  className="flex flex-col gap-5"
                >
                  {/* Honeypot — bots fill this; humans don't see it */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] w-px h-px opacity-0 pointer-events-none"
                  />

                  <Field
                    id="name"
                    label="Vārds, uzvārds"
                    type="text"
                    autoComplete="name"
                    placeholder="Jānis Bērziņš"
                    value={form.name}
                    onChange={updateField("name")}
                    required
                    minLength={2}
                    maxLength={100}
                    disabled={isPending}
                    error={errors.name}
                  />

                  <Field
                    id="company"
                    label="Uzņēmums"
                    type="text"
                    autoComplete="organization"
                    placeholder="SIA Tava firma"
                    value={form.company}
                    onChange={updateField("company")}
                    required
                    maxLength={200}
                    disabled={isPending}
                    error={errors.company}
                  />

                  <Field
                    id="email"
                    label="E-pasts"
                    type="email"
                    autoComplete="email"
                    placeholder="janis@firma.lv"
                    value={form.email}
                    onChange={updateField("email")}
                    required
                    disabled={isPending}
                    error={errors.email}
                  />

                  <Field
                    id="phone"
                    label="Telefons"
                    optionalLabel="neobligāti"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+371 20000000"
                    value={form.phone}
                    onChange={updateField("phone")}
                    maxLength={30}
                    disabled={isPending}
                    error={errors.phone}
                  />

                  <div>
                    <label
                      htmlFor="employees"
                      className="block mono text-[11px] uppercase tracking-[0.18em] text-muted mb-2"
                    >
                      Cik darbinieku ražošanā?
                    </label>
                    <div className="relative">
                      <select
                        id="employees"
                        name="employees"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.employees}
                        aria-describedby={
                          errors.employees ? "employees-error" : undefined
                        }
                        value={form.employees}
                        onChange={updateField("employees")}
                        disabled={isPending}
                        className={`w-full appearance-none bg-paper rounded-md px-4 py-3.5 pr-10 text-[16px] text-ink focus:outline-none transition-colors border disabled:opacity-60 ${
                          errors.employees
                            ? "border-marker"
                            : "border-ink/[0.12] focus:border-ink"
                        } ${form.employees === "" ? "text-muted/80" : ""}`}
                      >
                        <option value="" disabled>
                          Izvēlies...
                        </option>
                        <option value="1-5">1–5 darbinieki</option>
                        <option value="6-15">6–15 darbinieki</option>
                        <option value="16-30">16–30 darbinieki</option>
                        <option value="30+">Vairāk kā 30</option>
                      </select>
                      <span
                        aria-hidden
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 mono text-[11px] text-muted"
                      >
                        ▼
                      </span>
                    </div>
                    {errors.employees && (
                      <p
                        id="employees-error"
                        className="mono text-[11px] text-marker mt-1.5"
                      >
                        {errors.employees}
                      </p>
                    )}
                  </div>

                  {generalError && (
                    <div
                      role="alert"
                      className="mono text-[12px] text-marker border border-marker/40 bg-marker/[0.04] rounded-md px-4 py-3"
                    >
                      {generalError}
                    </div>
                  )}

                  <div className="mt-1 flex flex-col sm:flex-row sm:justify-end sm:items-center gap-4">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="group inline-flex items-center justify-center gap-2 bg-ink text-paper px-5 py-3.5 rounded-full text-[14px] font-medium tracking-tight hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
                    >
                      {isPending ? "Sūta..." : "Nosūtīt pieprasījumu"}
                      {!isPending && (
                        <span
                          aria-hidden
                          className="transition-transform group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      )}
                    </button>
                  </div>

                  <div className="mono text-[11px] uppercase tracking-[0.15em] text-muted sm:text-right">
                    25 min · bez maksas · bez saistībām · atbildēšu 24h laikā
                  </div>

                  <div aria-live="polite" className="sr-only">
                    {isPending ? "Sūta pieprasījumu..." : ""}
                  </div>
                </form>
              </FadeUp>
            )}
          </div>
        </div>

        {/* ── FOOTER (preserved — Nav links to #kontakts) ─────────── */}
        <FadeUp delay={0.25}>
          <div className="mt-32 md:mt-44 flex flex-col md:flex-row gap-10 md:gap-0 md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <Image
                  src="/openoura_logo.png"
                  alt="OpenOura"
                  width={44}
                  height={54}
                  className="h-9 w-auto"
                />
                <span className="serif-italic text-[22px] tracking-tight text-ink leading-none">
                  OpenOura
                </span>
              </div>
              <div className="text-[13px] text-ash max-w-[38ch]">
                Ražošanas vadība, kas veidota Latvijā, Latvijas ražotājiem.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:gap-10 text-[13px]">
              <div>
                <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted mb-3">
                  Produkts
                </div>
                <ul className="space-y-2">
                  <li>
                    <a className="hover:text-ash" href="#problema">
                      Problēma
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-ash" href="#risinajums">
                      Risinājums
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-ash" href="#cenas">
                      Cenas
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-ash" href="#demo">
                      Pieprasi demo
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted mb-3">
                  Kontakti
                </div>
                <ul className="space-y-2">
                  <li>
                    <a
                      className="hover:text-ash"
                      href="mailto:rudolfs@openoura.com"
                    >
                      rudolfs@openoura.com
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-ash" href="tel:+37120510502">
                      +371 20 510 502
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </FadeUp>

        <div className="mt-16 pt-6 border-t hairline flex flex-col md:flex-row justify-between gap-3 mono text-[11px] text-muted">
          <span>© 2026 OpenOura · Liepāja, Latvija · Kopš 2025</span>
        </div>
      </div>

      {/* huge background numeral as accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-6vw] top-[8%] mono text-[28vw] leading-none tracking-tightest text-ink/[0.035] select-none"
      >
        09
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────
   SAVINGS CALLBACK — personalized greeting from Calculator
   ─────────────────────────────────────────────────────────── */

function SavingsCallback({ amount }: { amount: number }) {
  const formatted = new Intl.NumberFormat("lv-LV", {
    maximumFractionDigits: 0,
  }).format(amount);
  return (
    <div className="mb-8 md:mb-10 -mt-2 border-l-2 border-violet pl-5 py-1">
      <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted mb-1.5">
        No tava kalkulatora
      </div>
      <p className="text-[15px] md:text-[17px] leading-[1.4] text-ink">
        Tu paredzēji ietaupīt{" "}
        <span className="serif-italic gradient-text font-medium">
          €{formatted}/mēn
        </span>
        . Pieprasi demo — redzēsim, vai tas der.
      </p>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   NEXT STEP ROW — "Kas notiks pēc tam" strip
   ─────────────────────────────────────────────────────────── */

function NextStepRow({ num, label }: { num: string; label: string }) {
  return (
    <li className="flex items-baseline gap-4 py-3.5 md:py-4">
      <span className="mono tabular-nums text-[11px] uppercase tracking-[0.18em] text-muted/70 shrink-0 w-6">
        {num}
      </span>
      <span className="text-[14px] md:text-[15px] leading-[1.4] text-ink">
        {label}
      </span>
    </li>
  );
}

/* ───────────────────────────────────────────────────────────
   FIELD WRAPPER
   ─────────────────────────────────────────────────────────── */

type FieldProps = {
  id: string;
  label: string;
  optionalLabel?: string;
  type: "text" | "email" | "tel";
  autoComplete: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  error?: string;
};

function Field({
  id,
  label,
  optionalLabel,
  type,
  autoComplete,
  placeholder,
  value,
  onChange,
  required,
  minLength,
  maxLength,
  disabled,
  error,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mono text-[11px] uppercase tracking-[0.18em] text-muted mb-2"
      >
        {label}
        {optionalLabel && (
          <span className="ml-2 mono text-[10px] text-muted/60 normal-case tracking-normal">
            ({optionalLabel})
          </span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        disabled={disabled}
        aria-required={required || undefined}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full bg-paper rounded-md px-4 py-3.5 text-[16px] text-ink placeholder:text-muted/60 focus:outline-none transition-colors border disabled:opacity-60 ${
          error ? "border-marker" : "border-ink/[0.12] focus:border-ink"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mono text-[11px] text-marker mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   SUCCESS STATE
   ─────────────────────────────────────────────────────────── */

function SuccessState({
  firstName,
  email,
}: {
  firstName: string;
  email: string;
}) {
  return (
    <div aria-live="polite">
      <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted mb-10 md:mb-12 flex items-center gap-3">
        <span className="inline-block h-px w-8 bg-ink/40" />
        Saņemts · izlasīts
      </div>

      <h3 className="serif-italic font-normal leading-[1.05] tracking-[-0.02em] text-ink text-[2.5rem] md:text-[3.5rem]">
        Paldies,{" "}
        <span className="gradient-text">{firstName}</span>!
      </h3>

      <p className="mt-8 max-w-[36ch] text-[17px] md:text-[20px] leading-[1.45] text-ash">
        Saņēmu tavu pieprasījumu. Atbildēšu personīgi 24 stundu laikā uz{" "}
        <span className="text-ink">{email}</span>.
      </p>

      <div className="mt-10 mono text-[11px] uppercase tracking-[0.18em] text-muted">
        — Rudolfs
      </div>
    </div>
  );
}
