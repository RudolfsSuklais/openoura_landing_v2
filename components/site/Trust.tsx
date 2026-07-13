function Star() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7L12 2z" />
    </svg>
  );
}

export function Trust() {
  return (
    <section className="block" id="klienti">
      <div className="wrap">
        <div className="trust2 reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="flogo" src="/finestra_logo.png" alt="SIA Finestra" />
          <div className="tstars" aria-label="5 no 5">
            <Star /><Star /><Star /><Star /><Star />
          </div>
          <p className="q">
            Agrāk katru rītu sākās ar zvaniem pa cehu — kur kas stāv, kurš ko dara. Tagad atveru vienu ekrānu un redzu visu uzreiz: kurš strādā, cik projekts jau maksājis un vai vēl nesam peļņu. Excel vairs neatveru.”
          </p>
          <div className="who">
            <div>
              <b>SIA Finestra</b>
              <span>Logu un durvju ražošana · Liepāja</span>
            </div>
          </div>
          <div className="tstats">
            <div className="tstat"><div className="tv"><span data-count="8">8</span>h</div><div className="tl">ietaupītas katru nedēļu</div></div>
            <div className="tstat"><div className="tv"><span data-count="47">47</span></div><div className="tl">pasūtījumi vienā skatā</div></div>
            <div className="tstat"><div className="tv"><span data-count="0">0</span></div><div className="tl">Excel faili ražošanā</div></div>
            <div className="tstat"><div className="tv"><span data-count="6">6</span> mēn.</div><div className="tl">OpenOura ikdienā</div></div>
          </div>
          <div className="tchips">
            <span className="tchip">Kokapstrāde</span>
            <span className="tchip">Metālapstrāde</span>
            <span className="tchip">Logi un durvis</span>
            <span className="tchip">Mēbeles</span>
            <span className="tchip">Ražošana pēc pasūtījuma</span>
          </div>
        </div>
      </div>
    </section>
  );
}
