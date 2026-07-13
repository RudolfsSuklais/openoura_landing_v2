import { Check } from "./icons";

export function AiFeature() {
  return (
    <section className="block" id="ai">
      <div className="wrap">
        <div className="spot reveal">
          <div className="spot-txt">
            <span className="spot-num">AI · Rēķini</span>
            <h3>Rēķini ievadās gandrīz paši</h3>
            <p>
              Pievieno ienākošā rēķina PDF vai foto — OpenOura izlasa piegādātāju, summas un pozīcijas, sasaista tās ar noliktavu un tavu tāmi. Tev atliek tikai apstiprināt.
            </p>
            <ul className="spot-list">
              <li><span className="ck"><Check /></span> Nolasa piegādātāju, datumu, summas un PVN</li>
              <li><span className="ck"><Check /></span> Atpazīst pozīcijas un sasaista ar noliktavu</li>
              <li><span className="ck"><Check /></span> Bez manuālas ievades — tikai pārbaudi un apstiprini</li>
            </ul>
          </div>
          <div className="spot-vis">
            <div className="vis-frame">
              <div className="ai-scan">
                <div className="ai-top">
                  <span className="fic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></svg>
                  </span>
                  Rēķins_SIA-Koks.pdf
                  <span className="ai-badge">AI apstrādāts · 0.8 s</span>
                </div>
                <div className="ai-rows">
                  <div className="ai-row"><span className="k"><span className="dot" /> Piegādātājs</span><span className="v">SIA Koks</span></div>
                  <div className="ai-row"><span className="k"><span className="dot" /> Rēķina datums</span><span className="v">11.05.2026</span></div>
                  <div className="ai-row"><span className="k"><span className="dot" /> Summa bez PVN</span><span className="v">€3 190.50</span></div>
                  <div className="ai-row"><span className="k"><span className="dot" /> PVN 21%</span><span className="v">€670.01</span></div>
                  <div className="ai-row"><span className="k"><span className="dot" /> Atpazītas pozīcijas</span><span className="v hl">12 / 12</span></div>
                </div>
                <div className="ai-foot">
                  <button className="btn btn-violet" type="button" data-demo data-cta="ai_demo">
                    Apstiprināt un pievienot noliktavai <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
