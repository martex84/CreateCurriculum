import { Templates } from "@/subdomains/templates/domain/entity/templates.entity";
import { incluirDadosTemplateHtmlService } from "@/subdomains/templates/domain/services/incluirDadosTemplateHtml.service";
import { selecionarTemplateHTMLService } from "@/subdomains/templates/domain/services/selecionarTemplateHtml.service";
import { validarTemplateService } from "@/subdomains/templates/domain/services/validarTemplate.service";
import { TiposTemplates } from "@/subdomains/templates/types/tiposTemplates";
import { CriarTemplateUseCase } from "@/subdomains/templates/useCases/criarTemplate.useCase";

describe("CriarTemplateUseCase", () => {
  let criarTemplateUseCase: CriarTemplateUseCase;

  //Mock para realizar a criação do template
  let mockDadosTemplate: () => {
    template: Partial<Templates>;
    tipo: Partial<TiposTemplates>;
  };

  beforeEach(() => {
    //Realização do mock antes de cada teste
    mockDadosTemplate = () => {
      return {
        template: {
          contato: {
            numero: "123456789",
            email: "test@example.com",
            linkdin: "linkedin.com/in/test",
          },
          nome: "Test User",
          formacaoAcademica: "Computer Science",
          resumoProfissional: "Experienced developer",
          idiomas: "English, Portuguese",
          competencias: "JavaScript, TypeScript",
          historicoProfissional: "Software Engineer at Company X",
          certificacoes: "AWS Certified",
        },
        tipo: "padrao",
      };
    };

    //Instância do Use Case
    criarTemplateUseCase = new CriarTemplateUseCase({
      validarTemplateService,
      incluirDadosTemplateHtmlService,
      selecionarTemplateHTMLService,
    });
  });

  test.skip("Deve realizar a criação do template quando é passado os dados corretos", async () => {
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
