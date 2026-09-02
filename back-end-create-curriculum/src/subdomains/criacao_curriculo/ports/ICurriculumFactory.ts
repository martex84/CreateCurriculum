import { CriarCurriculumUseCase } from "@/subdomains/criacao_curriculo/useCase/criarCurriculum.useCase";

export interface ICurriculumFactory {
  criarCurriculumUseCase: CriarCurriculumUseCase;
}
