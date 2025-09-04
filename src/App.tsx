import FiltrosVagas from './components/FiltrosVagas';
import VagasList from './components/VagasList';
import type { Vaga } from './types/vaga';
import './App.css';

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
      <header className="app__header">
        <div className="app__container">
          <h1 className="app__title">
            <span className="app__title-main">Career Quest</span>
            <span className="app__title-sub">Sistema de Recrutamento Inteligente</span>
          </h1>
          <p className="app__description">
            Encontre as melhores oportunidades em programação com inteligência artificial
          </p>
        </div>
      </header>

      <main className="app__main">
        <div className="app__container">
          <FiltrosVagas />
          <VagasList onVagaClick={handleVagaClick} />
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
