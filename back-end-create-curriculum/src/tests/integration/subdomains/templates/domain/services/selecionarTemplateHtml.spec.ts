import { selecionarTemplateHTMLService } from "@/subdomains/templates/domain/services/selecionarTemplateHtml.service";
import { mockDadosTemplate } from "@/tests/mocks/subdomains/templates/domain/entity/template.mock";

describe("SelecionarTempalteHtml", () => {
  test("Verificar se é realizado a seleção do template html e de css com base ao tipo informado", async () => {
    const { template, tipo } = mockDadosTemplate();

    const campoUtilizado = Object.keys(template)[0];

    const verificacao = selecionarTemplateHTMLService(tipo);

    expect(await verificacao).toHaveProperty("html");
    expect(await verificacao).toHaveProperty("css");

    expect(typeof (await verificacao).html).toBe("string");
    expect(typeof (await verificacao).css).toBe("string");

    expect((await verificacao).html).toContain("<html");
    expect((await verificacao).html).toContain("<head");
    expect((await verificacao).html).toContain("<body");

    expect((await verificacao).html).not.toHaveLength(0);
    expect((await verificacao).css).not.toHaveLength(0);

    expect((await verificacao).html).toContain(`{${campoUtilizado}}`);
  });
});
