import { LogError } from "@/shared/errors/log-error";
import { IGeracaoLogUseCase } from "@/subdomains/geracao_log/ports/IGeracaoLogUseCase";
import { IGestacaoArquivosLog } from "@/subdomains/geracao_log/ports/IGestaoArquivosLog";
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

export const erros = {
  FALHA_GERAR_LOG: "Falha na geração local do log!",
};

export class GeracaoLogUseCase implements IGeracaoLogUseCase {
  constructor(private readonly geradorArquivoLog: IGestacaoArquivosLog) {}

  async execution(message: string | object) {
    try {
      await this.geradorArquivoLog.gerarArquivoLog(message);
    } catch (error: any) {
      throw new LogError(erros.FALHA_GERAR_LOG + "\n" + error.message);
    }
  }
}
