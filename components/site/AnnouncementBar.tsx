"use client";

import { useEffect, useState } from "react";

export function AnnouncementBar() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem("oo-annbar") === "1";
    } catch {
      /* storage unavailable */
    }
    setHidden(dismissed);
  }, []);

  if (hidden) return null;

  return (
    <div className="annbar" role="region" aria-label="Paziņojums">
      <b>Jaunums</b> · AI lasa ienākošos rēķinus automātiski ·{" "}
      <a className="annlink" href="#ai">
        skaties, kā strādā
      </a>
      <button
        className="annclose"
        type="button"
        aria-label="Aizvērt paziņojumu"
        onClick={() => {
          setHidden(true);
          try {
            localStorage.setItem("oo-annbar", "1");
          } catch {
            /* ignore */
          }
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
