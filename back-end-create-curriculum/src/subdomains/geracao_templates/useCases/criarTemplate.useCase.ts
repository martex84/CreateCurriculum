import { Templates } from "@geracao_templates/domain/entity/templates.entity";
import { TiposTemplates } from "@geracao_templates/types/tiposTemplates";
import { mensagemError } from "@geracao_templates/useCases/criarTemplate.error";
import { ITemplatesServicePort } from "@geracao_templates/ports/iTemplatesServicePort";
import { AppError } from "@/shared/errors/app-error";
import { ITemplatesCaptarDocumentosAdapterPort } from "@geracao_templates/ports/iTemplatesCaptarDocumentosAdapterPort";
import { Logs } from "@/shared/types/logs";

export class CriarTemplateUseCase {
  constructor(
    private readonly iTemplatesServicePort: ITemplatesServicePort,
    private readonly iTemplatesCaptarDocumentosAdapterPort: ITemplatesCaptarDocumentosAdapterPort,
    private readonly log: Logs,
  ) {}

  async execute(dados: any): Promise<string | undefined> {
    try {
      this.log.execution("Validando dados");
      this.iTemplatesServicePort.validarTemplateService(dados);

      this.log.execution("Criando variáveis com base no body");
      const template: Templates = dados.template;
      const tipoTemplates: TiposTemplates = dados.tipo;

      this.log.execution("Captado dados HTML e CSS!");
      let dadosArquivoHtmlBase =
        await this.iTemplatesCaptarDocumentosAdapterPort.captarHtmlCSS(
          tipoTemplates,
        );

      this.log.execution("Gerando HTML Customizado");

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
