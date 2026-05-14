# OpenOura Landing Page — Design System & Guidelines

This is the design and code reference for openoura.com landing page.
Every new section, component, or change MUST follow this document.
If anything in this file conflicts with a user request, ask before deviating.

═══════════════════════════════════════════════════════════════════
## 1. THE BIG IDEA
═══════════════════════════════════════════════════════════════════

OpenOura is a simple manufacturing management tool (mini ERP) for 
small Latvian manufacturers. Pricing starts at €69/month.

The landing page communicates ONE truth:
"Excel ir tavs sliktākais darbinieks ražošanā."
(Excel is your worst employee in manufacturing.)

Every section reinforces this. We are anti-Excel, not pro-features.
We sell *clarity*, not software.

Audience: Latvian manufacturing business owners, 35-55 years old, 
5-30 employees, currently using Excel + paper + WhatsApp to run 
production. They visit the page from mobile on Monday morning with 
coffee. They give us 5 seconds.

═══════════════════════════════════════════════════════════════════
## 2. DESIGN PHILOSOPHY
═══════════════════════════════════════════════════════════════════

This site is EDITORIAL. Think New York Times opinion piece meets 
Linear.app product page. Not a SaaS template.

Core principles:
- Typography is the hero element, not illustrations
- Whitespace is content, not waste
- Hard-left alignment everywhere, NOT centered (except where 
  explicitly justified)
- Asymmetric grids (60/40, 70/30) — never perfect 50/50
- One bold idea per section, never feature-soup
- Real Latvian copy, real Latvian numbers, real Latvian customer 
  names — NEVER placeholder Lorem Ipsum or fake testimonials
- Confident, not friendly. We don't beg. We assert.

What this site is NOT:
- ❌ Generic shadcn template
- ❌ Notion / Linear clone with rainbow gradients
- ❌ 3D floating blobs, glassmorphism, animated mesh
- ❌ "Trusted by 1000+ companies" placeholder logos
- ❌ Emoji-driven feature cards
- ❌ "Transform your business" buzzword copy

═══════════════════════════════════════════════════════════════════
## 3. VISUAL REFERENCES
═══════════════════════════════════════════════════════════════════

Study and emulate (in this order of importance):
1. linear.app — massive type, hard-left, restraint
2. vercel.com — spacing rhythm, navbar simplicity
3. stripe.com — copy confidence, no buzzwords
4. arc.net — color restraint, one accent
5. pitch.com — typography as the hero
6. resend.com — minimalist with character
7. cron.com / Notion Calendar — section transitions

Do NOT reference:
- AWS, Salesforce, SAP landing pages
- Any "enterprise" SaaS aesthetic
- Generic Tailwind UI templates

═══════════════════════════════════════════════════════════════════
## 4. TYPOGRAPHY SYSTEM
═══════════════════════════════════════════════════════════════════

### Fonts
- **Display & Italic accents:** Instrument Serif
  - Used for emphasis words inside headlines (italic)
  - Used for editorial annotations
- **UI, body, headlines:** Geist Sans
  - Default for everything
- **Numbers, stats, eyebrows, metadata:** Geist Mono
  - Used for: "MANIFESTS · 01", timestamps, stats, "90s", 
    section numbers, technical labels

### Scale (h1 — section heroes)
- Hero h1: text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem]
- Section h2: text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem]
- Sub-section h3: text-[2rem] md:text-[3rem]
- Always: leading-[0.9], tracking-[-0.04em]

### The Signature Move
Inside any major headline, ONE word is set in 
`serif-italic gradient-text` — Instrument Serif italic + 
violet→pink 135deg gradient. This is the brand's visual hook. 
Use ONCE per section maximum.

### Rules
- Headlines do NOT end with a period (manifesto style)
- Body text: 17px mobile, 20px desktop, leading-[1.45]
- Eyebrow tags ("MANIFESTS · 01"): 11px Geist Mono uppercase, 
  tracking-[0.18em], with hairline before text
- Subheads: max-w-[36ch] md:max-w-[42ch] lg:max-w-[46ch]

═══════════════════════════════════════════════════════════════════
## 5. COLOR SYSTEM
═══════════════════════════════════════════════════════════════════

### Palette
- `--paper` (background): #FAFAF7 — warm off-white, NEVER pure white
- `--ink` (primary text): #0A0A0A — near-black, NEVER pure black
- `--ash` (secondary text): #4B4B4B — body copy
- `--muted` (tertiary text): #6B6B6B — meta, captions
- `--hairline`: rgba(10,10,10,0.08) — subtle borders
- `--marker` (handwritten red): #D93838 — annotations only

### Accent
- Gradient: `linear-gradient(135deg, #8B5CF6 → #EC4899)`
- Class: `gradient-text` (foreground), `gradient-bg` (background)
- Used ONCE per section maximum, for the signature italic word

