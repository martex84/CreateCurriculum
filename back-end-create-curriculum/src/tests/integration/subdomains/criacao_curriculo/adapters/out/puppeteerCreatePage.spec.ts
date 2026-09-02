import { PuppeteerCreatePage } from "@criacao_curriculo/adapters/out/puppeteerCreatePage.Adapter";
import path from "node:path";
import { mkdir, writeFile, rm } from "node:fs/promises";

describe("PuppeteerCreatePageAdapter", () => {
  let puppeteerCreatePage: PuppeteerCreatePage;
  let localicaoPastaTemporaria: string;
  let nomeArquivo: string = "arquivoTemporario.pdf";

  beforeAll(async () => {
    try {
      //Informa o local do arquivo temporário
      localicaoPastaTemporaria = path.join(
        process.cwd(),
        "src",
        "tests",
        "integration",
        "subdomains",
        "criacao_curriculo",
        "adapters",
        "temp",
      );

      //Cria a pasta temporária
      await mkdir(path.join(localicaoPastaTemporaria), {
        recursive: true,
      });

      //Cria o arquivo temporário
      await writeFile(path.join(localicaoPastaTemporaria, nomeArquivo), "", {
        encoding: "utf-8",
      });
    } catch (error: any) {
      throw new Error("Falha na preparação dos testes!" + "\n" + error.message);
    }
  });

  beforeEach(async () => {
    //Realiza a criação da página
    puppeteerCreatePage = new PuppeteerCreatePage();
  });

  afterEach(async () => {
    //Fecha a página
    await puppeteerCreatePage.closeBrowser();
  });

  afterAll(async () => {
    try {
      await rm(localicaoPastaTemporaria, { recursive: true, force: true });
    } catch (error: any) {
      throw new Error(
        "Falha no encerramento dos testes!" + "/n" + error.message,
      );
    }
  });

  test("Verifica a execução do ciclo completo da criação de uma página", async () => {
    //Realiza a criação da página
    await puppeteerCreatePage.createPage(
      "<html><body><h1>Teste</h1></body></html>",
    );

    const valorValidacao = puppeteerCreatePage.getPage();

    expect(valorValidacao).not.toBeUndefined();
    expect(valorValidacao).not.toBeNull();
  });

  test("Verifica o prenchimento do arquivo pdf com os valores da página", async () => {
    //Realiza a criação da página
    await puppeteerCreatePage.createPage(
      "<html><body><h1>Teste</h1></body></html>",
    );

    const localizacao = path.join(localicaoPastaTemporaria, nomeArquivo);

    const valorPreenchimento =
      await puppeteerCreatePage.preencherArquivoPdf(localizacao);

    expect(valorPreenchimento).toBe(true);
  });
});
