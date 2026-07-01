import { ValidationEnvError } from "@/shared/errors/validationEnv-error";
import * as importarInformacoesFile from "@shared/infra/config/importarInformacoes";

describe("ImportarInformacoes", () => {
  test("Valida se ocorre reconhece a falha na configuração do env", () => {
    const mock = jest.spyOn(importarInformacoesFile, "configurarDotenv");

    const { erros, importarInformacoes } = importarInformacoesFile;

    mock.mockImplementation(() => {
      throw new ValidationEnvError(erros.ERRO_CONFIGURACAO);
    });

    mock.mockImplementation(() => {
      throw new ValidationEnvError(erros.ERRO_CONFIGURACAO);
    });

    const validacao = () => importarInformacoes();

    expect(validacao).toThrow(ValidationEnvError);
    expect(validacao).toThrow(erros.ERRO_CONFIGURACAO);
  });
});
