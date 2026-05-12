"use client";

import posthog from "posthog-js";

export type CtaLocation =
  | "hero"
  | "nav"
  | "problem_footer"
  | "solution_footer"
  | "pricing_sakums"
  | "pricing_cehs"
  | "pricing_razotne"
  | "journey_pabeigts";

export function trackCtaClick(location: CtaLocation) {
  if (typeof window === "undefined") return;
  try {
    posthog.capture("cta_clicked", { location });
    if (window.location.hash !== `#cta=${location}`) {
      window.history.replaceState(null, "", `#cta=${location}`);
    }
  } catch {
    // PostHog not initialized (e.g. missing env key) — fail silently
  }
}

export function trackFormStarted() {
  try {
    posthog.capture("demo_form_started");
  } catch {}
}

export function trackFormSubmitted(props: {
  email: string;
  name: string;
  company: string;
  employees: "1-5" | "6-15" | "16-30" | "30+";
  has_phone: boolean;
  source_cta: string | null;
}) {
  try {
    posthog.identify(props.email, {
      name: props.name,
      company: props.company,
      employees: props.employees,
    });
    posthog.capture("demo_form_submitted", {
      employees: props.employees,
      has_phone: props.has_phone,
      source_cta: props.source_cta,
    });
  } catch {}
}

export function trackFormError(
  error_type: "rate_limit" | "server_error" | "network",
) {
  try {
    posthog.capture("demo_form_error", { error_type });
  } catch {}
}

export function trackWhatsAppClick(props: {
  location: "floating_button";
  scroll_position: number;
}) {
  try {
    posthog.capture("whatsapp_clicked", props);
  } catch {}
}

export function trackSectionView(
  name: "viewed_problem" | "viewed_solution" | "viewed_pricing" | "viewed_demo_form",
) {
  try {
    posthog.capture(name);
  } catch {}
}

export function readSourceCtaFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const m = window.location.hash.match(/cta=([a-z_]+)/);
  return m ? m[1] : null;
}
