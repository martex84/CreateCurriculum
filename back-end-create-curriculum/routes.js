import { Router } from "express";
import gerarArquivoPdf from "./src/config/gerarArquivoPdf.js";
import log from "./src/config/log.js";

const router = Router();

router.post("/criarTemplate", async (req, res) => {
  const body = req.body;

  let valorRetorno = {
    error: {
      isError: false,
      messageError: "",
    },
    arquivo: "",
  };

  if (body) {
    try {
      await gerarArquivoPdf(body).then((valor) => {
        valorRetorno = valor;
      });
    } catch (error) {
      log(error);

      valorRetorno.error = {
        isError: true,
        messageError: error,
      };
    }
  }

  res.send(valorRetorno);
});

export default router;
