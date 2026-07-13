import { Check } from "./icons";

export function Pricing() {
  return (
    <section className="block" id="cenas">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="kicker">Cenas</span>
          <h2>Vienkāršas cenas, bez pārsteigumiem</h2>
          <p>Izvēlies plānu pēc komandas izmēra. Bez PVN · Bez gada līgumiem · Atcel jebkurā brīdī.</p>
        </div>
        <div className="plans">
          <div className="plan reveal">
            <div className="pt"><h3>Starter</h3></div>
            <p className="pdesc">Komandām, kas sāk ceļu prom no Excel.</p>
            <div className="amt">€69<small>/mēn</small></div>
            <div className="vat">bez PVN</div>
            <ul className="pf">
              <li><span className="ck"><Check /></span>Līdz 10 lietotājiem</li>
              <li><span className="ck"><Check /></span>Līdz 50 projektiem</li>
              <li><span className="ck"><Check /></span>5 GB krātuve · 100 AI rēķini/mēn.</li>
              <li><span className="ck"><Check /></span>~14h ietaupījums mēnesī</li>
            </ul>
            <a className="btn btn-ghost" href="#kontakti" data-demo data-cta="pricing_starter">
              Sākt ar Starter
            </a>
          </div>
          <div className="plan pop reveal">
            <div className="pt"><h3>Professional</h3><span className="badge">Populārākais</span></div>
            <p className="pdesc">Augošiem ražotājiem ar reāllaika vadību.</p>
            <div className="amt">€199<small>/mēn</small></div>
            <div className="vat">bez PVN</div>
            <ul className="pf">
              <li><span className="ck"><Check /></span>Līdz 30 lietotājiem · 100 projekti</li>
              <li><span className="ck"><Check /></span>20 GB krātuve</li>
              <li><span className="ck"><Check /></span>Reāllaika monitorings + Plānotājs</li>
              <li><span className="ck"><Check /></span>CMR dokumenti · 1 000 AI rēķini/mēn.</li>
            </ul>
            <a className="btn btn-violet" href="#kontakti" data-demo data-cta="pricing_professional">
              Izvēlēties Professional <span className="arrow">→</span>
            </a>
          </div>
          <div className="plan reveal">
            <div className="pt"><h3>Enterprise</h3></div>
            <p className="pdesc">Lieliem ražotājiem ar prioritāro atbalstu.</p>
            <div className="amt amt-custom">Individuāla cena</div>
            <div className="vat">pielāgota tavai komandai</div>
            <ul className="pf">
              <li><span className="ck"><Check /></span>Neierobežoti lietotāji un projekti</li>
              <li><span className="ck"><Check /></span>100 GB krātuve</li>
              <li><span className="ck"><Check /></span>Prioritārais atbalsts</li>
              <li><span className="ck"><Check /></span>5 000 AI rēķini / mēn.</li>
            </ul>
            <a className="btn btn-ghost" href="#kontakti" data-demo data-cta="pricing_enterprise">
              Runāt ar mums
            </a>
          </div>
        </div>
        <p className="price-note">Bez PVN · Bez gada līgumiem · Atcel jebkurā brīdī</p>
        <div className="price-calc-link"><a href="#kalkulators">Aprēķini savu ietaupījumu →</a></div>
      </div>
    </section>
  );
}
