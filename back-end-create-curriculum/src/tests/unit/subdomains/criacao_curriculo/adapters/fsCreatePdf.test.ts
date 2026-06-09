import { CreatePdfError } from "@/shared/errors/createPdf-error";
import { FsCreatePDF } from "@criacao_curriculo/adapters/fsCreatePdf.Adapter";
import { errors } from "@criacao_curriculo/adapters/fsCreatePdf.Error";
import { errors as errorsValidacao } from "@shared/infra/validation/validarPath";
import path from "node:path";

describe("FsCreatePDF", () => {
  let fsCreatePDF: FsCreatePDF;

  beforeEach(async () => {
    fsCreatePDF = new FsCreatePDF(path.join(process.cwd(), "temp"));
  });

  test("Verifica se ocorre erro ao passar a localização inválida da pasta destino para o arquivo", () => {
    const validacao = () => new FsCreatePDF("teste");

    expect(validacao).toThrow(Error);
    expect(validacao).toThrow(
      expect.objectContaining({
        message: expect.stringContaining(errorsValidacao.caminhoInvalido),
      }),
    );
  });

  test("Verifica se é realizado o tratamento de erro", () => {
    const mensagemErro = "Teste Mensagem";

    const validacao = fsCreatePDF.tratarErro(mensagemErro);

    expect(validacao).toContain(mensagemErro);
  });

  test("Verifica se é realizado o tratamento de erro no caso de falha na localização de arquivos", () => {
    const mensagemErro = "Teste Mensagem";
    const codigoErro = "ENOENT";

    const validacao = fsCreatePDF.tratarErro(mensagemErro, codigoErro);

    expect(validacao).toContain(mensagemErro);
    expect(validacao).toContain(errors.falhaLocalizacaoArquivo);
  });

  test("Verifica é lançado o erro quando na conversão do arquivo para a situação onde não foi criado o erro", async () => {
    const validacao = fsCreatePDF.converterArquivoPdf();

    await expect(validacao).rejects.toThrow(CreatePdfError);
    await expect(validacao).rejects.toThrow(
      expect.objectContaining({
        message: expect.stringContaining(errors.falhaConfirmacaoCriacaoArquivo),
      }),
    );
  });

  test("Verifica se é informando quando não foi necessário excluir o arquivo", async () => {
    const validacao = await fsCreatePDF.apagarArquivo();

    expect(validacao.semArquivo).toBe(true);
  });
});
