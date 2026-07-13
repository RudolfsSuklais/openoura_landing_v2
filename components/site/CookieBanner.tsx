"use client";

import { useEffect, useState } from "react";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let done = true;
    try {
      done = !!localStorage.getItem("oo-cookie");
    } catch {
      /* storage unavailable */
    }
    setShow(!done);
  }, []);

  if (!show) return null;

  const close = () => {
    setShow(false);
    try {
      localStorage.setItem("oo-cookie", "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="cookie" role="region" aria-label="Sīkdatnes">
      <p>
        Izmantojam sīkdatnes, lai lapa strādātu un saprastu, kas noder. Turpinot piekrīti.{" "}
        <a href="#kontakti">Vairāk</a>
      </p>
      <div className="cookie-btns">
        <button className="acc" type="button" onClick={close}>
          Labi
        </button>
        <button type="button" onClick={close}>
          Tikai nepieciešamās
        </button>
      </div>
    </div>
  );
}
