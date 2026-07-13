const ARROW = (
  <span className="sd">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  </span>
);

const STEPS = [
  { t: "Reģistrējies un ievadi", d: "Izveido kontu un ievadi pirmos pasūtījumus. Sāc mazā mērogā un paplašinies pēc vajadzības." },
  { t: "Komanda fiksē laiku", d: "Darbinieki uzsāk taimeri planšetē ar vienu pieskārienu. Saskarne ir vienkārša visai komandai." },
  { t: "Redzi peļņu reāllaikā", d: "Monitorings, efektivitāte un peļņa līdz centam — bez viena Excel faila." },
];

export function Steps() {
  return (
    <section className="block" id="sakums">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="kicker">Kā sākt</span>
          <h2>Trīs soļi līdz skaidrībai</h2>
          <p>Ātra ieviešana ar mūsu atbalstu, pielāgota tavai komandai.</p>
        </div>
        <div className="steps reveal">
          {STEPS.map((s, i) => (
            <div className="step" key={i}>
              <div className="sn">{i + 1}</div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
              {ARROW}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
