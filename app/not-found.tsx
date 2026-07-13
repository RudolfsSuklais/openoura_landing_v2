import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 · Lapa nav atrasta",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="relative min-h-screen">
      <section className="relative pt-20 sm:pt-28 md:pt-36 lg:pt-44 pb-24 md:pb-36 overflow-hidden">
        <div className="mx-auto max-w-page px-6 md:px-10">
          <div className="mb-10 md:mb-14 flex items-start justify-between gap-6">
            <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted flex items-center gap-3 pt-0.5">
              <span className="inline-block h-px w-8 bg-ink/40" />
              404 · Lapa nav atrasta
            </div>
            <div className="hidden sm:block text-right mono text-[11px] uppercase tracking-[0.18em] text-muted leading-[1.7]">
              <div>Nr. 404</div>
              <div>Liepāja, LV</div>
            </div>
          </div>

          <h1 className="font-medium leading-[0.9] tracking-[-0.04em] text-ink text-[3.25rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem]">
            <span className="block">Šī lapa ir</span>
            <span className="block">
              <span className="serif-italic gradient-text">pazudusi</span>
            </span>
          </h1>

          <p className="mt-10 md:mt-12 max-w-[36ch] md:max-w-[42ch] lg:max-w-[46ch] text-[17px] md:text-[20px] leading-[1.45] text-ash">
            URL nav pareizs vai lapa ir pārvietota.{" "}
            <span className="text-ink">Sākumlapā ir viss</span>, kas tev vajadzīgs.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 bg-ink text-paper px-5 py-3.5 rounded-full text-[14px] font-medium tracking-tight hover:opacity-90 transition-opacity self-start"
            >
              <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
                ←
              </span>
              Atpakaļ uz sākumu
            </Link>
            <Link
              href="/#demo"
              className="inline-flex items-center gap-3 mono text-[12px] uppercase tracking-[0.22em] text-muted/70 hover:text-ink transition-colors self-start"
            >
              <span className="inline-block h-px w-8 bg-ink/25" />
              <span>Pieprasi demo →</span>
            </Link>
          </div>

          <div className="mt-24 md:mt-32 pt-7 border-t hairline">
            <div className="flex items-center gap-5">
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-muted">
                Made in Liepāja
              </div>
              <span className="h-px flex-1 bg-ink/[0.08]" />
              <a
                href="mailto:rudolfs@openoura.com"
                className="mono text-[10px] uppercase tracking-[0.22em] text-muted hover:text-ink transition-colors"
              >
                rudolfs@openoura.com
              </a>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute right-[-6vw] top-[6%] mono text-[28vw] leading-none tracking-tightest text-ink/[0.035] select-none"
        >
          404
        </div>
      </section>
    </main>
  );
}
