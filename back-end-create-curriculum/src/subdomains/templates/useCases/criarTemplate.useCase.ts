import { Templates } from "@/subdomains/templates/domain/entity/templates.entity";
import { TiposTemplates } from "@/subdomains/templates/types/tiposTemplates";
import { validarTemplateService } from "@/subdomains/templates/domain/services/validarTemplate.service";
import log from "@/config/log";
import { selecionarTemplateHTMLService } from "@/subdomains/templates/domain/services/selecionarDadosTemplate.service";
import { incluirDadosTemplateHtmlService } from "@/subdomains/templates/domain/services/incluirDadosTemplateHtml.service";

export class CriarTemplateUseCase {
  async execute(dados: any): Promise<string | undefined> {
    try {
      log("Validando dados");
      if (!validarTemplateService(dados))
        throw new Error("Os valroes corresponde ao dados de um template!");

      log("Criando variáveis com base no body");
      const template: Templates = dados.template;
      const tipoTemplates: TiposTemplates = dados.tipo;

      log("Captado dados HTML e CSS!");
      let dadosArquivoHtmlBase =
        await selecionarTemplateHTMLService(tipoTemplates);

      if (dadosArquivoHtmlBase.html === "" || dadosArquivoHtmlBase.css === "")
        throw new Error("Falha na captação dos dados do template!");

      const htmlAtualizado = incluirDadosTemplateHtmlService(
        template,
        tipoTemplates,
        dadosArquivoHtmlBase,
      );

      if (!htmlAtualizado) throw new Error("Falha na geração do HTML!");

      return htmlAtualizado;
    } catch (error) {
      console.error(`Falha na geração do template [${error}]`);
    }
  }
}
