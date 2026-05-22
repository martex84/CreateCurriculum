import { incluirDadosTemplateHtmlService } from "@/subdomains/geracao_templates/domain/services/incluirDadosTemplateHtml.service";
import { CaptarDocumentosAdapter } from "@/subdomains/geracao_templates/adapters/captarDocumentos.adapter";
import { validarTemplateService } from "@/subdomains/geracao_templates/domain/services/validarTemplate.service";
import { CriarTemplateUseCase } from "@/subdomains/geracao_templates/useCases/criarTemplate.useCase";
import { getTemplatePath } from "@/subdomains/geracao_templates/adapters/config/templatesPath";

export interface MakeCreateTemplates {
  criarTemplateUseCase: CriarTemplateUseCase;
}

export const makeCreateTemplates = () => {
  const captarDadosTemplateHtmlAdapter = new CaptarDocumentosAdapter(
    getTemplatePath(),
  );

  const criarTemplateUseCase = new CriarTemplateUseCase(
    {
      validarTemplateService,
      incluirDadosTemplateHtmlService,
    },
    captarDadosTemplateHtmlAdapter,
  );

  return {
    criarTemplateUseCase,
  };
};
