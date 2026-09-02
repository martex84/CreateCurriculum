import { config } from "dotenv";
import path from "node:path";
import { validarItem } from "@/shared/infra/validation/validarItemEnv";
import { ValidationEnvError } from "@/shared/errors/validationEnv-error";

export interface InformacoesEnv {
  PERMITION_SITES: string;
  NODE_ENV: string;
}

export const erros = {
  ERRO_CONFIGURACAO: "Falha na configuração do env!",
};

let informacoesEnv: InformacoesEnv | undefined;

export const importarInformacoesEnv = (): InformacoesEnv => {
  configurarDotenv();

  const { PERMITION_SITES, NODE_ENV } = process.env;

  if (informacoesEnv) return informacoesEnv;

  informacoesEnv = Object.freeze({
    PERMITION_SITES: validarItem({
      item: PERMITION_SITES,
      tipoDesejado: "string",
      mensagemErro: "Não foi possível localizar o item PERMITION_SITES!",
    }),
    NODE_ENV: validarItem({
      item: NODE_ENV,
      tipoDesejado: "string",
      mensagemErro: "Não foi possível localizar o item PERMITION_SITES!",
    }),
  });

  return informacoesEnv;
};

/**
 * Função responsável pela configuração do Dotenv
 */
export const configurarDotenv = () => {
  try {
    config({
      path: path.join(process.cwd(), "informacoes.env"),
    });
  } catch (error: any) {
    throw new ValidationEnvError(
      erros.ERRO_CONFIGURACAO + "\n\n" + error.message,
    );
  }
};
