import { CaptarDocumentosAdapter } from "@/subdomains/geracao_templates/adapters/out/captarDocumentos.adapter";
import { IGeracaoTemplatesCaptarDocumentosAdapterPort } from "@/subdomains/geracao_templates/ports/iGeracaoTemplatesCaptarDocumentosAdapterPort";
import { mockDadosTemplate } from "@/tests/mocks/subdomains/geracao_templates/domain/entity/template.mock";
import { getTemplatePath } from "@geracao_templates/adapters/out/config/templatesPath";

describe("CaptarDocumentosAdapter", () => {
  let captarDocumentoAdapter: IGeracaoTemplatesCaptarDocumentosAdapterPort;

  beforeAll(() => {
    captarDocumentoAdapter = new CaptarDocumentosAdapter(getTemplatePath());
  });

  test("Deve retornar as strings de HTML e CSS corretamente para um tipo válido", async () => {
    const { template, tipo } = mockDadosTemplate();

    const campoUtilizado: keyof typeof template = "nome";

    const resultado = await captarDocumentoAdapter.captarHtmlCSS(tipo);

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
