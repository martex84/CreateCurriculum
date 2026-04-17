import {
  Templates,
  TemplatePadrao,
} from "@/subdomains/templates/domain/entity/templates.entity";
import { TiposTemplates } from "@/subdomains/templates/types/tiposTemplates";
import { DadosTemplate } from "@templates/types/dadosTemplate";
import { ITemplatesRepositoryPort } from "@templates/ports/iTemplatesRepositoryPort";
import { GenerationError } from "@/shared/errors/generation-error";
import { errors } from "@/subdomains/templates/domain/services/services.errors";

/**@inheritdoc */
export const incluirDadosTemplateHtmlService: ITemplatesRepositoryPort["incluirDadosTemplateHtmlService"] =
  (
    dadosUsuario: Templates,
    tipoTemplate: TiposTemplates,
    dadosTemplate: DadosTemplate,
  ): string => {
    try {
      let { css, html } = dadosTemplate;

      if (!html || !css)
        throw new Error("Os dados do HTML ou CSS não foram capturados!");

      if (tipoTemplate === "padrao") {
        (Object.keys(dadosUsuario) as (keyof TemplatePadrao)[]).forEach(
          (key) => {
            if (key === "contato") {
              Object.entries(dadosUsuario.contato).forEach((key, valor) => {
                html = html.replaceAll(`{${key}}`, valor.toString());
              });
            } else {
              html = html.replaceAll(`{${key}}`, dadosUsuario[key]);
            }
          },
        );

        html = html.replaceAll("<!-- {style} -->", `<style>${css}</style>`);
      }

      if (!html) throw new Error("O HTML não pode ser preenchido!");

      return html;
    } catch (error) {
      const erroTratado: Error = error as Error;

      throw new GenerationError(
        `${errors.PREENCHIMENTO_HTML} : [erroTratado.message]`,
      );
    }
  };
