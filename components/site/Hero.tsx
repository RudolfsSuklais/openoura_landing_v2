const TrendUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17l6-6 4 4 6-6" /><path d="M15 9h5v5" /></svg>
);
const TrendDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7l6 6 4-4 6 6" /><path d="M15 15h5v-5" /></svg>
);
const Cal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4.5" width="18" height="17" rx="2.5" /><path d="M16 2.5v4M8 2.5v4M3 10h18" /></svg>
);

export function Hero() {
  return (
    <section className="hero">
      <div className="blob" style={{ width: 340, height: 340, background: "var(--violet)", top: -40, left: "8%", animation: "blob 16s ease-in-out infinite" }} />
      <div className="blob" style={{ width: 300, height: 300, background: "var(--teal)", top: 80, right: "6%", animation: "blob 19s ease-in-out infinite reverse" }} />
      <div className="blob" style={{ width: 260, height: 260, background: "var(--pink)", top: 420, left: "20%", animation: "blob 22s ease-in-out 1s infinite" }} />
      <div className="blob" style={{ width: 240, height: 240, background: "var(--coral)", top: 380, right: "18%", animation: "blob 18s ease-in-out .5s infinite reverse" }} />

      <div className="wrap">
        <a className="badge-new fly d1" href="#tour">
          <span className="nw">Reāllaikā</span> Pilns ražošanas pārskats vienā vietā <span className="aw">→</span>
        </a>
        <h1 id="heroTitle">
          <span className="w"><span>Visa</span></span> <span className="w"><span>tava</span></span>{" "}
          <span className="w"><span>ražotne</span></span> <span className="w"><span>vienā</span></span>{" "}
          <span className="w"><span className="hl">ekrānā.</span></span>
        </h1>
        <p className="sub fly d3">
          Redzi, pie kā strādā katrs darbinieks, cik maksā padarītais un cik nopelna katrs projekts, līdz pēdējam centam. Viss reāllaikā, bez Excel.
        </p>
        <div className="hero-cta fly d4">
          <a className="btn btn-primary" href="#cenas">
            Izmēģināt par brīvu <span className="arrow">→</span>
          </a>
          <a className="btn btn-ghost" href="#kontakti" data-demo data-cta="hero_demo">
            Pieprasi demo · 25 min
          </a>
        </div>
        <div className="fly d4">
          <a className="hero-hint" href="#tour">
            <span className="pw">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </span>
            90 sekunžu ieskats, kā tas strādā
          </a>
        </div>
        <div className="fly d5">
          <span className="hero-seal">🇱🇻 Ražots Latvijā · atbalsts latviski</span>
        </div>

        <div className="stage fly d5">
          <div className="tabs" id="tabs">
            <span className="tab-pill" id="tabpill" />
            <button className="tab on" data-p="0" type="button">Kas strādā</button>
            <button className="tab" data-p="1" type="button">Projekti</button>
            <button className="tab" data-p="2" type="button">Efektivitāte</button>
            <button className="tab" data-p="3" type="button">Peļņa</button>
          </div>

          <div className="bob bob-1">
            <span className="bi" style={{ background: "color-mix(in srgb,var(--ok) 15%,transparent)", color: "var(--ok)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21a8 8 0 0116 0" />
              </svg>
            </span>
            <div>Jānis strādā<small>Virtuves fasādes · 6h 12m</small></div>
          </div>
          <div className="bob bob-2">
            <span className="bi" style={{ background: "var(--violet-soft)", color: "var(--violet)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 17l6-6 4 4 8-9" />
                <path d="M17 6h5v5" />
              </svg>
            </span>
            <div>Peļņa +<span data-count="24">24</span>%<small>šomēnes · līdz centam</small></div>
          </div>

          <div className="mock" id="mock">
            <div className="mock-bar">
              <span className="dot" style={{ background: "var(--coral)" }} />
              <span className="dot" style={{ background: "#e0a92f" }} />
              <span className="dot" style={{ background: "var(--ok)" }} />
              <span className="mock-url">app.openoura.com</span>
            </div>
            <div className="panels" id="panels">
              {/* Panel 0: Kas strādā — monitoring.php */}
              <div className="panel on">
                <div className="hp-head"><h4>Kas strādā šobrīd</h4><span className="hp-live">21 tiešsaistē</span></div>
                <div className="hp-strip">
                  <div className="hp-stat" style={{ "--sc": "#10b981" } as React.CSSProperties}><div className="sv">24</div><div className="sl">Aktīvi</div></div>
                  <div className="hp-stat" style={{ "--sc": "#f59e0b" } as React.CSSProperties}><div className="sv">5</div><div className="sl">Pauzēti</div></div>
                  <div className="hp-stat" style={{ "--sc": "#7c3aed" } as React.CSSProperties}><div className="sv">92%</div><div className="sl">Ražotnes noslodze</div></div>
                </div>
                <div className="hp-r"><span className="hp-av g">JB</span><span className="hp-cell"><div className="l1">Jānis Bērziņš</div><div className="l2"><span className="hp-bar"><i style={{ width: "78%" }} /></span><span className="meta"><b>78%</b> · 6h 12m / 8h</span></div></span><span className="hp-r-right"><span className="hp-pill g">Aktīvs</span></span></div>
                <div className="hp-r"><span className="hp-av g">AK</span><span className="hp-cell"><div className="l1">Anna Kalniņa</div><div className="l2"><span className="hp-bar"><i style={{ width: "94%" }} /></span><span className="meta"><b>94%</b> · 5h 40m / 6h</span></div></span><span className="hp-r-right"><span className="hp-pill g">Aktīvs</span></span></div>
                <div className="hp-r"><span className="hp-av a">PL</span><span className="hp-cell"><div className="l1">Pēteris Liepa</div><div className="l2"><span className="hp-bar low"><i style={{ width: "61%" }} /></span><span className="meta"><b>61%</b> · 3h 05m / 5h</span></div></span><span className="hp-r-right"><span className="hp-pill a">Pauzēts</span></span></div>
                <div className="hp-r"><span className="hp-av g">MO</span><span className="hp-cell"><div className="l1">Mārtiņš Ozols</div><div className="l2"><span className="hp-bar"><i style={{ width: "92%" }} /></span><span className="meta"><b>92%</b> · 7h 20m / 8h</span></div></span><span className="hp-r-right"><span className="hp-pill g">Aktīvs</span></span></div>
              </div>
              {/* Panel 1: Projekti — projects.php */}
              <div className="panel">
                <div className="hp-head"><h4>Aktīvie projekti</h4><span className="hp-live">47 aktīvi</span></div>
                <div className="hp-strip">
                  <div className="hp-stat" style={{ "--sc": "#7c3aed" } as React.CSSProperties}><div className="sv">47</div><div className="sl">Aktīvi projekti</div></div>
                  <div className="hp-stat" style={{ "--sc": "#f43f5e" } as React.CSSProperties}><div className="sv">3</div><div className="sl">Kavējas</div></div>
                  <div className="hp-stat" style={{ "--sc": "#f59e0b" } as React.CSSProperties}><div className="sv">8</div><div className="sl">Termiņš šonedēļ</div></div>
                </div>
                <div className="hp-r"><span className="hp-numbadge">P-26.41</span><span className="hp-cell"><div className="l1">K1 stūra elements</div><div className="l2"><span className="hp-bar done"><i style={{ width: "100%" }} /></span><span className="meta"><b>100%</b> · SIA Kalnabērzs</span></div></span><span className="hp-r-right"><span className="hp-mbadge g">+18%</span><span className="hp-dl"><Cal /> 12.05</span></span></div>
                <div className="hp-r"><span className="hp-numbadge">P-26.44</span><span className="hp-cell"><div className="l1">Virtuves fasādes</div><div className="l2"><span className="hp-bar half"><i style={{ width: "62%" }} /></span><span className="meta"><b>62%</b> · SIA Nams</span></div></span><span className="hp-r-right"><span className="hp-mbadge g">+14%</span><span className="hp-dl"><Cal /> 14.05</span></span></div>
                <div className="hp-r"><span className="hp-numbadge">P-26.47</span><span className="hp-cell"><div className="l1">Logu bloki LV-204</div><div className="l2"><span className="hp-bar low"><i style={{ width: "28%" }} /></span><span className="meta"><b>28%</b> · SIA Finestra</span></div></span><span className="hp-r-right"><span className="hp-mbadge g">+9%</span><span className="hp-dl warn"><Cal /> 17.05</span></span></div>
                <div className="hp-r"><span className="hp-numbadge">P-26.49</span><span className="hp-cell"><div className="l1">Durvju bloki</div><div className="l2"><span className="hp-bar low"><i style={{ width: "45%" }} /></span><span className="meta"><b>45%</b> · SIA Koks</span></div></span><span className="hp-r-right"><span className="hp-mbadge g">+12%</span><span className="hp-dl"><Cal /> 19.05</span></span></div>
              </div>
              {/* Panel 2: Efektivitāte — reports_employees.php */}
              <div className="panel">
                <div className="hp-head"><h4>Darbinieku efektivitāte</h4><span className="hp-note">Šī nedēļa</span></div>
                <div className="hp-strip">
                  <div className="hp-stat" style={{ "--sc": "#7c3aed" } as React.CSSProperties}><div className="sv">94%</div><div className="sl">Ražotnes efekt.</div></div>
                  <div className="hp-stat" style={{ "--sc": "#10b981" } as React.CSSProperties}><div className="sv">108%<span className="t up"><TrendUp />6%</span></div><div className="sl">Vidēji darbinieks</div></div>
                  <div className="hp-stat" style={{ "--sc": "#14b8a6" } as React.CSSProperties}><div className="sv">91%</div><div className="sl">Laikā izpildīti</div></div>
                </div>
                <div className="hp-r"><span className="hp-av v">JB</span><span className="hp-cell"><div className="l1">Jānis Bērziņš</div><div className="l2"><span className="hp-bar"><i style={{ width: "94%" }} /></span><span className="meta">7h 30m / 8h 0m</span></div></span><span className="hp-r-right"><span className="hp-effpill good">124% <span className="d">Ļoti efektīvs</span></span></span></div>
                <div className="hp-r"><span className="hp-av v">AK</span><span className="hp-cell"><div className="l1">Anna Kalniņa</div><div className="l2"><span className="hp-bar"><i style={{ width: "94%" }} /></span><span className="meta">5h 40m / 6h 0m</span></div></span><span className="hp-r-right"><span className="hp-effpill norm">106% <span className="d">Plānā</span></span></span></div>
                <div className="hp-r"><span className="hp-av v">MO</span><span className="hp-cell"><div className="l1">Mārtiņš Ozols</div><div className="l2"><span className="hp-bar low"><i style={{ width: "100%" }} /></span><span className="meta">6h 40m / 6h 0m</span></div></span><span className="hp-r-right"><span className="hp-effpill bad">90% <span className="d">Zem plāna</span></span></span></div>
                <div className="hp-r"><span className="hp-av v">PL</span><span className="hp-cell"><div className="l1">Pēteris Liepa</div><div className="l2"><span className="hp-bar"><i style={{ width: "88%" }} /></span><span className="meta">3h 30m / 4h 0m</span></div></span><span className="hp-r-right"><span className="hp-effpill good">114% <span className="d">Ļoti efektīvs</span></span></span></div>
              </div>
              {/* Panel 3: Peļņa — project_profitability.php */}
              <div className="panel">
                <div className="hp-head"><h4>Uzņēmuma peļņa</h4><span className="hp-note">Q2 2026</span></div>
                <div className="hp-kpis">
                  <div className="hp-kpi"><div className="k">Ieņēmumi</div><div className="v">142 380 €</div></div>
                  <div className="hp-kpi"><div className="k">Izmaksas</div><div className="v">108 241 €</div></div>
                  <div className="hp-kpi hero"><div className="k">Neto peļņa</div><div className="v">34 139 €<small>+24%</small></div></div>
                  <div className="hp-kpi"><div className="k">Marža</div><div className="v">24.0%</div></div>
                </div>
                <div className="hp-chart">
                  <div className="col"><div className="hp-cbar" style={{ height: "52%" }} /><div className="cl">Jan</div></div>
                  <div className="col"><div className="hp-cbar" style={{ height: "64%" }} /><div className="cl">Feb</div></div>
                  <div className="col"><div className="hp-cbar" style={{ height: "47%" }} /><div className="cl">Mar</div></div>
                  <div className="col"><div className="hp-cbar" style={{ height: "78%" }} /><div className="cl">Apr</div></div>
                  <div className="col"><div className="hp-cbar" style={{ height: "68%" }} /><div className="cl">Mai</div></div>
                  <div className="col on"><span className="cval">34k €</span><div className="hp-cbar" style={{ height: "92%" }} /><div className="cl">Jūn</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll" id="hero-scroll" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
