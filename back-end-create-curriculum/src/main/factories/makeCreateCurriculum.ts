import { CriarCurriculumUseCase } from "@/subdomains/curriculum/application/useCase/criarCurriculum.useCase";

export const makeCrateCurriculum = () => {
  const criarCurriculumUseCase = new CriarCurriculumUseCase();

  return {
    criarCurriculumUseCase,
  };
};
