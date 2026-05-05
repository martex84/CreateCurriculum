import { ValidationError } from "@/shared/errors/validation-error";
import { mensageError } from "@templates/domain/services/validarTemplate.error";
import { mockDadosTemplate } from "@/tests/mocks/subdomains/templates/domain/entity/template.mock";
import { validarTemplateService } from "@templates/domain/services/validarTemplate.service";

describe("ValidarTemplate", () => {
  describe("Verifica a lógica geral da função", () => {
    test.each([undefined, "", [undefined]])(
      "Verifica se apresenta erro para o recebimento de dados como [%s]",
      (variacao) => {
        const validacao = () => validarTemplateService(variacao);

        expect(validacao).toThrow(ValidationError);
        expect(validacao).toThrow(mensageError.DADOS_INVALIDOS);
      },
    );

    //---------
    test.each([undefined, "", [undefined]])(
      "Verifica se apresenta erro para o recebimento de templates inválidos por meio do valor [%s]",
      (variacao) => {
        const dados = mockDadosTemplate();

        //Transforma o valor do template para a variação atual
        dados.template = variacao as any;

        const validacao = () => validarTemplateService(dados);

        expect(validacao).toThrow(ValidationError);
        expect(validacao).toThrow(mensageError.TEMPLATE_INVALIDO);
      },
    );

    //----------
    test.each([undefined, {}, [undefined], "teste"])(
      "Verifica se apresenta erro para o recebido de tipo inválidos de template por meio do valor [%s]",
      (variacao) => {
        const dados = mockDadosTemplate();

        //Transforma o valor do template para a variação atual
        dados.tipo = variacao as any;

        const validacao = () => validarTemplateService(dados);

        expect(validacao).toThrow(ValidationError);
        expect(validacao).toThrow(mensageError.TIPO_INVALIDO);
      },
    );

    //----------
    // test("Verifica se apresenta erro caso ");
  });

  //----------
  describe("Verifica a lógica para templates do tipo padrão", () => {
    test.skip("Verifica se apresenta erro para o recebimento de dados inválidos para o tipo de template", () => {
      const nomeCampo = "nome";

      const dados = mockDadosTemplate({ template: { [nomeCampo]: undefined } });

      const validacao = () => validarTemplateService(dados);

      expect(validacao).toThrow(ValidationError);
      expect(validacao).toThrow(mensageError.CAMPO_DIFERENTE(nomeCampo));
    });
  });
});
