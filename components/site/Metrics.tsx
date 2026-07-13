export function Metrics() {
  return (
    <section className="metrics reveal" aria-label="Rezultāti">
      <div className="wrap">
        <div className="metrics-grid">
          <div className="metric" data-tip="Kas notiek ražotnē — uzreiz">
            <div className="mv">Reāllaikā</div>
            <div className="ml">Dati vienmēr aktuāli</div>
          </div>
          <div className="metric" data-tip="Mazāk Excel, zvanu un manuālu atskaišu">
            <div className="mv"><span data-count="8">8</span> h/ned.</div>
            <div className="ml">Vidēji ietaupīts uz administrāciju</div>
          </div>
          <div className="metric" data-tip="Sākumcena mēnesī, bez PVN">
            <div className="mv">€<span data-count="69">69</span></div>
            <div className="ml">Sākot no · mēnesī</div>
          </div>
          <div className="metric" data-tip="Saskarne un atbalsts latviešu valodā">
            <div className="mv"><span data-count="100">100</span>%</div>
            <div className="ml">Latviešu valodā un atbalstā</div>
          </div>
        </div>
      </div>
    </section>
  );
}
