export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__logo">Career Quest</h1>
        
        <nav className="header__nav">
          <div className="header__tab active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="7" width="18" height="13" rx="2"/>
              <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/>
              <line x1="12" y1="11" x2="12" y2="17"/>
              <line x1="9" y1="14" x2="15" y2="14"/>
            </svg>
            Vagas
          </div>
        </nav>
      </div>
    </header>
  );
}