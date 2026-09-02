export interface TemplatePadrao {
  foto: string;
  contato: {
    numero: string;
    email: string;
    linkdin: string;
  };
  nome: string;
  formacaoAcademica: string;
  resumoProfissional: string;
  idiomas: string;
  competencias: string;
  historicoProfissional: string;
  certificacoes: string;
}

export type Templates = TemplatePadrao;
