interface HeaderProps {
  activeTab: 'vagas' | 'recrutadores';
  onTabChange: (tab: 'vagas' | 'recrutadores') => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__logo">Career Quest</h1>
        
        <nav className="header__nav">
          <button
            className={`header__tab ${activeTab === 'vagas' ? 'active' : ''}`}
            onClick={() => onTabChange('vagas')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="7" width="18" height="13" rx="2"/>
              <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/>
              <line x1="12" y1="11" x2="12" y2="17"/>
              <line x1="9" y1="14" x2="15" y2="14"/>
            </svg>
            Vagas
          </button>
          
          <button
            className={`header__tab ${activeTab === 'recrutadores' ? 'active' : ''}`}
            onClick={() => onTabChange('recrutadores')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Contate um Recrutador
          </button>
        </nav>
      </div>
    </header>
  );
}