import { CriarCurriculumUseCase } from "@/subdomains/criacao_curriculo/useCase/criarCurriculum.useCase";
import path from "node:path";
import { CriacaoLogs } from "@/config/log";
import { FsCreatePDF } from "@criacao_curriculo/adapters/fsCreatePdf.Adapter";
import { PuppeteerCreatePage } from "@criacao_curriculo/adapters/puppeteerCreatePage.Adapter";

describe("CriarCurriculumUseCase", () => {
  let criarCurriculumUseCase: CriarCurriculumUseCase;
  let localArquivo = path.join(process.cwd(), "temp");

  beforeEach(async () => {
    const log: CriacaoLogs = new CriacaoLogs();
    const puppeteerCreatePage: PuppeteerCreatePage = new PuppeteerCreatePage();
    const fsCreatePDF: FsCreatePDF = new FsCreatePDF(localArquivo);

    criarCurriculumUseCase = new CriarCurriculumUseCase(
      puppeteerCreatePage,
      fsCreatePDF,
      log,
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
