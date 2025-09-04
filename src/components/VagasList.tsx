import { useEffect } from 'react';
import { useVagas } from '../hooks/useVagas';
import VagaCard from './VagaCard';
import type { Vaga } from '../types/vaga';
import './VagasList.css';

interface VagasListProps {
  onVagaClick?: (vaga: Vaga) => void;
}

export default function VagasList({ onVagaClick }: VagasListProps) {
  const { 
    vagas, 
    loading, 
    error, 
    total, 
    paginaAtual, 
    totalPaginas, 
    vagasPorPagina,
    buscarVagas, 
    proximaPagina, 
    paginaAnterior,
    buscarPagina 
  } = useVagas();

  useEffect(() => {
    buscarVagas();
  }, [buscarVagas]);

  if (loading) {
    return (
      <div className="vagas-list">
        <div className="vagas-list__loading">
          <div className="loading-spinner"></div>
          <p>Buscando vagas de programação...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="vagas-list">
        <div className="vagas-list__error">
          <svg 
            className="error-icon" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          <h3>Erro ao carregar vagas</h3>
          <p>{error}</p>
          <button 
            className="retry-button primary"
            onClick={() => buscarVagas()}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (vagas.length === 0) {
    return (
      <div className="vagas-list">
        <div className="vagas-list__empty">
          <svg 
            className="empty-icon" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <h3>Nenhuma vaga encontrada</h3>
          <p>Tente ajustar seus filtros de busca.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vagas-list">
      <div className="vagas-list__header">
        <h2 className="vagas-list__title">
          Vagas de Programação
        </h2>
        <span className="vagas-list__count">
          {total} vaga{total !== 1 ? 's' : ''} encontrada{total !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="vagas-list__grid">
        {vagas.map((vaga, index) => (
          <VagaCard
            key={`${vaga.link}-${index}`}
            vaga={vaga}
            onClick={onVagaClick}
          />
        ))}
      </div>

      {vagas.length > 0 && (
        <div className="vagas-list__footer">
          <div className="vagas-list__pagination">
            <button
              className="pagination-button"
              onClick={paginaAnterior}
              disabled={paginaAtual === 1 || loading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Anterior
            </button>

            <div className="pagination-pages">
              {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
                let pageNumber;
                if (totalPaginas <= 5) {
                  pageNumber = i + 1;
                } else if (paginaAtual <= 3) {
                  pageNumber = i + 1;
                } else if (paginaAtual >= totalPaginas - 2) {
                  pageNumber = totalPaginas - 4 + i;
                } else {
                  pageNumber = paginaAtual - 2 + i;
                }
                
                return (
                  <button
                    key={pageNumber}
                    className={`pagination-page ${pageNumber === paginaAtual ? 'active' : ''}`}
                    onClick={() => buscarPagina(pageNumber)}
                    disabled={loading}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              className="pagination-button"
              onClick={proximaPagina}
              disabled={paginaAtual === totalPaginas || loading}
            >
              Próxima
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <p className="vagas-list__info">
            Mostrando {((paginaAtual - 1) * vagasPorPagina) + 1} - {Math.min(paginaAtual * vagasPorPagina, total)} de {total} vagas
          </p>
        </div>
      )}
    </div>
  );
}