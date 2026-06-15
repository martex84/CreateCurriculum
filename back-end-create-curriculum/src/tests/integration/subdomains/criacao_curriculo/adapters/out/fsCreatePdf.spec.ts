import { FsCreatePDF } from "@criacao_curriculo/adapters/out/fsCreatePdf.Adapter";
import path from "node:path";
import { writeFile } from "node:fs/promises";

describe("FsCreatePDF", () => {
  let fsCreatePDF: FsCreatePDF;
  const localArquivo = path.join(process.cwd(), "temp");

  beforeAll(() => {
    fsCreatePDF = new FsCreatePDF(localArquivo);
  });

  test("Verifica se ocorre a criação e conversão do arquivo pdf", async () => {
    const html = `
            <html>
                <body>
                    <h1>Olá Mundo!</h1>
                </body>
            `;

    const criacaoArquivo = await fsCreatePDF.geracaoArquivo();

    await writeFile(criacaoArquivo.localArquivo, html);

    const conversaoArquivo = await fsCreatePDF.converterArquivoPdf();

    const apagarArquivo = await fsCreatePDF.apagarArquivo();

    expect(typeof criacaoArquivo).toBe("object");
    expect(typeof criacaoArquivo.localArquivo).toBe("string");
    expect(typeof criacaoArquivo.nomeArquivo).toBe("string");
    expect(typeof conversaoArquivo).toBe("string");

    expect(criacaoArquivo.localArquivo.length).toBeGreaterThan(0);
    expect(criacaoArquivo.nomeArquivo.length).toBeGreaterThan(0);
    expect(conversaoArquivo.length).toBeGreaterThan(0);
    expect(apagarArquivo.arquivoExcluido).toBe(true);
  });
});
