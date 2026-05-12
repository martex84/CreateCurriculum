import { selecionarTemplateHTMLService } from "@templates/domain/services/selecionarTemplateHtml.service";
import { incluirDadosTemplateHtmlService } from "@templates/domain/services/incluirDadosTemplateHtml.service";
import { mockDadosTemplate } from "@/tests/mocks/subdomains/templates/domain/entity/template.mock";
import { TemplatePadrao } from "@/subdomains/templates/domain/entity/templates.entity";

describe("incluirDadosTempalteHtml", () => {
  test("Verificar se é feita a inclusão dos dados do usuário no template html/css", async () => {
    const { template: dadosUsuario, tipo } = mockDadosTemplate();

    const template = await selecionarTemplateHTMLService(tipo);

    if (!template.html.includes("{nome}"))
      throw new Error("Falha na geração do campo name no template!");

    const service = incluirDadosTemplateHtmlService(
      dadosUsuario as TemplatePadrao,
      tipo,
      template,
    );

    expect(typeof service).toBe("string");
    expect(service).toContain("<html");
    expect(service).toContain("<style");
    expect(service).not.toContain("{nome}");
    expect(service).toContain(dadosUsuario.nome);
  });
});
