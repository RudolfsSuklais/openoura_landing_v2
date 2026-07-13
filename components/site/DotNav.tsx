"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "Sākums" },
  { id: "moduli", label: "Moduļi" },
  { id: "tour", label: "Kā strādā" },
  { id: "ai", label: "AI rēķini" },
  { id: "klienti", label: "Klienti" },
  { id: "cenas", label: "Cenas" },
  { id: "faq", label: "Jautājumi" },
  { id: "kontakti", label: "Kontakti" },
];

export function DotNav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="dotnav" aria-label="Sekciju navigācija">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          data-label={s.label}
          className={active === s.id ? "active" : ""}
          aria-label={s.label}
          aria-current={active === s.id ? "true" : undefined}
        />
      ))}
    </nav>
  );
}
