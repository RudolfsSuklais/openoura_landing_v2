/* "Reāllaika monitorings" showcase — mirrors the real OpenOura
   monitoring.php dashboard 1:1 (structure + styling). Sample data. */

/* ── inline icons (replaces Font Awesome from the real app) ── */
const IcBroadcast = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.9 16.1a10 10 0 010-8.2M19.1 7.9a10 10 0 010 8.2M7.8 13.2a4 4 0 010-2.4M16.2 10.8a4 4 0 010 2.4" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /></svg>
);
const IcDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" /></svg>
);
const IcCaret = () => (
  <svg viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 1l5 5 5-5" /></svg>
);
const IcPlay = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>;
const IcPause = () => <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>;
const IcWarn = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L2 20h20L12 3z" /><path d="M12 10v4M12 17h.01" /></svg>;
const IcLayers = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5" /></svg>;
const IcFolder = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 6a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" /></svg>;
const IcClock = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" strokeLinecap="round" /></svg>;
const IcRedo = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 11-3-6.7M21 4v4h-4" /></svg>;
const IcFire = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2s5 4 5 9a5 5 0 01-10 0c0-1.5.5-2.5 1-3 .2 1 .8 1.8 1.5 1.8.8 0 1-1 .8-2C10 6.5 12 4 12 2z" /></svg>;
const IcSearch = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>;
const IcCube = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 5v10l-9 5-9-5V7l9-5zM3 7l9 5 9-5M12 12v10" /></svg>;
const IcComment = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a1 1 0 011 1v11a1 1 0 01-1 1H8l-4 4V5a1 1 0 011-1z" /></svg>;

type Card = {
  status: "active" | "paused" | "overtime";
  initials: string;
  name: string;
  project: string;
  task: string;
  position?: string;
  pauseReason?: string;
  time: string;
  est: string;
  pct: number;
  overtime?: string;
  started: string;
  sessions: number;
};

const STATS = [
  { key: "s-active", ic: <IcPlay />, v: "292", l: "Aktīvi" },
  { key: "s-paused", ic: <IcPause />, v: "275", l: "Pauzēti" },
  { key: "s-overtime", ic: <IcWarn />, v: "103", l: "Pārsniegts laiks" },
  { key: "s-runaway", ic: <IcWarn />, v: "4", l: "Aizmirsti" },
  { key: "s-total", ic: <IcLayers />, v: "567", l: "Kopā sistēmā" },
];

const CARDS: Card[] = [
  { status: "active", initials: "EO", name: "Edgars Ozoliņš", project: "P-235 · Fasādes komplekts", task: "Stikla apstrāde", position: "POZ-04 Stikla pakete", time: "1h 03m", est: "3h 00m", pct: 35, started: "11.05 08:12", sessions: 2 },
  { status: "active", initials: "ML", name: "Marina Lapsa", project: "P-230 · Logu bloki LV-204", task: "Hermetizācija", time: "3h 47m", est: "5h 00m", pct: 62, started: "11.05 07:05", sessions: 1 },
  { status: "paused", initials: "MK", name: "Mārtiņš Kalniņš", project: "P-226 · Durvju bloki", task: "Profilu zāģēšana", position: "POZ-11 Rāmja profils", pauseReason: "Trūkst materiāls", time: "4h 49m", est: "6h 00m", pct: 48, started: "11.05 06:40", sessions: 3 },
  { status: "paused", initials: "IO", name: "Inese Ozoliņa", project: "P-228 · Virtuves fasādes", task: "Furnitūras montāža", pauseReason: "Gaida meistara apstiprinājumu", time: "2h 29m", est: "4h 00m", pct: 40, started: "11.05 08:30", sessions: 2 },
  { status: "active", initials: "TV", name: "Toms Vītols", project: "P-235 · Fasādes komplekts", task: "Furnitūras montāža", time: "1h 35m", est: "5h 00m", pct: 30, started: "11.05 09:02", sessions: 1 },
  { status: "overtime", initials: "KE", name: "Kristaps Eglītis", project: "P-230 · Logu bloki LV-204", task: "Profilu zāģēšana", time: "6h 41m", est: "6h 00m", pct: 100, overtime: "41m", started: "11.05 05:58", sessions: 4 },
];

