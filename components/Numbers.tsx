import { FadeUp } from "./FadeUp";
import { Calculator } from "./Calculator";

const STATS = [
  {
    value: "8h",
    label: "ko taupa nedēļā uz pavadzīmju ievades",
    foot: "avots: Finestra, 2025",
    span: "lg:col-span-7 lg:row-span-2",
    align: "left",
  },
  {
    value: "€69",
    label: "sākuma cena mēnesī",
    foot: "bez PVN, bez ieviešanas, bez setup fee",
    span: "lg:col-span-5",
    align: "right",
  },
  {
    value: "1",
    label: "sistēma, kas aizvieto 5 Excel failus",
    foot: "tikai tāmes, krājumi, pasūtījumi",
    span: "lg:col-span-5",
    align: "right",
  },
  {
    value: "+14%",
    label: "ienesīgums uz projektiem",
    foot: "laicīgi prognozē peļņu",
    span: "lg:col-span-7",
    align: "left",
  },
];

export function Numbers() {
  return (
    <section className="relative pt-32 md:pt-48 pb-32 md:pb-48 border-t hairline">
      <div className="mx-auto max-w-page px-6 md:px-10">
        <FadeUp>
          <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted mb-12 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-ink/40" />
            Skaitļi · 04
          </div>
        </FadeUp>

        <FadeUp>
          <h2 className="text-display font-medium tracking-tightest mb-20 md:mb-28">
            Četri <span className="serif-italic gradient-text">skaitļi</span>,
            <br /> kurus mēs varam pierādīt.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-12 gap-x-6 gap-y-16 md:gap-y-24">
          {STATS.map((s, i) => (
            <FadeUp
              key={s.value}
              delay={i * 0.06}
              className={`col-span-12 ${s.span} relative`}
            >
              <div className={s.align === "right" ? "lg:text-right" : ""}>
                <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted mb-3">
                  0{i + 1}
                </div>
                <div className="mono text-stat font-medium tracking-tightest leading-[0.85]">
                  {s.value}
                </div>
                <div className="mt-6 max-w-[28ch] text-[17px] md:text-[19px] leading-snug text-ink/85 lg:inline-block">
                  {s.label}
                </div>
                <div className="mt-4 mono text-[11px] text-muted">{s.foot}</div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <Calculator />
        </FadeUp>
      </div>
    </section>
  );
}
