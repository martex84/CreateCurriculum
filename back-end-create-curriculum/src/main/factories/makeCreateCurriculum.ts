import { CriarCurriculumUseCase } from "@criacao_curriculo/useCase/criarCurriculum.useCase";
import { PuppeteerCurriculumAdapter } from "@criacao_curriculo/adapters/puppeteerCurriculumAdapter";

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
