"use client";

import { FadeUp } from "./FadeUp";
import { trackCtaClick } from "@/lib/analytics";
import { useSectionView } from "./analytics/useSectionView";

const EXCEL_FILES = [
  { name: "Pasūtījumi_2025_v3_FINAL.xlsx", rot: -3 },
  { name: "Pasūtījumi_2025_v3_FINAL_v2.xlsx", rot: 2 },
  { name: "Pasūtījumi_2025_v3_FINAL_REAL.xlsx", rot: -1 },
  { name: "Pasūtījumi_jaunais.xlsx", rot: 4 },
  { name: "Pasūt_kopija_Anna.xlsx", rot: -2 },
];

type Cell = { name: string; task: string | null };
const WORKSHOP: Cell[] = [
  { name: "Jānis", task: "#2614" },
  { name: "Toms", task: "?" },
  { name: "Pauls", task: null },
  { name: "Māris", task: "#2613" },
  { name: "Krišs", task: "?" },
  { name: "Edgars", task: null },
  { name: "Reinis", task: "#2613" },
  { name: "Jurģis", task: "#2612" },
  { name: "Raivis", task: "?" },
  { name: "Vilis", task: null },
  { name: "Andris", task: "?" },
  { name: "Dāvis", task: "#2611" },
  { name: "Imants", task: "?" },
  { name: "Mārtiņš", task: "?" },
  { name: "Pēteris", task: null },
];

