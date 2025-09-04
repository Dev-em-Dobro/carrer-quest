import { create } from 'zustand';
import type { Vaga, VagaResponse, FiltrosVaga } from '../types/vaga';
import adzunaService from '../services/adzuna';

interface VagasState {
  vagas: Vaga[];
  loading: boolean;
  error: string | null;
  total: number;
  paginaAtual: number;
  totalPaginas: number;
  vagasPorPagina: number;
  filtros: FiltrosVaga;
  
  // Actions
  buscarVagas: (filtros?: Partial<FiltrosVaga>) => Promise<void>;
  buscarPagina: (pagina: number) => Promise<void>;
  proximaPagina: () => Promise<void>;
  paginaAnterior: () => Promise<void>;
  setFiltros: (filtros: Partial<FiltrosVaga>) => void;
  limparVagas: () => void;
  setError: (error: string | null) => void;
}

const filtrosIniciais: FiltrosVaga = {
  palavrasChave: [],
  localizacao: undefined,
  salarioMinimo: undefined,
  tipoContrato: undefined,
};

export const useVagas = create<VagasState>((set, get) => ({
  vagas: [],
  loading: false,
  error: null,
  total: 0,
  paginaAtual: 1,
  totalPaginas: 0,
  vagasPorPagina: 10,
  filtros: filtrosIniciais,

  buscarVagas: async (novosFiltros?: Partial<FiltrosVaga>) => {
    try {
      set({ loading: true, error: null });

      const filtrosAtualizados = { ...get().filtros, ...novosFiltros };
      set({ filtros: filtrosAtualizados });

      const response: VagaResponse = await adzunaService.buscarVagas(filtrosAtualizados, 1, get().vagasPorPagina);
      
      set({
        vagas: response.elementos,
        total: response.total,
        paginaAtual: 1,
        totalPaginas: Math.ceil(response.total / get().vagasPorPagina),
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao buscar vagas';
      set({
        loading: false,
        error: errorMessage,
        vagas: [],
        total: 0,
        totalPaginas: 0,
      });
    }
  },

  buscarPagina: async (pagina: number) => {
    try {
      set({ loading: true, error: null });

      const response: VagaResponse = await adzunaService.buscarVagas(get().filtros, pagina, get().vagasPorPagina);
      
      set({
        vagas: response.elementos,
        total: response.total,
        paginaAtual: pagina,
        totalPaginas: Math.ceil(response.total / get().vagasPorPagina),
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao buscar vagas';
      set({
        loading: false,
        error: errorMessage,
      });
    }
  },

  proximaPagina: async () => {
    const { paginaAtual, totalPaginas } = get();
    if (paginaAtual < totalPaginas) {
      await get().buscarPagina(paginaAtual + 1);
    }
  },

  paginaAnterior: async () => {
    const { paginaAtual } = get();
    if (paginaAtual > 1) {
      await get().buscarPagina(paginaAtual - 1);
    }
  },

  setFiltros: (novosFiltros: Partial<FiltrosVaga>) => {
    set(state => ({
      filtros: { ...state.filtros, ...novosFiltros }
    }));
  },

  limparVagas: () => {
    set({
      vagas: [],
      total: 0,
      paginaAtual: 1,
      error: null,
    });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));