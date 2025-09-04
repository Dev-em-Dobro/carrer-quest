import { useState } from 'react';
import Header from './components/Header';
import FiltrosVagas from './components/FiltrosVagas';
import VagasList from './components/VagasList';
import RecrutadoresList from './components/RecrutadoresList';
import type { Vaga } from './types/vaga';
import './App.css';
import './components/Header.css';

function App() {
  const [activeTab, setActiveTab] = useState<'vagas' | 'recrutadores'>('vagas');
  
  const handleVagaClick = (vaga: Vaga) => {
    console.log('Vaga clicada:', vaga);
    // Aqui podemos implementar funcionalidades futuras como:
    // - Modal com detalhes da vaga
    // - Favoritar vaga
    // - Candidatar-se à vaga
  };

  return (
    <div className="app">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="app__main">
        <div className="app__container">
          {activeTab === 'vagas' ? (
            <>
              <FiltrosVagas />
              <VagasList onVagaClick={handleVagaClick} />
            </>
          ) : (
            <RecrutadoresList />
          )}
        </div>
      </main>

      <footer className="app__footer">
        <div className="app__container">
          <p className="app__footer-text">
            Desenvolvido com <span className="heart">♥</span> usando React, TypeScript e LinkedIn API
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
