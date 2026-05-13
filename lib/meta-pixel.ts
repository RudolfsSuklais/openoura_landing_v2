"use client";

import { useEffect, type RefObject } from "react";

// TODO(gdpr): when a cookie consent banner is wired up on this landing,
// gate every fbq() call and every /api/meta-capi POST behind user opt-in.
// Same gate must apply to PostHogProvider (see components/analytics/PostHogProvider.tsx).
// Until that banner exists, Meta loads on first paint — matching current PostHog behavior.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

type MetaEventName =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "CompleteRegistration"
  | "StartTrial";

type CustomData = Record<string, unknown>;

export type UserData = {
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
};

function genEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Fire a Meta event on both the browser Pixel and the server Conversions API.
 * Both calls share the same event_id, which is how Meta deduplicates them.
 *
 * Fire-and-forget — never awaits, never throws, never blocks the UI.
 * Returns the generated event_id in case the caller wants to log it.
 */
export function trackEvent(
  name: MetaEventName,
  customData?: CustomData,
  userData?: UserData,
): string {
  const eventId = genEventId();
  if (typeof window === "undefined") return eventId;

  try {
    window.fbq?.("track", name, customData ?? {}, { eventID: eventId });
  } catch {
    // Pixel script not loaded yet or blocked — CAPI still runs below.
  }

  // CAPI mirror. keepalive lets the POST survive page unload (e.g. nav after submit).
  try {
    void fetch("/api/meta-capi", {
      method: "POST",
      keepalive: true,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        event_name: name,
        event_id: eventId,
        event_source_url: window.location.href,
        custom_data: customData,
        user_data: userData,
      }),
    }).catch(() => {});
  } catch {
    // ignore — never break UI on analytics failure
  }

  return eventId;
}

export function trackLead(customData?: CustomData, userData?: UserData) {
  return trackEvent("Lead", customData, userData);
}

export function trackViewContent(customData?: CustomData, userData?: UserData) {
  return trackEvent("ViewContent", customData, userData);
}

/** Helper for future trial UI — no current caller. */
export function trackCompleteRegistration(
  customData?: CustomData,
  userData?: UserData,
) {
  return trackEvent("CompleteRegistration", customData, userData);
}

/** Helper for future trial UI — no current caller. */
export function trackStartTrial(
  customData?: CustomData,
  userData?: UserData,
) {
  return trackEvent("StartTrial", customData, userData);
}

/**
 * Fire ViewContent once when the referenced element scrolls into view.
 * Used by `components/Pricing.tsx` — the single-page landing has no /pricing
 * route, so section visibility is the closest faithful trigger.
 *
 * Threshold note: sections taller than the viewport can never reach 0.5
 * intersectionRatio (math: max ratio = viewport_h / element_h). Using a low
 * threshold (10%) ensures the event fires once any part of the section is
 * meaningfully visible. We still only fire once per page load.
 */
export function useTrackViewContentOnVisible<T extends HTMLElement>(
  ref: RefObject<T | null>,
  params: { content_name: string; content_category?: string },
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;

    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!fired && entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            fired = true;
            trackViewContent(params);
            observer.disconnect();
          }
        }
      },
      { threshold: [0.1] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, params.content_name, params.content_category]);
}
