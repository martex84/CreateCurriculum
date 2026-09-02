import { incluirDadosTemplateHtmlService } from "@geracao_templates/domain/services/incluirDadosTemplateHtml.service";
import { CaptarDocumentosAdapter } from "@/subdomains/geracao_templates/adapters/out/captarDocumentos.adapter";
import { validarTemplateService } from "@geracao_templates/domain/services/validarTemplate.service";
import { CriarTemplateUseCase } from "@geracao_templates/useCases/criarTemplate.useCase";
import { getTemplatePath } from "@geracao_templates/adapters/out/config/templatesPath";
import { IGeracaoTemplatesFactory } from "@/subdomains/geracao_templates/ports/IGeracaoTemplatesFactory";
import { makeGeracaoLogUseCase } from "@geracao_log/";

export const makeCreateTemplates = (): IGeracaoTemplatesFactory => {
  const captarDadosTemplateHtmlAdapter = new CaptarDocumentosAdapter(
    getTemplatePath(),
  );

  const criacaoLogs = makeGeracaoLogUseCase();

  const criarTemplateUseCase = new CriarTemplateUseCase(
    {
      validarTemplateService,
      incluirDadosTemplateHtmlService,
    },
    captarDadosTemplateHtmlAdapter,
    criacaoLogs,
  );

  return {
    criarTemplateUseCase,
  };
};
