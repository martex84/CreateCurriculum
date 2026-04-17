export const mensageError = {
  DADOS_INVALIDOS: "Os dados fornecidos devem ser um objeto válido.",
  TIPO_INVALIDO: "Tipo de template desconhecido ou não suportado.",
  CAMPO_TEMPLATE_VAZIO: "O campo 'template' deve ser um objeto preenchido.",
  FALHA_TIPO_TEMPLATE: "Falha ao tentar identificar o tipo de template",
  CAMPO_DIFERENTE: (campo: string) =>
    `O tipo do campo '${campo}' é diferente do esperado!`,
  CAMPO_INESISTENTE: (campo: string) =>
    `O campo '${campo}' não existe no template informado!`,
};
