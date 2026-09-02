import fs from "node:fs";
import {
  CriarCurriculumUseCase,
  errors,
} from "@criacao_curriculo/useCase/criarCurriculum.useCase";
import { FsCreatePDF } from "@/subdomains/criacao_curriculo/adapters/out/fsCreatePdf.Adapter";
import { PuppeteerCreatePage } from "@/subdomains/criacao_curriculo/adapters/out/puppeteerCreatePage.Adapter";
import path from "node:path";
import { CriarCurriculumError } from "@/shared/errors/criarCurriculum-error";
import { GestaoArquivosLog } from "@/subdomains/geracao_log/adapters/out/GestaoArquivosLog";
import { GeracaoLogUseCase } from "@/subdomains/geracao_log/useCase/geracaoLogUseCase";

describe("CriarCurriculumUseCase", () => {
  let criarCurriculumUseCase: CriarCurriculumUseCase;
  let fsCreatePDF: FsCreatePDF;
  let puppeteerCreatePage: PuppeteerCreatePage;
  let localPasta = path.join(process.cwd(), "temp");
  const html = "<html><body><h1>Hello World</h1></body></html>";

  beforeEach(() => {
    fsCreatePDF = new FsCreatePDF(localPasta);
    puppeteerCreatePage = new PuppeteerCreatePage();

    const gestaoArquivosLog = new GestaoArquivosLog();

    const geracaoLogUseCase = new GeracaoLogUseCase(gestaoArquivosLog);

    jest.spyOn(geracaoLogUseCase, "execution").mockResolvedValue();

    criarCurriculumUseCase = new CriarCurriculumUseCase(
      puppeteerCreatePage,
      fsCreatePDF,
      geracaoLogUseCase,
    );

    jest.resetAllMocks();
  });

  test("Verifica se é reconhecido erros durante o processo de criação do currículo", async () => {
    const mensagem = "Erro Teste Geração Arquivo";

    jest.spyOn(fsCreatePDF, "geracaoArquivo").mockImplementation(() => {
      throw new Error(mensagem);
    });

    const verificacao = criarCurriculumUseCase.execution(html);

    await expect(verificacao).rejects.toBeInstanceOf(CriarCurriculumError);
    await expect(verificacao).rejects.toThrow(
      expect.objectContaining({
        message: expect.stringContaining(mensagem),
      }),
    );
  });

  test("Verifica se o arquivo que foi gerado durante a criação do currículo é excluído após um erro", async () => {
    const dadosArquivo = await fsCreatePDF.geracaoArquivo();
    const mensage = "Erro Teste Geração Arquivo";

    jest.spyOn(fsCreatePDF, "geracaoArquivo").mockImplementation(() => {
      throw new Error(mensage);
    });

    const mockApagarArquivo = jest.spyOn(fsCreatePDF, "apagarArquivo");

    const verificao = criarCurriculumUseCase.execution(html);

    await expect(verificao).rejects.toBeInstanceOf(CriarCurriculumError);
    await expect(verificao).rejects.toThrow(
      expect.objectContaining({
        message: expect.stringContaining(mensage),
      }),
    );
    expect(mockApagarArquivo).toHaveBeenCalled();
    expect(fs.existsSync(dadosArquivo.localArquivo)).toBeFalsy();
  });

  test("Verifica se o browser irá ser fechado após um erro", async () => {
    const mensage = "Erro Teste Encerramento Browser";

    jest.spyOn(puppeteerCreatePage, "createPage").mockImplementation(() => {
      throw new Error(mensage);
    });

    const mockCloseBrowser = jest.spyOn(puppeteerCreatePage, "closeBrowser");

    const verificao = criarCurriculumUseCase.execution(html);

    await expect(verificao).rejects.toBeInstanceOf(CriarCurriculumError);
    await expect(verificao).rejects.toThrow(
      expect.objectContaining({
        message: expect.stringContaining(mensage),
      }),
    );

    expect(mockCloseBrowser).toHaveBeenCalled();
  });
});
