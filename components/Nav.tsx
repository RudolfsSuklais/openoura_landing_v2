"use client";

import Image from "next/image";
import Link from "next/link";
import { trackCtaClick } from "@/lib/analytics";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full bg-paper/85 backdrop-blur-md border-b hairline">
      <div className="mx-auto max-w-page px-6 md:px-10 py-3 md:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
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
          <a href="#problema" className="hover:text-ink transition-colors">Problēma</a>
          <a href="#risinajums" className="hover:text-ink transition-colors">Risinājums</a>
          <a href="#cenas" className="hover:text-ink transition-colors">Cenas</a>
          <a href="#kontakts" className="hover:text-ink transition-colors">Kontakti</a>
        </nav>
        <a
          href="#demo"
          onClick={() => trackCtaClick("nav")}
          className="inline-flex items-center min-h-[44px] text-[13px] tracking-tight font-medium bg-ink text-paper px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
        >
          Izmēģināt par brīvu
        </a>
      </div>
    </header>
  );
}
