import puppeteer from "puppeteer";
import log from "./log.js";
import fs from "fs";
import path from "path";

async function gerarArquivoPdf(objetoMock) {
  let valorRetorno = {
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
    .readFileSync("src/pages/template1/index.html")
    .toString();

  log("Passando valor variáveis");
  Object.keys(objetoMock).forEach(key => {
    if(key === "contato"){
      Object.keys(objetoMock.contato).forEach(keyContato => {
        arquivoHtml = arquivoHtml.replaceAll(`{${keyContato}}`, objetoMock.contato[keyContato]);
      })
    }
    else{
      arquivoHtml = arquivoHtml.replaceAll(`{${key}}`, objetoMock[key])
    }
  })

  log("Captando CSS");

  const arquivoCSS = fs
    .readFileSync("src/pages/template1/style.css")
    .toString();

  log("Incluindo CSS no HTML");

  arquivoHtml = arquivoHtml.replaceAll(
    "<!-- {style} -->",
    `<style>${arquivoCSS}</style>`
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

  const pdfBuffer = await page.pdf({
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
