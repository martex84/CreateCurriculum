import { mkdir, writeFile, rm, readFile } from "node:fs/promises";
import path from "node:path";

export interface DadosArquivoTemporario {
  nomePasta: string;
  caminhoTotal: string;
}

export class CreateTemporaryTemplate {
  nomePastaBase: string;
  pastaCriada: boolean = false;
  caminhoPasta: string = "";

  constructor() {
    this.nomePastaBase = Date.now().toString();
  }

  /**
   * Função responsável por realizar a criação a pasta temporária que irá conter os arquivos
   */
  async criarPasta(
    nomePasta: string,
    caminhoAlternativo?: string,
  ): Promise<DadosArquivoTemporario> {
    try {
      let caminho =
        caminhoAlternativo ||
        path.join(
          process.cwd(),
          "src",
          "tests",
          "mocks",
          "subdomains",
          "geracao_templates",
          "templates",
        );

      this.caminhoPasta = path.join(caminho, nomePasta, this.nomePastaBase);

      await mkdir(this.caminhoPasta, { recursive: true });

      this.pastaCriada = true;

      return {
        nomePasta: nomePasta,
        caminhoTotal: this.caminhoPasta,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async criarArquivo(
    nomeArquivo: string,
    nomeSubPasta: string,
  ): Promise<string> {
    if (!this.pastaCriada || !this.caminhoPasta)
      throw new Error("A pasta não foi criada!");

    try {
      await mkdir(path.join(this.caminhoPasta, nomeSubPasta), {
        recursive: true,
      });

      const arquivo = path.join(this.caminhoPasta, nomeSubPasta, nomeArquivo);

      await writeFile(arquivo, "", "utf8");

      return arquivo;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async copiarArquivo(
    nomeArquivo: string,
    nomeSubPasta: string,
    caminhoArquivo: string,
  ): Promise<string> {
    try {
      if (!this.pastaCriada || !this.caminhoPasta)
        throw new Error("A pasta não foi criada!");
      if (!caminhoArquivo)
        throw new Error("O caminho do arquivo não foi informado!");

      const informacaoArquivo = await readFile(
        path.join(caminhoArquivo, nomeSubPasta, nomeArquivo),
        "utf8",
      );

      const caminhoSubPasta = path.join(this.caminhoPasta, nomeSubPasta);

      await mkdir(caminhoSubPasta, { recursive: true });

      const arquivo = path.join(caminhoSubPasta, nomeArquivo);

      await writeFile(arquivo, informacaoArquivo, "utf8");

      return arquivo;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async apagarPasta(): Promise<boolean> {
    if (!this.pastaCriada || !this.caminhoPasta)
      throw new Error("A pasta não foi criada!");

    try {
      await rm(this.caminhoPasta, {
        recursive: true,
        force: true,
      });

      this.pastaCriada = false;

      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
