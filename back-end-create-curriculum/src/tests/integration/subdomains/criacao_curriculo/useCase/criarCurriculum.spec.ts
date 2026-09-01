import { CriarCurriculumUseCase } from "@/subdomains/criacao_curriculo/useCase/criarCurriculum.useCase";
import path from "node:path";
import { FsCreatePDF } from "@criacao_curriculo/adapters/out/fsCreatePdf.Adapter";
import { PuppeteerCreatePage } from "@criacao_curriculo/adapters/out/puppeteerCreatePage.Adapter";
import { GeracaoLogUseCase } from "@/subdomains/geracao_log/useCase/geracaoLogUseCase";
import { GestaoArquivosLog } from "@/subdomains/geracao_log/adapters/out/GestaoArquivosLog";

describe("CriarCurriculumUseCase", () => {
  let criarCurriculumUseCase: CriarCurriculumUseCase;
  let localArquivo = path.join(process.cwd(), "temp");

  beforeEach(async () => {
    const gestaoArquivosLog = new GestaoArquivosLog();

    const geracaoLogUseCase = new GeracaoLogUseCase(gestaoArquivosLog);

    const puppeteerCreatePage: PuppeteerCreatePage = new PuppeteerCreatePage();
    const fsCreatePDF: FsCreatePDF = new FsCreatePDF(localArquivo);

    criarCurriculumUseCase = new CriarCurriculumUseCase(
      puppeteerCreatePage,
      fsCreatePDF,
      geracaoLogUseCase,
    );
  });

  test("Verifica se o curículo está sendo gerado com sucesso!", async () => {
    const html = `
            <html>
                <body>
                    <h1>Olá Mundo!</h1>
                </body>
            </html>
        `;

    const curriculum = await criarCurriculumUseCase.execution(html);

    expect(curriculum.arquivo.length).toBeGreaterThan(0);
    expect(curriculum.error.isError).toBe(false);
  });
});
