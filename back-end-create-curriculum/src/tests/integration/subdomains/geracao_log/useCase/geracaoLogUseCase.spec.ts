import { GestaoArquivosLog } from "@geracao_log/adapters/GestaoArquivosLog";
import { IGestacaoArquivosLog } from "@geracao_log/ports/IGestaoArquivosLog";
import { IGeracaoLogUseCase } from "@geracao_log/ports/IGeracaoLogUseCase";
import { GeracaoLogUseCase } from "@geracao_log/useCase/geracaoLogUseCase";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";

describe("GeracaoLogUseCase", () => {
  let geracaoLogUseCase: IGeracaoLogUseCase;
  let gestaoArquivosLog: IGestacaoArquivosLog;

  beforeAll(() => {
    gestaoArquivosLog = new GestaoArquivosLog();

    geracaoLogUseCase = new GeracaoLogUseCase(gestaoArquivosLog);
  });

  afterEach(async () => {
    const localArquivo = gestaoArquivosLog?.getLocalLog();
    if (localArquivo)
      await rm(path.resolve(localArquivo.local, localArquivo.nomeArquivo), {
        force: true,
      });
  });

  test("Verifica se é gerado um novo arquivo de log", async () => {
    const mensagemErro = "Erro Teste";

    await geracaoLogUseCase.execution(mensagemErro);

    const localArquivo = gestaoArquivosLog?.getLocalLog();

    if (localArquivo === undefined)
      throw new Error("Falha ao tentar localizar o arquivo!");

    const conteudo = await readFile(
      path.join(localArquivo.local, localArquivo.nomeArquivo),
      "utf8",
    );

    expect(typeof conteudo).toBe("string");
    expect(conteudo.length).toBeGreaterThan(0);
    expect(conteudo).toContain(mensagemErro);
  });
});
