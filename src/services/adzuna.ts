import axios from 'axios';
import type { Vaga, VagaResponse, FiltrosVaga } from '../types/vaga';

const ADZUNA_API_BASE = 'https://api.adzuna.com/v1/api/jobs';

class AdzunaService {
  private readonly appId: string;
  private readonly appKey: string;

  constructor() {
    this.appId = import.meta.env.VITE_ADZUNA_APP_ID;
    this.appKey = import.meta.env.VITE_ADZUNA_APP_KEY;

    if (!this.appId || !this.appKey) {
      throw new Error('Adzuna API credentials not found. Please check your .env file.');
    }
  }

  async buscarVagas(filtros: FiltrosVaga, pagina: number = 1, vagasPorPagina: number = 10): Promise<VagaResponse> {
    try {
      const country = 'br';
      const params = new URLSearchParams({
        app_id: this.appId,
        app_key: this.appKey,
        results_per_page: vagasPorPagina.toString()
      });

      if (filtros.palavrasChave.length > 0) {
        // Verificar se tem junior OU estagiário nas palavras-chave selecionadas
        const temJunior = filtros.palavrasChave.some(p => 
          p.toLowerCase() === 'junior' || p.toLowerCase() === 'júnior'
        );
        const temEstagiario = filtros.palavrasChave.some(p => 
          p.toLowerCase() === 'estagiário' || p.toLowerCase() === 'estagiario'
        );
        
        // Filtrar palavras que não são junior/estagiário (tecnologias)
        const tecnologias = filtros.palavrasChave.filter(p => {
          const palavra = p.toLowerCase();
          return palavra !== 'junior' && palavra !== 'júnior' && 
                 palavra !== 'estagiário' && palavra !== 'estagiario';
        });
        
        // Estratégia para maximizar resultados
        if (temJunior && temEstagiario) {
          // Se ambos estão selecionados, priorizar junior (que retorna mais vagas: 1164 vs 183)
          params.append('what', 'desenvolvedor junior');
        } else if (temJunior) {
          // Só junior
          params.append('what', 'desenvolvedor junior');
        } else if (temEstagiario) {
          // Só estagiário
          params.append('what', 'desenvolvedor estagiário');
        } else if (tecnologias.length > 0) {
          // Só tecnologias
          params.append('what', `desenvolvedor ${tecnologias.join(' ')}`);
        } else {
          // Fallback geral
          params.append('what', 'desenvolvedor programador');
        }
      } else {
        // Se não tiver palavras-chave, buscar desenvolvimento geral
        params.append('what', 'desenvolvedor programador developer software');
      }

      if (filtros.localizacao) {
        params.append('where', filtros.localizacao);
      }

      if (filtros.salarioMinimo) {
        params.append('salary_min', filtros.salarioMinimo.toString());
      }

      if (filtros.tipoContrato) {
        const contractMapping = {
          'integral': 'permanent',
          'meio-periodo': 'part_time',
          'contrato': 'contract',
          'estagio': 'apprenticeship'
        };
        params.append('contract', contractMapping[filtros.tipoContrato]);
      }

      const url = `${ADZUNA_API_BASE}/${country}/search/${pagina}?${params.toString()}`;
      
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Career Quest App'
        }
      });

      return this.transformAdzunaResponse(response.data);
    } catch (error) {
      console.error('Erro ao buscar vagas na Adzuna:', error);
      throw new Error(`Erro ao buscar vagas: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  private transformAdzunaResponse(data: {
    results?: Array<{
      title?: string;
      company?: { display_name?: string };
      location?: { display_name?: string };
      redirect_url?: string;
      url?: string;
      created?: string;
      salary_min?: number;
      salary_max?: number;
      description?: string;
    }>;
    count?: number;
    page?: number;
  }): VagaResponse {
    const vagas: Vaga[] = (data.results || []).map((item) => ({
      titulo: item.title || 'Título não disponível',
      empresa: item.company?.display_name || 'Empresa não disponível',
      localizacao: item.location?.display_name || 'Localização não disponível',
      link: item.redirect_url || item.url || '#',
      dataPublicacao: item.created ? new Date(item.created).toLocaleDateString('pt-BR') : undefined,
      salario: item.salary_min && item.salary_max 
        ? `R$ ${item.salary_min.toLocaleString()} - R$ ${item.salary_max.toLocaleString()}`
        : undefined,
      descricao: item.description ? item.description.substring(0, 200) + '...' : undefined
    }));

    return {
      elementos: vagas,
      total: data.count || 0,
      pagina: data.page || 1
    };
  }
}

export const adzunaService = new AdzunaService();
export default adzunaService;