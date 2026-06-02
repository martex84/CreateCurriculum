import { PuppeteerCreatePage } from "@criacao_curriculo/adapters/puppeteerCreatePage.Adapter";
import { erros } from "@criacao_curriculo/adapters/puppeteerCreatePage.Error";

describe("PuppeteerCreatePageAdapter", () => {
  let puppeteerCreatePage: PuppeteerCreatePage;

  beforeEach(async () => {
    //Realiza a criação da página
    puppeteerCreatePage = new PuppeteerCreatePage();
  });

  afterEach(async () => {
    //Fecha a página
    await puppeteerCreatePage.closeBrowser();
  });

  test("Verifica se ocorre erro ao passar a localização inválida para um arquivo que deverá ser preenchido", async () => {
    //Realiza a criação da página
    await puppeteerCreatePage.createPage(
      "<html><body><h1>Teste</h1></body></html>",
    );

    const valorValidacao = puppeteerCreatePage.preencherArquivoPdf(
      process.cwd(),
    );

    await expect(valorValidacao).rejects.toThrow(Error);
    await expect(valorValidacao).rejects.toThrow(
      expect.objectContaining({
        message: expect.stringContaining(erros.falhaPreencherArquivoPdf),
      }),
    );
  });
});
