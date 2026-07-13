import { Phone, WhatsApp, Pin } from "./icons";
import { ContactForm } from "./ContactForm";
import { CopyEmail } from "./CopyEmail";

export function Contact() {
  return (
    <section className="block" id="kontakti">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="kicker">Kontakti</span>
          <h2>Runā tieši ar dibinātāju</h2>
          <p>Bez čatbota, bez zvanu centra. 25 minūšu demo, bez saistībām. Atbilde 4 stundu laikā.</p>
        </div>
        <div className="contact-grid reveal">
          <div className="contact-info">
            <div className="fava">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/openoura_founder.jpeg" alt="Rūdolfs Šuklais" />
            </div>
            <h3>Rūdolfs Šuklais</h3>
            <div className="frole">OpenOura dibinātājs</div>
            <span className="loc-chip"><Pin /> Liepāja, Latvija · atbildu latviski</span>
            <p>
              Es pats veidoju OpenOura pēc reālu ražošanas problēmu vērošanas. Raksti man tieši, un es palīdzēšu saprast, vai tas der tavai ražotnei.
            </p>
            <div className="cbtns">
              <a href="tel:+37120510502"><Phone /> +371 20 510 502</a>
              <a href="https://wa.me/37120510502"><WhatsApp /> WhatsApp</a>
              <CopyEmail />
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
