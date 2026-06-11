import { GenerationError } from "@/shared/errors/generation-error";
import { erros } from "@geracao_templates/adapters/captarDocumentos.error";
import { CaptarDocumentosAdapter } from "@geracao_templates/adapters/captarDocumentos.adapter";
import { TiposTemplates } from "@geracao_templates/types/tiposTemplates";
import { ITemplatesCaptarDocumentosAdapterPort } from "@geracao_templates/ports/iTemplatesCaptarDocumentosAdapterPort";
import { getTemplatePath } from "@geracao_templates/adapters/config/templatesPath";
import {
  CreateTemporaryTemplate,
  DadosArquivoTemporario,
} from "@/tests/mocks/subdomains/geracao_templates/templates/createTemporaryTemplate";
import { rm } from "node:fs/promises";

describe("CaptarDocumentosAdapter", () => {
  interface DadosTemplate {
    css: string;
    html: string;
  }

  let tipoTemplate: TiposTemplates;
  let captarDocumentosAdapter: ITemplatesCaptarDocumentosAdapterPort;
  let createTemporaryTemplate: CreateTemporaryTemplate;
  let dadosArquivoTemporario: DadosArquivoTemporario;
  let pastasCriadas: string[] = [];

  beforeAll(() => {
    tipoTemplate = "padrao";
  });

  beforeEach(async () => {
    captarDocumentosAdapter = new CaptarDocumentosAdapter(getTemplatePath());

    createTemporaryTemplate = new CreateTemporaryTemplate();

    const dadosPastaCriada =
      await createTemporaryTemplate.criarPasta(tipoTemplate);

    if (!dadosPastaCriada)
      throw new Error("Falha na criação da pasta temporária!");

    dadosArquivoTemporario = dadosPastaCriada;
  });

  afterEach(async () => {
    //Registra a pasta criada para teste
    pastasCriadas.push(dadosArquivoTemporario.caminhoTotal);
  });

  afterAll(async () => {
    //Remove todas as pastas criadas nos testes
    pastasCriadas.forEach(async (pasta) =>
      rm(pasta, { recursive: true, force: true }),
    );
  });

  describe("Verifica a lógica geral da função", () => {
    test("Verifica se ocorre erro ao apresentar valores nulos/indefinidos para o tipo de template que será utilizado", async () => {
      const selecao = captarDocumentosAdapter.captarHtmlCSS(undefined as any);

      await expect(selecao).rejects.toThrow(GenerationError);
      await expect(selecao).rejects.toThrow(
        expect.objectContaining({
          message: expect.stringContaining(erros.erroRecebimentoTipoTemplate),
        }),
      );
    });

    test("Verifica se ocorre erro ao apresentar um valor inválido ao tipo de template que será utilizado", async () => {
      const selecao = captarDocumentosAdapter.captarHtmlCSS("teste" as any);

      await expect(selecao).rejects.toThrow(GenerationError);
      await expect(selecao).rejects.toThrow(
        expect.objectContaining({
          message: expect.stringContaining(erros.erroTipoTemplateInvalido),
        }),
      );
    });

    test.each([
      {
        nomeArquivoCriado: "index.html",
        arquivoErro: "css",
      },
      {
        nomeArquivoCriado: "style.css",
        arquivoErro: "html",
      },
    ])(
      "Verifica se ocorre erro de falha de localização ao tentar localizar o arquivo referente ao [$arquivoErro] do template",
      async ({ nomeArquivoCriado, arquivoErro }) => {
        await createTemporaryTemplate.criarArquivo(
          nomeArquivoCriado,
          tipoTemplate,
        );

        captarDocumentosAdapter = new CaptarDocumentosAdapter(
          dadosArquivoTemporario.caminhoTotal,
        );

        const selecao = captarDocumentosAdapter.captarHtmlCSS(tipoTemplate);

        await expect(selecao).rejects.toThrow(GenerationError);
        await expect(selecao).rejects.toThrow(
          expect.objectContaining({
            message: expect.stringContaining(erros.erroArquivoNaoEncontrado),
          }),
        );

        await expect(selecao).rejects.toMatchObject({
          detalhes: {
            path: expect.stringContaining(arquivoErro),
          },
        });
      },
    );
  });

  describe("Verifica lógica para o tipo de template 'padrão'", () => {
    test.each([
      {
        nomeArquivoCriado: "index.html",
        nomeArquivoCopiado: "style.css",
        tipo: "html",
      },
      {
        nomeArquivoCriado: "style.css",
        nomeArquivoCopiado: "index.html",
        tipo: "css",
      },
    ])(
      "Verifica se ocorre erro de falha de arquivo inválido quando o arquivo [$tipo] está vazio",
      async ({ nomeArquivoCriado, nomeArquivoCopiado, tipo }) => {
        await createTemporaryTemplate.criarArquivo(
          nomeArquivoCriado,
          tipoTemplate,
        );

        await createTemporaryTemplate.copiarArquivo(
          nomeArquivoCopiado,
          tipoTemplate,
          getTemplatePath(),
        );

        captarDocumentosAdapter = new CaptarDocumentosAdapter(
          dadosArquivoTemporario.caminhoTotal,
        );

        const selecao = captarDocumentosAdapter.captarHtmlCSS(tipoTemplate);

        await expect(selecao).rejects.toThrow(GenerationError);
        await expect(selecao).rejects.toThrow(
          expect.objectContaining({
            message: expect.stringContaining(erros.erroArquivoInvalido),
          }),
        );
        await expect(selecao).rejects.toMatchObject({
          detalhes: {
            tipo: expect.stringContaining(tipo),
          },
        });
      },
    );
  });
});
