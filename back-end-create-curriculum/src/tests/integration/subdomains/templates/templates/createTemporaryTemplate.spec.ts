import { CreateTemporaryTemplate } from "@/tests/mocks/subdomains/templates/templates/createTemporaryTemplate";
import path from "node:path";
import { mkdir, rm, writeFile } from "node:fs/promises";

describe("CreateTemporaryTemplate", () => {
  let createTemporaryTemplate: CreateTemporaryTemplate;
  const nomePastaTeste = "Teste";
  const nomePastaPrincipal = "PastaPrincipal";
  const nomeArquivo = "arquivoTest.txt";
  const subPasta = "subPasta";
  let caminhoPasta: string;
  let apagarPasta = false;

  beforeAll(() => {
    caminhoPasta = path.join(
      process.cwd(),
      "src",
      "tests",
      "integration",
      "subdomains",
      "templates",
      "templates",
      nomePastaPrincipal,
    );

    mkdir(caminhoPasta, { recursive: true });

    apagarPasta = true;
  });

  afterAll(() => {
    if (apagarPasta) {
      rm(caminhoPasta, {
        recursive: true,
        force: true,
      });

      apagarPasta = false;
    }
  });

  test("Verifica a criação de pastas", async () => {
    createTemporaryTemplate = new CreateTemporaryTemplate();

    const validacao = await createTemporaryTemplate.criarPasta(
      nomePastaTeste,
      caminhoPasta,
    );

    expect(typeof validacao).toBe("object");
    expect(validacao.nomePasta).toBe(nomePastaTeste);
    expect(validacao.caminhoTotal).toContain(caminhoPasta);
  });

  test("Verifica a criação de arquivos", async () => {
    createTemporaryTemplate = new CreateTemporaryTemplate();

    await createTemporaryTemplate.criarPasta(nomePastaTeste, caminhoPasta);

    const validacao = await createTemporaryTemplate.criarArquivo(
      nomeArquivo,
      subPasta,
    );

    expect(typeof validacao).toBe("string");
    expect(validacao).toContain(nomeArquivo);
    expect(validacao).toContain(subPasta);
  });

  test("Verifica a ação de copiar arquivos", async () => {
    createTemporaryTemplate = new CreateTemporaryTemplate();

    const caminho = path.join(caminhoPasta, subPasta);

    await mkdir(caminho, { recursive: true });

    const caminhoArquivoOriginal = path.join(caminho, nomeArquivo);

    await writeFile(caminhoArquivoOriginal, "Teste", "utf8");

    await createTemporaryTemplate.criarPasta(
      nomePastaTeste,
      path.join(caminho),
    );

    const validacao = await createTemporaryTemplate.copiarArquivo(
      nomeArquivo,
      subPasta,
      caminhoPasta,
    );

    expect(typeof validacao).toBe("string");
    expect(validacao).toContain(nomeArquivo);
    expect(validacao).toContain(caminho);
  });

  test("Verifica a ação de apagar a pasta criada", async () => {
    createTemporaryTemplate = new CreateTemporaryTemplate();

    await createTemporaryTemplate.criarPasta(nomePastaTeste, caminhoPasta);

    const validacao = await createTemporaryTemplate.apagarPasta();

    expect(validacao).toBe(true);
  });
});
