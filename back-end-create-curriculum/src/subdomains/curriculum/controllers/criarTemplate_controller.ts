import { log } from "node:console";
import gerarArquivoPdf from "@/config/gerarArquivoPdf";
import { Request, Response } from "express";
import { RespostaGeracao } from "@curriculum/types/geracaoPdf";

export async function criarTemplate(req: Request, res: Response) {
  const body = req.body;

  let valorRetorno: RespostaGeracao = {
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
        messageError: "", //TODO: Ajustar a mensagme de erro
        // messageError: error,
      };
    }
  }

  res.send(valorRetorno);
}
