export interface TemplatePadrao {
  contato: {
    nome: string;
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

export interface RespostaGeracao {
  error: {
    isError: boolean;
    messageError: string;
  };
  arquivo: string;
}
