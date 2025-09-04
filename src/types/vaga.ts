export interface Vaga {
  titulo: string;
  empresa: string;
  localizacao: string;
  link: string;
  dataPublicacao?: string;
  salario?: string;
  descricao?: string;
}

export interface VagaResponse {
  elementos: Vaga[];
  total: number;
  pagina: number;
}

export interface FiltrosVaga {
  palavrasChave: string[];
  localizacao?: string;
  salarioMinimo?: number;
  tipoContrato?: 'integral' | 'meio-periodo' | 'contrato' | 'estagio';
}