"use client";

import { useEffect, useMemo, useState } from "react";

const RATE = 18; // €/h aptuvenā izmaksa
const SAVINGS_KEY = "openoura:projected_savings";
const SAVINGS_EVENT = "openoura:savings-updated";

function fmt(n: number) {
  return new Intl.NumberFormat("lv-LV", { maximumFractionDigits: 0 }).format(n);
}

export function Calculator() {
  const [employees, setEmployees] = useState(12);

  const { hours, savings } = useMemo(() => {
    const h = 30 + employees * 3; // stundas mēnesī: administrācija + koordinācija
    const s = Math.round((h * RATE) / 10) * 10;
    return { hours: h, savings: s };
  }, [employees]);

  useEffect(() => {
    try {
      sessionStorage.setItem(SAVINGS_KEY, String(savings));
      window.dispatchEvent(
        new CustomEvent(SAVINGS_EVENT, { detail: { value: savings } }),
      );
    } catch {
      /* storage unavailable */
    }
  }, [savings]);

  return (
    <section className="block" id="kalkulators">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="kicker">Kalkulators</span>
          <h2>Cik tu ietaupīsi?</h2>
          <p>Pavelc slīdni pēc komandas izmēra un redzi aptuveno ietaupījumu mēnesī.</p>
        </div>
        <div className="calc reveal">
          <div className="calc-controls">
            <div className="clabel">
              <span>Darbinieki ražošanā</span>
              <b>{employees}</b>
            </div>
            <input
              className="calc-slider"
              type="range"
              min={1}
              max={300}
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              aria-label="Darbinieku skaits"
            />
            <p className="calc-note">
              Aprēķins balstīts uz ~{hours} h mēnesī, kas parasti aiziet Excel, zvaniem un
              atskaitēm (≈ €{RATE}/h). Reālais ietaupījums atkarīgs no procesiem.
            </p>
          </div>
          <div className="calc-result">
            <div className="cr-label">Aptuvenais ietaupījums</div>
            <div className="cr-value">€{fmt(savings)}</div>
            <div className="cr-sub">mēnesī · ~{hours} h atgūtas</div>
          </div>
        </div>
      </div>
    </section>
  );
}
