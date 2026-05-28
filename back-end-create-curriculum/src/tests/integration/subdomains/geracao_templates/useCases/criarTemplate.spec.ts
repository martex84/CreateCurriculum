import { incluirDadosTemplateHtmlService } from "@geracao_templates/domain/services/incluirDadosTemplateHtml.service";
import { CaptarDocumentosAdapter } from "@geracao_templates/adapters/captarDocumentos.adapter";
import { validarTemplateService } from "@geracao_templates/domain/services/validarTemplate.service";
import { CriarTemplateUseCase } from "@geracao_templates/useCases/criarTemplate.useCase";
import { mockDadosTemplate } from "@/tests/mocks/subdomains/templates/domain/entity/template.mock";
import { getTemplatePath } from "@geracao_templates/adapters/config/templatesPath";

describe("CriarTemplateUseCase", () => {
  let criarTemplateUseCase: CriarTemplateUseCase;

  beforeAll(() => {
    const captarDadosTemplateHtmlAdapter = new CaptarDocumentosAdapter(
      getTemplatePath(),
    );

    //Instância do Use Case
    criarTemplateUseCase = new CriarTemplateUseCase(
      {
        validarTemplateService,
        incluirDadosTemplateHtmlService,
      },
      captarDadosTemplateHtmlAdapter,
    );
  });

  test("Deve realizar a criação do template quando é passado os dados corretos", async () => {
    const dadosTemplate = mockDadosTemplate();

    const execucao = await criarTemplateUseCase.execute(dadosTemplate);

    expect(execucao).not.toBeUndefined();
    expect(typeof execucao).toBe("string");
    expect(execucao?.toUpperCase()).toContain(`<!DOCTYPE html>`.toUpperCase());
    expect(execucao?.toUpperCase()).toContain("<html".toUpperCase());
    expect(execucao?.toUpperCase()).toContain("<body".toUpperCase());
    expect(execucao?.toUpperCase()).toContain("css".toUpperCase());
    expect(execucao?.toUpperCase()).toContain(
      dadosTemplate.template.nome?.toUpperCase(),
    );
    expect(execucao?.toUpperCase()).toContain(
      dadosTemplate.template.contato?.numero.toUpperCase(),
    );
  });
});
