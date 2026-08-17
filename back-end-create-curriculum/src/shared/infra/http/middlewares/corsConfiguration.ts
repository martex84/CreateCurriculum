import { CorsError } from "@/shared/errors/cors-error";
import { InformacoesEnv } from "@/shared/infra/config/importarInformacoesEnv";
import cors, { CorsOptions } from "cors";
import { RequestHandler } from "express";
import { methods } from "@shared/infra/config/app";

export const error = {
  ORIGIN_BLOCKED: "CORS Policy: Origin blocked.",
};

export const corsMiddleware = (
  informacoesEnv: InformacoesEnv,
): RequestHandler => {
  let { PERMITION_SITES: permitionSites } = informacoesEnv;

  const arraySites: string[] =
    permitionSites?.split(",").map((site) => site.trim()) || [];

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      console.log(origin);

      if (!origin || arraySites.includes(origin)) {
        callback(null, true);
      } else {
        callback(new CorsError(error.ORIGIN_BLOCKED));
      }
    },
    methods: methods,
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };

  return cors(corsOptions);
};
