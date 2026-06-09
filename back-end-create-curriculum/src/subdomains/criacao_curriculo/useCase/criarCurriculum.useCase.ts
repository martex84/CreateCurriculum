import { Logs } from "@/shared/types/logs";
import { Curriculum } from "@criacao_curriculo/domain/entity/curriculum.entity";
import { PuppeteerCreatePage } from "@criacao_curriculo/adapters/puppeteerCreatePage.Adapter";
import { FsCreatePDF } from "@/subdomains/criacao_curriculo/adapters/fsCreatePdf.Adapter";

export class CriarCurriculumUseCase {
  constructor(
    private readonly puppeteerCreatePage: PuppeteerCreatePage,
    private readonly fsCreatePDF: FsCreatePDF,
    private readonly log: Logs,
  ) {}

  async execution(html: string): Promise<Curriculum> {
    let curriculum: Curriculum = {
      arquivo: "",
      error: {
        isError: false,
        messageError: "",
      },
    };

    try {
      this.log.execution("Inicio da criação de logs");

      this.log.execution("Criação da página");

      //Realiza a criação da página e capta seus dados
      await this.puppeteerCreatePage.createPage(html);

      this.log.execution("Criação do arquivo em branco");

      const dadosArquivo = await this.fsCreatePDF.geracaoArquivo();

      this.log.execution("Preenchimento do pdf");

      await this.puppeteerCreatePage.preencherArquivoPdf(
        dadosArquivo.localArquivo,
      );

      this.log.execution("Pdf Preenchido com sucesso!");

      this.log.execution("Conversão do arquivo pdf para string");

      const dadosPdf = await this.fsCreatePDF.converterArquivoPdf();

      curriculum.arquivo = dadosPdf;

      this.log.execution(
        `O arquivo foi convertido com sucesso, trazendo ao total ${curriculum.arquivo.length} bytes!`,
      );

      this.log.execution("Curriculo criado com sucesso!");

      this.log.execution("Encerramento do browser");

      return curriculum;
    } catch (error) {
      throw new Error(`Falha na geração do curriculum: ${error}`);
    } finally {
      await this.fsCreatePDF.apagarArquivo();

      await this.puppeteerCreatePage.closeBrowser();
    }
  }
}
