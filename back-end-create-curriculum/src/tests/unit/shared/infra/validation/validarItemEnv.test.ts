import { ValidationEnvError } from "@/shared/errors/validationEnv-error";
import {
  InformacoesValidarItem,
  validarItem,
} from "@shared/infra/validation/validarItemEnv";

interface ObjetoItem {
  nome: any;
}

interface TesteValidacao {
  item: any | ObjetoItem;
  tipo: string;
}

describe("ValidarItemEnv", () => {
  test("Valida se ao passar um item válido o mesmo irá ser retornado", () => {
    const objeto: InformacoesValidarItem = {
      item: "Valor",
      mensagemErro: "Mensagem Teste",
      tipoDesejado: "string",
    };

    const validacao = validarItem(objeto);

    expect(validacao).toBe(objeto.item);
    expect(typeof validacao).toBe(objeto.tipoDesejado);
  });

  test.each([
    {
      item: undefined,
      tipo: "inexistente",
    },
    {
      item: {
        nome: "",
      },
      tipo: "vazio",
    },
  ] as TesteValidacao[])(
    "Valida se ao passar um item [$tipo], irá apresentar erro",
    ({ item, tipo }: TesteValidacao) => {
      let objetoItem = item;

      if (item && typeof item == "object") {
        objetoItem = item.nome;
      }

      const mensagemErro = `O item está com erro do tipo [${tipo}]`;

      const objeto: InformacoesValidarItem = {
        item: objetoItem,
        mensagemErro: mensagemErro,
        tipoDesejado: "string",
      };

      const validar = () => validarItem(objeto);

      expect(validar).toThrow(ValidationEnvError);
      expect(validar).toThrow(mensagemErro);
    },
  );
});
