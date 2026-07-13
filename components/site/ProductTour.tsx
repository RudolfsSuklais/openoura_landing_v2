import { Check } from "./icons";

export function ProductTour() {
  return (
    <section className="block" id="tour">
      <div className="wrap">
        {/* Spot 1 */}
        <div className="spot reveal">
          <div className="spot-txt">
            <span className="spot-num">01 · Pārskats</span>
            <h3>Visa ražošana vienā tāfelē</h3>
            <p>
              Redzi katru pasūtījumu un tā statusu vienā skatā: kas gaida, kas top, kas pabeigts. Bez viena Excel faila un bez staigāšanas pa ražotni.
            </p>
            <ul className="spot-list">
              <li><span className="ck"><Check /></span> Visi pasūtījumi vienuviet</li>
              <li><span className="ck"><Check /></span> Statuss atjaunojas reāllaikā</li>
              <li><span className="ck"><Check /></span> Rādāms arī uz ražotnes TV ekrāna</li>
            </ul>
          </div>
          <div className="spot-vis">
            <div className="vis-frame">
              <div className="vis-bar">
                <span className="dot" style={{ background: "var(--coral)" }} />
                <span className="dot" style={{ background: "#e0a92f" }} />
                <span className="dot" style={{ background: "var(--ok)" }} />
                <span className="vt">Ražošanas tāfele</span>
              </div>
              <div className="kan-mock">
                <div className="kan-board">
                  <div className="kan-col" style={{ "--kc": "#94a3b8" } as React.CSSProperties}>
                    <div className="kan-col-head"><span className="kan-dot" /> Gaida <span className="kan-count">2</span></div>
                    <div className="kan-body">
                      <div className="kan-c"><div className="num">#2620</div><div className="cust">SIA Ozols</div><div className="proj">Kāpņu margas</div></div>
                      <div className="kan-c"><div className="num">#2621</div><div className="cust">SIA Nams</div><div className="proj">Terases dēļi</div></div>
                    </div>
                  </div>
                  <div className="kan-col" style={{ "--kc": "#f59e0b" } as React.CSSProperties}>
                    <div className="kan-col-head"><span className="kan-dot" /> Ražo <span className="kan-count">2</span></div>
                    <div className="kan-body">
                      <div className="kan-c"><div className="num">#2614</div><div className="cust">SIA Nams</div><div className="proj">Virtuves fasādes</div></div>
                      <div className="kan-c"><div className="num">#2617</div><div className="cust">SIA Finestra</div><div className="proj">Logu bloki</div></div>
                    </div>
                  </div>
                  <div className="kan-col" style={{ "--kc": "#10b981" } as React.CSSProperties}>
                    <div className="kan-col-head"><span className="kan-dot" /> Pabeigts <span className="kan-count">2</span></div>
                    <div className="kan-body">
                      <div className="kan-c"><div className="num">#2611</div><div className="cust">SIA Kalnabērzs</div><div className="proj">K1 stūra elements</div></div>
                      <div className="kan-c"><div className="num">#2609</div><div className="cust">SIA Koks</div><div className="proj">Durvju bloki</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spot 2 */}
        <div className="spot rev reveal">
          <div className="spot-txt">
            <span className="spot-num">02 · Darba laiks</span>
            <h3>Katra stunda pie īstā darba</h3>
            <p>
              Darbinieks ražotnē uzsāk taimeri pie sava uzdevuma ar vienu pieskārienu planšetē. Tu maksā tikai par reāli padarīto, līdz minūtei.
            </p>
            <ul className="spot-list">
              <li><span className="ck"><Check /></span> Viens pieskāriens: sākt vai apturēt</li>
              <li><span className="ck"><Check /></span> Laiks piesaistīts konkrētam uzdevumam</li>
              <li><span className="ck"><Check /></span> Atbalsta arī gabaldarbu</li>
            </ul>
          </div>
          <div className="spot-vis">
            <div className="device">
              <div className="dev-screen">
                <div className="dp-mock">
                  <div className="dp-close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                  </div>
                  <div className="dp-proj">P-235 · Fasādes komplekts · Poz. 3</div>
                  <div className="dp-task">Loga rāmju montāža</div>
                  <div className="dp-ring">
                    <div className="dp-ring-inner">
                      <div className="dp-ring-time dev-timer">02:14:33</div>
                      <div className="dp-ring-sub">no 3h</div>
                    </div>
                  </div>
                  <div className="dp-controls">
                    <button className="dp-ctrl dp-ctrl-side dp-ctrl-next" type="button">
                      <span className="dp-ic"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 5l9 7-9 7V5zM16 5h3v14h-3z" /></svg></span>
                      <span className="dp-lbl">Nākamais</span>
                    </button>
                    <button className="dp-ctrl dp-ctrl-main" type="button" aria-label="Pauzēt">
                      <span className="dp-ic"><svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1.5" /><rect x="14" y="5" width="4" height="14" rx="1.5" /></svg></span>
                    </button>
                    <button className="dp-ctrl dp-ctrl-side dp-ctrl-done" type="button">
                      <span className="dp-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span>
                      <span className="dp-lbl">Pabeigt</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spot 3 */}
        <div className="spot reveal">
          <div className="spot-txt">
            <span className="spot-num">03 · Nauda</span>
            <h3>Peļņa un efektivitāte līdz centam</h3>
            <p>
              Redzi katra projekta un visa uzņēmuma peļņu precīzi, aprēķinātu no reālā laika un materiāliem. Un cik efektīvi strādā ražotne un katrs darbinieks.
            </p>
            <ul className="spot-list">
              <li><span className="ck"><Check /></span> Peļņa katram projektam un uzņēmumam</li>
              <li><span className="ck"><Check /></span> Plānotais pret faktisko</li>
              <li><span className="ck"><Check /></span> Efektivitāte % ražotnei un katram cilvēkam</li>
            </ul>
          </div>
          <div className="spot-vis">
            <div className="vis-frame">
              <div className="pp-mock">
                <div className="pp-head">
                  <b>Virtuves fasādes · #2614</b>
                  <span className="pp-badge">Marža 14.0%</span>
                </div>
                <div className="pp-cards">
                  <div className="pp-card"><div className="k">Ieņēmumi</div><div className="v">5 240,00 €</div><div className="s">pārdotā tāme</div></div>
                  <div className="pp-card"><div className="k">Izmaksas</div><div className="v">4 507,25 €</div><div className="s">darbasp. 1 316,75 € · mat. 3 190,50 €</div></div>
                  <div className="pp-card hero"><div className="k">Neto peļņa</div><div className="v">732,75 €</div></div>
                  <div className="pp-card"><div className="k">Marža</div><div className="v">14.0%</div><div className="pp-mbar"><i style={{ width: "56%" }} /></div></div>
                </div>
                <div className="pp-section">
                  <div className="pp-title">Efektivitāte pa darbiniekiem</div>
                  <div className="pp-eff">
                    <div className="pp-eff-row"><span className="l">Ražotnes efektivitāte</span><span className="bar"><i style={{ width: "94%" }} /></span><span className="val">94%</span></div>
                    <div className="pp-eff-row"><span className="l">Jānis Bērziņš</span><span className="bar"><i style={{ width: "100%" }} /></span><span className="val">110%</span></div>
                    <div className="pp-eff-row"><span className="l">Mārtiņš Ozols</span><span className="bar"><i style={{ width: "90%" }} /></span><span className="val">90%</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
