import { recrutadores } from '../data/recrutadores';
import './RecrutadoresList.css';

export default function RecrutadoresList() {
  return (
    <div className="recrutadores-list">
      <div className="recrutadores-list__header">
        <h2 className="recrutadores-list__title">
          Contate um Recrutador
        </h2>
        <p className="recrutadores-list__subtitle">
          Conecte-se diretamente com recrutadores das principais empresas de tecnologia do Brasil
        </p>
      </div>

      <div className="recrutadores-list__table-container">
        <table className="recrutadores-table">
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Nome do Contato</th>
              <th>Cargo</th>
              <th>Email</th>
              <th>LinkedIn</th>
            </tr>
          </thead>
          <tbody>
            {recrutadores.map((recrutador, index) => (
              <tr key={index}>
                <td className="empresa-cell">
                  <span className="empresa-badge">{recrutador.empresa}</span>
                </td>
                <td className="nome-cell">{recrutador.nome}</td>
                <td className="cargo-cell">{recrutador.cargo}</td>
                <td className="email-cell">
                  {recrutador.email ? (
                    <a href={`mailto:${recrutador.email}`} className="email-link">
                      {recrutador.email}
                    </a>
                  ) : (
                    <span className="not-available">Não disponível</span>
                  )}
                </td>
                <td className="linkedin-cell">
                  {recrutador.linkedin ? (
                    <a 
                      href={recrutador.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="linkedin-link"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      Ver Perfil
                    </a>
                  ) : (
                    <span className="not-available">Não disponível</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="recrutadores-list__footer">
        <p className="recrutadores-list__info">
          Total de {recrutadores.length} contatos disponíveis
        </p>
      </div>
    </div>
  );
}