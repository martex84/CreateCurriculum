import { nomePastaLog } from "@/subdomains/geracao_log/domain/constants/nomePastaLog";
import { IGestacaoArquivosLog } from "@/subdomains/geracao_log/ports/IGestaoArquivosLog";
import { appendFile, mkdir } from "node:fs/promises";
import { LocalLog } from "@geracao_log/types/localLog";
import path from "node:path";
import { importarInformacoesEnv } from "@/shared/infra/config/importarInformacoesEnv";

export const errors = {
  FALHA_LOCALIZAR_LOG: "Falha na captação do local do log!",
};

export class GestaoArquivosLog implements IGestacaoArquivosLog {
  date = new Date();
  localLog: string = "";
  nomeArquivo: string = "";

  public getLocalLog(): LocalLog | undefined {
    try {
      if (!this.localLog.trim()) throw new Error("O local não foi preenchido!");

      return {
        local: this.localLog,
        nomeArquivo: this.nomeArquivo,
      };
    } catch (error) {
      const erro = error as Error;

      throw new Error(errors.FALHA_LOCALIZAR_LOG + "\n" + erro.message);
    }
  }

  /*
   * Responsável por gerar o nome do log
   * @returns Retorna o nome do log formatado
   */
  public gerarNomeLog(): string {
    const { NODE_ENV } = importarInformacoesEnv();

    try {
      const informacoes = {
        dia:
          this.date.getDate() < 10
            ? `0${this.date.getDate()}`
            : this.date.getDate(),
        mes: this.date.getMonth() + 1,
        ano: this.date.getFullYear(),
        ambiente: NODE_ENV,
      };

      this.nomeArquivo = `log_${informacoes.dia}_${informacoes.mes}_${informacoes.ano}_${informacoes.ambiente}.txt`;

      console.log(this.nomeArquivo);

      return this.nomeArquivo;
    } catch (error) {
      const erro = error as Error;

      throw new Error("Falha na geração do nome do log" + "\n" + erro.message);
    }
  }

  /**
   * Responsável por formatar a mensagem do log para o modelo final
   * @param mensagemOriginal Recebe a mensagem original
   */
  public formatarMensagem(mensagemOriginal: string | object): string {
    const mensagemFormatada =
      typeof mensagemOriginal === "object"
        ? JSON.stringify(mensagemOriginal)
        : mensagemOriginal;

    return `[${this.date.toISOString()}] -- ${mensagemFormatada}\n`;
  }

  /**
   * Responsável por gerar o log de forma física e por console
   * @param mensagem Recebe a mensagem ou arquivo json que irá utilizado no log
   */
  public async gerarArquivoLog(mensagem: string | object): Promise<void> {
    //Gerando caminho do log
    const caminhoPasta = path.resolve(nomePastaLog);

    this.localLog = caminhoPasta;

    const localArquivo = path.join(caminhoPasta, this.gerarNomeLog());

    const mensagemFinal = this.formatarMensagem(mensagem);

    console.log(mensagemFinal);

    try {
      await mkdir(caminhoPasta, { recursive: true });

      await appendFile(localArquivo, mensagemFinal);
    } catch (error: any) {
      console.error(error);

      throw new Error(error);
    }
  }
}
