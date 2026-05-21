import { Templates } from "@/subdomains/geracao_templates/domain/entity/templates.entity";
import { TiposTemplates } from "@/subdomains/geracao_templates/types/tiposTemplates";
import log from "@/config/log";
import { mensagemError } from "@/subdomains/geracao_templates/useCases/criarTemplate.error";
import { ValidationError } from "@/shared/errors/validation-error";
import { ITemplatesServicePort } from "@/subdomains/geracao_templates/ports/iTemplatesServicePort";
import { GenerationError } from "@/shared/errors/generation-error";
import { AppError } from "@/shared/errors/app-error";
import { ITemplatesCaptarDocumentosAdapterPort } from "@/subdomains/geracao_templates/ports/iTemplatesCaptarDocumentosAdapterPort";

export class CriarTemplateUseCase {
  constructor(
    private readonly iTemplatesServicePort: ITemplatesServicePort,
    private readonly iTemplatesCaptarDocumentosAdapterPort: ITemplatesCaptarDocumentosAdapterPort,
  ) {}

  async execute(dados: any): Promise<string | undefined> {
    try {
      log("Validando dados");
      this.iTemplatesServicePort.validarTemplateService(dados);

      log("Criando variáveis com base no body");
      const template: Templates = dados.template;
      const tipoTemplates: TiposTemplates = dados.tipo;

      log("Captado dados HTML e CSS!");
      let dadosArquivoHtmlBase =
        await this.iTemplatesCaptarDocumentosAdapterPort.captarHtmlCSS(
          tipoTemplates,
        );

      log("Gerando HTML Customizado");

      const htmlCustomizado =
        this.iTemplatesServicePort.incluirDadosTemplateHtmlService(
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
