import { useState } from 'react';
import { useVagas } from '../hooks/useVagas';
import type { FiltrosVaga } from '../types/vaga';
import './FiltrosVagas.css';

const PALAVRAS_CHAVE_PADRAO = [
  'desenvolvedor',
  'frontend', 
  'backend',
  'full stack',
  'software engineer',
  'júnior',
  'estagiário',
  'pleno',
  'react',
  'node.js',
  'typescript',
  'javascript',
  'python',
  'java',
  'devops'
];

const TIPOS_CONTRATO = [
  { value: 'integral', label: 'Tempo Integral' },
  { value: 'meio-periodo', label: 'Meio Período' },
  { value: 'contrato', label: 'Contrato' },
  { value: 'estagio', label: 'Estágio' },
] as const;

export default function FiltrosVagas() {
  const { filtros, setFiltros, buscarVagas, loading } = useVagas();
  const [isExpanded, setIsExpanded] = useState(false);
  const [novaPalavraChave, setNovaPalavraChave] = useState('');

  const handlePalavrasChaveChange = (palavra: string, checked: boolean) => {
    const novasPalavras = checked 
      ? [...filtros.palavrasChave, palavra]
      : filtros.palavrasChave.filter(p => p !== palavra);
    
    setFiltros({ palavrasChave: novasPalavras });
  };

  const handleAddPalavraChave = () => {
    if (novaPalavraChave.trim() && !filtros.palavrasChave.includes(novaPalavraChave.trim())) {
      setFiltros({ 
        palavrasChave: [...filtros.palavrasChave, novaPalavraChave.trim()] 
      });
      setNovaPalavraChave('');
    }
  };

  const handleRemovePalavraChave = (palavra: string) => {
    setFiltros({
      palavrasChave: filtros.palavrasChave.filter(p => p !== palavra)
    });
  };

  const handleLocalizacaoChange = (localizacao: string) => {
    setFiltros({ localizacao: localizacao || undefined });
  };

  const handleTipoContratoChange = (tipo: string) => {
    setFiltros({ 
      tipoContrato: tipo === '' ? undefined : tipo as FiltrosVaga['tipoContrato']
    });
  };

  const handleSalarioMinimoChange = (salario: string) => {
    const valor = salario === '' ? undefined : Number(salario);
    setFiltros({ salarioMinimo: valor });
  };

  const handleBuscar = () => {
    buscarVagas();
  };

  const handleLimparFiltros = () => {
    setFiltros({
      palavrasChave: ['desenvolvedor', 'frontend', 'backend', 'full stack', 'software engineer'],
      localizacao: undefined,
      salarioMinimo: undefined,
      tipoContrato: undefined,
    });
  };

  const temFiltrosAtivos = filtros.localizacao || 
                          filtros.salarioMinimo || 
                          filtros.tipoContrato ||
                          filtros.palavrasChave.length > 5;

  return (
    <div className="filtros-vagas">
      <div className="filtros-vagas__header">
        <h3 className="filtros-vagas__title">Filtrar Vagas</h3>
        <button
          className="filtros-vagas__toggle"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Fechar filtros' : 'Expandir filtros'}
        >
          <svg 
            className={`filtros-vagas__toggle-icon ${isExpanded ? 'expanded' : ''}`}
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <polyline points="6,9 12,15 18,9"/>
          </svg>
        </button>
      </div>

      <div className={`filtros-vagas__content ${isExpanded ? 'expanded' : ''}`}>
        {/* Palavras-chave */}
        <div className="filtros-vagas__section">
          <label className="filtros-vagas__label">
            Palavras-chave de busca
          </label>
          
          <div className="palavras-chave__grid">
            {PALAVRAS_CHAVE_PADRAO.map(palavra => (
              <label key={palavra} className="palavra-chave__checkbox">
                <input
                  type="checkbox"
                  checked={filtros.palavrasChave.includes(palavra)}
                  onChange={(e) => handlePalavrasChaveChange(palavra, e.target.checked)}
                />
                <span className="checkmark">{palavra}</span>
              </label>
            ))}
          </div>

          {/* Palavras-chave customizadas */}
          {filtros.palavrasChave
            .filter(p => !PALAVRAS_CHAVE_PADRAO.includes(p))
            .map(palavra => (
              <div key={palavra} className="palavra-chave__custom">
                <span>{palavra}</span>
                <button
                  onClick={() => handleRemovePalavraChave(palavra)}
                  className="palavra-chave__remove"
                  aria-label={`Remover ${palavra}`}
                >
                  ×
                </button>
              </div>
            ))
          }

          <div className="palavra-chave__add">
            <input
              type="text"
              value={novaPalavraChave}
              onChange={(e) => setNovaPalavraChave(e.target.value)}
              placeholder="Adicionar palavra-chave personalizada..."
              className="palavra-chave__input"
              onKeyPress={(e) => e.key === 'Enter' && handleAddPalavraChave()}
            />
            <button
              onClick={handleAddPalavraChave}
              disabled={!novaPalavraChave.trim()}
              className="palavra-chave__add-btn"
            >
              +
            </button>
          </div>
        </div>

        {/* Localização */}
        <div className="filtros-vagas__section">
          <label className="filtros-vagas__label" htmlFor="localizacao">
            Localização
          </label>
          <input
            id="localizacao"
            type="text"
            value={filtros.localizacao || ''}
            onChange={(e) => handleLocalizacaoChange(e.target.value)}
            placeholder="Ex: São Paulo, Remote, Brasil..."
            className="filtros-vagas__input"
          />
        </div>

        {/* Tipo de Contrato */}
        <div className="filtros-vagas__section">
          <label className="filtros-vagas__label" htmlFor="tipoContrato">
            Tipo de Contrato
          </label>
          <select
            id="tipoContrato"
            value={filtros.tipoContrato || ''}
            onChange={(e) => handleTipoContratoChange(e.target.value)}
            className="filtros-vagas__select"
          >
            <option value="">Todos os tipos</option>
            {TIPOS_CONTRATO.map(tipo => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
        </div>

        {/* Salário Mínimo */}
        <div className="filtros-vagas__section">
          <label className="filtros-vagas__label" htmlFor="salarioMinimo">
            Salário Mínimo (R$)
          </label>
          <input
            id="salarioMinimo"
            type="number"
            value={filtros.salarioMinimo || ''}
            onChange={(e) => handleSalarioMinimoChange(e.target.value)}
            placeholder="Ex: 5000"
            min="0"
            step="500"
            className="filtros-vagas__input"
          />
        </div>

        {/* Botões de ação */}
        <div className="filtros-vagas__actions">
          <button
            onClick={handleBuscar}
            disabled={loading}
            className="filtros-vagas__btn filtros-vagas__btn--primary"
          >
            {loading ? (
              <>
                <div className="btn-spinner"></div>
                Buscando...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                Buscar Vagas
              </>
            )}
          </button>
          
          {temFiltrosAtivos && (
            <button
              onClick={handleLimparFiltros}
              className="filtros-vagas__btn filtros-vagas__btn--secondary"
            >
              Limpar Filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
}