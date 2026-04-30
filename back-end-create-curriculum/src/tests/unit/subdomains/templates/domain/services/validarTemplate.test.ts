import { ValidationError } from "@/shared/errors/validation-error";
import { mockDadosTemplate } from "@/tests/mocks/subdomains/templates/domain/entity/template.mock";
import { validarTemplateService } from "@templates/domain/services/validarTemplate.service";

describe("ValidarTemplate", () => {
  describe("Verifica a lógica geral da função", () => {
    test("Verifica se apresenta erro para o recebimento de dados inválidos", () => {
      const dados = mockDadosTemplate({ template: { nome: undefined } });

      const validacao = () => validarTemplateService(dados);

      expect(validacao).toThrow(ValidationError);
    });
  });
  describe("Verifica a lógica para templates do tipo padrão", () => {});
});
