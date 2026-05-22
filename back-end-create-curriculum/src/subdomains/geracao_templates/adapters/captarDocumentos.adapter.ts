import fs from "node:fs";
import { TiposTemplates } from "@geracao_templates/types/tiposTemplates";
import { DadosTemplate } from "@geracao_templates/types/dadosTemplate";
import { GenerationError } from "@/shared/errors/generation-error";
import { erros } from "./captarDocumentos.error";
import { ITemplatesCaptarDocumentosAdapterPort } from "@geracao_templates/ports/iTemplatesCaptarDocumentosAdapterPort";

export class CaptarDocumentosAdapter implements ITemplatesCaptarDocumentosAdapterPort {
  constructor(private readonly localArquivo: string) {}

  async captarHtmlCSS(tipoTemplate: TiposTemplates) {
    try {
      if (!tipoTemplate) throw new Error(erros.erroRecebimentoTipoTemplate);

      let dadosTemplate: DadosTemplate = {
        html: "",
        css: "",
      };

      let nomeLocal: string;

      if (tipoTemplate === "padrao") {
        nomeLocal = "padrao";

        dadosTemplate.html = fs
          .readFileSync(this.localArquivo + nomeLocal + "/" + "index.html")
          .toString();

        dadosTemplate.css = fs
          .readFileSync(this.localArquivo + nomeLocal + "/" + "style.css")
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