export function Problem() {
  const sectionRef = useSectionView<HTMLElement>("viewed_problem");
  return (
    <section
      ref={sectionRef}
      id="problema"
      className="relative pt-32 md:pt-48 lg:pt-56 pb-32 md:pb-40 border-t hairline scroll-mt-20 md:scroll-mt-24"
    >
      <div className="mx-auto max-w-page px-6 md:px-10">
        {/* framing note — quotes are illustrative, not verified testimonials */}
        <FadeUp>
          <div className="mono text-[10px] uppercase tracking-[0.16em] text-muted/70 mb-4">
            Balstīts uz sarunām ar Latvijas ražotājiem · 2025
          </div>
        </FadeUp>

        {/* eyebrow */}
        <FadeUp>
          <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted mb-12 md:mb-16 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-ink/40" />
            Problēma · 02
          </div>
        </FadeUp>

        {/* h2 — "vadīt" gets the signature italic + gradient */}
        <FadeUp delay={0.05}>
          <h2 className="font-medium leading-[0.9] tracking-[-0.04em] text-ink text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem]">
            <span className="block">Ja nav datu,</span>
            <span className="block">
              tad nav iespējams{" "}
              <span className="serif-italic gradient-text">vadīt</span>
            </span>
          </h2>
        </FadeUp>

        {/* sub-paragraph */}
        <FadeUp delay={0.1}>
          <p className="mt-10 md:mt-14 max-w-[36ch] md:max-w-[42ch] lg:max-w-[46ch] text-[17px] md:text-[20px] leading-[1.45] text-ash">
            Tā strādā lielākā daļa Latvijas ražotāju. 20 Excel faili, tāmes uz
            papīra, pavadzīmes manuāli. Un piektdienas vakarā vadītājs joprojām
            nezina, vai būs peļņa.
          </p>
        </FadeUp>

        {/* ───── PROBLEM ROWS ─────
            Mobile: horizontal snap-carousel (each row = one card).
            Desktop: vertical stack (unchanged). */}
        <div className="mt-20 md:mt-28 -mx-6 md:mx-0 flex md:block overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pl-6 md:pl-0 pr-6 md:pr-0 gap-4 md:gap-0 pb-4 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* === 01 — EXCEL HAOSS === */}
          <FadeUp delay={0.05} className="shrink-0 w-[88vw] md:w-auto snap-start">
            <div className="border md:border-0 md:border-t hairline rounded-md md:rounded-none px-5 md:px-0 py-10 md:py-16 grid grid-cols-12 gap-x-6 gap-y-8 md:gap-y-10">
              <div className="col-span-12 md:col-span-1">
                <div className="mono tabular-nums text-[3rem] md:text-[4rem] leading-none text-muted/40">
                  01
                </div>
              </div>

              <div className="col-span-12 md:col-span-7">
                <h3 className="text-[2rem] md:text-[3rem] font-medium leading-[1.0] tracking-[-0.03em] mb-5 md:mb-6">
                  Excel haoss
                </h3>
                <p className="text-[17px] md:text-[20px] leading-[1.45] text-ash max-w-[52ch] mb-8">
                  Projektu plāni, tāmes, materiālu uzskaite — viss izkliedēts
                  vairākos Excel failos. Pusi laika neviens neredz aktuālo
                  informāciju. Otru pusi laika cilvēki strādā pēc faila, kas
                  sabojājās otrdien.
                </p>
                <blockquote className="hidden md:block border-l border-ink/15 pl-5 max-w-[40ch]">
                  <p className="serif-italic text-[18px] md:text-[22px] leading-[1.35] text-ink">
                    “Anna iesūtīja jauno versiju, bet es jau biju sācis labot
                    veco. Kuru tagad lietot?”
                  </p>
                  <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted mt-3">
                    — Ražotājs, Kuldīga
                  </div>
                </blockquote>
              </div>

              <div className="col-span-12 md:col-span-4">
                <div className="relative h-[280px] md:h-[300px] max-w-[380px] md:max-w-none mx-auto md:mx-0">
                  {EXCEL_FILES.map((file, i) => (
                    <div
                      key={file.name}
                      className="absolute left-0 right-0 bg-paper border hairline rounded-[4px] overflow-hidden shadow-[0_12px_28px_-16px_rgba(10,10,10,0.24)]"
                      style={{
                        top: `${i * 36}px`,
                        transform: `rotate(${file.rot}deg)`,
                        zIndex: i + 1,
                      }}
                    >
                      <div className="flex items-stretch">
                        <div className="w-1 bg-[#107C41]" />
                        <div className="px-4 py-3.5 flex-1 min-w-0 flex items-center gap-2.5">
                          <div
                            className="w-3.5 h-3.5 border border-[#107C41]/60 rounded-[1px] shrink-0"
                            aria-hidden
                          />
                          <div className="mono text-[13px] text-ink truncate">
                            {file.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          {/* === 02 — TĀMES NEATBILST PATIESĪBAI === */}
          <FadeUp delay={0.1} className="shrink-0 w-[88vw] md:w-auto snap-start">
            <div className="border md:border-0 md:border-t hairline rounded-md md:rounded-none px-5 md:px-0 py-10 md:py-16 grid grid-cols-12 gap-x-6 gap-y-8 md:gap-y-10">
              <div className="col-span-12 md:col-span-1">
                <div className="mono tabular-nums text-[3rem] md:text-[4rem] leading-none text-muted/40">
                  02
                </div>
              </div>

              <div className="col-span-12 md:col-span-7">
                <h3 className="text-[2rem] md:text-[3rem] font-medium leading-[1.0] tracking-[-0.03em] mb-5 md:mb-6">
                  Tāmes neatbilst patiesībai
                </h3>
                <p className="text-[17px] md:text-[20px] leading-[1.45] text-ash max-w-[52ch] mb-8">
                  Solīji klientam 2 nedēļas un €5,000. Iznāca 5 nedēļas un
                  €8,000. Un neviens nezina, kur radusies starpība — vai
                  materiāls sadārdzinājās, vai darbinieks strādāja lēni, vai
                  tāme jau sākotnēji bija pārāk optimistiska.
                </p>
                <blockquote className="hidden md:block border-l border-ink/15 pl-5 max-w-[40ch]">
                  <p className="serif-italic text-[18px] md:text-[22px] leading-[1.35] text-ink">
                    “Pēc projekta beigām skaitu zaudējumus. Pirms — nē. Nezinu,
                    kā.”
                  </p>
                  <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted mt-3">
                    — Īpašnieks, Jelgava
                  </div>
                </blockquote>
              </div>

              <div className="col-span-12 md:col-span-4">
                <div
                  className="border hairline rounded-sm bg-paper p-5 md:p-6 max-w-[380px] md:max-w-none shadow-[0_12px_28px_-18px_rgba(10,10,10,0.28)]"
                  style={{ transform: "rotate(1deg)" }}
                >
                  <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted mb-6 flex items-center justify-between">
                    <span>Pasūt. #2589</span>
                    <span className="text-muted/60">tāme · fakts</span>
                  </div>

                  <div className="mb-6">
                    <div className="mono text-[9px] uppercase tracking-[0.16em] text-muted mb-2">
                      Plāns
                    </div>
                    <div
                      className="relative h-10 bg-paper border hairline rounded-[2px]"
                      style={{ width: "55%" }}
                    >
                      <div className="absolute inset-y-0 left-3 flex items-center mono text-[12px] text-ink whitespace-nowrap">
                        €5,000 · 2 ned.
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mono text-[9px] uppercase tracking-[0.16em] text-[#991B1B] mb-2">
                      Reāli
                    </div>
                    <div className="relative h-10 bg-[#FEE2E2] rounded-[2px] w-full">
                      <div className="absolute inset-y-0 left-3 flex items-center mono text-[12px] text-[#991B1B] whitespace-nowrap">
                        €8,000 · 5 ned.
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t hairline mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    +€3,000 · +3 ned. · kur radās?
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* === 03 — MANUĀLA PAVADZĪMJU IEVADE === */}
          <FadeUp delay={0.15} className="shrink-0 w-[88vw] md:w-auto snap-start">
            <div className="border md:border-0 md:border-t hairline rounded-md md:rounded-none px-5 md:px-0 py-10 md:py-16 grid grid-cols-12 gap-x-6 gap-y-8 md:gap-y-10">
              <div className="col-span-12 md:col-span-1">
                <div className="mono tabular-nums text-[3rem] md:text-[4rem] leading-none text-muted/40">
                  03
                </div>
              </div>

              <div className="col-span-12 md:col-span-7">
                <h3 className="text-[2rem] md:text-[3rem] font-medium leading-[1.0] tracking-[-0.03em] mb-5 md:mb-6">
                  Manuāla pavadzīmju ievade
                </h3>
                <p className="text-[17px] md:text-[20px] leading-[1.45] text-ash max-w-[52ch] mb-8">
                  Grāmatvedis pavada stundas, ievadot piegādātāju rēķinus
                  sistēmā. Ar roku. No PDF. Cilvēka kļūdas neizbēgamas — viens
                  nepareizs cipars un mēneša beigās atskaite nesatiek.
                </p>
                <blockquote className="hidden md:block border-l border-ink/15 pl-5 max-w-[40ch]">
                  <p className="serif-italic text-[18px] md:text-[22px] leading-[1.35] text-ink">
                    “Mēneša beigās trīs dienas meklēju vienu €240 kļūdu.”
                  </p>
                  <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted mt-3">
                    — Grāmatvede, Ogre
                  </div>
                </blockquote>
              </div>

              <div className="col-span-12 md:col-span-4">
                <div className="grid grid-cols-2 gap-2.5 max-w-[380px] md:max-w-none">
                  {/* TAGAD */}
                  <div className="bg-[#F3F4F6] border hairline rounded-sm p-3 flex flex-col">
                    <div className="mono text-[9px] uppercase tracking-[0.18em] text-muted mb-3">
                      Tagad
                    </div>
                    <div
                      className="bg-paper border hairline rounded-[2px] p-2 mb-3 space-y-1"
                      aria-hidden
                    >
                      <div className="h-1 w-3/4 bg-ink/20 rounded-full" />
                      <div className="h-1 w-full bg-ink/10 rounded-full" />
                      <div className="h-1 w-5/6 bg-ink/10 rounded-full" />
                      <div className="h-1 w-2/3 bg-ink/10 rounded-full" />
                      <div className="h-1 w-1/2 bg-ink/20 rounded-full" />
                    </div>
                    <div className="mt-auto space-y-0.5">
                      <div className="mono text-[11px] text-ink leading-tight">
                        3h 8min
                      </div>
                      <div className="mono text-[9px] text-muted leading-tight">
                        47 rēķini / ned.
                      </div>
                      <div className="mono text-[10px] uppercase tracking-[0.14em] text-[#991B1B] pt-1.5">
                        kļūdas · augsts
                      </div>
                    </div>
                  </div>

                  {/* AR OPENOURA */}
                  <div className="bg-ink text-paper rounded-sm p-3 flex flex-col overflow-hidden">
                    <div className="mono text-[9px] uppercase tracking-[0.18em] text-paper/50 mb-3">
                      Ar OpenOura
                    </div>
                    <div
                      className="relative bg-paper/[0.06] border border-paper/15 rounded-[2px] p-2 mb-3 space-y-1 overflow-hidden"
                      aria-hidden
                    >
                      <div className="h-1 w-3/4 bg-paper/40 rounded-full" />
                      <div className="h-1 w-full bg-paper/30 rounded-full" />
                      <div className="h-1 w-5/6 bg-paper/30 rounded-full" />
                      <div className="h-1 w-2/3 bg-paper/30 rounded-full" />
                      <div className="h-1 w-1/2 bg-paper/40 rounded-full" />
                      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px gradient-bg" />
                    </div>
                    <div className="mt-auto space-y-0.5">
                      <div className="mono text-[11px] text-paper leading-tight">
                        12 sek.
                      </div>
                      <div className="mono text-[9px] text-paper/50 leading-tight">
                        par rēķinu
                      </div>
                      <div className="mono text-[10px] uppercase tracking-[0.14em] text-paper/70 pt-1.5">
                        kļūdas · 0
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* === 04 — KURŠ KO ŠOBRĪD DARA? === */}
          <FadeUp delay={0.2} className="shrink-0 w-[88vw] md:w-auto snap-start">
            <div className="border md:border-0 md:border-t md:border-b hairline rounded-md md:rounded-none px-5 md:px-0 py-10 md:py-16 grid grid-cols-12 gap-x-6 gap-y-8 md:gap-y-10">
              <div className="col-span-12 md:col-span-1">
                <div className="mono tabular-nums text-[3rem] md:text-[4rem] leading-none text-muted/40">
                  04
                </div>
              </div>

              <div className="col-span-12 md:col-span-7">
                <h3 className="text-[2rem] md:text-[3rem] font-medium leading-[1.0] tracking-[-0.03em] mb-5 md:mb-6">
                  Kurš ko šobrīd dara?
                </h3>
                <p className="text-[17px] md:text-[20px] leading-[1.45] text-ash max-w-[52ch] mb-8">
                  Vadītājs nezina, pie kura uzdevuma katrs darbinieks strādā un
                  vai tiks izpildīts laikā. Atbilde — pastaiga pa ražotni, zvans
                  brigadierim, vai vienkārši cerēt, ka viss kārtībā.
                </p>
                <blockquote className="hidden md:block border-l border-ink/15 pl-5 max-w-[40ch]">
                  <p className="serif-italic text-[18px] md:text-[22px] leading-[1.35] text-ink">
                    “Trešdienā plkst. 14:00 cehā 8 cilvēki. Es zinu 3, ko viņi
                    dara. Pārējie — nē.”
                  </p>
                  <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted mt-3">
                    — Ražošanas vadītājs, Liepāja
                  </div>
                </blockquote>
              </div>

              <div className="col-span-12 md:col-span-4">
                <div
                  className="border hairline rounded-sm bg-paper p-4 md:p-5 max-w-[380px] md:max-w-none shadow-[0_12px_28px_-18px_rgba(10,10,10,0.28)]"
                  style={{ transform: "rotate(1deg)" }}
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      Cehs · trešd.
                    </span>
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink">
                      14:00
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                    {WORKSHOP.map((cell, i) => (
                      <div
                        key={i}
                        className="aspect-square border hairline rounded-[2px] p-1 flex flex-col items-center justify-between bg-paper"
                      >
                        <div className="h-3 flex items-center justify-center leading-none">
                          {cell.task === "?" ? (
                            <span className="serif-italic text-marker text-[14px] leading-none">
                              ?
                            </span>
                          ) : cell.task ? (
                            <span className="mono text-[10px] text-ink/80 leading-none whitespace-nowrap">
                              {cell.task}
                            </span>
                          ) : (
                            <span className="mono text-[10px] text-muted/60 leading-none">
                              ·
                            </span>
                          )}
                        </div>
                        <svg
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5 text-ink/55"
                          fill="currentColor"
                          aria-hidden
                        >
                          <circle cx="12" cy="8" r="3" />
                          <path d="M5 22 C 5 14, 19 14, 19 22 Z" />
                        </svg>
                        <div className="mono text-[10px] text-ink/80 truncate w-full text-center leading-none">
                          {cell.name}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t hairline flex items-center justify-between mono text-[9px] uppercase tracking-[0.14em]">
                    <span className="text-ink">5 zināmi</span>
                    <span className="text-marker">10 ?</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* swipe hint — mobile only */}
        <div className="md:hidden mt-6 flex items-center gap-3 mono text-[10px] uppercase tracking-[0.22em] text-muted">
          <span aria-hidden className="inline-block h-px w-6 bg-ink/25" />
          <span>↔ Velc, lai redzētu vairāk</span>
        </div>

        {/* ───── SECTION FOOTER ───── */}
        <FadeUp delay={0.3}>
          <div className="mt-24 md:mt-32">
            <p className="serif-italic text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] tracking-[-0.02em] max-w-[28ch] text-ink">
              Tu vari to visu{" "}
              <span className="gradient-text">zināt</span>, nevis{" "}
              <span className="gradient-text">minēt</span>.
            </p>
            <div className="mt-12 md:mt-16 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <a
                href="#demo"
                onClick={() => trackCtaClick("problem_footer")}
                className="group inline-flex items-center justify-center gap-2 bg-ink text-paper px-5 py-3.5 rounded-full text-[14px] font-medium tracking-tight hover:opacity-90 transition-opacity self-start"
              >
                Pieprasi demo · 25 min
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="#risinajums"
                className="inline-flex items-center gap-3 mono text-[12px] uppercase tracking-[0.22em] text-muted/70 hover:text-ink transition-colors self-start"
              >
                <span className="inline-block h-px w-8 bg-ink/25" />
                <span>↓ Skaties, kā →</span>
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
