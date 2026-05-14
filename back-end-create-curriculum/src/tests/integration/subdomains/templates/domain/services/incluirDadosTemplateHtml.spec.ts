import { selecionarTemplateHTMLService } from "@templates/domain/services/selecionarTemplateHtml.service";
import { incluirDadosTemplateHtmlService } from "@templates/domain/services/incluirDadosTemplateHtml.service";
import { mockDadosTemplate } from "@/tests/mocks/subdomains/templates/domain/entity/template.mock";
import { TemplatePadrao } from "@/subdomains/templates/domain/entity/templates.entity";

describe("incluirDadosTempalteHtml", () => {
  test("Verificar se é feita a inclusão dos dados do usuário no template html/css", async () => {
    const { template: dadosUsuario, tipo } = mockDadosTemplate();

    const templateBase = await selecionarTemplateHTMLService(tipo);

    const htmlGerado = incluirDadosTemplateHtmlService(
      dadosUsuario as TemplatePadrao,
      tipo,
      templateBase,
    );

    // Validações de estrutura
    expect(htmlGerado).toContain("<html");
    expect(htmlGerado).toContain("<style");

    //Validação do retorno do service
    expect(typeof htmlGerado).toBe("string");

    // Valida se os placeholders foram removidos
    expect(htmlGerado).not.toContain("{nome}");

    // Valida se os dados reais foram injetados
    expect(htmlGerado).toContain(dadosUsuario.nome);
  });
});
