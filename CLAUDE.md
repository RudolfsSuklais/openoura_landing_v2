# OpenOura Landing Page — Design System & Guidelines

This is the design and code reference for landing.openoura.com.
Every new section, component, or change MUST follow this document.
If anything here conflicts with a user request, ask before deviating.

> **Source of truth:** The approved prototype
> `Claude Cowork/openoura-landing.html` defines the visual system. This
> Next.js app is a 1:1 port of it. When in doubt, match the prototype.

═══════════════════════════════════════════════════════════════════
## 1. THE BIG IDEA
═══════════════════════════════════════════════════════════════════

OpenOura is a manufacturing management tool (mini ERP) for Latvian
manufacturers — from a handful of people up to a few hundred employees.
Pricing starts at €69/month. Do NOT position it as "for small
manufacturers", and do NOT claim onboarding is free or instant — setup
scope depends on company size.

The landing page communicates ONE promise:
"Visa tava ražotne vienā ekrānā." (Your whole factory on one screen.)
Sub-promise: see who works on what, what it costs, and what each
project earns — to the cent, in real time, **without Excel**.

Audience: Latvian manufacturing business owners, 35–55, running
production teams that range from a few people up to ~300 employees,
currently on Excel + paper + WhatsApp. Mobile-first,
Monday-morning-with-coffee readers. We get ~5 seconds.

═══════════════════════════════════════════════════════════════════
## 2. DESIGN PHILOSOPHY
═══════════════════════════════════════════════════════════════════

This is a **modern, polished product landing page** — think Linear /
Vercel / Framer template quality, warmed up with real product mockups
and one violet→teal accent. Confident, clean, motion-rich but tasteful.

Core principles:
- **Centered, generous layout.** Section heads are centered; content
  sits in a 1140px `.wrap`. (This is intentional — not hard-left.)
- Real product UI mockups are the hero visual — code-built, 1:1 with the
  actual OpenOura app (the `.ooapp` dashboard especially).
- One accent gradient: **violet → teal**, used for highlights, bars,
  avatars, the progress bar.
- Motion is a feature: blobs, headline reveal, tab rotation, scroll
  reveal, parallax — but always behind `prefers-reduced-motion`.
- Light **and** dark mode are both first-class (theme toggle in nav).
- Real Latvian copy, real numbers, real customer (Finestra). Never
  Lorem Ipsum or fake testimonials.

What this site is NOT:
- ❌ Generic shadcn template
- ❌ Rainbow / multi-hue gradients (only violet→teal)
- ❌ Glassmorphism, 3D blobs as the *whole* background
- ❌ "Trusted by 1000+ companies" placeholder logo walls
- ❌ Buzzword copy ("transform", "revolutionize", "synergy")

═══════════════════════════════════════════════════════════════════
## 3. TYPOGRAPHY SYSTEM
═══════════════════════════════════════════════════════════════════

### Fonts (via `next/font/google`, CSS variables in `app/layout.tsx`)
- **Hanken Grotesk** → default UI, body, headlines (`--font-hanken`,
  exposed as `--font`)
- **Inter** → the real-app mockup only (`.ooapp`, `--font-inter`), to
  match the actual product UI
- **JetBrains Mono** → numbers, eyebrows, timers, URLs, technical
  labels (`--font-jetbrains`, exposed as `--mono`)

### Scale
- Hero h1 (`#heroTitle`): `clamp(42px, 7.4vw, 90px)`, weight 800,
  `letter-spacing: -.045em`, `line-height: .98`
- Section h2 (`.sec-head h2`): `clamp(32px, 4.6vw, 52px)`
- Statement h2 (`.stmt h2`): `clamp(34px, 5.4vw, 64px)`
- Spot h3: `clamp(27px, 3.6vw, 42px)`
- Headings: weight 800, tight tracking. No trailing period in the hero
  except the deliberate "ekrānā." full stop.

### Signature move
The last hero word (`.hl`) gets a **violet→teal underline swipe**
(`::before`, animates in). One statement word gets `.hl2` (solid
violet). Use these sparingly — one accent per section.

═══════════════════════════════════════════════════════════════════
## 4. COLOR SYSTEM (CSS tokens in `app/globals.css`)
═══════════════════════════════════════════════════════════════════

