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

export function DemoModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");
  const [submitted, setSubmitted] = useState<FormState | null>(null);
  const [isPending, startTransition] = useTransition();
  const sourceCtaRef = useRef<string>("");
  const startedRef = useRef(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Open on any [data-demo] click anywhere on the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement)?.closest?.("[data-demo]");
      if (!trigger) return;
      e.preventDefault();
      sourceCtaRef.current =
        (trigger as HTMLElement).dataset.cta || readSourceCtaFromHash() || "";
      setSubmitted(null);
      setErrors({});
      setGeneralError("");
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Escape to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setGeneralError("");
    const formEl = e.currentTarget;
    const sourceCta = sourceCtaRef.current || readSourceCtaFromHash();
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

  const firstName = submitted ? submitted.name.split(/\s+/)[0] || submitted.name : "";

  return (
    <div
      className={`modal-overlay${open ? " open" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      aria-hidden={!open}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="demo-modal-title">
        <button className="modal-close" type="button" aria-label="Aizvērt" onClick={() => setOpen(false)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="modal-success">
            <div className="ms-ico">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 id="demo-modal-title">Paldies, {firstName}!</h3>
            <p>
              Saņēmu tavu pieprasījumu. Atbildēšu personīgi 24 stundu laikā uz{" "}
              <b>{submitted.email}</b>.
            </p>
          </div>
        ) : (
          <>
            <h3 id="demo-modal-title">Pieprasi demo</h3>
            <p className="msub">25 minūtes, bez saistībām. Atbildēšu 4 stundu laikā. Rūdolfs, dibinātājs.</p>
            <form onSubmit={handleSubmit}>
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />
              {generalError && <div className="mgeneral" role="alert">{generalError}</div>}

              <div className="mfield">
                <label htmlFor="dm-name">Vārds, uzvārds</label>
                <input
                  ref={firstFieldRef}
                  id="dm-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jānis Bērziņš"
                  value={form.name}
                  onChange={update("name")}
                  disabled={isPending}
                  className={errors.name ? "err" : ""}
                  required
                />
                {errors.name && <div className="ferr">{errors.name}</div>}
              </div>

              <div className="mfield">
                <label htmlFor="dm-company">Uzņēmums</label>
                <input
                  id="dm-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="SIA Tava firma"
                  value={form.company}
                  onChange={update("company")}
                  disabled={isPending}
                  className={errors.company ? "err" : ""}
                  required
                />
                {errors.company && <div className="ferr">{errors.company}</div>}
              </div>

              <div className="mfield">
                <label htmlFor="dm-email">E-pasts</label>
                <input
                  id="dm-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="janis@firma.lv"
                  value={form.email}
                  onChange={update("email")}
                  disabled={isPending}
                  className={errors.email ? "err" : ""}
                  required
                />
                {errors.email && <div className="ferr">{errors.email}</div>}
              </div>

              <div className="mfield">
                <label htmlFor="dm-phone">Telefons (neobligāti)</label>
                <input
                  id="dm-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+371 20000000"
                  value={form.phone}
                  onChange={update("phone")}
                  disabled={isPending}
                  className={errors.phone ? "err" : ""}
                />
                {errors.phone && <div className="ferr">{errors.phone}</div>}
              </div>

              <div className="mfield">
                <label htmlFor="dm-employees">Cik darbinieku ražošanā?</label>
                <Dropdown
                  id="dm-employees"
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
                  options={EMP_OPTIONS}
                  invalid={!!errors.employees}
                  disabled={isPending}
                />
                {errors.employees && <div className="ferr">{errors.employees}</div>}
              </div>

              <button className="btn btn-violet" type="submit" disabled={isPending}>
                {isPending ? "Sūta..." : "Nosūtīt pieprasījumu"}
                {!isPending && <span className="arrow">→</span>}
              </button>
              <p className="mnote">25 min · bez maksas · bez saistībām</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
