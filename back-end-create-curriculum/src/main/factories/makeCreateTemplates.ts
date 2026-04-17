import { incluirDadosTemplateHtmlService } from "@/subdomains/templates/domain/services/incluirDadosTemplateHtml.service";
import { selecionarTemplateHTMLService } from "@/subdomains/templates/domain/services/selecionarTemplateHtml.service";
import { validarTemplateService } from "@/subdomains/templates/domain/services/validarTemplate.service";
import { CriarTemplateUseCase } from "@/subdomains/templates/useCases/criarTemplate.useCase";

export interface MakeCreateTemplates {
  criarTemplateUseCase: CriarTemplateUseCase;
}

export const makeCreateTemplates = () => {
  const criarTemplateUseCase = new CriarTemplateUseCase({
    validarTemplateService,
    incluirDadosTemplateHtmlService,
    selecionarTemplateHTMLService,
  });

  return {
    criarTemplateUseCase,
  };
};
