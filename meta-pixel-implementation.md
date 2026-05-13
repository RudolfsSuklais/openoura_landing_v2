# Meta Pixel + Conversions API — Implementation Plan

**Domain:** landing.openoura.com
**Stack:** Next.js 15 App Router, TypeScript strict, React 19 RC
**Pixel ID:** `NEXT_PUBLIC_META_PIXEL_ID` (env)
**CAPI token:** `META_CAPI_ACCESS_TOKEN` (env, server-only)

---

## 0. Pre-flight — assumptions & open issues

Read before implementing. Two items diverge from the original brief and must be confirmed or revised.

### 0.1 `/pricing` is not a route — it is an anchor

The landing page is a single `app/page.tsx`. Pricing is a section component (`<Pricing />`) reached via the `#cenas` anchor (see `components/Nav.tsx:11`, `components/FinalCTA.tsx:420`).

**Implication:** "ViewContent uz /pricing" cannot fire on route change — there is no route change. The closest faithful equivalent is firing **ViewContent when the Pricing section first enters the viewport**, mirroring the existing PostHog pattern in `components/analytics/useSectionView.ts` (already wired to `Pricing.tsx:90` as `viewed_pricing`).

**Decision in this plan:** wire ViewContent to Pricing section visibility. If a real `/pricing` route exists later, move the call into that route's `useEffect`.

### 0.2 There is no trial / registration flow on this landing

The only conversion surface is the demo-request form in `components/FinalCTA.tsx`. There is no signup, no "start trial" button, no auth.

