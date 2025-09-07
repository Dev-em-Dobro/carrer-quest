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
            <h1 className="app__hero-title">
              Encontre sua próxima oportunidade em programação
            </h1>
            <p className="app__hero-subtitle">
              Descubra milhares de vagas de desenvolvimento, frontend, backend, mobile e muito mais. 
              Use nossos filtros inteligentes para encontrar a posição perfeita para seu perfil.
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
