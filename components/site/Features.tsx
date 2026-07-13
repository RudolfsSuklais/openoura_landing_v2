const S = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const MODULES = [
  {
    tag: "Plānošana",
    title: "Ražošanas plānotājs + TV Display",
    desc: "Saplāno darbus pa dienām un darbiniekiem un rādi plānu cehā uz TV ekrāna. Katrs redz, kas šodien jādara, bez papīra grafikiem un pārpratumiem.",
    icon: <svg viewBox="0 0 24 24" {...S}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 4v5M16 4v5" /></svg>,
  },
  {
    tag: "Reāllaiks",
    title: "Reāllaika monitorings",
    desc: "Redzi, kurš strādā, kas pauzēts un kur pārsniegts laiks. Vairs nav jāstaigā pa cehu vai jāzvana, lai saprastu, kas notiek tieši tagad.",
    icon: <svg viewBox="0 0 24 24" {...S}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  },
  {
    tag: "Laiks",
    title: "Darba laika uzskaite",
    desc: "Darbinieks uzsāk taimeri ar vienu pieskārienu planšetē. Laiks piesaistās konkrētam uzdevumam un projektam, atbalsta arī gabaldarbu.",
    icon: <svg viewBox="0 0 24 24" {...S}><circle cx="12" cy="12" r="9" /><path d="M12 8v4l2.5 2.5" /></svg>,
  },
  {
    tag: "Nauda",
    title: "Tāmes un projektu peļņa",
    desc: "Tāmes, izmaksas un reālā peļņa katram projektam, aprēķināta no nostrādātā laika un materiāliem līdz centam. Uzreiz zini, kurš darbs nes naudu.",
    icon: <svg viewBox="0 0 24 24" {...S}><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>,
  },
  {
    tag: "Materiāli",
    title: "BOM un noliktava",
    desc: "Materiālu saraksti, atlikumi un patēriņš vienuviet. Zini, cik materiālu vajag katram pasūtījumam un cik jau iztērēts.",
    icon: <svg viewBox="0 0 24 24" {...S}><path d="M21 16V8l-9-5-9 5v8l9 5 9-5zM3.3 7L12 12l8.7-5M12 22V12" /></svg>,
  },
  {
    tag: "AI",
    title: "AI rēķinu lasīšana",
    desc: "Pievieno ienākošā rēķina PDF vai foto, un AI izlasa piegādātāju, summas un pozīcijas, sasaistot tās ar noliktavu. Bez manuālas pārrakstīšanas.",
    icon: <svg viewBox="0 0 24 24" {...S}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></svg>,
  },
  {
    tag: "Dokumenti",
    title: "CMR pavadzīmes",
    desc: "Sagatavo, izdrukā un pārvaldi CMR dokumentus pārvadājumiem tieši sistēmā, bez atsevišķas programmas vai Word veidnēm.",
    icon: <svg viewBox="0 0 24 24" {...S}><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z" /><circle cx="5.5" cy="18.5" r="2" /><circle cx="18.5" cy="18.5" r="2" /></svg>,
  },
  {
    tag: "Akti",
    title: "Forma 2 — pabeigto darbu akti",
    desc: "Pabeigto darbu akti (Forma 2) sagatavojas no reālajiem datiem automātiski, bez atkārtotas ievades un rēķināšanas ar roku.",
    icon: <svg viewBox="0 0 24 24" {...S}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M9 15l2 2 4-4" /></svg>,
  },
  {
    tag: "Atskaites",
    title: "Darbinieku efektivitāte",
    desc: "Plānotais pret faktisko un efektivitāte % katram cilvēkam un visai ražotnei. Redzi, kur laiks aiziet un kur var uzlabot.",
    icon: <svg viewBox="0 0 24 24" {...S}><path d="M3 3v18h18" /><path d="M7 14l3-3 3 3 5-6" /></svg>,
  },
];

export function Features() {
  return (
    <section className="block" id="moduli">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="kicker">Moduļi</span>
          <h2>Viss ražošanai vienā vietā</h2>
          <p>OpenOura savieno plānošanu, ražošanu, materiālus un naudu vienā sistēmā. Tā atrisina trīs galvenās problēmas: neredzamību ražotnē, neskaidru projektu peļņu un manuālo Excel darbu.</p>
        </div>
        <div className="feat-grid">
          {MODULES.map((m, i) => (
            <div className="feat reveal" key={i}>
              <div className="fi">{m.icon}</div>
              <h4>{m.title}</h4>
              <p>{m.desc}</p>
              <span className="ftag">{m.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
