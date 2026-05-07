export const mensageError = {
  DADOS_INVALIDOS: "Os dados fornecidos devem ser um objeto válido.",
  TEMPLATE_INVALIDO: "Dados do template desconhecido ou não suportado",
  TIPO_INVALIDO: "Tipo de template desconhecido ou não suportado.",
  CAMPO_TEMPLATE_VAZIO: "O campo 'template' deve ser um objeto preenchido.",
  FALHA_TIPO_TEMPLATE: "Falha ao tentar identificar o tipo de template",
  CAMPO_DIFERENTE: (campo: string) =>
    `O tipo do campo '${campo}' é diferente do esperado!`,
  CAMPO_INEXISTENTE: (campo: string) =>
    `O campo '${campo}' não existe no template informado!`,
};
