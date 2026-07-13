export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid reveal">
          <div className="foot-brand">
            <a className="brand" href="#top" aria-label="OpenOura">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="logo-img logo-light" src="/openoura-logo.png" alt="OpenOura" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="logo-img logo-dark" src="/openoura-logo-dark.png" alt="OpenOura" aria-hidden="true" />
            </a>
            <p>Visa tava ražotne vienā ekrānā. Bez Excel. Made in Latvia <span className="flag">🇱🇻</span></p>
            <span className="foot-since">Kopš 2025 · Liepāja</span>
          </div>
          <div className="foot-col">
            <h5>Produkts</h5>
            <a href="#tour">Kā strādā</a>
            <a href="#klienti">Klienti</a>
            <a href="#cenas">Cenas</a>
            <a href="#kontakti">Demo</a>
          </div>
          <div className="foot-col">
            <h5>Uzņēmums</h5>
            <a href="#klienti">Klientu stāsti</a>
            <a href="#kontakti">Kontakti</a>
            <a href="mailto:ruudisrudolfs@gmail.com">E-pasts</a>
            <a href="https://wa.me/37120510502">WhatsApp</a>
          </div>
          <div className="foot-col">
            <h5>Sociālie tīkli</h5>
            <a href="https://www.instagram.com/openoura/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61589528827191" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.linkedin.com/in/r%C5%ABdolfs-%C5%A1uklais-9b4666337" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 OpenOura · Made in Latvia · +371 20 510 502</span>
          <a className="foot-top" href="#top">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
            Uz augšu
          </a>
        </div>
      </div>
    </footer>
  );
}
