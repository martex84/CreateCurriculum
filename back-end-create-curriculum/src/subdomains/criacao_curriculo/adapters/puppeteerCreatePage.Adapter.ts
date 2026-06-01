import { DadosPagina, page } from "@criacao_curriculo/types/geracaoPdf";
import puppeteer from "puppeteer";
import { erros } from "./puppeteerCreatePage.Error";

interface PuppeteerCreatePageInterface {
  /**
   * Função responsável por criar os dados de uma página web
   * @param html Recebe os dados html da página que irá ser criada
   */
  createPage: (html: string) => Promise<void>;

  /**
   * Função responsável por retornar a pagina web
   * @returns Retorna a pagina web gerada
   */
  getPage: () => page;

  /**
   * Função responsável por preencher um arquivo pdf com os dados da página
   * @param localArquivo Recebe o local que está o arquivo que irá ser preenchido
   */
  preencherArquivoPdf: (localArquivo: string) => Promise<boolean>;

  /**
   * Função responsável por fechar o browser da página
   */
  closeBrowser: () => Promise<void>;
}

export class PuppeteerCreatePage implements PuppeteerCreatePageInterface {
  private dadosPage: DadosPagina | undefined;

  async createPage(html: string): Promise<void> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "domcontentloaded" });
      await page.waitForNetworkIdle();

      this.dadosPage = {
        browser: browser,
        page: page,
      };
    } catch (error) {
      throw new Error(`Falha na criação da página: ${error}`);
    }
  }

  getPage(): page {
    if (!this.dadosPage) throw new Error(erros.falhaLocalizacaoDadosPagina);

    return this.dadosPage.page;
  }

  async preencherArquivoPdf(localArquivo: string): Promise<boolean> {
    if (this.dadosPage) {
      try {
        // this.log.execution("Gerando arquivo PDF");

        await this.dadosPage.page.pdf({
          format: "A4",
          path: localArquivo,
          printBackground: true,
        });

        // this.log.execution("Arquivo gerado com sucesso!");

        return true;
      } catch (error) {
        const erroTratado = error as Error;

        throw new Error(
          erros.falhaPreencherArquivoPdf + "\n" + erroTratado.message,
        );
      }
    } else {
      throw new Error(erros.falhaLocalizacaoDadosPagina);
    }
  }

  async closeBrowser(): Promise<void> {
    if (this.dadosPage) {
      try {
        await this.dadosPage.browser.close();
      } catch (error) {
        throw new Error(erros.falhaFechamentoPagina + "/n" + error);
      }
    } else {
      console.error(erros.falhaLocalizacaoDadosPagina);
    }
  }
}
