import express from "express";
import router from "../routes/routes";
import helmet from "helmet";
import { importarInformacoesEnv } from "@/shared/infra/config/importarInformacoesEnv";
import { expressJson, port } from "@shared/infra/config/app";
import { corsMiddleware } from "@/shared/infra/http/middlewares/corsConfiguration";
import { Logs } from "@/shared/types/logs";

class Server {
  static async main(log: Logs) {
    const executionLog = log.execution;

    executionLog("Initial Application");

    executionLog("Verificação variáveis de ambiente!");

    const informacoesEnv = importarInformacoesEnv();

    executionLog("Iniciando o servidor!");

    const app = express();
    const porta = port;

    app.use(helmet());

    app.use(
      express.json({
        limit: expressJson.limit,
      }),
    );
    app.use(corsMiddleware(informacoesEnv));
    app.use(router);

    app.listen(porta, () => {
      console.log("Iniciando servidor em: http://localhost:" + porta);

      executionLog("Servidor Iniciado!");
    });
  }
}

export default Server;
