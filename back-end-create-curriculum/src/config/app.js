import log from "./log.js";
import express from "express";
import cors from "cors";
import router from "../../routes.js";

class Aplication {
  static async main() {
    log("Initial Aplication");

    log("Iniciando o servidor!");

    const app = express();
    const porta = 3001;
    app.use(express.json({
      limit: "1mb"
    }))
    app.use(cors());
    app.use(router);

    app.listen(porta, () => {
      console.log("Iniciando servidor em: http://localhost:" + porta);

      log("Servidor Iniciado!");
    });
  }
}

export default Aplication;
