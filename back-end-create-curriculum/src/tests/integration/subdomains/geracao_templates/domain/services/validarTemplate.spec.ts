import { validarTemplateService } from "@geracao_templates/domain/services/validarTemplate.service";
import {
  DadosTemplate,
  mockDadosTemplate,
} from "@/tests/mocks/subdomains/geracao_templates/domain/entity/template.mock";

describe("ValidarTemplate", () => {
  let objetoMock: () => DadosTemplate;

  beforeEach(() => {
    objetoMock = mockDadosTemplate;
  });

  test("Deve validar os dados recebidos, sinalizando sua veracidade", () => {
    const dados = objetoMock();

    const validarTemplate = validarTemplateService(dados);

    expect(validarTemplate).toBe(true);
  });
});
