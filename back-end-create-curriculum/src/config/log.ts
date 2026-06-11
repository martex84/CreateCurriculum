import { Logs } from "@/shared/types/logs";
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

export class CriacaoLogs implements Logs {
  async execution(message: string | object) {
    const data = new Date();

    const nomePastaLog = "log";
    const nomeArquivo = `log_${data.getDate()}_${data.getMonth() + 1}_${data.getFullYear()}.txt`;

    const caminhoPasta = path.resolve(nomePastaLog);
    const caminhoArquivo = path.join(caminhoPasta, nomeArquivo);

    const mensagemFormatada =
      typeof message === "object" ? JSON.stringify(message) : message;

    const mensagem = `[${data.toISOString()}] -- ${mensagemFormatada} --\n`;

    console.log(mensagem);

    try {
      await mkdir(caminhoPasta, { recursive: true });

      await appendFile(caminhoArquivo, mensagem);
    } catch (error) {
      console.error("Falha ao tentar salvar o log localmente!", error);
    }
  }
}
