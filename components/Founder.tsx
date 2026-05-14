import Image from "next/image";
import { FadeUp } from "./FadeUp";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/r%C5%ABdolfs-%C5%A1uklais-9b4666337";

export function Founder() {
  return (
    <section
      id="autors"
      className="relative pt-32 md:pt-48 pb-32 md:pb-48 border-t hairline scroll-mt-20 md:scroll-mt-24"
      aria-labelledby="founder-heading"
    >
      <div className="mx-auto max-w-page px-6 md:px-10">
        <FadeUp>
          <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted mb-12 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-ink/40" />
            Autors · 07
          </div>
        </FadeUp>

        <div className="grid grid-cols-12 gap-x-6 gap-y-14 items-start">
          {/* ── LEFT — headline + story (7 cols) ──────────────────── */}
          <div className="col-span-12 lg:col-span-7">
            <FadeUp>
              <h2
                id="founder-heading"
                className="font-medium leading-[0.92] tracking-[-0.035em] text-ink text-[2.5rem] sm:text-[3.25rem] md:text-[4.25rem] lg:text-[5.25rem] max-w-[14ch]"
              >
                Aiz OpenOura stāv{" "}
                <span className="serif-italic gradient-text">viens</span>{" "}
                cilvēks
              </h2>
            </FadeUp>

            <div className="mt-10 md:mt-14 max-w-[54ch] space-y-6 text-[17px] md:text-[19px] leading-[1.55] text-ash">
              <FadeUp delay={0.05}>
                <p>
                  <span className="text-ink font-medium">Mani sauc Rudolfs.</span>{" "}
                  OpenOura sākās kā skolas noslēguma darbs, bet pārtapa īstā
                  produktā, kad redzēju, kā Latvijas ražotāji cīnās ar Excel
                  un pārāk dārgām ERP sistēmām.
                </p>
              </FadeUp>

              <FadeUp delay={0.12}>
                <p>
                  Pirmais klients — logu un durvju ražotājs — palīdzēja
                  saprast, kas tiešām vajadzīgs ražošanā. Katra funkcija
                  OpenOura ir būvēta, risinot reālu problēmu, nevis pildot
                  prasību sarakstu.
                </p>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="text-ink">
                  Šī nav korporatīva platforma. Viens cilvēks, viens produkts,
                  tieša saruna — tu runā ar to,{" "}
                  <span className="serif-italic">kurš būvē sistēmu</span>,
                  nevis ar atbalsta čatbotu.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* ── RIGHT — photo + direct contacts (5 cols) ──────────── */}
          <div className="col-span-12 lg:col-span-5 lg:pl-6">
            <FadeUp delay={0.1}>
              <div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-md border hairline bg-ink/[0.03]"
                style={{ transform: "rotate(1deg)" }}
              >
                <Image
                  src="/openoura_founder.jpeg"
                  alt="Rudolfs Šuklais — OpenOura dibinātājs un izstrādātājs"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between gap-3">
                  <div className="mono text-[10px] uppercase tracking-[0.18em] text-paper/90 bg-ink/55 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                    Rudolfs · Liepāja
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.22}>
              <div className="mt-8 border-t hairline">
                <ContactRow
                  num="01"
                  label="E-pasts"
                  value="rudolfs@openoura.com"
                  href="mailto:rudolfs@openoura.com"
                />
                <ContactRow
                  num="02"
                  label="LinkedIn"
                  value="rūdolfs-šuklais"
                  href={LINKEDIN_URL}
                  external
                />
                <ContactRow
                  num="03"
                  label="WhatsApp"
                  value="+371 20 510 502"
                  href="https://wa.me/37120510502"
                  external
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="mt-6 mono text-[11px] uppercase tracking-[0.18em] text-muted leading-relaxed">
                Atbildu 4 stundu laikā · bez asistentiem
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  num,
  label,
  value,
  href,
  external,
}: {
  num: string;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-baseline gap-4 py-4 border-b hairline hover:bg-ink/[0.02] transition-colors -mx-2 px-2"
    >
      <span className="mono tabular-nums text-[11px] uppercase tracking-[0.18em] text-muted/70 w-6 shrink-0">
        {num}
      </span>
      <span className="mono text-[11px] uppercase tracking-[0.18em] text-muted w-[5.5rem] shrink-0">
        {label}
      </span>
      <span className="flex-1 text-[14px] md:text-[15px] text-ink group-hover:underline decoration-ink/30 underline-offset-4 truncate">
        {value}
      </span>
      <span
        aria-hidden
        className="mono text-[12px] text-muted group-hover:text-ink group-hover:translate-x-0.5 transition-all"
      >
        →
      </span>
    </a>
  );
}
