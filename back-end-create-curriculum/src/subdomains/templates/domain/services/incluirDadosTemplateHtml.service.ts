import {
  Templates,
  TemplatePadrao,
} from "@/subdomains/templates/domain/entity/templates.entity";
import { TiposTemplates } from "@/subdomains/templates/types/tiposTemplates";
import { DadosTemplate } from "@templates/types/dadosTemplate";
import { ITemplatesRepositoryPort } from "@templates/ports/iTemplatesRepositoryPort";

/**@inheritdoc */
export const incluirDadosTemplateHtmlService: ITemplatesRepositoryPort["incluirDadosTemplateHtmlService"] =
  (
    dadosUsuario: Templates,
    tipoTemplate: TiposTemplates,
    dadosTemplate: DadosTemplate,
  ): string => {
    let { css, html } = dadosTemplate;

    if (tipoTemplate === "padrao") {
      (Object.keys(dadosUsuario) as (keyof TemplatePadrao)[]).forEach((key) => {
        if (key === "contato") {
          Object.entries(dadosUsuario.contato).forEach((key, valor) => {
            html = html.replaceAll(`{${key}}`, valor.toString());
          });
        } else {
          html = html.replaceAll(`{${key}}`, dadosUsuario[key]);
        }
      });

      html = html.replaceAll("<!-- {style} -->", `<style>${css}</style>`);
    }

    return html;
  };
