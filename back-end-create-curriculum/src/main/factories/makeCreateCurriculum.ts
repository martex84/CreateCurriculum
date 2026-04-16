import { CriarCurriculumUseCase } from "@/subdomains/curriculum/useCase/criarCurriculum.useCase";
import { PuppeteerCurriculumAdapter } from "@curriculum/adapters/puppeteerCurriculumAdapter";

export interface MakeCreateCurriculum {
  criarCurriculumUseCase: CriarCurriculumUseCase;
}

export const makeCreateCurriculum = (): MakeCreateCurriculum => {
  const puppeteerCurriculumAdapter = new PuppeteerCurriculumAdapter();
  const criarCurriculumUseCase = new CriarCurriculumUseCase(
    puppeteerCurriculumAdapter,
  );

  return {
    criarCurriculumUseCase,
  };
};
