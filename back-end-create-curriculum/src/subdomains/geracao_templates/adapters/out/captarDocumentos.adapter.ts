import fs from "node:fs";
import { TiposTemplates } from "@geracao_templates/types/tiposTemplates";
import { DadosTemplate } from "@geracao_templates/types/dadosTemplate";
import { GenerationError } from "@/shared/errors/generation-error";
import { erros } from "./captarDocumentos.error";
import { IGeracaoTemplatesCaptarDocumentosAdapterPort } from "@/subdomains/geracao_templates/ports/iGeracaoTemplatesCaptarDocumentosAdapterPort";
import { valoresTiposTemplates } from "@geracao_templates/types/tiposTemplates";

export class CaptarDocumentosAdapter implements IGeracaoTemplatesCaptarDocumentosAdapterPort {
  constructor(private readonly localArquivo: string) {}

  async captarHtmlCSS(tipoTemplate: TiposTemplates) {
    try {
      if (!tipoTemplate) throw new Error(erros.erroRecebimentoTipoTemplate);

      if (!Object.values(valoresTiposTemplates).includes(tipoTemplate))
        throw new Error(erros.erroTipoTemplateInvalido);

      let dadosTemplate: DadosTemplate = {
        html: "",
        css: "",
      };

      let nomeLocal: string;

      if (tipoTemplate === "padrao") {
        nomeLocal = "padrao";

        dadosTemplate.html = fs
          .readFileSync(`${this.localArquivo}/${nomeLocal}/index.html`)
          .toString();

        dadosTemplate.css = fs
          .readFileSync(`${this.localArquivo}/${nomeLocal}/style.css`)
          .toString();
      }

      if (dadosTemplate.html === "" || dadosTemplate.css === "")
        throw new GenerationError(erros.erroArquivoInvalido, {
          tipo: dadosTemplate.html === "" ? "html" : "css",
        });

      return dadosTemplate;
    } catch (error: any) {
      let message;
      let detalhes = error?.detalhes ? error.detalhes : undefined;

      if (error.code) {
        if (error.code === "ENOENT") {
          message = erros.erroArquivoNaoEncontrado;

          detalhes = {
            path: error.path,
          };
        }
      }

      if (!message) message = error.message;

      throw new GenerationError(
        `Falha na captação dos dados do template : [${message}]`,
        detalhes,
      );
    }
  }
}
