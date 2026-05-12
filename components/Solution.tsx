"use client";

import { FadeUp } from "./FadeUp";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { trackCtaClick } from "@/lib/analytics";
import { useSectionView } from "./analytics/useSectionView";

type Row = { label: string; value: string };

const ERP_ROWS: Row[] = [
  { label: "Ieviešanas laiks", value: "3–6 mēneši" },
  { label: "Sākotnējās izmaksas", value: "€15,000 – €50,000" },
  { label: "Konsultanti", value: "obligāti" },
  { label: "Apmācības", value: "2 nedēļas" },
  { label: "Pielāgošana", value: "caur izstrādātāju" },
  { label: "Atbalsts", value: "tiketu sistēmā · 48h" },
];

const OO_ROWS: Row[] = [
  { label: "Ieviešanas laiks", value: "1 diena" },
  { label: "Sākotnējās izmaksas", value: "€0" },
  { label: "Konsultanti", value: "nav vajadzīgi" },
  { label: "Apmācības", value: "30 min video" },
  { label: "Pielāgošana", value: "e-pasts → 48h" },
  { label: "Atbalsts", value: "WhatsApp · tajā pašā dienā" },
];

export function Solution() {
  const sectionRef = useSectionView<HTMLElement>("viewed_solution");
  return (
    <section
      ref={sectionRef}
      id="risinajums"
      className="relative pt-32 md:pt-48 lg:pt-56 pb-32 md:pb-40 border-t hairline scroll-mt-20 md:scroll-mt-24"
    >
      <div className="mx-auto max-w-page px-6 md:px-10">
        {/* ───── EYEBROW ───── */}
        <FadeUp>
          <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted mb-12 md:mb-16 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-ink/40" />
            Risinājums · 03
          </div>
        </FadeUp>

        {/* ───── H2 ───── */}
        <FadeUp delay={0.05}>
          <h2 className="font-medium leading-[0.9] tracking-[-0.04em] text-ink text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem]">
            <span className="block">Mēs nepiedāvājam tev ERP.</span>
            <span className="block">
              Mēs piedāvājam tev{" "}
              <span className="serif-italic gradient-text">skaidrību</span>.
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mt-10 md:mt-14 max-w-[36ch] md:max-w-[42ch] lg:max-w-[46ch] text-[17px] md:text-[20px] leading-[1.45] text-ash">
            OpenOura nav klasiskais ERP. Nav 6 mēnešu ieviešanas projekta. Nav
            konsultantu komandas. Nav apmācību semināru. Ir tikai septiņi
            moduļi, kas atrisina konkrētas problēmas Latvijas ražotājiem —
            sākot ar pirmo dienu.
          </p>
        </FadeUp>

        {/* ═══════════════════════════════════════════════════════
            BEFORE / AFTER — Excel chaos vs OpenOura clarity
            ═══════════════════════════════════════════════════════ */}
        <FadeUp delay={0.15}>
          <div className="mt-20 md:mt-28">
            <BeforeAfterSlider />
          </div>
        </FadeUp>

        {/* ═══════════════════════════════════════════════════════
            SUB-BLOCK A — KLASISKAIS ERP vs OPENOURA
            ═══════════════════════════════════════════════════════ */}
        <FadeUp delay={0.15}>
          <div className="mt-24 md:mt-32 relative grid grid-cols-1 md:grid-cols-2 md:gap-0">
            {/* vertical divider (desktop) */}
            <span
              aria-hidden
              className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-ink/[0.12]"
            />
            {/* "vs" annotation */}
            <div
              aria-hidden
              className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-4 bg-paper"
              style={{ transform: "translate(-50%, -50%) rotate(-4deg)" }}
            >
              <span className="serif-italic text-marker text-[24px] md:text-[28px] leading-none">
                vs
              </span>
            </div>

            {/* LEFT — klasiskais ERP */}
            <div className="opacity-60 pr-0 md:pr-12 lg:pr-16 pb-10 md:pb-0">
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted mb-6">
                Klasiskais ERP
              </div>
              <ul>
                {ERP_ROWS.map((row, i) => (
                  <li
                    key={row.label}
                    className={`flex items-baseline justify-between gap-4 py-3 ${
                      i === 0 ? "" : "border-t hairline"
                    }`}
                  >
                    <span className="mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      {row.label}
                    </span>
                    <span className="text-[15px] md:text-[16px] text-ash text-right">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT — OpenOura */}
            <div className="pt-10 md:pt-0 md:pl-12 lg:pl-16 border-t md:border-t-0 hairline">
              <div className="mono text-[10px] uppercase tracking-[0.22em] mb-6">
                <span className="gradient-text">OpenOura</span>
              </div>
              <ul>
                {OO_ROWS.map((row, i) => (
                  <li
                    key={row.label}
                    className={`flex items-baseline justify-between gap-4 py-3 ${
                      i === 0 ? "" : "border-t hairline"
                    }`}
                  >
                    <span className="mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      {row.label}
                    </span>
                    <span className="text-[15px] md:text-[16px] text-ink font-medium text-right">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>

        {/* ═══════════════════════════════════════════════════════
            SUB-BLOCK B — SEPTIŅI MODUĻI
            ═══════════════════════════════════════════════════════ */}
        <div className="mt-32 md:mt-48">
          <FadeUp>
            <h3 className="font-medium leading-[0.95] tracking-[-0.03em] text-ink text-[2rem] sm:text-[2.5rem] md:text-[4rem]">
              Septiņi moduļi.{" "}
              <span className="serif-italic gradient-text">Bez ielāpiem</span>.
            </h3>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="mt-8 md:mt-10 max-w-[36ch] md:max-w-[44ch] text-[17px] md:text-[20px] leading-[1.45] text-ash">
              Katrs modulis atrisina konkrētu problēmu, ko tu šobrīd risini ar
              Excel, papīru vai roku.
            </p>
          </FadeUp>

          {/* Mobile: horizontal snap-carousel (one module per card).
              Desktop: vertical stack (unchanged). */}
          <div className="mt-20 md:mt-28 -mx-6 md:mx-0 flex md:block overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pl-6 md:pl-0 pr-6 md:pr-0 gap-4 md:gap-0 pb-4 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* === 01 — RAŽOŠANAS PLĀNOTĀJS === */}
            <ModuleRow
              num="01"
              title="Ražošanas plānotājs"
              body="Visi pasūtījumi vienā skatā. Velc-un-met starp posmiem. TV Display režīms ražotnē — darbinieki redz visus pasūtījumus un to statusus, bez datora un bez paroles."
              kpi="Finestra: 47 aktīvi pasūtījumi · atjaunoti reālajā laikā"
              delay={0.05}
              dashboardPage="planotajs"
            >
              <KanbanSketch />
            </ModuleRow>

            {/* === 02 — BOM UN NOLIKTAVA === */}
            <ModuleRow
              num="02"
              title="BOM un noliktava"
              body="Katrai precei materiālu saraksts. Sistēma rezervē materiālus, brīdina par trūkumiem. Beidzas vai nu materiāli, vai pārsteigumi piektdienas vakarā."
              kpi="2,400 SKU · 0 manuāli atjauninātas Excel rindas"
              delay={0.08}
              dashboardPage="noliktava"
            >
              <BomSketch />
            </ModuleRow>

            {/* === 03 — AI PAVADZĪMJU PARSĒŠANA === */}
            <ModuleRow
              num="03"
              title="AI pavadzīmju parsēšana"
              body="Iemet PDF rēķinu sistēmā — AI nolasa piegādātāju, summu, materiālus, datumu. Ievades laiks: no 4 minūtēm uz 12 sekundēm. Bez kļūdām."
              kpi="3h 8min → 12 sek · vidēji 47 rēķini nedēļā"
              delay={0.1}
              dashboardPage="pavadzimes"
            >
              <AiInvoiceSketch />
            </ModuleRow>

            {/* === 04 — FORMA 2 === */}
            <ModuleRow
              num="04"
              title="Forma 2 (Pabeigto darbu akts)"
              body={`Latvijas būvniecībā un apakšuzņēmējiem — Forma 2 akts ar dalītu „iepriekš paveikto” loģiku. Trīs paneļu redaktors. Eksports XLSX formātā divās valodās.`}
              kpi="LV / EN eksports · viens klikšķis"
              delay={0.12}
            >
              <Forma2Sketch />
            </ModuleRow>

            {/* === 05 — DARBA LAIKA UZSKAITE === */}
            <ModuleRow
              num="05"
              title="Darba laika uzskaite"
              body="Darbinieks planšetē atrod savu uzdevumu, nospiež „Start” un sāk strādāt. Vadītājs beidzot redz, par ko tiek maksāts un vai viss tiks pabeigts laikā."
              kpi="Reālas izmaksas par pasūtījumu · nevis vidējās"
              delay={0.14}
              dashboardPage="monitorings"
            >
              <TimeSketch />
            </ModuleRow>

            {/* === 06 — TĀMES UN RENTABILITĀTE === */}
            <ModuleRow
              num="06"
              title="Tāmes un rentabilitāte"
              body="Veido tāmi no BOM datiem un vidējām darba stundām. Pēc projekta beigām sistēma rāda starpību starp tāmi un reālajām izmaksām. Nākamā tāme būs precīzāka."
              kpi="Tāmes precizitāte uzlabojas ar katru pasūtījumu"
              delay={0.16}
              dashboardPage="tames"
            >
              <EstimateSketch />
            </ModuleRow>

            {/* === 07 — CMR DOKUMENTI === */}
            <ModuleRow
              num="07"
              title="CMR dokumenti"
              body="Eksportē preces uz ES? CMR ir starptautiskās kravas pavadzīme, ko obligāti aizpildīt katram sūtījumam. OpenOura ģenerē tās automātiski no pasūtījuma datiem — bez manuālas ievades, bez izdrukāšanas no piecām dažādām vietām."
              kpi="Eksports PDF · automātiska saglabāšana"
              delay={0.18}
              last
            >
              <CmrSketch />
            </ModuleRow>
          </div>

          {/* swipe hint — mobile only */}
          <div className="md:hidden mt-6 flex items-center gap-3 mono text-[10px] uppercase tracking-[0.22em] text-muted">
            <span aria-hidden className="inline-block h-px w-6 bg-ink/25" />
            <span>↔ Velc, lai redzētu vairāk moduļus</span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            SUB-BLOCK C — PROOF MOMENT (Finestra)
            ═══════════════════════════════════════════════════════ */}
        <FadeUp delay={0.1}>
          <div className="mt-28 md:mt-40 mx-auto max-w-[900px] border hairline bg-paper px-6 md:px-10 lg:px-14 py-12 md:py-16">
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-muted mb-10 md:mb-12 flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-ink/40" />
              Reāli skaitļi · SIA Finestra, Liepāja
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 mb-14 md:mb-16">
              <Stat value="8h" label="ietaupītas nedēļā uz pavadzīmju ievadi" />
              <Stat value="47" label="aktīvi pasūtījumi pārvaldīti vienā skatā" />
              <Stat value="6 mēn." label="lieto OpenOura kopš 2025" />
            </div>

            <div className="border-t hairline pt-6 md:pt-8">
              <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Skaitļi no SIA Finestra · Liepāja · 2026
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ───── SECTION FOOTER — CONVERSION CTA ───── */}
        <FadeUp delay={0.2}>
          <div className="mt-32 md:mt-48">
            <h3 className="font-medium leading-[1.05] tracking-[-0.03em] text-ink text-[1.75rem] md:text-[2.25rem] max-w-[28ch]">
              Gribi redzēt šo savai ražotnei?
            </h3>
            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <a
                href="#demo"
                onClick={() => trackCtaClick("solution_footer")}
                className="group inline-flex items-center justify-center gap-2 bg-ink text-paper px-5 py-3.5 rounded-full text-[14px] font-medium tracking-tight hover:opacity-90 transition-opacity self-start"
              >
                Pieprasi demo · 25 min
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="#cenas"
                className="inline-flex items-center gap-3 mono text-[12px] uppercase tracking-[0.22em] text-muted/70 hover:text-ink transition-colors self-start"
              >
                <span className="inline-block h-px w-8 bg-ink/25" />
                <span>↓ Skaties cenu →</span>
              </a>
            </div>
            <div className="mt-5 mono text-[11px] uppercase tracking-[0.15em] text-muted">
              25 min · bez maksas · WhatsApp vai e-pasts
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────
   MODULE ROW WRAPPER
   ─────────────────────────────────────────────────────────── */

type ModuleRowProps = {
  num: string;
  title: string;
  body: string;
  kpi: string;
  delay?: number;
  last?: boolean;
  dashboardPage?: string;
  children: React.ReactNode;
};

function ModuleRow({
  num,
  title,
  body,
  kpi,
  delay = 0,
  last,
  dashboardPage,
  children,
}: ModuleRowProps) {
  const openInDashboard = (e: React.MouseEvent) => {
    if (!dashboardPage) return;
    // Let the browser handle the smooth scroll to #dashboard via href,
    // then dispatch the page-switch event a beat later so the
    // InteractiveDashboard updates as the user lands on it.
    if (typeof window !== "undefined") {
      window.setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("openoura:show-page", { detail: { page: dashboardPage } }),
        );
      }, 50);
    }
    // Don't preventDefault — the anchor's smooth scroll is the UX.
    void e;
  };

  return (
    <FadeUp delay={delay} className="shrink-0 w-[88vw] md:w-auto snap-start">
      <div
        className={`grid grid-cols-12 gap-x-6 gap-y-8 px-5 md:px-0 py-10 md:py-14 border md:border-0 md:border-t hairline rounded-md md:rounded-none ${
          last ? "md:border-b" : ""
        }`}
      >
        <div className="col-span-12 md:col-span-1">
          <div className="mono tabular-nums text-[2.5rem] md:text-[3.5rem] leading-none text-muted/40">
            {num}
          </div>
        </div>

        <div className="col-span-12 md:col-span-6">
          <h4 className="text-[1.75rem] md:text-[2.5rem] font-medium leading-[1.0] tracking-[-0.03em] mb-5 md:mb-6">
            {title}
          </h4>
          <p className="text-[17px] md:text-[19px] leading-[1.5] text-ash max-w-[52ch] mb-6">
            {body}
          </p>
          {/* KPI hairline — desktop only; keeps mobile cards compact */}
          <div className="hidden md:flex mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-muted items-start gap-3">
            <span className="inline-block h-px w-6 bg-ink/30 mt-2" />
            <span>{kpi}</span>
          </div>
          {dashboardPage && (
            <div className="mt-6 md:mt-7">
              <a
                href="#dashboard"
                onClick={openInDashboard}
                className="group inline-flex items-center gap-2 mono text-[11px] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors"
              >
                <span aria-hidden className="inline-block h-px w-6 bg-ink/30 group-hover:w-8 transition-all" />
                <span>Skaties dashboard ↑</span>
              </a>
            </div>
          )}
        </div>

        <div className="col-span-12 md:col-span-5">{children}</div>
      </div>
    </FadeUp>
  );
}

/* ───────────────────────────────────────────────────────────
   MODULE VISUAL ARTIFACTS
   ─────────────────────────────────────────────────────────── */

/* 01 — Kanban */
const KANBAN: { label: string; cards: { id: string; muted?: boolean }[] }[] = [
  { label: "Gaida", cards: [{ id: "#2611" }, { id: "#2610", muted: true }] },
  { label: "Tāme", cards: [{ id: "#2613" }, { id: "#2609", muted: true }] },
  { label: "Ražo", cards: [{ id: "#2614" }, { id: "#2612" }] },
  { label: "Pabeigts", cards: [{ id: "#2608", muted: true }] },
];

function KanbanSketch() {
  return (
    <div
      className="relative border hairline rounded-sm bg-paper p-3 md:p-4 max-w-[420px] md:max-w-none shadow-[0_10px_24px_-18px_rgba(10,10,10,0.25)]"
      style={{ transform: "rotate(-0.8deg)" }}
    >
      <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted mb-3 flex items-center justify-between">
        <span>Plānotājs</span>
        <span className="text-muted/60">11.05 · 08:30</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 relative">
        {KANBAN.map((col) => (
          <div key={col.label} className="min-w-0">
            <div className="mono text-[8px] uppercase tracking-[0.16em] text-muted/80 mb-1.5 truncate">
              {col.label}
            </div>
            <div className="space-y-1">
              {col.cards.map((c) => (
                <div
                  key={c.id}
                  className={`rounded-[2px] px-1.5 py-1.5 mono text-[10px] truncate ${
                    c.muted
                      ? "bg-ink/[0.04] text-muted"
                      : "bg-paper border hairline text-ink"
                  }`}
                >
                  {c.id}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* "in transit" card — visually between RAŽO (col 3) and PABEIGTS (col 4) */}
        <div
          className="absolute pointer-events-none mono text-[10px] bg-paper border hairline rounded-[2px] px-1.5 py-1.5 shadow-[0_6px_16px_-8px_rgba(10,10,10,0.35)]"
          style={{
            top: "32%",
            right: "12%",
            transform: "rotate(3deg)",
          }}
        >
          #2615
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t hairline mono text-[10px] uppercase tracking-[0.14em] text-muted flex items-center justify-between">
        <span>47 aktīvi</span>
        <span className="text-ink">TV Display</span>
      </div>
    </div>
  );
}

/* 02 — BOM tree */
function BomSketch() {
  return (
    <div
      className="border hairline rounded-sm bg-paper p-4 md:p-5 max-w-[420px] md:max-w-none shadow-[0_10px_24px_-18px_rgba(10,10,10,0.25)]"
      style={{ transform: "rotate(0.6deg)" }}
    >
      <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted mb-4 flex items-center justify-between">
        <span>BOM · #LOGS-A200</span>
        <span className="text-muted/60">v3</span>
      </div>

      <div className="mono text-[11px] md:text-[12px] leading-[1.7] text-ink space-y-0.5">
        <div className="font-medium">LOGS · TIPS A-200</div>
        <div className="pl-1 text-ash">
          ├─ Rāmis (ozols) · 4 gab&nbsp;
          <span className="text-ink/70">· ✓ noliktavā</span>
        </div>
        <div className="pl-1 text-ash">
          ├─ Stikls 24mm · 2 gab&nbsp;
          <span className="text-ink/70">· ✓ noliktavā</span>
        </div>
        <div className="pl-1 -mx-1.5 px-1.5 bg-[#FEF3C7] rounded-[2px] text-[#92400E]">
          ├─ Furnitūra · 1 kompl · ⚠ tikai 3 gab.
        </div>
        <div className="pl-1 text-ash">
          └─ Blīve · 8 m&nbsp;
          <span className="text-ink/70">· ✓ noliktavā</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t hairline mono text-[10px] uppercase tracking-[0.14em] text-muted flex items-center justify-between">
        <span>2,400 SKU</span>
        <span>auto-rezerve</span>
      </div>
    </div>
  );
}

/* 03 — AI invoice */
function AiInvoiceSketch() {
  return (
    <div className="max-w-[360px] md:max-w-none">
      <div
        className="relative bg-ink text-paper rounded-sm p-4 overflow-hidden shadow-[0_14px_28px_-20px_rgba(10,10,10,0.5)]"
        style={{ transform: "rotate(-0.6deg)" }}
      >
        <div className="mono text-[10px] uppercase tracking-[0.18em] text-paper/50 mb-4 flex items-center justify-between">
          <span>Ar OpenOura</span>
          <span className="text-paper/40">PDF · IN</span>
        </div>

        <div className="relative bg-paper/[0.06] border border-paper/15 rounded-[2px] p-3 mb-4 overflow-hidden">
          <div className="space-y-1.5">
            <div className="h-1 w-3/4 bg-paper/40 rounded-full" />
            <div className="h-1 w-full bg-paper/30 rounded-full" />
            <div className="h-1 w-5/6 bg-paper/30 rounded-full" />
            <div className="h-1 w-2/3 bg-paper/30 rounded-full" />
            <div className="h-1 w-1/2 bg-paper/40 rounded-full" />
            <div className="h-1 w-3/5 bg-paper/30 rounded-full" />
          </div>

          {/* scan line */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px gradient-bg" />

          {/* "12 sek." badge */}
          <div
            className="absolute -top-2 -right-2 bg-paper text-ink mono text-[10px] px-2 py-1 rounded-full border hairline shadow-[0_6px_12px_-6px_rgba(0,0,0,0.4)]"
            style={{ transform: "rotate(4deg)" }}
          >
            12 sek.
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mono text-[10px]">
          <div>
            <div className="text-paper/50 uppercase tracking-[0.14em] mb-1">
              Piegādātājs
            </div>
            <div className="text-paper">SIA Koks &amp; Co</div>
          </div>
          <div>
            <div className="text-paper/50 uppercase tracking-[0.14em] mb-1">
              Summa
            </div>
            <div className="text-paper">€1,247.30</div>
          </div>
          <div>
            <div className="text-paper/50 uppercase tracking-[0.14em] mb-1">
              Datums
            </div>
            <div className="text-paper">09.05.2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 04 — Forma 2 */
const FORMA2_ROWS = [
  { name: "Sienu apdare", qty: "120 m²", sum: "€4,320" },
  { name: "Logu montāža", qty: "8 gab.", sum: "€2,160" },
  { name: "Krāsošana", qty: "240 m²", sum: "€1,080" },
];

function Forma2Sketch() {
  return (
    <div
      className="border hairline rounded-sm bg-paper p-4 md:p-5 max-w-[420px] md:max-w-none shadow-[0_10px_24px_-18px_rgba(10,10,10,0.25)]"
      style={{ transform: "rotate(-0.4deg)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Forma 2 · #F2-2026-014
        </div>
        <div className="mono text-[10px] uppercase tracking-[0.14em] flex border hairline rounded-full overflow-hidden">
          <span className="px-2 py-0.5 bg-ink text-paper">LV</span>
          <span className="px-2 py-0.5 text-muted">EN</span>
        </div>
      </div>

      <div className="grid grid-cols-[1.4fr_0.7fr_0.7fr] gap-x-3 mono text-[10px] uppercase tracking-[0.14em] text-muted pb-2 border-b hairline">
        <span>Pozīcijas</span>
        <span className="text-right">Daudzums</span>
        <span className="text-right">Summa</span>
      </div>

      <div className="divide-y hairline">
        {FORMA2_ROWS.map((r) => (
          <div
            key={r.name}
            className="grid grid-cols-[1.4fr_0.7fr_0.7fr] gap-x-3 py-2 text-[12px] text-ink"
          >
            <span className="truncate">{r.name}</span>
            <span className="mono text-right text-ash">{r.qty}</span>
            <span className="mono text-right">{r.sum}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t hairline flex items-center justify-between">
        <span className="mono text-[10px] uppercase tracking-[0.14em] text-muted">
          Kopā: €7,560
        </span>
        <span className="mono text-[10px] uppercase tracking-[0.14em] bg-ink text-paper px-2.5 py-1 rounded-[2px]">
          ⤓ XLSX
        </span>
      </div>
    </div>
  );
}

/* 05 — Time tracking */
const TIME_ROWS: { time: string; task: string; dur: string; active?: boolean }[] = [
  { time: "07:30", task: "#2614 · Logu rāmji", dur: "2h 15m" },
  { time: "09:45", task: "Pauze", dur: "15m" },
  { time: "10:00", task: "#2613 · Durvis", dur: "3h 40m" },
  { time: "13:40", task: "Pusdienas", dur: "30m" },
  { time: "14:10", task: "#2614 · Logu rāmji", dur: "2h 50m", active: true },
];

function TimeSketch() {
  return (
    <div
      className="border hairline rounded-sm bg-paper p-4 md:p-5 max-w-[420px] md:max-w-none shadow-[0_10px_24px_-18px_rgba(10,10,10,0.25)]"
      style={{ transform: "rotate(0.5deg)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink">
          Jānis · 13.05
        </div>
        <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Cehs · NFC
        </div>
      </div>

      <div className="relative pl-6">
        <span
          aria-hidden
          className="absolute left-[7px] top-1 bottom-1 w-px bg-ink/15"
        />
        <ul className="space-y-3">
          {TIME_ROWS.map((row, i) => (
            <li key={i} className="relative flex items-baseline gap-3">
              <span
                aria-hidden
                className={`absolute -left-6 top-1.5 w-[7px] h-[7px] rounded-full ${
                  row.active ? "gradient-bg" : "bg-ink/30"
                }`}
              />
              <span className="mono text-[11px] tabular-nums text-ink/90 w-12 shrink-0">
                {row.time}
              </span>
              <span
                className={`text-[12px] md:text-[13px] flex-1 min-w-0 truncate ${
                  row.active ? "text-ink font-medium" : "text-ash"
                }`}
              >
                {row.task}
              </span>
              <span className="mono text-[10px] text-muted shrink-0">
                {row.dur}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 pt-3 border-t hairline mono text-[10px] uppercase tracking-[0.14em] flex items-center justify-between">
        <span className="text-muted">Kopā šodien</span>
        <span className="text-ink">8h 45m</span>
      </div>
    </div>
  );
}

/* 06 — Estimate vs reality */
function EstimateSketch() {
  return (
    <div
      className="border hairline rounded-sm bg-paper p-4 md:p-5 max-w-[420px] md:max-w-none shadow-[0_10px_24px_-18px_rgba(10,10,10,0.25)]"
      style={{ transform: "rotate(-0.6deg)" }}
    >
      <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted mb-4 flex items-center justify-between">
        <span>Pasūt. #2598</span>
        <span className="text-muted/60">tāme · fakts</span>
      </div>

      <div className="mb-4">
        <div className="mono text-[10px] uppercase tracking-[0.16em] text-muted mb-1.5">
          Plāns
        </div>
        <div
          className="relative h-7 bg-paper border hairline rounded-[2px]"
          style={{ width: "78%" }}
        >
          <div className="absolute inset-y-0 left-2.5 flex items-center mono text-[11px] text-ink whitespace-nowrap">
            €12,400 · 4 ned.
          </div>
        </div>
      </div>

      <div>
        <div className="mono text-[10px] uppercase tracking-[0.16em] text-[#065F46] mb-1.5">
          Reāli
        </div>
        <div
          className="relative h-7 bg-[#D1FAE5] rounded-[2px]"
          style={{ width: "81%" }}
        >
          <div className="absolute inset-y-0 left-2.5 flex items-center mono text-[11px] text-[#065F46] whitespace-nowrap">
            €12,797 · 4 ned. 1 d.
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t hairline mono text-[10px] uppercase tracking-[0.14em] flex items-center justify-between">
        <span className="text-muted">Atšķirība</span>
        <span className="text-[#065F46]">+3.2% · paredzēts</span>
      </div>
    </div>
  );
}

/* 07 — CMR */
function CmrSketch() {
  return (
    <div
      className="border hairline rounded-sm bg-paper p-4 md:p-5 max-w-[420px] md:max-w-none shadow-[0_10px_24px_-18px_rgba(10,10,10,0.25)]"
      style={{ transform: "rotate(1deg)" }}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b hairline">
        <span className="mono text-[10px] uppercase tracking-[0.18em] text-ink">
          CMR · International Consignment Note
        </span>
        <span className="mono text-[10px] uppercase tracking-[0.14em] text-muted">
          Nr. 4127
        </span>
      </div>

      <div className="space-y-2.5">
        <div className="border hairline rounded-[2px] p-2.5 bg-[#FAFAF7]">
          <div className="mono text-[10px] uppercase tracking-[0.16em] text-muted mb-1">
            1 · Sender
          </div>
          <div className="text-[12px] text-ink leading-tight">
            SIA Finestra · Liepāja, LV
          </div>
        </div>

        <div className="border hairline rounded-[2px] p-2.5 space-y-1.5" aria-hidden>
          <div className="mono text-[10px] uppercase tracking-[0.16em] text-muted">
            2 · Consignee
          </div>
          <div className="h-1.5 w-3/4 bg-ink/10 rounded-full" />
          <div className="h-1.5 w-1/2 bg-ink/10 rounded-full" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="border hairline rounded-[2px] p-2.5 space-y-1.5" aria-hidden>
            <div className="mono text-[10px] uppercase tracking-[0.16em] text-muted">
              3 · Goods
            </div>
            <div className="h-1.5 w-full bg-ink/10 rounded-full" />
            <div className="h-1.5 w-2/3 bg-ink/10 rounded-full" />
          </div>
          <div className="border hairline rounded-[2px] p-2.5 space-y-1.5" aria-hidden>
            <div className="mono text-[10px] uppercase tracking-[0.16em] text-muted">
              4 · Carrier
            </div>
            <div className="h-1.5 w-3/4 bg-ink/10 rounded-full" />
            <div className="h-1.5 w-1/2 bg-ink/10 rounded-full" />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t hairline mono text-[10px] uppercase tracking-[0.14em] flex items-center justify-between">
        <span className="text-muted">Auto-ģenerēts</span>
        <span className="text-ink">⤓ PDF</span>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   STAT (proof block)
   ─────────────────────────────────────────────────────────── */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="mono tabular-nums leading-none tracking-[-0.04em] text-ink text-[3.5rem] sm:text-[4rem] md:text-[5rem]">
        {value}
      </div>
      <div className="mt-3 text-[13px] md:text-[14px] leading-[1.35] text-ash max-w-[20ch]">
        {label}
      </div>
    </div>
  );
}
