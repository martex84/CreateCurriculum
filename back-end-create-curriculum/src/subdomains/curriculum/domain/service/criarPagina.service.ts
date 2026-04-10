import puppeteer, { Browser, Page } from "puppeteer";

export interface DadosPagina {
  browser: Browser;
  page: Page;
}

export async function criarPaginaService(
  arquivoHtml: string,
): Promise<DadosPagina> {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(arquivoHtml, { waitUntil: "domcontentloaded" });
    await page.waitForNetworkIdle();

    return {
      browser: browser,
      page: page,
    };
  } catch (error) {
    throw new Error(`Falha na criação da página: ${error}`);
  }
}