**Decision in this plan:**
- The demo form submit fires **Lead** (Meta's canonical event for a qualified form lead — closer to the funnel reality than `Contact`).
- `CompleteRegistration` and `StartTrial` helpers are exposed in `lib/meta-pixel.ts` but have **no caller** in current UI. They are ready for future use; this is documented in JSDoc on each helper.

If a different mapping is preferred (e.g. fire `Contact` instead of `Lead`, or fire both), say so before code.

### 0.3 Pixel ID conflict in original brief

The first message said pixel `1307802611416546`; the second said `META_PIXEL_ID=1242763304697839`; the latest message said `NEXT_PUBLIC_META_PIXEL_ID=1298725725155958`. **This plan trusts the most recent value: `1298725725155958`.** It is read from env, not hard-coded, so any change is a one-line `.env.local` edit.

### 0.4 CAPI access token handling

The supplied token starts with `EAAVwHLUGN4gBR…`. It will be:
- read from `process.env.META_CAPI_ACCESS_TOKEN` in server code only,
- **never** prefixed with `NEXT_PUBLIC_`,
- **not** committed — only the placeholder name goes into `.env.local.example`.

---

## 1. Architecture overview

```
┌──────────────────────────────────────────────────────────────────┐
│  Browser                                                          │
│                                                                   │
│  layout.tsx ─→ <MetaPixel/> (next/script afterInteractive)        │
│                  │                                                │
│                  ├─ fbq('init', NEXT_PUBLIC_META_PIXEL_ID)        │
│                  ├─ fbq('track', 'PageView')   ← auto             │
│                  │                                                │
│  PageViewTracker ─→ fbq('track','PageView') on pathname change    │
│                                                                   │
│  Pricing section IntersectionObserver                             │
│            └─→ trackEvent('ViewContent', {…}, eventId)            │
│                                                                   │
│  Demo form success                                                │
│            └─→ trackEvent('Lead', {…}, eventId)                   │
│                                                                   │
│  Every trackEvent() ALSO calls /api/meta-capi with same event_id  │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼  (deduped server-side by Meta)
┌──────────────────────────────────────────────────────────────────┐
│  /api/meta-capi  (server)                                         │
│  - Reads fbp, fbc from cookies (next/headers)                     │
│  - Reads client IP (x-forwarded-for) and user-agent               │
│  - SHA-256 hashes email/phone/name (lowercase + trim)             │
│  - POSTs to Graph API v21 /events with same event_id              │
└──────────────────────────────────────────────────────────────────┘
```

**Deduplication contract:** every event fires twice (browser + server) with the **same `event_id`** (UUID v4 generated client-side, threaded to the API route). Meta deduplicates by `(event_name, event_id)` across the 7-day window.

---

## 2. File-level changes

### 2.1 New files

| Path | Purpose |
|---|---|
| `lib/meta-pixel.ts` | Browser helper: `trackEvent(name, params?, userData?)`. Wraps `fbq()` and also POSTs to `/api/meta-capi`. Returns the `event_id`. Generates UUID. |
| `lib/meta-capi.ts` | Server-only helper: `sendCapiEvent({ event_name, event_id, event_time, user_data, custom_data, event_source_url })`. SHA-256 hashing, fetch to Graph API, no SDK dependency. |
| `components/MetaPixel.tsx` | `<Script strategy="afterInteractive">` that injects the canonical fbevents.js snippet + initial `fbq('init', …)` + `fbq('track','PageView')`. Bails out (`return null`) if `NEXT_PUBLIC_META_PIXEL_ID` is missing. |
| `components/analytics/MetaPixelPageView.tsx` | Client component: re-fires `fbq('track','PageView')` on `usePathname` change (same pattern as `PageViewTracker.tsx`). |
| `app/api/meta-capi/route.ts` | `POST` handler. Validates body with zod, extracts IP/UA/cookies, calls `lib/meta-capi.ts`. Returns `{ ok: true }` (or `{ ok:false, error }`). Never throws to the client — pixel failures must not break the page. |

### 2.2 Modified files

| Path | Change |
|---|---|
| `app/layout.tsx` | Add `<MetaPixel />` (renders `<Script>` snippet — works fine outside `<head>` because Next.js hoists `next/script` correctly). Add `<MetaPixelPageView />` next to existing `<PageViewTracker />`. Add domain verification `<meta name="facebook-domain-verification" content="…" />` via `metadata.verification.other` (value pending — placeholder for now). |
| `components/Pricing.tsx` | Add a one-shot `useEffect` (via a new tiny `useTrackViewContent` hook in `lib/meta-pixel.ts`, or inline) tied to the same `IntersectionObserver` that already drives `useSectionView("viewed_pricing")`. Fires `ViewContent` **once per page load** with `content_name: 'pricing'`, `content_category: 'pricing_section'`. |
| `components/FinalCTA.tsx` | In the `result.success` branch (line ~106), after the existing `trackFormSubmitted(...)` call, also call `trackEvent('Lead', { content_name:'demo_request', value: projectedSavings ?? undefined, currency: projectedSavings ? 'EUR' : undefined }, { em: form.email, ph: form.phone, fn: form.name.split(' ')[0], ln: form.name.split(' ').slice(1).join(' ') })`. |
| `.env.local.example` | Add `NEXT_PUBLIC_META_PIXEL_ID=` and `META_CAPI_ACCESS_TOKEN=` with comments. |
| `lib/analytics.ts` | **No changes.** PostHog stays as-is; Meta is a parallel system. |

### 2.3 No package install needed

The original brief mentioned `facebook-nodejs-business-sdk`. That SDK is **heavy** (pulls request, Bluebird, and a CommonJS-only API surface that fights Next.js 15's ESM/edge bundling). The Meta Conversions API is a plain HTTPS POST to `https://graph.facebook.com/v21.0/{pixel_id}/events?access_token=…`. A 40-line `lib/meta-capi.ts` covers our needs without the SDK weight.

**Decision:** no SDK; direct `fetch`. If the user prefers the official SDK, swap it in later — the boundary is contained inside `lib/meta-capi.ts`.

---

## 3. Event matrix

| Event name | Trigger (UI) | Where fired | `event_id` source | Custom params | Hashed user_data |
|---|---|---|---|---|---|
| `PageView` | Page load + route change | `<MetaPixel/>` init + `<MetaPixelPageView/>` | n/a (auto) | — | — (browser only, no CAPI to keep volume sane) |
| `ViewContent` | Pricing section visible | `Pricing.tsx` useEffect | `crypto.randomUUID()` per page | `content_name:'pricing'`, `content_category:'pricing_section'` | (none — anonymous view) |
| `Lead` | Demo form `success` | `FinalCTA.tsx` after `setSubmitted(form)` | `crypto.randomUUID()` per submit | `content_name:'demo_request'`, `value`(if calculator projection set), `currency:'EUR'` | `em`, `ph` (if present), `fn`, `ln` |
| `CompleteRegistration` | _(no trigger yet)_ | helper exists in `lib/meta-pixel.ts` | caller-supplied | caller-supplied | caller-supplied |
| `StartTrial` | _(no trigger yet)_ | helper exists in `lib/meta-pixel.ts` | caller-supplied | caller-supplied | caller-supplied |

**Note on PageView dual-firing:** browser-only is deliberate. CAPI PageView is rarely useful and inflates event volume against Meta's daily limits.

---

## 4. Hashing & cookies — exact rules

`lib/meta-capi.ts` normalizes before hashing, per [Meta's spec](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters):

```ts
function normalize(v: string, kind: 'email'|'phone'|'name'): string {
  let s = v.trim().toLowerCase();
  if (kind === 'phone') s = s.replace(/[^\d]/g, ''); // digits only, with country code
  return s;
}
function sha256(s: string): string {
  return crypto.createHash('sha256').update(s).digest('hex');
}
```

- `em` → lowercased, trimmed, SHA-256
- `ph` → digits only (incl. country code), SHA-256
- `fn`, `ln` → lowercased, trimmed, SHA-256
- `client_ip_address` → from `x-forwarded-for` (first hop), **plain text** — Meta hashes server-side
- `client_user_agent` → from `user-agent` header, plain text
- `fbp` → from `_fbp` cookie, plain text
- `fbc` → from `_fbc` cookie, plain text (or constructed from `?fbclid=` if cookie missing and we want to be thorough — **out of scope for v1**)

Phone normalization edge case: if the form gives a local-format phone with no country code (e.g. `20510502`), we **do not** auto-prepend `371`. Either user types it, or we omit `ph` entirely. Better to drop the field than send mis-hashed data Meta will silently bucket as unmatchable.

---

## 5. API route contract

`POST /api/meta-capi`

```ts
// Request body (zod-validated)
{
  event_name: 'ViewContent' | 'Lead' | 'CompleteRegistration' | 'StartTrial',
  event_id: string,               // UUID — same as browser fbq call
  event_source_url: string,       // window.location.href from caller
  custom_data?: Record<string, unknown>,
  user_data?: {
    email?: string,               // RAW — server hashes
    phone?: string,
    first_name?: string,
    last_name?: string,
  },
}
```

Server enriches with:
- `event_time`: `Math.floor(Date.now()/1000)`
- `action_source`: `'website'`
- `user_data.client_ip_address`, `user_data.client_user_agent`
- `user_data.fbp`, `user_data.fbc` from cookies (`next/headers`)
- Test event code: if `META_CAPI_TEST_EVENT_CODE` env is set, include it (used during Events Manager → Test Events validation, ignored in prod).

Errors are **logged but not thrown** to the browser. The route returns `{ ok: true }` even on upstream failure so a Meta outage cannot break form UX. (Logged failures show up in `next` server logs; that is enough signal.)

---

## 6. Domain verification meta tag

In `app/layout.tsx`, extend the existing `metadata` export:

```ts
verification: {
  other: {
    'facebook-domain-verification': [process.env.META_DOMAIN_VERIFICATION ?? ''],
  },
},
```

The user will paste the verification code into `.env.local` as `META_DOMAIN_VERIFICATION=`. While the env is empty the meta tag will still render with an empty `content=""` — harmless but slightly noisy. **Alternative:** only emit the tag if the env is set, which requires conditionally building the `verification` object. I'll go with the conditional emit to keep the DOM clean.

---

## 7. Test plan (manual, before shipping)

1. **Build:** `npm run build` — must pass with strict TS.
2. **Browser Pixel:** install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc). Load page — expect one `PageView`. Scroll to Pricing — expect one `ViewContent`. Submit demo form — expect one `Lead`.
3. **CAPI:** Events Manager → Test events → copy a test code → set `META_CAPI_TEST_EVENT_CODE=…` locally → repeat above. The same events should appear in the Test Events tab with `event_id` matching the browser column (dedup status shown there).
4. **Edge case:** load with `NEXT_PUBLIC_META_PIXEL_ID` blank — the `<MetaPixel/>` component returns `null`, no `fbq` errors in console, page renders normally.
5. **Edge case:** form submit with `META_CAPI_ACCESS_TOKEN` blank — server logs a warning, returns `{ ok:true }`, browser pixel still works, form still shows success.

---

## 8. Out of scope (v1)

- Advanced matching with `external_id` (would need a stable visitor ID — PostHog has one but tying them risks PII leakage; punt).
- `fbclid` → `fbc` reconstruction when cookie missing.
- Server-side `PageView` (volume cost not worth it).
- Custom audiences (configured in Events Manager UI, not code).
- Conversion API for any non-conversion event (Scroll, etc. — keep CAPI for monetary intent only).

---

## 9. Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| `fbq` not yet initialized when first event fires | Low | `MetaPixel.tsx` uses `next/script` `afterInteractive`; all callers go through `trackEvent()` which queues via the standard `fbq(…)` stub pattern (queue array assigned in the init snippet). |
| Ad-blocker drops fbevents.js | High (~25% of users) | CAPI fires regardless; that's the entire point of dual-pathing. |
| CAPI rate limit | Very low at landing volume | Meta limit is 1000 req/s per business. We're nowhere close. |
| Mis-hashed phone (no country code) | Medium | Phone gets dropped if not E.164 — fewer matches but no broken hashes. |
| Form posts before CAPI POST completes | Real | `trackEvent()` fires CAPI fetch as `fire-and-forget`, does not await. The UI never blocks on it. |

---

## 10. Implementation order

1. `lib/meta-pixel.ts` (helpers + types)
2. `lib/meta-capi.ts` (server hasher + fetcher)
3. `app/api/meta-capi/route.ts`
4. `components/MetaPixel.tsx`
5. `components/analytics/MetaPixelPageView.tsx`
6. `app/layout.tsx` (mount + meta tag)
7. `components/Pricing.tsx` (ViewContent)
8. `components/FinalCTA.tsx` (Lead)
9. `.env.local.example` (placeholders + comments)
10. Manual smoke test
