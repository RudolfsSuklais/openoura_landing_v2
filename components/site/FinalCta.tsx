export function FinalCta() {
  return (
    <section className="block" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="cta reveal">
          <div className="blob" style={{ width: 300, height: 300, background: "var(--violet)", top: -60, left: "10%", animation: "blob 17s ease-in-out infinite", opacity: 0.4 }} />
          <div className="blob" style={{ width: 280, height: 280, background: "var(--teal)", bottom: -80, right: "12%", animation: "blob 20s ease-in-out infinite reverse", opacity: 0.4 }} />
          <h2>Atstāj Excel aiz muguras</h2>
          <p>Redzi, kā OpenOura iekļaujas tavā ražošanas procesā. Mēs sagatavosim demo tieši tavai komandai.</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#kontakti" data-demo data-cta="final_cta_demo">
              Pieprasi demo · 25 min <span className="arrow">→</span>
            </a>
            <a className="btn btn-ghost" href="#tour">
              Apskatīt, kā strādā
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
