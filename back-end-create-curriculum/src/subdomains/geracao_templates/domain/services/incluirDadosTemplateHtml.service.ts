import {
  Templates,
  TemplatePadrao,
} from "@/subdomains/geracao_templates/domain/entity/templates.entity";
import { TiposTemplates } from "@/subdomains/geracao_templates/types/tiposTemplates";
import { DadosTemplate } from "@templates/types/dadosTemplate";
import { ITemplatesServicePort } from "@/subdomains/geracao_templates/ports/iTemplatesServicePort";
import { GenerationError } from "@/shared/errors/generation-error";
import { errors as errosGerais } from "@/subdomains/geracao_templates/domain/services/services.errors";
import { erros } from "./incluirDadosTemplateHtml.error";

/**@inheritdoc */
export const incluirDadosTemplateHtmlService: ITemplatesServicePort["incluirDadosTemplateHtmlService"] =
  (
    dadosUsuario: Templates,
    tipoTemplate: TiposTemplates,
    dadosTemplate: DadosTemplate,
  ): string => {
    try {
      if (!dadosUsuario) throw new Error(erros.falhaCapturaDadosUsuario);
      if (!tipoTemplate) throw new Error(erros.falhaCapturaTipoTemplate);
      if (!dadosTemplate) throw new Error(erros.falhaCapturaDadosTemplate);

      let { css, html } = dadosTemplate;

      if (!html || !css) throw new Error(erros.falhaCapturaHtmlCss);

      return preencherHtml(dadosTemplate, dadosUsuario, tipoTemplate);
    } catch (error) {
      const erroTratado: Error = error as Error;

      throw new GenerationError(
        `${errosGerais.PREENCHIMENTO_HTML} : [${erroTratado.message}]`,
      );
    }
  };

/**
 * Função responsável por realizar o preenchimento do HTML com base dados do usuário e o tipo de template
 * @param dadosUsuario Recebe os dados do usuário que será utilizado no preenchimento dos dados do template
 * @param dadosTemplate Recebe os dados do que será usado no template durante o preenchimento
 * @param tipoTemplate Recebe o tipo de template que será utilizado para sinalizar qual preenchimento que será feito
 * @returns Retorna uma string com o valor do template já preenchido
 *
 */
function preencherHtml(
  dadosTemplate: DadosTemplate,
  dadosUsuario: TemplatePadrao,
  tipoTemplate: TiposTemplates,
): string {
  let html = dadosTemplate.html;

  try {
    if (tipoTemplate === "padrao") {
      (Object.keys(dadosUsuario) as (keyof TemplatePadrao)[]).forEach(
        (campo) => {
          let valor;

          if (campo === "contato") {
            Object.entries(dadosUsuario.contato).forEach((dadoCampo) => {
              valor = dadoCampo[1];

              if (!valor)
                throw new Error(erros.falhaPreenchimentoHtml(dadoCampo[0]));

              html = html.replaceAll(`{${dadoCampo[0]}}`, valor);
            });
          } else {
            valor = dadosUsuario[campo];

            if (!valor) throw new Error(erros.falhaPreenchimentoHtml(campo));

            html = html.replaceAll(`{${campo}}`, valor);
          }
        },
      );

      html = html.replaceAll(
        "<!-- {style} -->",
        `<style>${dadosTemplate.css}</style>`,
      );
    }

    return html;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
