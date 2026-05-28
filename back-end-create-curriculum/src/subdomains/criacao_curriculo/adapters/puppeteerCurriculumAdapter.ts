import { log } from "@/config/log";
import { Curriculum } from "@criacao_curriculo/domain/entity/curriculum.entity";
import { ICurriculumPort } from "@criacao_curriculo/ports/iCurriculumPort";
import { DadosPagina, page } from "@criacao_curriculo/types/geracaoPdf";
import path from "node:path";
import fs from "node:fs";
import puppeteer from "puppeteer";
import { localArquivoPDF } from "@criacao_curriculo/domain/constants/locals";

export class PuppeteerCurriculumAdapter implements ICurriculumPort {
  async criarCurriculum(html: string): Promise<Curriculum> {
    let curriculum: Curriculum = {
      arquivo: "",
      error: {
        isError: false,
        messageError: "",
      },
    };

    const localArquivoPdf = path.join(localArquivoPDF + Date.now() + ".pdf");
    let dadosPagina: DadosPagina | undefined;

    console.log(localArquivoPdf);

    try {
      dadosPagina = await this.criarPagina(html);

      if (!dadosPagina?.page) throw new Error("Falha na criação da página");

      await this.gerarArquivoPdf(localArquivoPdf);

      await this.preencherArquivoPdf(dadosPagina.page, localArquivoPdf);

      const arquivoConvertido = await this.converterArquivoPdf(localArquivoPdf);

      log("Curriculo criado com sucesso!");

      curriculum.arquivo = arquivoConvertido;

      log("Dados de retorno:" + JSON.stringify(curriculum));

      await dadosPagina.browser.close().then(() => {});
    } catch (error) {
      curriculum.error = {
        isError: true,
        messageError: error instanceof Error ? error.message : String(error),
      };

      throw new Error(
        `Falha na criação do curriculum: ${curriculum.error.messageError}`,
      );
    } finally {
      if (dadosPagina?.browser) {
        await dadosPagina.browser.close();

        log("Browser fechado com sucesso.");
      }
    }

    return curriculum;
  }

  private async criarPagina(html: string): Promise<DadosPagina> {
    try {
      log("Gerando pagina");
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "domcontentloaded" });
      await page.waitForNetworkIdle();

      return {
        browser: browser,
        page: page,
      };
    } catch (error) {
      throw new Error(`Falha na criação da página: ${error}`);
    }
  }

  private async gerarArquivoPdf(localArquivo: string): Promise<void> {
    try {
      log("Gerando PDF");

      const pastaArquivo = path.dirname(localArquivo);

      if (!fs.existsSync(pastaArquivo)) {
        log("Pasta temporária não encontrada, iniciando a criação da mesma!");

        fs.mkdirSync(pastaArquivo);
      }

      log(`Local do arquivo: [${localArquivo}]`);
    } catch (error) {
      throw new Error(`Falha ao gerar o arquivo PDF: ${error}`);
    }
  }

  private async preencherArquivoPdf(
    page: page,
    localArquivo: string,
  ): Promise<void> {
    try {
      log("Gerando arquivo PDF");

      await page.pdf({
        format: "A4",
        path: localArquivo,
        printBackground: true,
      });

      log("Arquivo gerado com sucesso!");
    } catch (error) {
      throw new Error(`Falha ao preecher o arquivo PDF: ${error}`);
    }
  }

  private async converterArquivoPdf(localArquivo: string): Promise<string> {
    try {
      log("Iniciando a conversão do arquivo PDF");

      const arquivoConvertidoByteCode = fs.readFileSync(localArquivo, {
        encoding: "base64",
      });

      fs.unlinkSync(localArquivo);

      log("Arquivo convertido com sucesso!");

      return arquivoConvertidoByteCode;
    } catch (error) {
      throw new Error(`Falha na conversão do arquivo PDF: ${error}`);
    }
  }
}
