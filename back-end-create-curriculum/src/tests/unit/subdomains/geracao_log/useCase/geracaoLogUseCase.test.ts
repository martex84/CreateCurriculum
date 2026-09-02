import { GeracaoLogUseCase } from "@geracao_log/useCase/geracaoLogUseCase";
import { GestaoArquivosLog } from "@/subdomains/geracao_log/adapters/out/GestaoArquivosLog";
import { IGestacaoArquivosLog } from "@geracao_log/ports/IGestaoArquivosLog";

describe("GeracaoLogUseCase", () => {
  let geracaoLogUseCase: GeracaoLogUseCase;
  let geracaoArquivosLog: IGestacaoArquivosLog;
  let spyGestaoArquivoLog: jest.SpyInstance;

  beforeEach(() => {
    geracaoArquivosLog = new GestaoArquivosLog();

    spyGestaoArquivoLog = jest.spyOn(geracaoArquivosLog, "gerarArquivoLog");

    geracaoLogUseCase = new GeracaoLogUseCase(geracaoArquivosLog);
  });

  afterEach(() => {
    spyGestaoArquivoLog.mockRestore();
  });

  test("Verifica se é recebido o erro na geração do log", async () => {
    const mensagemErro = "Teste Erro";

    spyGestaoArquivoLog.mockImplementationOnce(async () => {
      throw new Error(mensagemErro);
    });

    const log = () => geracaoLogUseCase.execution(mensagemErro);

    await expect(log()).rejects.toThrow(mensagemErro);
  });
});
