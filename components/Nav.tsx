"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { trackCtaClick } from "@/lib/analytics";

const LINKS = [
  { href: "#problema", num: "02", label: "Problēma" },
  { href: "#risinajums", num: "03", label: "Risinājums" },
  { href: "#cenas", num: "07", label: "Cenas" },
  { href: "#demo", num: "08", label: "Kontakti" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const targets = LINKS
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visible.delete(entry.target.id);
          }
        }
        if (visible.size === 0) {
          setActive(null);
          return;
        }
        // Among visible sections, the one whose top is closest to (but
        // not past) the top of the spy zone is the section the user is
        // currently reading. That's the largest top value among entries.
        const current = [...visible.entries()].sort(
          ([, a], [, b]) => b - a,
        )[0][0];
        setActive(`#${current}`);
      },
      { rootMargin: "-80px 0px -85% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-paper/85 backdrop-blur-md border-b hairline">
        <div className="mx-auto max-w-page px-6 md:px-10 py-3 md:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
            <Image
              src="/openoura_logo.png"
              alt="OpenOura"
              width={44}
              height={54}
              priority
              className="h-10 md:h-11 w-auto"
            />
            <div className="flex flex-col leading-none">
              <span className="serif-italic inline-block text-[26px] md:text-[30px] tracking-tight text-ink -rotate-2 origin-left transition-transform duration-300 ease-out group-hover:rotate-0">
                OpenOura
              </span>
              <span className="mono text-[9px] uppercase tracking-[0.22em] text-muted mt-1.5 hidden sm:inline">
                Ražots Latvijā
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[14px] text-ash">
            {LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative transition-colors ${
                    isActive ? "text-ink" : "hover:text-ink"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute left-0 right-0 -bottom-1 h-px bg-ink origin-left transition-transform duration-300 ease-out ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#demo"
              onClick={() => trackCtaClick("nav")}
              className="hidden sm:inline-flex items-center min-h-[44px] text-[13px] tracking-tight font-medium bg-ink text-paper px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Izmēģināt par brīvu
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Aizvērt izvēlni" : "Atvērt izvēlni"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="md:hidden inline-flex items-center justify-center h-11 w-11 -mr-2 text-ink"
            >
              <span aria-hidden className="relative block w-5 h-3.5">
                <span
                  className={`absolute left-0 right-0 h-px bg-ink transition-transform duration-300 ease-out ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 h-px bg-ink transition-transform duration-300 ease-out ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`md:hidden fixed inset-0 z-30 bg-paper transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full pt-24 pb-12 px-6 flex flex-col">
          <div className="mono text-[11px] uppercase tracking-[0.18em] text-muted mb-10 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-ink/40" />
            Izvēlne
          </div>

          <nav className="flex-1 flex flex-col gap-7">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-5"
              >
                <span className="mono text-[12px] tabular-nums tracking-[0.18em] text-muted/70 pt-2">
                  {link.num}
                </span>
                <span className="text-[2.5rem] leading-[0.95] tracking-[-0.03em] font-medium text-ink group-hover:opacity-60 transition-opacity">
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="border-t hairline pt-8 mt-8">
            <a
              href="#demo"
              onClick={() => {
                trackCtaClick("nav");
                setOpen(false);
              }}
              className="inline-flex items-center justify-center min-h-[52px] w-full text-[15px] tracking-tight font-medium bg-ink text-paper px-5 py-3.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Pieprasi demo · 25 min
            </a>
            <div className="mt-4 mono text-[10px] uppercase tracking-[0.18em] text-muted text-center">
              WhatsApp vai e-pasts · bez maksas
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
