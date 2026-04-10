import { CriarTemplateUseCase } from "@/subdomains/templates/useCases/criarTemplate.useCase";

export const makeCreateTemplates = () => {
  const criarTemplateUseCase = new CriarTemplateUseCase();

  return {
    criarTemplateUseCase,
  };
};
