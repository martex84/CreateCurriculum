interface ObjectParameter {
  foto: string | undefined;
  nome: string | undefined;
  contato: {
    numero: string | undefined;
    email: string | undefined;
    linkdin: string | undefined;
  };
  formacaoAcademica: string | undefined;
  resumoProfissional: string | undefined;
  idiomas: string | undefined;
  compotencias: string | undefined;
  historicoProfissinal: string | undefined;
  certificacoes: string | undefined;
}

interface ObjectViewComponentes {
  foto: boolean | undefined;
  nome: boolean | undefined;
  contato:
    | undefined
    | {
        numero: boolean | undefined;
        email: boolean | undefined;
        linkdin: boolean | undefined;
      };
  formacaoAcademica: boolean | undefined;
  resumoProfissional: boolean | undefined;
  idiomas: boolean | undefined;
  compotencias: boolean | undefined;
  historicoProfissinal: boolean | undefined;
  certificacoes: boolean | undefined;
}

interface ValueInputAtual {
  nomeInput: string | undefined,
  valorAnteriorInput: string | undefined
}

interface ObjectValues {
  objectParameter?: ObjectParameter,
  objectViewComponentes?: ObjectViewComponentes,
  ValueInputAtual?: ValueInputAtual
}

interface TiposFormatacao {
  NEGRITO: string;
  LISTA_ORDENADA: string;
  LISTA_N_ORDENADA: string;
}

const templateObjectParameter: ObjectParameter = {
  foto: "",
  nome: "",
  contato: {
    numero: "",
    email: "",
    linkdin: "",
  },
  formacaoAcademica: "",
  resumoProfissional: "",
  idiomas: "",
  compotencias: "",
  historicoProfissinal: "",
  certificacoes: "",
};

const templateObjectViewComponentes: ObjectViewComponentes = {
  foto: false,
  nome: false,
  contato: {
    numero: false,
    email: false,
    linkdin: false,
  },
  formacaoAcademica: false,
  resumoProfissional: false,
  idiomas: false,
  compotencias: false,
  historicoProfissinal: false,
  certificacoes: false,
};

const templateValueInputAtual: ValueInputAtual = {
  nomeInput: undefined,
  valorAnteriorInput: undefined
}

const templateObjectValues: ObjectValues = {
  objectParameter: undefined,
  objectViewComponentes: undefined,
  ValueInputAtual: undefined
};

const templateTipoFormatacao: TiposFormatacao = {
  NEGRITO: "b",
  LISTA_ORDENADA: "ol",
  LISTA_N_ORDENADA: "ul",
};

const templateIdCampos = {
  nome: "inputNome",
  formacaoAcademica: "textAreaFormacaoAcademica",
  resumoProfissional: "textAreaResumoProfissional",
  idiomas: "inputIdiomas",
  competencias: "textAreaCompetencias",
  historicoProfissinal: "textAreaHistoricoProfissional",
  certificacoes: "textAreaCertificacoes",
  numero: "inputTelefone",
  email: "inputEmail",
  linkdin: "inputLinkdin"
}

export type {
  ObjectParameter,
  ObjectValues,
  ObjectViewComponentes,
  ValueInputAtual,
  TiposFormatacao,
};
export {
  templateObjectParameter,
  templateObjectViewComponentes,
  templateObjectValues,
  templateValueInputAtual,
  templateTipoFormatacao,
  templateIdCampos
};
