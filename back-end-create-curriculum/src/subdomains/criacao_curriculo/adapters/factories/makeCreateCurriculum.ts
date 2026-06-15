import { CriarCurriculumUseCase } from "@criacao_curriculo/useCase/criarCurriculum.useCase";
import { PuppeteerCreatePage } from "@criacao_curriculo/adapters/out/puppeteerCreatePage.Adapter";
import { CriacaoLogs } from "@/config/log";
import path from "node:path";
import { FsCreatePDF } from "@/subdomains/criacao_curriculo/adapters/out/fsCreatePdf.Adapter";
import { ICurriculumFactory } from "@/subdomains/criacao_curriculo/ports/ICurriculumFactory";

export const makeCreateCurriculum = (): ICurriculumFactory => {
  const localPasta = path.join(process.cwd(), "temp");

  const criacaoLogs = new CriacaoLogs();

  const puppeteerCreatePage = new PuppeteerCreatePage();
  const createPdf = new FsCreatePDF(localPasta);

  const criarCurriculumUseCase = new CriarCurriculumUseCase(
    puppeteerCreatePage,
    createPdf,
    criacaoLogs,
  );

  return {
    criarCurriculumUseCase,
  };
};
