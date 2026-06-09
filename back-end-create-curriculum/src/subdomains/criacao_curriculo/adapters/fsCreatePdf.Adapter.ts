import path from "node:path";
import { mkdir, readFile, unlink, writeFile, rm } from "node:fs/promises";
import { errors } from "./fsCreatePdf.Error";
import { validarPath } from "@/shared/infra/validation/validarPath";
import { CreatePdfError } from "@/shared/errors/createPdf-error";

export interface DadosArquivo {
  localArquivo: string;
  nomeArquivo: string;
}

export interface DadosExclusao {
  arquivoExcluido: boolean;
  semArquivo: boolean;
}

interface FsCreatePDFInterface {
  /**
   *Função responsável por gerar o arquivo em branco
   @returns Irá retornar retornar o local exato do arquivo
   */
  geracaoArquivo: () => Promise<DadosArquivo>;

  /**
   *Função responsável por converter os dados do pdf em byte code
   @returns Retorna o Promise de uma string, contendo os dados do arquivo
   */
  converterArquivoPdf: () => Promise<string>;

  /**
   * Função responsável por apagar o arquivo gerado pela class
   * @returns Retorna um objeto informando sobre a ação de exclusão do arquivo
   */
  apagarArquivo: () => Promise<DadosExclusao>;
}

export class FsCreatePDF implements FsCreatePDFInterface {
  private localArquivo: string = "";
  private nomeArquivo: string = "";
  private arquivoCriado: boolean = false;

  constructor(private readonly localPasta: string) {
    if (!validarPath(localPasta)) throw new CreatePdfError("Caminho inválido!");
  }

  /**
   * Método responsável por gerar um nome para o arquivo de forma aleatória
   * @returns Retorna o nome gerado de forma aleatória
   */
  private gerarNomeArquivo(): void {
    this.nomeArquivo = "arquivoPdf_" + Date.now() + ".pdf";
  }

  /**
   * Método responsável por tratar e agrupar os erros da classe
   * @param mensagemErro Recebe a mensagem de erro que irá ser tratada
   * @param code Recebe o possível código do erro
   * @returns Retorna o compilado das mensagens tratadas
   */
  tratarErro(mensagemErro: string, code?: string): string {
    const conjuntoErros: string[] = [];

    if (code === "ENOENT") conjuntoErros.push(errors.falhaLocalizacaoArquivo);

    conjuntoErros.push(mensagemErro);

    return conjuntoErros.join("\n");
  }

  async geracaoArquivo(): Promise<DadosArquivo> {
    try {
      this.gerarNomeArquivo();

      this.localArquivo = path.join(this.localPasta, this.nomeArquivo);

      await mkdir(this.localPasta, { recursive: true });

      await writeFile(this.localArquivo, "", "utf-8");

      this.arquivoCriado = true;

      return {
        localArquivo: this.localArquivo,
        nomeArquivo: this.nomeArquivo,
      };
    } catch (error: any) {
      throw new CreatePdfError(
        errors.falhaGeracaoArquivoPdf +
          "\n" +
          this.tratarErro(error.message, error.code),
      );
    }
  }

  async converterArquivoPdf(): Promise<string> {
    if (!this.arquivoCriado)
      throw new CreatePdfError(errors.falhaConfirmacaoCriacaoArquivo);

    try {
      const arquivoConvertidoByteCode = await readFile(this.localArquivo, {
        encoding: "base64",
      });

      await unlink(this.localArquivo);

      return arquivoConvertidoByteCode;
    } catch (error: any) {
      throw new CreatePdfError(
        errors.falhaConversaoArquivo + "\n" + this.tratarErro(error.message),
      );
    }
  }

  async apagarArquivo(): Promise<DadosExclusao> {
    const dadosExclusao: DadosExclusao = {
      arquivoExcluido: false,
      semArquivo: false,
    };

    if (this.arquivoCriado) {
      try {
        await rm(this.localArquivo, { force: true });

        dadosExclusao.arquivoExcluido = true;
      } catch (error: any) {
        throw new CreatePdfError(
          errors.falhaExclusãoArquivo + "\n" + this.tratarErro(error.message),
        );
      }
    } else dadosExclusao.semArquivo = true;

    return dadosExclusao;
  }
}
