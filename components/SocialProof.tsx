"use client";

import { FadeUp } from "./FadeUp";

export function SocialProof() {
  return (
    <section className="relative pt-32 md:pt-48 pb-32 md:pb-48 border-t hairline">
      <div className="mx-auto max-w-page px-6 md:px-10">
        <FadeUp>
          <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted mb-12 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-ink/40" />
            Klients · 06
          </div>
        </FadeUp>

        <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-start">
          {/* photo placeholder, left */}
          <FadeUp className="col-span-12 lg:col-span-5">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-md border hairline"
              style={{ transform: "rotate(-1deg)" }}
            >
              <PhotoPlaceholder />
              <div className="absolute left-4 bottom-4 mono text-[10px] text-paper/90 bg-ink/70 backdrop-blur px-2 py-1 rounded">
                Finestra ražotne · Liepāja · 2025
              </div>
            </div>
            <p
              className="mt-4 serif-italic text-marker text-[15px]"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              ↑ īsta ražotne, nevis stoka foto
            </p>
          </FadeUp>

          {/* quote, right */}
          <div className="col-span-12 lg:col-span-7 lg:pl-8">
            <FadeUp>
              <span
                aria-hidden
                className="serif-italic text-[8rem] md:text-[12rem] leading-[0.6] text-ink/10 select-none block -mb-6"
              >
                “
              </span>
            </FadeUp>
            <FadeUp delay={0.05}>
              <blockquote className="font-serif text-[32px] md:text-[44px] leading-[1.15] tracking-tight text-ink">
                Pirms OpenOura mums bija 22 Excel faili un divi cilvēki, kas
                viņus turēja kopā. Tagad nav nevienā no tiem. Pirmdienās es
                vairs nedzirdu jautājumu <span className="serif-italic">“kurš
                ir jaunākais?”</span> — un tas pats par sevi ir vērts naudu.
              </blockquote>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="mt-10 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-ink/10 grid place-items-center mono text-[12px] text-ink/70">
                  G
                </div>
                <div>
                  <div className="text-[15px] font-medium">Gatis</div>
                  <div className="text-[13px] text-ash">Īpašnieks, SIA Finestra · 34 darbinieki</div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.25}>
              <div className="mt-10 grid grid-cols-3 gap-0 border-t hairline pt-6">
                {[
                  { v: "8h", k: "ietaupīts nedēļā" },
                  { v: "0", k: "Excel faili" },
                  { v: "6 mēn.", k: "lietotāji bez pārtraukuma" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="mono text-[28px] tracking-tightest leading-none">{s.v}</div>
                    <div className="mt-2 text-[12px] text-ash uppercase tracking-wider mono">
                      {s.k}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotoPlaceholder() {
  // A composed SVG that suggests a workshop floor — not a stock photo, not 3D blobs.
  return (
    <svg
      viewBox="0 0 400 500"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="floor" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#E8E4D7" />
          <stop offset="0.55" stopColor="#D7CFB6" />
          <stop offset="1" stopColor="#A89878" />
        </linearGradient>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#F2EEDF" />
          <stop offset="1" stopColor="#DCD3B8" />
        </linearGradient>
      </defs>
      <rect width="400" height="280" fill="url(#sky)" />
      <rect y="280" width="400" height="220" fill="url(#floor)" />
      {/* ceiling beams */}
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x={i * 60 - 10} y="20" width="6" height="80" fill="#8a7a55" opacity="0.5" />
      ))}
      <rect x="0" y="100" width="400" height="6" fill="#a89878" opacity="0.5" />
      {/* benches */}
      <rect x="40" y="260" width="140" height="40" fill="#7e6a44" />
      <rect x="44" y="300" width="6" height="60" fill="#5a4a2e" />
      <rect x="170" y="300" width="6" height="60" fill="#5a4a2e" />

      <rect x="220" y="290" width="150" height="30" fill="#8a754d" />
      <rect x="226" y="320" width="6" height="50" fill="#5a4a2e" />
      <rect x="360" y="320" width="6" height="50" fill="#5a4a2e" />

      {/* boards on a bench */}
      <rect x="50" y="248" width="120" height="12" fill="#c4a76b" />
      <rect x="50" y="240" width="120" height="6" fill="#b29456" />

      {/* worker silhouette */}
      <g transform="translate(110 200)">
        <circle r="14" cx="0" cy="0" fill="#3a3530" />
        <rect x="-18" y="12" width="36" height="48" rx="6" fill="#5b5043" />
        <rect x="-22" y="58" width="18" height="36" fill="#1f1c18" />
        <rect x="4" y="58" width="18" height="36" fill="#1f1c18" />
      </g>

      {/* hanging lamp */}
      <line x1="300" y1="20" x2="300" y2="100" stroke="#222" strokeWidth="1.5" />
      <circle cx="300" cy="108" r="10" fill="#f2e2a8" />
      <circle cx="300" cy="108" r="18" fill="#f2e2a8" opacity="0.2" />

      {/* dust / atmosphere */}
      {Array.from({ length: 40 }).map((_, i) => (
        <circle
          key={i}
          cx={(i * 37) % 400}
          cy={((i * 53) % 260) + 30}
          r="0.8"
          fill="#fff"
          opacity={0.25}
        />
      ))}
    </svg>
  );
}
