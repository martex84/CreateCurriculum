import Server from "./main/server";
import { makeGeracaoLogUseCase } from "@geracao_log/";

console.log("\n \n \n \n \n \n");

Server.main(makeGeracaoLogUseCase());
