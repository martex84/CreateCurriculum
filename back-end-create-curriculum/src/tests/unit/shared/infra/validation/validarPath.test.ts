import { validarPath, errors } from "@/shared/infra/validation/validarPath";

describe("validarPath", () => {
  test("Valida se ao receber um caminho válido irá retornar como verdadeiro!", () => {
    const validacao = validarPath(process.cwd());

    expect(validacao).toBe(true);
  });

  test("Valida se ao receber um caminho inválido irá retornar um erro", () => {
    const validacao = () => validarPath("teste");

    expect(validacao).toThrow(Error);
    expect(validacao).toThrow(errors.caminhoInvalido);
  });
});
