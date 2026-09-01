import { Templates } from "@geracao_templates/domain/entity/templates.entity";
import { TiposTemplates } from "@geracao_templates/types/tiposTemplates";
import { mensagemError } from "@geracao_templates/useCases/criarTemplate.error";
import { IGeracaoTemplatesServicePort } from "@/subdomains/geracao_templates/ports/iGeracaoTemplatesServicePort";
import { AppError } from "@/shared/errors/app-error";
import { IGeracaoTemplatesCaptarDocumentosAdapterPort } from "@/subdomains/geracao_templates/ports/iGeracaoTemplatesCaptarDocumentosAdapterPort";
import { IGeracaoLogUseCase } from "@/subdomains/geracao_log";

export class CriarTemplateUseCase {
  constructor(
    private readonly iTemplatesServicePort: IGeracaoTemplatesServicePort,
    private readonly iTemplatesCaptarDocumentosAdapterPort: IGeracaoTemplatesCaptarDocumentosAdapterPort,
    private readonly iGeracaoLogUseCase: IGeracaoLogUseCase,
  ) {}

  async execute(dados: any): Promise<string | undefined> {
    try {
      const log = async (mensagem: string | object) =>
        await this.iGeracaoLogUseCase.execution(mensagem);

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
