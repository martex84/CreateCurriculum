import { Templates } from "@/subdomains/templates/domain/entity/templates.entity";
import { TiposTemplates } from "@/subdomains/templates/types/tiposTemplates";
import log from "@/config/log";
import { mensagemError } from "@/subdomains/templates/useCases/criarTemplate.error";
import { ValidationError } from "@/shared/errors/validation-error";
import { ITemplatesRepositoryPort } from "@/subdomains/templates/ports/iTemplatesRepositoryPort";

export class CriarTemplateUseCase {
  constructor(
    private readonly iTemplatesRepositoryPort: ITemplatesRepositoryPort,
  ) {}

  async execute(dados: any): Promise<string | undefined> {
    log("Validando dados");
    try {
      this.iTemplatesRepositoryPort.validarTemplateService(dados);
    } catch (error) {
      throw new ValidationError(`${mensagemError.VALIDACAO_DADOS} [${error}]`);
    }

    try {
      log("Criando variáveis com base no body");
      const template: Templates = dados.template;
      const tipoTemplates: TiposTemplates = dados.tipo;

      log("Captado dados HTML e CSS!");
      let dadosArquivoHtmlBase =
        await this.iTemplatesRepositoryPort.selecionarTemplateHTMLService(
          tipoTemplates,
        );

      if (dadosArquivoHtmlBase.html === "" || dadosArquivoHtmlBase.css === "")
        throw new Error(mensagemError.CAPTACAO_DADOS);

      const htmlAtualizado =
        this.iTemplatesRepositoryPort.incluirDadosTemplateHtmlService(
          template,
          tipoTemplates,
          dadosArquivoHtmlBase,
        );

      if (!htmlAtualizado) throw new Error(mensagemError.GERACAO_HTML);

      return htmlAtualizado;
    } catch (error) {
      const mensagemErro = error as Error;

      if (mensagemErro) throw new Error(mensagemErro.message);
      else {
        throw new Error(mensagemError.MENSAGEM_GENERICA);
      }
    }
  }
}
