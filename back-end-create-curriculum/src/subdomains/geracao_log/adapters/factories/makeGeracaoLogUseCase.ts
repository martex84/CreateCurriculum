import { GestaoArquivosLog } from "@/subdomains/geracao_log/adapters/out/GestaoArquivosLog";
import { GeracaoLogUseCase } from "@/subdomains/geracao_log/useCase/geracaoLogUseCase";

export function makeGeracaoLogUseCase(): GeracaoLogUseCase {
  const gestaoArquivosLog = new GestaoArquivosLog();

  return new GeracaoLogUseCase(gestaoArquivosLog);
}
