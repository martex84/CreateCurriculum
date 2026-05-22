export const erros = {
  falhaCapturaDadosUsuario: "Falha na captura dos dados do usuário",
  falhaCapturaTipoTemplate: "Falha na captura do tipo de template",
  falhaCapturaDadosTemplate: "Falha na captura dos dados do template",
  falhaCapturaHtmlCss: "Os dados do HTML ou CSS não foram capturados!",
  falhaPreenchimentoHtml: (campo: string) =>
    `Não foi possível realizar o preenchimento do HTML por erro do campo ${campo}!`,
};
