import { CriarTemplateUseCase } from "@/subdomains/geracao_templates/useCases/criarTemplate.useCase";

export interface IGeracaoTemplatesFactory {
  criarTemplateUseCase: CriarTemplateUseCase;
}
