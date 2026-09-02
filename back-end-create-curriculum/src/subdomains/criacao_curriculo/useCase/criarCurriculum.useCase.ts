import { Curriculum } from "@criacao_curriculo/domain/entity/curriculum.entity";
import { PuppeteerCreatePage } from "@/subdomains/criacao_curriculo/adapters/out/puppeteerCreatePage.Adapter";
import { FsCreatePDF } from "@/subdomains/criacao_curriculo/adapters/out/fsCreatePdf.Adapter";
import { CriarCurriculumError } from "@/shared/errors/criarCurriculum-error";
import { IGeracaoLogUseCase } from "@/subdomains/geracao_log";

export const errors = {
  falhaGeracaoCuriculo: "Falha na geração do curriculum",
};
export class CriarCurriculumUseCase {
  constructor(
    private readonly puppeteerCreatePage: PuppeteerCreatePage,
    private readonly fsCreatePDF: FsCreatePDF,
    private readonly iGeracaoLogUseCase: IGeracaoLogUseCase,
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
      const log = async (mensagem: string | object) =>
        await this.iGeracaoLogUseCase.execution(mensagem);

      log("Inicio da criação de logs");

      log("Criação da página");

      //Realiza a criação da página e capta seus dados
      await this.puppeteerCreatePage.createPage(html);

      log("Criação do arquivo em branco");

      const dadosArquivo = await this.fsCreatePDF.geracaoArquivo();

      log("Preenchimento do pdf");

      await this.puppeteerCreatePage.preencherArquivoPdf(
        dadosArquivo.localArquivo,
      );

      log("Pdf Preenchido com sucesso!");

      log("Conversão do arquivo pdf para string");

      const dadosPdf = await this.fsCreatePDF.converterArquivoPdf();

      curriculum.arquivo = dadosPdf;

      log(
        `O arquivo foi convertido com sucesso, trazendo ao total ${curriculum.arquivo.length} bytes!`,
      );

      log("Curriculo criado com sucesso!");

      log("Encerramento do browser");

      return curriculum;
    } catch (error: any) {
      throw new CriarCurriculumError(
        errors.falhaGeracaoCuriculo + "\n" + error.message,
      );
    } finally {
      await this.fsCreatePDF.apagarArquivo();

      await this.puppeteerCreatePage.closeBrowser();
    }
  }
}
