import { create } from 'zustand';
import type { Vaga, VagaResponse, FiltrosVaga } from '../types/vaga';
import adzunaService from '../services/adzuna';

interface VagasState {
  vagas: Vaga[];
  loading: boolean;
  error: string | null;
  total: number;
  paginaAtual: number;
  filtros: FiltrosVaga;
  
  // Actions
  buscarVagas: (filtros?: Partial<FiltrosVaga>) => Promise<void>;
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
  paginaAtual: 0,
  filtros: filtrosIniciais,

  buscarVagas: async (novosFiltros?: Partial<FiltrosVaga>) => {
    try {
      set({ loading: true, error: null });

      const filtrosAtualizados = { ...get().filtros, ...novosFiltros };
      set({ filtros: filtrosAtualizados });

      const response: VagaResponse = await adzunaService.buscarVagas(filtrosAtualizados);
      
      set({
        vagas: response.elementos,
        total: response.total,
        paginaAtual: response.pagina,
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
      });
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
      paginaAtual: 0,
      error: null,
    });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));