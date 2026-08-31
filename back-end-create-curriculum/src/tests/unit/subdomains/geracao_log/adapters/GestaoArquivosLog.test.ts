import {
  GestaoArquivosLog,
  errors,
} from "@geracao_log/adapters/GestaoArquivosLog";
import { IGestacaoArquivosLog } from "@geracao_log/ports/IGestaoArquivosLog";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";
import { importarInformacoesEnv } from "@shared/infra/config/importarInformacoesEnv";

interface Mensagem {
  valor: string | object;
  legenda: "String" | "Object";
}

describe("GestaoARquivosLog", () => {
  let gestaoArquivoLog: IGestacaoArquivosLog;
  let spyGestaoArquivoLog: jest.SpyInstance | undefined;

  beforeEach(() => {
    gestaoArquivoLog = new GestaoArquivosLog();

    spyGestaoArquivoLog = undefined;
  });

  afterEach(async () => {
    jest.restoreAllMocks();

    if (gestaoArquivoLog) {
      try {
        const localArquivo = gestaoArquivoLog.getLocalLog();

        if (localArquivo) {
          await rm(path.join(localArquivo.local, localArquivo.nomeArquivo), {
            force: true,
          });

          console.log("Log removido");
        }
      } catch (error) {
        console.log("Log não foi criado, por isso não foi necessário remover");
      }
    }
  });

  test.each([
    { valor: "Teste Mensagem", legenda: "String" },
    {
      valor: {
        mensagem: "Teste Mensage",
        erro: "Erro 000",
      },
      legenda: "Object",
    },
  ] as Mensagem[])(
    "Valida a criação padrão dos arquivos, tendo como parâmetro o tipo [$legenda]",
    async (mensagem: Mensagem) => {
      await gestaoArquivoLog.gerarArquivoLog(mensagem.valor);

      const localizacaoArquivo = gestaoArquivoLog.getLocalLog();

      if (!localizacaoArquivo)
        throw new Error("Falha ao opter o local do arquivo");

      expect(
        (
          await readFile(
            path.join(localizacaoArquivo.local, localizacaoArquivo.nomeArquivo),
          )
        ).toString(),
      ).toContain(
        typeof mensagem.valor === "string"
          ? mensagem.valor
          : JSON.stringify(mensagem.valor),
      );
    },
  );

  test("Verifica se o arquivo de log é reutilizado", async () => {
    const mensagens: string[] = ["Mensagem 1", "Mensagem 2"];

    await gestaoArquivoLog.gerarArquivoLog(mensagens[0]);

    await gestaoArquivoLog.gerarArquivoLog(mensagens[1]);

    const localizacaoArquivo = gestaoArquivoLog.getLocalLog();

    if (!localizacaoArquivo)
      throw new Error("Falha ao opter o local do arquivo");

    const caminho = path.join(
      localizacaoArquivo.local,
      localizacaoArquivo.nomeArquivo,
    );

    expect((await readFile(caminho)).toString()).toContain(mensagens[0]);
    expect((await readFile(caminho)).toString()).toContain(mensagens[1]);
  });

  test("Verifica se ocorre erro na captação do local do arquivo, caso o arquivo não tenha sido criado", () => {
    spyGestaoArquivoLog = jest.spyOn(gestaoArquivoLog, "gerarArquivoLog");

    const validacao = () => gestaoArquivoLog.getLocalLog();

    // expect(spyGestaoArquivoLog).not.toHaveBeenCalled();
    expect(validacao).toThrow();
    // expect(validacao).toThrow(
    //   expect.objectContaining({
    //     message: expect.stringContaining(errors.FALHA_LOCALIZAR_LOG),
    //   }),
    // );
  });

  test("Verifica se é feito a criação correta dos nomes do log", () => {
    const validacao = gestaoArquivoLog.gerarNomeLog();

    const data = new Date();

    const env = importarInformacoesEnv();

    expect(typeof validacao).toBe("string");
    expect(validacao).toContain(data.getDate().toString());
    expect(validacao).toContain((data.getMonth() + 1).toString());
    expect(validacao).toContain(data.getFullYear().toString());
    expect(validacao).toContain(env.NODE_ENV);
  });

  test.each([
    {
      legenda: "Object",
      valor: {
        mensagem: "Mensagem Objeto",
      },
    },
    {
      legenda: "String",
      valor: "Mensagem String",
    },
  ] as Mensagem[])(
    "Verifica se ocorre a formatação da mensagem para o tipo [$legenda]",
    (mensagem: Mensagem) => {
      const verificacao = gestaoArquivoLog
        .formatarMensagem(mensagem.valor)
        .split("--");

      if (!(Array.isArray(verificacao) && verificacao.length === 2))
        throw new Error("Falha ao tentar captar a mensagem!");

      const verifiacaoTratada = {
        data: verificacao[0]
          .replaceAll("[", "")
          .replaceAll("]", "")
          .trimEnd()
          .trimStart(),
        mensagem: verificacao[1].trimEnd().trimStart(),
      };

      expect(new Date(verifiacaoTratada.data).getDate()).toBeGreaterThan(0);

      if (mensagem.legenda === "String") {
        expect(verifiacaoTratada.mensagem).toBe(mensagem.valor);
      } else if (mensagem.legenda === "Object") {
        expect(verifiacaoTratada.mensagem).toBe(JSON.stringify(mensagem.valor));
      }
    },
  );
});