function StatusBadge({ status }: { status: Card["status"] }) {
  if (status === "paused") {
    return <span className="mon-badge b-paused"><IcPause /> Pauzēts</span>;
  }
  return <span className="mon-badge b-active"><IcPlay /> Aktīvs</span>;
}

export function ProjectDetail() {
  return (
    <section className="block" id="projekts" style={{ background: "var(--bg-soft)" }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="kicker">Dashboard</span>
          <h2>Visa ražotne reāllaikā, vienā skatā</h2>
          <p>Reāllaika monitorings: katrs aktīvais darbs, darbinieks un projekts uzreiz redzams. Tieši tā izskatās tavs OpenOura.</p>
        </div>
        <div className="reveal" style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div className="mock">
            <div className="mock-bar">
              <span className="dot" style={{ background: "#ff5f57" }} />
              <span className="dot" style={{ background: "#febc2e" }} />
              <span className="dot" style={{ background: "#28c840" }} />
              <span className="mock-url">app.openoura.com/monitoring</span>
            </div>
            <div className="mon-mock">
              {/* header */}
              <div className="mon-head">
                <div>
                  <h1><span className="m-hi"><IcBroadcast /></span> Reāllaika monitorings</h1>
                  <p>Visi aktīvie procesi un darbinieku aktivitāte</p>
                </div>
                <div className="m-right">
                  <span className="m-btn-sec"><IcDownload /> Eksportēt <IcCaret /></span>
                  <span className="mon-live"><span className="m-dot" /><span>LIVE</span></span>
                  <span className="mon-updated">Atjaunots: 08:30:14</span>
                </div>
              </div>

              {/* stats */}
              <div className="mon-stats">
                {STATS.map((s) => (
                  <div className={`mon-stat ${s.key}`} key={s.key}>
                    <span className="m-ic">{s.ic}</span>
                    <div>
                      <div className="m-v">{s.v}</div>
                      <div className="m-l">{s.l}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* controls */}
              <div className="mon-controls">
                <div className="mon-search">
                  <IcSearch />
                  <input type="text" placeholder="Meklēt darbinieku, uzdevumu vai projektu..." readOnly tabIndex={-1} />
                </div>
                <span className="mon-sel">Visi statusi <IcCaret /></span>
                <span className="mon-sel">Visi tipi <IcCaret /></span>
              </div>

              {/* cards */}
              <div className="mon-grid">
                {CARDS.map((c, i) => (
                  <div className={`mon-card is-${c.status}`} key={i}>
                    <div className="mon-card-top">
                      <div className="mon-card-user">
                        <div className="mon-avatar">{c.initials}</div>
                        <div className="mon-user-info">
                          <div className="mon-user-name">{c.name}</div>
                          <div className="mon-user-project"><IcFolder /> {c.project}</div>
                        </div>
                      </div>
                      <div><StatusBadge status={c.status} /></div>
                    </div>
                    <div className="mon-card-body">
                      <div className="mon-task-name">{c.task} <span className="mon-type-tag mon-type-piece">Gabaldarbs</span></div>
                      {c.position && <div className="mon-task-pos"><IcCube /> {c.position}</div>}
                      {c.pauseReason && (
                        <div className="mon-pause-reason">
                          <IcComment />
                          <span className="pr-label">Pauzes iemesls:</span>
                          <span className="pr-text">{c.pauseReason}</span>
                        </div>
                      )}
                      <div className="mon-prog">
                        <div className="mon-prog-h">
                          <span className="mon-prog-t">
                            {c.time} <span className="m-est">/ {c.est}</span>
                            {c.overtime && <span className="mon-ot-badge"><IcFire /> +{c.overtime}</span>}
                          </span>
                          <span className="mon-prog-pct">{c.pct}%</span>
                        </div>
                        <div className="mon-prog-bar"><div className="mon-prog-fill" style={{ width: `${c.pct}%` }} /></div>
                      </div>
                      <div className="mon-meta">
                        <span className="mon-meta-item"><IcClock /> Sākts: <strong>{c.started}</strong></span>
                        <span className="mon-meta-item"><IcRedo /> Sesijas: <strong>{c.sessions}</strong></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
