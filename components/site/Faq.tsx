import { Plus } from "./icons";

const ITEMS = [
  {
    q: "Cik ilga ir ieviešana?",
    a: "Atkarīgs no uzņēmuma izmēra un procesiem. Palīdzam ieviest pakāpeniski un ar atbalstu, no pirmajiem pasūtījumiem līdz visai ražotnei.",
  },
  {
    q: "Vai darbiniekiem vajadzēs ilgu apmācību?",
    a: "Nē. Saskarne ir vienkārša. Darbinieks iemācās fiksēt darba laiku dažās minūtēs, un 30 minūšu video pietiek visai komandai.",
  },
  {
    q: "Vai mani dati būs drošībā?",
    a: "Jā. Dati tiek šifrēti, piekļuve ir balstīta uz lomām, un rezerves kopijas veidojas automātiski. Glabāti atbilstoši ES prasībām.",
  },
  {
    q: "Vai OpenOura der manai nozarei?",
    a: "Tā veidota ražošanai pēc pasūtījuma: kokapstrāde, metālapstrāde, logi un durvis, mēbeles un līdzīgi. Der komandām no dažiem līdz vairākiem simtiem darbinieku.",
  },
  {
    q: "Vai varu atcelt jebkurā brīdī?",
    a: "Jā. Bez gada līgumiem. Maksā pa mēnesim un atcel, kad vēlies. Savus datus jebkurā brīdī vari eksportēt.",
  },
  {
    q: "Kas notiek ar maniem Excel failiem?",
    a: "Palīdzēsim pārnest esošos datus sistēmā. Pēc tam Excel vairs nav vajadzīgs. Viss ir vienā vietā un vienmēr aktuāls.",
  },
];

export function Faq() {
  return (
    <section className="block" id="faq" style={{ background: "var(--bg-soft)" }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="kicker">Jautājumi</span>
          <h2>Bieži uzdotie jautājumi</h2>
          <p>Viss, kas jāzina pirms sākt.</p>
        </div>
        <div className="faq-search reveal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
          <input id="faq-search" type="text" placeholder="Meklē jautājumu..." aria-label="Meklēt jautājumu" />
        </div>
        <div className="faq reveal" id="faq-list">
          {ITEMS.map((item, i) => (
            <div className="faq-item" data-q={item.q.toLowerCase()} key={i}>
              <button className="faq-q" type="button" aria-expanded="false">
                {item.q}
                <span className="fic"><Plus /></span>
              </button>
              <div className="faq-a">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="faq-empty" id="faq-empty">Nekas neatbilst. Pamēģini citu vārdu vai raksti mums.</div>
        <div className="faq-cta reveal">
          Neatradi atbildi? <a href="#kontakti">Raksti tieši dibinātājam →</a>
        </div>
      </div>
    </section>
  );
}
