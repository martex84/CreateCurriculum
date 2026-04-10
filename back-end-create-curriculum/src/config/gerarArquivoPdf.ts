import puppeteer from "puppeteer";
import log from "./log";
import fs from "node:fs";
import path from "node:path";
import { RespostaGeracao, TemplatePadrao } from "@curriculum/types/geracaoPdf";

async function gerarArquivoPdf(objetoMock: TemplatePadrao) {
  let valorRetorno: RespostaGeracao = {
    error: {
      isError: false,
      messageError: "",
    },
    arquivo: "",
  };

  let data = new Date();

  data.setDate(data.getDate() + 1);

  let pathArquivo = "./temp/Pdf" + data.getTime() + ".pdf";

  log("Captado HTML!");
  let arquivoHtml = fs
    .readFileSync("src/subdomains/templates/padrao/index.html")
    .toString();

  log("Passando valor variáveis");
  (Object.keys(objetoMock) as (keyof TemplatePadrao)[]).forEach((key) => {
    if (key === "contato") {
      Object.entries(objetoMock.contato).forEach((key, valor) => {
        arquivoHtml = arquivoHtml.replaceAll(`{${key}}`, valor.toString());
      });
    } else {
      arquivoHtml = arquivoHtml.replaceAll(`{${key}}`, objetoMock[key]);
    }
  });

  log("Captando CSS");

  const arquivoCSS = fs
    .readFileSync("src/subdomains/templates/padrao/style.css")
    .toString();

  log("Incluindo CSS no HTML");

  arquivoHtml = arquivoHtml.replaceAll(
    "<!-- {style} -->",
    `<style>${arquivoCSS}</style>`,
  );

  log("Gerando pagina");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(arquivoHtml, { waitUntil: "domcontentloaded" });
  await page.waitForNetworkIdle();

  log("Gerando PDF");

  const pastaArquivo = path.dirname(pathArquivo);

  if (!fs.existsSync(pastaArquivo)) {
    log("Pasta temporária não encontrada, iniciando a criação da mesma!");

    fs.mkdirSync(pastaArquivo);
  }

  log(`Local do arquivo: [${pathArquivo}]`);

  log("Gerando arquivo PDF");

  await page.pdf({
    format: "A4",
    path: pathArquivo,
    printBackground: true,
  });

  log("Arquivo gerado com sucesso!");

  const arquivoConvertidoByteCode = fs.readFileSync(pathArquivo, {
    encoding: "base64",
  });

  fs.unlinkSync(pathArquivo);

  await browser
    .close()
    .then(() => {
      valorRetorno.arquivo = pathArquivo;

      valorRetorno.arquivo = arquivoConvertidoByteCode;

      log("Dados de retorno:" + JSON.stringify(valorRetorno));
    })
    .catch((error) => {
      valorRetorno.error = {
        isError: true,
        messageError: error,
      };
    });

  return valorRetorno;
}

export default gerarArquivoPdf;
