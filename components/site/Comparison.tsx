import { X, CheckMini } from "./icons";

const ROWS = [
  { l: "Pārskats par ražotni", e: "Izkaisīts pa Excel failiem", o: "Viens ekrāns reāllaikā" },
  { l: "Darba laiks", e: "Manuāli, ar kļūdām", o: "Automātiski, līdz minūtei" },
  { l: "Projekta peļņa", e: "Zināma tikai vēlāk", o: "Reāllaikā, līdz centam" },
  { l: "Ienākošie rēķini", e: "Ievadi ar roku", o: "AI izlasa automātiski" },
  { l: "Versijas un kļūdas", e: "22 faili, sajukums", o: "Viens avots, vienmēr aktuāls" },
  { l: "Ieviešana", e: "—", o: "1 diena, bez konsultantiem" },
];

export function Comparison() {
  return (
    <section className="block" id="salidzinajums">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="kicker">Salīdzinājums</span>
          <h2>Excel pret OpenOura</h2>
          <p>Tas pats darbs, divi ļoti dažādi rīti.</p>
        </div>
        <div className="cmp reveal">
          <div className="cmp-row cmp-head">
            <div className="cmp-c" />
            <div className="cmp-c cmp-c-h">Excel</div>
            <div className="cmp-c cmp-c-h"><span className="cmp-oo">OpenOura</span></div>
          </div>
          {ROWS.map((r, i) => (
            <div className="cmp-row" key={i}>
              <div className="cmp-c lbl">{r.l}</div>
              <div className="cmp-c excel"><span className="cmp-x"><X /></span>{r.e}</div>
              <div className="cmp-c oo"><span className="cmp-v"><CheckMini /></span>{r.o}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
