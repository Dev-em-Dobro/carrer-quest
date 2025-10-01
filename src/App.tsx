import Header from './components/Header';
import FiltrosVagas from './components/FiltrosVagas';
import VagasList from './components/VagasList';
import type { Vaga } from './types/vaga';
import './App.css';
import './components/Header.css';

function App() {
  const handleVagaClick = (vaga: Vaga) => {
    console.log('Vaga clicada:', vaga);
    // Aqui podemos implementar funcionalidades futuras como:
    // - Modal com detalhes da vaga
    // - Favoritar vaga
    // - Candidatar-se à vaga
  };

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <div className="app__container">
          <section className="app__hero">
            <div className="app__badge">
              <span className="app__badge-icon">✨</span>
              <span className="app__badge-text">Powered by DevQuest AI</span>
            </div>
            
            <h1 className="app__hero-title">
              Encontre sua próxima{' '}
              <span className="app__hero-highlight">oportunidade em programação</span>
            </h1>
            
            <p className="app__hero-subtitle">
              Nossos agentes de IA especializados estão aqui para acelerar sua busca por vagas.
              Filtre por nível de experiência, tecnologias e localização para encontrar a posição ideal.
            </p>
          </section>
          
          <FiltrosVagas />
          <VagasList onVagaClick={handleVagaClick} />
        </div>
      </main>

      <footer className="app__footer">
        <div className="app__container">
          <p className="app__footer-text">
            Desenvolvido com <span className="heart">♥</span> usando React, TypeScript e Adzuna API
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
