import { LocalLog } from "@geracao_log/types/localLog";

export interface IGestacaoArquivosLog {
  gerarArquivoLog: (mensagem: string | object) => Promise<void>;
  getLocalLog: () => LocalLog | undefined;
  gerarNomeLog: () => string;
  formatarMensagem: (mensagemOriginal: string | object) => string;
}
