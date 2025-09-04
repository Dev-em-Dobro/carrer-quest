import type { Vaga } from '../types/vaga';
import './VagaCard.css';

interface VagaCardProps {
  vaga: Vaga;
  onClick?: (vaga: Vaga) => void;
}

export default function VagaCard({ vaga, onClick }: VagaCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(vaga);
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="vaga-card" onClick={handleClick}>
      <div className="vaga-card__header">
        <h3 className="vaga-card__titulo">{vaga.titulo}</h3>
        {vaga.dataPublicacao && (
          <span className="vaga-card__data">{vaga.dataPublicacao}</span>
        )}
      </div>
      
      <div className="vaga-card__empresa">
        <svg 
          className="vaga-card__icon" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M20 6L9 17l-5-5"/>
        </svg>
        {vaga.empresa}
      </div>

      <div className="vaga-card__localizacao">
        <svg 
          className="vaga-card__icon" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        {vaga.localizacao}
      </div>

      {vaga.salario && (
        <div className="vaga-card__salario">
          <svg 
            className="vaga-card__icon" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          {vaga.salario}
        </div>
      )}

      {vaga.descricao && (
        <div className="vaga-card__descricao">
          {vaga.descricao}
        </div>
      )}

      <div className="vaga-card__footer">
        <a 
          href={vaga.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="vaga-card__link"
          onClick={handleLinkClick}
        >
          Ver Vaga
          <svg 
            className="vaga-card__external-icon" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15,3 21,3 21,9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>
    </div>
  );
}