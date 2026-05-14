import { selecionarTemplateHTMLService } from "@/subdomains/templates/domain/services/selecionarTemplateHtml.service";
import { mockDadosTemplate } from "@/tests/mocks/subdomains/templates/domain/entity/template.mock";

describe("SelecionarTempalteHtml", () => {
  test("Deve retornar as strings de HTML e CSS corretamente para um tipo válido", async () => {
    const { template, tipo } = mockDadosTemplate();

    const campoUtilizado: keyof typeof template = "nome";

    const resultado = await selecionarTemplateHTMLService(tipo);

    // Validação de estrutura e tipos
    expect(resultado).toHaveProperty("html");
    expect(resultado).toHaveProperty("css");
    expect(typeof resultado.html).toBe("string");
    expect(typeof resultado.css).toBe("string");

    // Validação de conteúdo básico do HTML
    expect(resultado.html).toContain("<html");
    expect(resultado.html).toContain("<head");
    expect(resultado.html).toContain("<body");
    expect(resultado.html).not.toHaveLength(0);
    expect(resultado.css).not.toHaveLength(0);

    // Verifica se existem placeholders de campos esperados (ex: nome)
    expect(resultado.html).toContain(`{${campoUtilizado}}`);
  });
});
