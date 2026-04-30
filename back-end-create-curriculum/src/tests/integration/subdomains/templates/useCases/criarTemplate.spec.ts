import { incluirDadosTemplateHtmlService } from "@/subdomains/templates/domain/services/incluirDadosTemplateHtml.service";
import { selecionarTemplateHTMLService } from "@/subdomains/templates/domain/services/selecionarTemplateHtml.service";
import { validarTemplateService } from "@/subdomains/templates/domain/services/validarTemplate.service";
import { CriarTemplateUseCase } from "@/subdomains/templates/useCases/criarTemplate.useCase";
import { mockDadosTemplate } from "@/tests/mocks/subdomains/templates/domain/entity/template.mock";

describe("CriarTemplateUseCase", () => {
  let criarTemplateUseCase: CriarTemplateUseCase;

  beforeEach(() => {
    //Instância do Use Case
    criarTemplateUseCase = new CriarTemplateUseCase({
      validarTemplateService,
      incluirDadosTemplateHtmlService,
      selecionarTemplateHTMLService,
    });
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
