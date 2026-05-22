import { CaptarDocumentosAdapter } from "@geracao_templates/adapters/captarDocumentos.adapter";
import { incluirDadosTemplateHtmlService } from "@geracao_templates/domain/services/incluirDadosTemplateHtml.service";
import { mockDadosTemplate } from "@/tests/mocks/subdomains/templates/domain/entity/template.mock";
import { TemplatePadrao } from "@geracao_templates/domain/entity/templates.entity";
import { getTemplatePath } from "@geracao_templates/adapters/config/templatesPath";

describe("incluirDadosTemplateHtml", () => {
  let captarDocumentoAdapter: CaptarDocumentosAdapter;

  beforeAll(() => {
    captarDocumentoAdapter = new CaptarDocumentosAdapter(getTemplatePath());
  });

  test("Verificar se é feita a inclusão dos dados do usuário no template html/css", async () => {
    const { template: dadosUsuario, tipo } = mockDadosTemplate();

    const documento = await captarDocumentoAdapter.captarHtmlCSS(tipo);

    const htmlGerado = incluirDadosTemplateHtmlService(
      dadosUsuario as TemplatePadrao,
      tipo,
      documento,
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