### Light (`:root`)
- `--bg` #ffffff · `--bg-soft` #f7f7f9 · `--card` #ffffff
- `--ink` #0d0d12 · `--ink-soft` #56565f · `--ink-mute` #8b8b95
- `--line` #ececf1 · `--line-2` #e0e0e7
- `--violet` #7c3aed · `--teal` #14b8a6 · `--coral` #ff6b4a ·
  `--pink` #ec4899 · `--ok` #0d9488

### Dark (`html[data-theme="dark"]`)
- `--bg` #0a0a0f · `--bg-soft` #101017 · `--card` #14141c
- `--ink` #f3f3f7 · `--ink-soft` #a8a8b3 · `--ink-mute` #6c6c78
- `--violet` #a78bfa · `--teal` #2dd4bf (brighter for contrast)

### The accent gradient
`linear-gradient(135deg, #7c3aed, #14b8a6)` (violet→teal). Used for:
underline swipe, progress bar, `.bar i` fills, avatars, checkmark
circles, tstat numbers. **Never** introduce a third hue.

### Rules
- Always use the tokens, never hard-code hex in components (exception:
  the `.ooapp` mockup, which is intentionally locked to the real app's
  light palette regardless of theme).
- Both themes must be tested for every change.

═══════════════════════════════════════════════════════════════════
## 5. LAYOUT & SPACING
═══════════════════════════════════════════════════════════════════

- Container: `.wrap` = `max-width: 1140px`, `padding: 0 28px` (18px on
  mobile).
- Section rhythm: `section.block { padding: 96px 0 }`.
- Section head: centered, `max-width: 640px`, with a `.kicker` pill
  eyebrow (violet on violet-soft).
- Product tour uses asymmetric `.spot` grids (1.02fr / 1fr), alternating
  sides via `.spot.rev`.
- Breakpoints collapse at 900px and 680px (see `globals.css` media
  queries). Everything must work at 375px.

═══════════════════════════════════════════════════════════════════
## 6. SECTIONS (order = page order)
═══════════════════════════════════════════════════════════════════

1. **Nav** (`Nav.tsx`) — sticky, blur, logo wordmark, centered links,
   theme toggle, "Pieslēgties" → app, "Sākt bez maksas" → #cenas,
   mobile menu.
2. **Hero** (`Hero.tsx`) — badge, headline reveal, sub, CTAs, 4-tab
   rotating product mockup (`#tabs`/`#panels`/`#mock`) + floating bob
   cards + blobs.
3. **Statement** (`Statement.tsx`) — "Beidz minēt. Sāc redzēt." + chips.
4. **Product tour** (`ProductTour.tsx`) — 3 spotlights: Kanban board,
   tablet timer device, profit report.
5. **Project detail** (`ProjectDetail.tsx`) — the 1:1 `.ooapp`
   real-time monitoring dashboard.
6. **Trust** (`Trust.tsx`) — Finestra quote + 4 stat tiles.
7. **Assurance** (`Assurance.tsx`) — 4-item guarantee strip.
8. **Pricing** (`Pricing.tsx`) — 3 plans €69 / €199 / €499, "pop" =
   Professional. Buttons open the demo modal.
9. **FAQ** (`Faq.tsx`) — accordion, 6 items.
10. **Contact** (`Contact.tsx`) — founder card, demo button + tel +
    WhatsApp.
11. **Final CTA** (`FinalCta.tsx`) — dark rounded card, "Atstāj Excel
    aiz muguras".
12. **Footer** (`Footer.tsx`) — brand, link columns, visual LV/EN/RU
    toggle.
- **FloatCta** (fixed demo button), **DemoModal**, **SiteInteractions**
  render once at the page root.

═══════════════════════════════════════════════════════════════════
## 7. ANIMATION / INTERACTIVITY
═══════════════════════════════════════════════════════════════════

All JS lives in `components/site/SiteInteractions.tsx` (a single client
component that wires the server-rendered markup). Behaviours:
- Theme toggle (persisted to `localStorage` `oo-theme`; no-flash init
  script in `layout.tsx`)
- Sticky-nav shadow on scroll · scroll progress bar
- Hero headline word reveal · tab auto-rotation (3.4s) + click
- Scroll reveal (`.reveal` → `.in`) + animated bar/chart fills
- Hero blob + mockup parallax, magnetic primary buttons (fine pointer +
  motion allowed only)
- FAQ accordion (max-height) · live tablet timer · footer lang toggle
- Mobile menu open/close

