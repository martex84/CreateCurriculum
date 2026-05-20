import fs from "node:fs";
import { TiposTemplates } from "@/subdomains/templates/types/tiposTemplates";
import { DadosTemplate } from "@templates/types/dadosTemplate";
import { GenerationError } from "@/shared/errors/generation-error";
import { erros } from "./selecionarTemplateHtml.error";
import { ITemplatesCaptarDocumentosAdapterPort } from "@/subdomains/templates/ports/iTemplatesCaptarDocumentosAdapterPort";

export class CaptarDocumentosAdapter implements ITemplatesCaptarDocumentosAdapterPort {
  constructor(private readonly localArquivo: string) {}

  async captarHtmlCSS(tipoTemplate: TiposTemplates) {
    try {
      if (!tipoTemplate) throw new Error(erros.erroRecebimentoTipoTemplate);

      let dadosTemplate: DadosTemplate = {
        html: "",
        css: "",
      };

      if (tipoTemplate === "padrao") {
        dadosTemplate.html = fs
          .readFileSync(this.localArquivo + "index.html")
          .toString();

        dadosTemplate.css = fs
          .readFileSync(this.localArquivo + "style.css")
          .toString();
      } else throw new Error(erros.erroTipoTemplateInvalido);

      if (dadosTemplate.html === "" || dadosTemplate.css === "")
        throw new Error("Falha ao tentar preencher os dados do template!");

      return dadosTemplate;
    } catch (error: any) {
      throw new GenerationError(
        `Falha na captação dos dados do template : [${error.message}]`,
      );
    }
  }
}
