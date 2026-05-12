import { FadeUp } from "./FadeUp";

const NOT_FOR = [
  "tu jau lieto SAP, Microsoft Dynamics vai Odoo, un tas tev der",
  "tev ir vairāk par 200 darbiniekiem un divas valstis",
  "tev vajag MES ar reāllaika iekārtu telemetriju",
  "tev ir IT nodaļa, kas grib visu uzbūvēt pati",
];

const FOR = [
  "tev ir 1–250 cilvēki un ražošana, kas vairs neiekļaujas Excelā",
  "tu reizi nedēļā saki “mums vajadzētu kaut ko ar to izdarīt”",
  "tavs grāmatvedis nēsā papīrus pa biroju, un tev nepatīk to skatīties",
  "tu gribi sākt šomēnes, nevis ieplānot ieviešanu uz rudeni",
  "tu uzticies vienkāršiem rīkiem vairāk nekā 20 dažādām Excel tabulām",
];

export function WhoItsFor() {
  return (
    <section className="relative pt-32 md:pt-48 pb-32 md:pb-48 border-t hairline">
      <div className="mx-auto max-w-page px-6 md:px-10">
        <FadeUp>
          <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted mb-12 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-ink/40" />
            Brutāls godīgums · 05
          </div>
        </FadeUp>

        <div className="grid grid-cols-12 gap-x-6 gap-y-20">
          {/* NOT FOR — left, slightly tilted */}
          <div className="col-span-12 lg:col-span-7">
            <FadeUp>
              <h2 className="text-[44px] md:text-[68px] leading-[0.98] tracking-tight font-medium mb-2">
                OpenOura <span className="serif-italic">nav</span> priekš tevis,
              </h2>
              <p className="text-[44px] md:text-[68px] leading-[0.98] tracking-tight font-medium text-ash mb-10">
                ja…
              </p>
            </FadeUp>

            <ul className="space-y-5 max-w-[52ch]">
              {NOT_FOR.map((item, i) => (
                <FadeUp as="li" delay={i * 0.05} key={item} className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="mt-3 inline-block h-[2px] w-6 bg-marker shrink-0"
                    style={{ transform: `rotate(${i % 2 === 0 ? -2 : 3}deg)` }}
                  />
                  <span className="text-[17px] md:text-[19px] leading-snug text-ink/85 line-through decoration-marker/60 decoration-[1.5px]">
                    {item}
                  </span>
                </FadeUp>
              ))}
            </ul>
          </div>

          {/* FOR — right, offset down */}
          <div className="col-span-12 lg:col-span-5 lg:mt-32">
            <FadeUp delay={0.1}>
              <h2 className="text-[44px] md:text-[60px] leading-[0.98] tracking-tight font-medium mb-2">
                OpenOura <span className="serif-italic gradient-text">ir</span> priekš tevis,
              </h2>
              <p className="text-[44px] md:text-[60px] leading-[0.98] tracking-tight font-medium text-ash mb-10">
                ja…
              </p>
            </FadeUp>

            <ul className="space-y-5">
              {FOR.map((item, i) => (
                <FadeUp as="li" delay={i * 0.05} key={item} className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="mt-2.5 inline-block h-2 w-2 rounded-full bg-ink shrink-0"
                  />
                  <span className="text-[17px] md:text-[19px] leading-snug text-ink">
                    {item}
                  </span>
                </FadeUp>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