**Rules:** respect `prefers-reduced-motion` (the CSS media query kills
animations; JS parallax is also gated). No bouncy springs beyond the
existing tab pill easing. Keep all listeners/timers cleaned up on unmount.

═══════════════════════════════════════════════════════════════════
## 8. COPY RULES
═══════════════════════════════════════════════════════════════════

- Latvian, informal "tu". Confident, specific, blunt. Short sentences.
- Ban buzzwords: "transform", "revolucionē", "sinerģija", "platforma".
- Prefer: "vienkārši", "skaidri", "redz", "vada", "taupa", "zina".
- CTAs: "Pieprasi demo", "Izmēģināt par brīvu", "Sākt bez maksas". Never
  "Learn more" / "Get started".
- **Never change copy, prices (€69/€199/€499), or contact details
  without explicit permission.**

═══════════════════════════════════════════════════════════════════
## 9. CONTENT INVENTORY (real, verified)
═══════════════════════════════════════════════════════════════════

- Real customer: **SIA Finestra** (Liepāja) — windows/doors. Quote:
  8h/week saved, 47 orders in one view, 22 Excel files → 0.
- Founder: **Rūdolfs Šuklais**. Public narrative: "small team, you talk
  to the founder directly." Never state exact team size / solo.
- Contacts (do not change): tel +371 20 510 502 · wa.me/37120510502 ·
  E-pasts (footer) ruudisrudolfs@gmail.com. The demo form backend sends
  to rudolfs@openoura.com (server-side, not shown).
- Prices: €69 (Starter) / €199 (Professional, popular) / €499
  (Enterprise), all "bez PVN".
- Mockup placeholder data (keep consistent): orders #2611–#2621,
  projects P-226…P-235, workers Jānis Bērziņš, Anna Kalniņa, etc.

═══════════════════════════════════════════════════════════════════
## 10. TECHNICAL STACK
═══════════════════════════════════════════════════════════════════

- Next.js 15 App Router · TypeScript strict · CSS in `app/globals.css`
  (design-token / class based — **not** Tailwind utilities; Tailwind
  preflight is intentionally not loaded)
- `next/font` for Hanken Grotesk / Inter / JetBrains Mono
- Demo form → real Server Action `app/actions/demo-request.ts` (Resend
  + rate limit + confirmation email), triggered from any `[data-demo]`
  element via `DemoModal.tsx`
- Analytics preserved: PostHog + Meta Pixel/CAPI (`lib/`, `components/
  analytics/`, `MetaPixel.tsx`). Keep these wired.
- Language toggle (LV/EN/RU) is **visual only** — no i18n routing yet.
- Assets in `public/`: `openoura-logo.png` (wordmark),
  `openoura_founder.jpeg`, `finestra_logo.png`.

### File structure
```
app/
  layout.tsx          # fonts, theme init, progress+noise, analytics
  page.tsx            # composes sections
  globals.css         # full design system (ported prototype CSS)
  actions/demo-request.ts
components/site/
  Nav · Hero · Statement · ProductTour · ProjectDetail · Trust ·
  Assurance · Pricing · Faq · Contact · FinalCta · Footer · FloatCta
  DemoModal.tsx       # real demo form (client)
  SiteInteractions.tsx# all client-side behaviour (client)
  icons.tsx           # shared inline SVGs
components/            # analytics + JsonLd (kept). Legacy editorial
                      # components (Problem/Solution/…) remain on disk
                      # but are NOT used by page.tsx.
```

═══════════════════════════════════════════════════════════════════
## 11. WHEN BUILDING / CHANGING A SECTION — CHECKLIST
═══════════════════════════════════════════════════════════════════

1. [ ] Does it match the prototype `openoura-landing.html`?
2. [ ] Uses CSS tokens (no hard-coded hex outside `.ooapp`)?
3. [ ] Works in light AND dark mode?
4. [ ] Motion gated by `prefers-reduced-motion`; listeners cleaned up?
5. [ ] Real numbers / names, not placeholders?
6. [ ] Demo CTAs use `[data-demo]` (+ `data-cta` for analytics)?
7. [ ] Tested at 375px, tablet, desktop?
8. [ ] Copy/prices/contacts unchanged (unless permission given)?

═══════════════════════════════════════════════════════════════════
END OF GUIDELINES
═══════════════════════════════════════════════════════════════════
