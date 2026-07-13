"use client";

import { useEffect, useState } from "react";

const R = 23;
const C = 2 * Math.PI * R;

export function BackToTop() {
  const [show, setShow] = useState(false);
  const [frac, setFrac] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight || 1;
      const y = el.scrollTop;
      setShow(y > 700);
      setFrac(Math.min(y / max, 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`to-top${show ? " show" : ""}`}
      type="button"
      aria-label="Atpakaļ uz augšu"
      data-tip="Uz augšu"
      onClick={() => {
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
    >
      <svg className="ring" viewBox="0 0 50 50" aria-hidden="true">
        <circle cx="25" cy="25" r={R} strokeDasharray={C} strokeDashoffset={C * (1 - frac)} />
      </svg>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
