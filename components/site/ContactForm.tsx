"use client";

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { demoRequestAction } from "@/app/actions/demo-request";
import {
  readSourceCtaFromHash,
  trackFormError,
  trackFormStarted,
  trackFormSubmitted,
} from "@/lib/analytics";
import { trackLead } from "@/lib/meta-pixel";
import { Dropdown } from "./Dropdown";

const EMP_OPTIONS = [
  { value: "1-5", label: "1–5 darbinieki" },
  { value: "6-15", label: "6–15 darbinieki" },
  { value: "16-30", label: "16–30 darbinieki" },
  { value: "30+", label: "Vairāk kā 30" },
];

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  employees: string;
};

const INITIAL: FormState = { name: "", company: "", email: "", phone: "", employees: "" };

const CONFETTI = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2;
  const d = 90 + (i % 4) * 24;
  const colors = ["#7c3aed", "#14b8a6", "#ec4899", "#f59e0b"];
  return {
    cx: Math.round(Math.cos(a) * d),
    cy: Math.round(Math.sin(a) * d - 20),
    color: colors[i % 4],
    delay: (i % 5) * 45,
  };
});

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");
  const [submitted, setSubmitted] = useState<FormState | null>(null);
  const [isPending, startTransition] = useTransition();
  const [savings, setSavings] = useState<number | null>(null);
  const startedRef = useRef(false);

  // Personalized callback from the savings calculator.
  useEffect(() => {
    const read = (raw: string | null) => {
      const v = Number(raw);
      return Number.isFinite(v) && v > 0 ? v : null;
    };
    try {
      setSavings(read(sessionStorage.getItem("openoura:projected_savings")));
    } catch {
      /* storage unavailable */
    }
    const onUpd = (e: Event) => {
      const d = (e as CustomEvent<{ value: number }>).detail;
      setSavings(typeof d?.value === "number" && d.value > 0 ? d.value : null);
    };
    window.addEventListener("openoura:savings-updated", onUpd);
    return () => window.removeEventListener("openoura:savings-updated", onUpd);
  }, []);

  const fireStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackFormStarted();
  };

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      fireStarted();
      setForm((p) => ({ ...p, [key]: e.target.value }));
      if (errors[key]) {
        setErrors((p) => {
          const n = { ...p };
          delete n[key];
          return n;
        });
      }
    };

  const validators: Record<string, (v: string) => string> = {
    name: (v) => (v.trim().length < 2 ? "Lūdzu, ievadi pilnu vārdu" : ""),
    company: (v) => (v.trim().length < 1 ? "Lūdzu, ievadi uzņēmumu" : ""),
    email: (v) =>
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim()) ? "Nederīgs e-pasts" : "",
    phone: (v) =>
      v.trim() && !/^[\d+\-\s()]+$/.test(v.trim())
        ? "Atļauti tikai cipari, +, -, atstarpes"
        : "",
    employees: (v) => (!v ? "Izvēlies opciju" : ""),
  };

  const onBlur = (key: keyof FormState) => () => {
    const msg = validators[key]?.(form[key]) ?? "";
    setErrors((p) => {
      const n = { ...p };
      if (msg) n[key] = msg;
      else delete n[key];
      return n;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setGeneralError("");
    const formEl = e.currentTarget;
    const sourceCta = readSourceCtaFromHash() || "contact_form";
    startTransition(async () => {
      let result;
      try {
        result = await demoRequestAction(new FormData(formEl));
      } catch {
        trackFormError("network");
        setGeneralError("Tīkla kļūda. Pārbaudi savienojumu vai raksti tieši: rudolfs@openoura.com");
        return;
      }
      if (result.success) {
        const employees = form.employees as "1-5" | "6-15" | "16-30" | "30+";
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
          { content_name: "demo_request" },
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

  if (submitted) {
    const firstName = submitted.name.split(/\s+/)[0] || submitted.name;
    return (
      <div className="cform" aria-live="polite" style={{ position: "relative" }}>
        <div className="confetti" aria-hidden="true">
          {CONFETTI.map((c, i) => (
            <i
              key={i}
              style={{ "--cx": `${c.cx}px`, "--cy": `${c.cy}px`, background: c.color, animationDelay: `${c.delay}ms` } as React.CSSProperties}
            />
          ))}
        </div>
        <div className="cform-success">
          <div className="ms-ico">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h3>Paldies, {firstName}!</h3>
          <p>
            Saņēmu tavu pieprasījumu. Atbildēšu personīgi 4 stundu laikā uz <b>{submitted.email}</b>.
          </p>
        </div>
      </div>
    );
  }

  const okName = form.name.trim().length > 1;
  const okCompany = form.company.trim().length > 0;
  const okEmail = /.+@.+\..+/.test(form.email.trim());
  const okPhone = form.phone.trim().length >= 6;

  return (
    <div className="cform">
      <div className="cform-badge">Parasti atbild &lt; 4 h</div>
      <div className="cform-title">Pieprasi demo</div>
      <div className="cform-sub">Aizpildi, un sazināšos ar tevi tuvāko 4 stundu laikā.</div>
      {savings !== null && (
        <div className="cform-savings">
          Tu paredzēji ietaupīt{" "}
          <b>€{new Intl.NumberFormat("lv-LV", { maximumFractionDigits: 0 }).format(savings)}/mēn</b>.{" "}
          Parunāsim, kā to sasniegt.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
        {generalError && <div className="mgeneral" role="alert">{generalError}</div>}
        <div className="cform-grid">
          <div className={`mfield ico${okName ? " valid" : ""}`}>
            <label htmlFor="cf-name">Vārds, uzvārds</label>
            <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" /></svg>
            <input id="cf-name" name="name" type="text" autoComplete="name" placeholder="Jānis Bērziņš" value={form.name} onChange={update("name")} onBlur={onBlur("name")} disabled={isPending} className={errors.name ? "err" : ""} required />
            <span className="ok-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span>
            {errors.name && <div className="ferr">{errors.name}</div>}
          </div>
          <div className={`mfield ico${okCompany ? " valid" : ""}`}>
            <label htmlFor="cf-company">Uzņēmums</label>
            <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h6" /></svg>
            <input id="cf-company" name="company" type="text" autoComplete="organization" placeholder="SIA Tava firma" value={form.company} onChange={update("company")} onBlur={onBlur("company")} disabled={isPending} className={errors.company ? "err" : ""} required />
            <span className="ok-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span>
            {errors.company && <div className="ferr">{errors.company}</div>}
          </div>
          <div className={`mfield ico${okEmail ? " valid" : ""}`}>
            <label htmlFor="cf-email">E-pasts</label>
            <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
            <input id="cf-email" name="email" type="email" autoComplete="email" placeholder="janis@firma.lv" value={form.email} onChange={update("email")} onBlur={onBlur("email")} disabled={isPending} className={errors.email ? "err" : ""} required />
            <span className="ok-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span>
            {errors.email && <div className="ferr">{errors.email}</div>}
          </div>
          <div className={`mfield ico${okPhone ? " valid" : ""}`}>
            <label htmlFor="cf-phone">Telefons (neobligāti)</label>
            <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.5-1.1a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" /></svg>
            <input id="cf-phone" name="phone" type="tel" autoComplete="tel" placeholder="+371 20000000" value={form.phone} onChange={update("phone")} onBlur={onBlur("phone")} disabled={isPending} className={errors.phone ? "err" : ""} />
            <span className="ok-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span>
            {errors.phone && <div className="ferr">{errors.phone}</div>}
          </div>
          <div className="mfield full">
            <label htmlFor="cf-employees">Cik darbinieku ražošanā?</label>
            <Dropdown
              id="cf-employees"
              name="employees"
              value={form.employees}
              onChange={(v) => {
                fireStarted();
                setForm((p) => ({ ...p, employees: v }));
                setErrors((p) => {
                  const n = { ...p };
                  delete n.employees;
                  return n;
                });
              }}
              onClose={onBlur("employees")}
              options={EMP_OPTIONS}
              invalid={!!errors.employees}
              disabled={isPending}
            />
            {errors.employees && <div className="ferr">{errors.employees}</div>}
          </div>
        </div>
        <button className="btn btn-violet" type="submit" disabled={isPending} style={{ marginTop: 16 }}>
          {isPending ? "Sūta..." : "Nosūtīt pieprasījumu"}
          {!isPending && <span className="arrow">→</span>}
        </button>
        <p className="mnote">25 min · bez maksas · bez saistībām · atbildēšu 4h laikā</p>
      </form>
    </div>
  );
}