### Dark sections (rare, used for emphasis)
- Background: #0A0A0A
- Text: #FAFAF7
- Used only for: testimonial quote, final CTA, key statistical 
  reveals — NEVER for default sections

### Rules
- NO multi-color gradients ever
- NO rainbow effects
- Status badges: soft-amber (#FEF3C7 bg + #92400E text), 
  soft-blue (#DBEAFE + #1E40AF), soft-gray (#F3F4F6 + #4B5563)

═══════════════════════════════════════════════════════════════════
## 6. LAYOUT RULES
═══════════════════════════════════════════════════════════════════

### Spacing
- Section vertical padding: pt-24 md:pt-32 lg:pt-40, pb-24 md:pb-32
- Sections separated by min 200px on desktop
- Container: max-w-page (1440px), px-6 md:px-10
- Content blocks within sections: never wider than 1000px

### Grid
- DEFAULT: hard-left alignment, no centering
- Two-column splits: 60/40 or 70/30, never 50/50
- Feature lists: vertical stacks with generous spacing, 
  NOT 3-column grids of equal cards
- One exception: "Numbers that matter" section MAY be centered 
  for stats emphasis

### Section transitions
- Each section starts with a small Geist Mono eyebrow:
  "PROBLĒMA · 02", "RISINĀJUMS · 03", etc.
- Eyebrow includes hairline divider before text
- Numbers continue from hero (which is "MANIFESTS · 01")

═══════════════════════════════════════════════════════════════════
## 7. COPY RULES
═══════════════════════════════════════════════════════════════════

### Language
- Primary: Latvian (formal "tu" form, not "jūs" — we speak 
  directly to one business owner)
- Secondary: English (toggle in nav, separate routes)
- NEVER use both languages in the same line

### Tone
- Confident, specific, blunt
- We assume the reader is smart and busy
- Short sentences. Sometimes very short. Like this.
- We name names (Finestra, Koks & Co), we cite numbers (€69, 8h, 47)
- Anti-buzzword: ban these words entirely:
  ❌ "transform", "revolutionize", "empower", "synergy", 
     "digitalizācija" (overused), "inovācija", "platforma"
- Preferred:
  ✅ "vienkārša", "skaidri", "redz", "vada", "taupa", "zina"

### Headlines
- One bold claim per section
- No questions in major headlines (they feel weak)
- Use italic + gradient on ONE emphasis word

### CTAs
- Primary: "Pieprasi demo" (black pill, white text)
- Secondary: "Skaties video" with 90s timer hint
- Final section: "Sāc šomēnes" or "Pieraksties sarunai"
- NEVER: "Learn more", "Get started", "Sign up free"

═══════════════════════════════════════════════════════════════════
## 8. CONTENT INVENTORY (real, verified)
═══════════════════════════════════════════════════════════════════

### Real customers (use for social proof)
- Finestra Solution (Liepāja) — window/door manufacturer, primary 
  reference customer (legal entity: SIA Finestra)
- [Add more as Rudolfs gets permissions]

### Real product modules
- Production scheduler with TV Display mode
- BOM & warehouse
- AI invoice parsing (Anthropic Haiku)
- Forma 2 (Pabeigto darbu akts)
- Employee time tracking
- CMR documents
- Estimates & profitability

### Real numbers (verified by Rudolfs)
- Starting price: €69/month
- Tiers: €69 / €199 / €499
- Database tables: 45
- Codebase: ~62k lines PHP/JS/CSS across ~211 files
- Built solo by 1 developer

### Placeholder data in product mockups (use consistently)
- Date: 11.05.2026
- Time: 08:30 (morning shift start)
- Active orders: 23
- Sample orders:
  • #2614 — Logu rāmji, ozols → SIA Finestra → 13.05 → RAŽO
  • #2613 — Durvju komplekts → Koks & Co → 14.05 → TĀME
  • #2612 — Galda virsmas → Ozols SIA → 15.05 → RAŽO
  • #2611 — Plauktu sistēma → Mājīgi.lv → 17.05 → GAIDA

═══════════════════════════════════════════════════════════════════
## 9. SIGNATURE DESIGN MOVES (use across sections)
═══════════════════════════════════════════════════════════════════

These are the brand's recurring visual elements. Use them — but 
not all at once. Mix and match per section.

1. **The italic-gradient word** — ONE emphasis word per section, 
   set in Instrument Serif italic + violet→pink gradient

2. **Eyebrow with hairline** — small Geist Mono tag above every 
   section title: `── MANIFESTS · 01`

3. **Marker annotations** — red handwritten serif-italic notes 
   pointing to specific UI elements with hand-drawn SVG arrows. 
   Use sparingly, only where they add information.

4. **Slight rotations** — UI mockups tilted 0.6° to 2° for 
   "set on a desk" feel. Annotations rotated -3°.

5. **Film grain overlay** — 6% opacity SVG noise covering 
   the entire page (already in layout.tsx)

6. **Hairline dividers** — 1px borders at rgba(10,10,10,0.08), 
   used between major content blocks

7. **Snake_case section numbers** — every major section numbered 
   in eyebrow: 01 (Manifests / Hero), 02 (Problēma), 03 (Risinājums), 
   04 (Skaitļi / Numbers), 05 (Brutāls godīgums / WhoItsFor), 
   06 (Klients / SocialProof), 07 (Autors / Founder), 
   08 (Cenas / Pricing), 09 (Sākums / FinalCTA)

═══════════════════════════════════════════════════════════════════
## 10. ANIMATION RULES
═══════════════════════════════════════════════════════════════════

Use `framer-motion` for ONE animation pattern only:

```tsx

  

```

- Fade up 20px on scroll-into-view
- Stagger delays: 0, 0.05, 0.15, 0.25, 0.4 (manifesto rhythm)
- Duration: 0.6s, easing: cubic-bezier(0.16, 1, 0.3, 1)

NO bouncy springs. NO horizontal slides. NO parallax. 
NO scroll-triggered counters. NO marquee unless explicitly 
requested. The animation should be invisible — you notice the 
content, not the motion.

═══════════════════════════════════════════════════════════════════
## 11. TECHNICAL STACK
═══════════════════════════════════════════════════════════════════

- Next.js 15 App Router
- TypeScript strict mode
- Tailwind CSS (config has custom colors above)
- shadcn/ui components allowed but customize aggressively — 
  default shadcn looks like every other site
- framer-motion for FadeUp only
- next/font for Instrument Serif, Geist Sans, Geist Mono
- Hosting: Vercel

### File structure
app/
layout.tsx          # Film grain overlay lives here
page.tsx            # Composes sections
globals.css         # Custom CSS vars + gradient classes
components/
Nav.tsx             # Sticky header + mobile fullscreen menu
Hero.tsx            # Section 01 — Manifests
Problem.tsx         # Section 02 — Problēma
Solution.tsx        # Section 03 — Risinājums
Numbers.tsx         # Section 04 — Skaitļi
WhoItsFor.tsx       # Section 05 — Brutāls godīgums
SocialProof.tsx     # Section 06 — Klients
Founder.tsx         # Section 07 — Autors (Rudolfs)
Pricing.tsx         # Section 08 — Cenas
FinalCTA.tsx        # Section 09 — Sākums (contact + demo form)
FadeUp.tsx          # Animation wrapper
ProductSketch.tsx   # Reusable product mockup
WhatsAppButton.tsx  # Floating CTA (hides over #demo)
JsonLd.tsx          # Organization + SoftwareApplication schemas

═══════════════════════════════════════════════════════════════════
## 12. WHEN BUILDING A NEW SECTION
═══════════════════════════════════════════════════════════════════

Checklist before writing code:

1. [ ] What is the ONE idea this section communicates?
2. [ ] What word in the headline gets the italic-gradient treatment?
3. [ ] What's the eyebrow tag? (e.g. "PROBLĒMA · 02")
4. [ ] Is the layout hard-left aligned? Asymmetric grid?
5. [ ] Are real numbers / real names used, not placeholders?
6. [ ] Is the CTA copy specific, not generic?
7. [ ] Does typography do the heavy lifting, or am I leaning on 
       illustrations/icons?
8. [ ] Does this section look INTENTIONALLY DIFFERENT from a 
       generic SaaS section, or am I defaulting to shadcn?
9. [ ] Mobile breakpoint tested at 375px?
10. [ ] Does this section reinforce "Excel ir sliktākais 
        darbinieks", or is it just decorative?

If any answer is unclear, ASK before writing code.

═══════════════════════════════════════════════════════════════════
## 13. ANTI-PATTERNS — NEVER DO
═══════════════════════════════════════════════════════════════════

❌ 3-column grid of identical feature cards with emoji icons
❌ "Trusted by [logo wall]" without real customer names
❌ Gradient backgrounds covering large areas
❌ Animated mesh / blob backgrounds
❌ Glassmorphism cards
❌ Centered layouts as the default
❌ Sentence-case CTAs ("Learn more")
❌ Stock illustration humans pointing at screens
❌ "✨ AI-powered" copy anywhere
❌ Generic testimonial slider with avatar circles
❌ "Pricing toggle" annual/monthly with 20% off badge
❌ FAQ accordion at bottom of page

═══════════════════════════════════════════════════════════════════
END OF GUIDELINES
═══════════════════════════════════════════════════════════════════