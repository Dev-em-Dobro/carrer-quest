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
        // Sempre incluir termo base para garantir que seja da área de tecnologia
        params.append('what', 'desenvolvedor');
        
        // Separar níveis (junior/estagiário) de tecnologias
        const niveis = filtros.palavrasChave.filter(p => {
          const palavra = p.toLowerCase();
          return palavra === 'junior' || palavra === 'júnior' || 
                 palavra === 'estagiário' || palavra === 'estagiario';
        });
        
        const tecnologias = filtros.palavrasChave.filter(p => {
          const palavra = p.toLowerCase();
          return palavra !== 'junior' && palavra !== 'júnior' && 
                 palavra !== 'estagiário' && palavra !== 'estagiario';
        });
        
        // Se tem níveis selecionados, usar what_or para combinar os resultados
        if (niveis.length > 0) {
          // Normalizar termos para a busca
          const termosNiveis = niveis.map(p => {
            const palavra = p.toLowerCase();
            if (palavra === 'júnior') return 'junior';
            if (palavra === 'estagiario') return 'estagiário';
            return palavra;
          });
          params.append('what_or', termosNiveis.join(' '));
        }
        
        // Se tem tecnologias, adicionar como filtro adicional
        if (tecnologias.length > 0) {
          params.append('what_and', tecnologias.join(' '));
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