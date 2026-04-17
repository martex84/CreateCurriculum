import { Templates } from "@/subdomains/templates/domain/entity/templates.entity";
import { TiposTemplates } from "@/subdomains/templates/types/tiposTemplates";
import log from "@/config/log";
import { mensagemError } from "@/subdomains/templates/useCases/criarTemplate.error";
import { ValidationError } from "@/shared/errors/validation-error";
import { ITemplatesRepositoryPort } from "@/subdomains/templates/ports/iTemplatesRepositoryPort";
import { GenerationError } from "@/shared/errors/generation-error";
import { AppError } from "@/shared/errors/app-error";

export class CriarTemplateUseCase {
  constructor(
    private readonly iTemplatesRepositoryPort: ITemplatesRepositoryPort,
  ) {}

  async execute(dados: any): Promise<string | undefined> {
    try {
      log("Validando dados");
      this.iTemplatesRepositoryPort.validarTemplateService(dados);

      log("Criando variáveis com base no body");
      const template: Templates = dados.template;
      const tipoTemplates: TiposTemplates = dados.tipo;

      log("Captado dados HTML e CSS!");
      let dadosArquivoHtmlBase =
        await this.iTemplatesRepositoryPort.selecionarTemplateHTMLService(
          tipoTemplates,
        );

      log("Gerando HTML Customizado");

      const htmlCustomizado =
        this.iTemplatesRepositoryPort.incluirDadosTemplateHtmlService(
          template,
          tipoTemplates,
          dadosArquivoHtmlBase,
        );

      return htmlCustomizado;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else throw new Error(mensagemError.MENSAGEM_GENERICA);
    }
  }
}
