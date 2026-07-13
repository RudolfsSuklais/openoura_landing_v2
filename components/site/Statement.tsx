import { Check } from "./icons";

export function Statement() {
  return (
    <section className="block">
      <div className="wrap">
        <div className="stmt reveal">
          <h2>
            Beidz minēt. <span className="hl2">Sāc redzēt.</span>
          </h2>
          <p>
            OpenOura savāc katru nostrādāto stundu, materiālu un rēķinu vienuviet un parāda patieso ainu reāllaikā: kas strādā, cik maksā padarītais un cik tu nopelni.
          </p>
          <div className="stmt-chips">
            <span className="stmt-chip"><span className="ck"><Check /></span> Bez Excel</span>
            <span className="stmt-chip"><span className="ck"><Check /></span> Bez zvaniem pa ražotni</span>
            <span className="stmt-chip"><span className="ck"><Check /></span> Bez minēšanas</span>
          </div>
        </div>
      </div>
    </section>
  );
}
