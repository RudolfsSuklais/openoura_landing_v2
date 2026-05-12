import Image from "next/image";
import { FadeUp } from "./FadeUp";
import { FinestraCounters } from "./FinestraCounters";

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
          {/* client logo, left */}
          <FadeUp className="col-span-12 lg:col-span-5">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-md border hairline bg-paper flex items-center justify-center p-10 md:p-14"
              style={{ transform: "rotate(-1deg)" }}
            >
              <Image
                src="/finestra_logo.png"
                alt="Finestra Solution"
                width={520}
                height={260}
                className="w-full h-auto max-h-[60%] object-contain"
              />
              <div className="absolute left-4 bottom-4 mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Finestra Solution · Liepāja · klients kopš 2025
              </div>
            </div>
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
                  <div className="text-[13px] text-ash">Īpašnieks, SIA Finestra</div>
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

            <FadeUp delay={0.32}>
              <FinestraCounters />
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

