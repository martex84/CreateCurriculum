import { ValidationError } from "@/shared/errors/validation-error";
import { mensageError } from "@geracao_templates/domain/services/validarTemplate.error";
import { mockDadosTemplate } from "@/tests/mocks/subdomains/templates/domain/entity/template.mock";
import { validarTemplateService } from "@geracao_templates/domain/services/validarTemplate.service";

type TipoErroCampoPadrao = "inexistente" | "diferente";

describe("ValidarTemplate", () => {
  describe("Verifica a lógica geral da função", () => {
    test.each([undefined, "", [undefined]])(
      "Certifica se é apresentado o erro para o recebimento de dados como [%s]",
      (variacao) => {
        const validacao = () => validarTemplateService(variacao);

        expect(validacao).toThrow(ValidationError);
        expect(validacao).toThrow(mensageError.DADOS_INVALIDOS);
      },
    );

    //---------
    test.each([undefined, "", [undefined]])(
      "Certifica se é apresentado o erro para o recebimento de templates inválidos por meio do valor [%s]",
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
      "Certifica se é apresentado o erro para o recebido de tipo inválidos de template por meio do valor [%s]",
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
    // test("Certifica se é apresentado o erro caso ");
  });

  //----------
  describe("Verifica a lógica para templates do tipo padrão", () => {
    test.each([
      ["nome", "nome", undefined],
      ["numero", "contato", { numero: undefined }],
    ])(
      "Certifica se é apresentado um erro ao receber dados inválidos no campo [%s]",
      (nome, id, valor) => {
        const dados = mockDadosTemplate({ template: { [id]: valor } });

        const validacao = () => validarTemplateService(dados);

        expect(validacao).toThrow(ValidationError);
        expect(validacao).toThrow(mensageError.CAMPO_DIFERENTE(nome));
      },
    );

    //----------
    test.each([
      [
        "diferente" as TipoErroCampoPadrao,
        (campo: string) => mensageError.CAMPO_DIFERENTE(campo),
      ],
      [
        "inexistente" as TipoErroCampoPadrao,
        (campo: string) => mensageError.CAMPO_INEXISTENTE(campo),
      ],
    ])(
      "Certifica se é apresentado um erro de campo '%s' no campo contato do template",
      (tipo: TipoErroCampoPadrao, fcErro: (campo: string) => string) => {
        let dados = mockDadosTemplate();

        if (!dados.template.contato)
          throw new Error("Falha na captação do campo contato!");

        type nomeCampos = keyof typeof dados.template.contato;

        const nomeCampo: nomeCampos = "numero";

        if (tipo === "inexistente")
          delete (dados.template.contato as any)[nomeCampo];
        else if (tipo === "diferente")
          (dados.template.contato as any)[nomeCampo] = undefined;

        const validacao = () => validarTemplateService(dados);

        expect(validacao).toThrow(ValidationError);
        expect(validacao).toThrow(fcErro(nomeCampo));
      },
    );

    //----------
    test.each([
      [
        "diferente" as TipoErroCampoPadrao,
        (campo: string) => mensageError.CAMPO_DIFERENTE(campo),
      ],
      [
        "inexistente" as TipoErroCampoPadrao,
        (campo: string) => mensageError.CAMPO_INEXISTENTE(campo),
      ],
    ])(
      "Certifica se é apresentado um erro de campo '%s' no atributo do template",
      (tipo: TipoErroCampoPadrao, fcErro: (campo: string) => string) => {
        let dados = mockDadosTemplate();

        type nomeCamposTemplate = keyof typeof dados.template;

        const nomeCampo: nomeCamposTemplate = "nome";

        if (tipo === "inexistente") delete (dados.template as any)[nomeCampo];
        else if (tipo === "diferente")
          (dados.template as any)[nomeCampo] = undefined;

        const validacao = () => validarTemplateService(dados);

        expect(validacao).toThrow(ValidationError);
        expect(validacao).toThrow(fcErro(nomeCampo));
      },
    );
  });
});
