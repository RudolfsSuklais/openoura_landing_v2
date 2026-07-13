export function Nav() {
  return (
    <>
      <header className="nav" id="nav">
        <div className="wrap nav-inner">
          <a className="brand" href="#top" aria-label="OpenOura">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo-img logo-light" src="/openoura-logo.png" alt="OpenOura" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo-img logo-dark" src="/openoura-logo-dark.png" alt="OpenOura" aria-hidden="true" />
          </a>
          <nav className="nav-links" aria-label="Galvenā navigācija">
            <a href="#tour">Kā strādā</a>
            <a href="#klienti">Klienti</a>
            <a href="#cenas">Cenas</a>
            <a href="#faq">Jautājumi</a>
            <a href="#kontakti">Kontakti</a>
          </nav>
          <div className="nav-right">
            <button className="icon-btn" id="theme-toggle" aria-label="Mainīt tēmu" data-tip="Gaišs / tumšs" type="button">
              <svg
                id="theme-icon"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </button>
            <a className="login" href="https://openoura.com">
              Pieslēgties
            </a>
            <a className="btn btn-primary" href="#cenas">
              Sākt bez maksas <span className="arrow">→</span>
            </a>
            <button className="icon-btn menu-toggle" id="menu-toggle" aria-label="Izvēlne" aria-expanded="false" type="button">
              <svg className="bars" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
              <svg className="x" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="mobile-menu" id="mobile-menu">
        <a href="#tour">Kā strādā</a>
        <a href="#klienti">Klienti</a>
        <a href="#cenas">Cenas</a>
        <a href="#faq">Jautājumi</a>
        <a href="#kontakti">Kontakti</a>
        <a className="login" href="https://app.openoura.com">
          Pieslēgties
        </a>
        <a className="btn btn-primary" href="#cenas">
          Sākt bez maksas <span className="arrow">→</span>
        </a>
      </div>
    </>
  );
}
