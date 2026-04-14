import { CriarCurriculumUseCase } from "@/subdomains/curriculum/useCase/criarCurriculum.useCase";
import { PuppeteerCurriculumAdapter } from "@curriculum/adapters/puppeteerCurriculumAdapter";

export const makeCrateCurriculum = () => {
  const puppeteerCurriculumAdapter = new PuppeteerCurriculumAdapter();
  const criarCurriculumUseCase = new CriarCurriculumUseCase(
    puppeteerCurriculumAdapter,
  );

  return {
    criarCurriculumUseCase,
  };
};
