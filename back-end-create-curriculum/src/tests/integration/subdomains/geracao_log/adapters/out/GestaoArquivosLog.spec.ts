import { GestaoArquivosLog } from "@/subdomains/geracao_log/adapters/out/GestaoArquivosLog";
import { IGestacaoArquivosLog } from "@geracao_log/ports/IGestaoArquivosLog";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";

describe("GestaoArquivosLog", () => {
  let gestaoArquivoLog: IGestacaoArquivosLog;

  beforeEach(() => {
    gestaoArquivoLog = new GestaoArquivosLog();
  });

  afterAll(async () => {
    if (gestaoArquivoLog) {
      const localArquivo = gestaoArquivoLog.getLocalLog();

      if (localArquivo) {
        await rm(path.join(localArquivo.local, localArquivo.nomeArquivo), {
          force: true,
        });

        console.log("Log removido");
      } else
        console.log("Log não foi criado, por isso não foi necessário remover");
    }
  });

  test("Valida se ocorre a criação do log e a execução do throw", async () => {
    const mensagemErro = "Teste mensagem!";

    await gestaoArquivoLog.gerarArquivoLog(mensagemErro);

    const localArquivo = gestaoArquivoLog.getLocalLog();

    if (!localArquivo)
      throw new Error("Falha na localização do local do arquivo");

    expect(typeof localArquivo).toBe("object");
    expect(
      (
        await readFile(path.join(localArquivo.local, localArquivo.nomeArquivo))
      ).toString(),
    ).toContain(mensagemErro);
  });
});
