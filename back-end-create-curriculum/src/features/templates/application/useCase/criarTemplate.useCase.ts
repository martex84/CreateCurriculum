import { Request } from "express";
import { Templates } from "@/features/templates/domain/entity/templates.entity";
import { TiposTemplates } from "@/features/templates/types/tiposTemplates";
import { validarTemplate } from "@/features/templates/domain/service/validarTemplate";
import fs from "node:fs";
import log from "@/config/log";
import { selecionarTemplateHTML } from "@/features/templates/domain/service/selecionarDadosTemplate";
import { incluirDadosTemplateHtml } from "@/features/templates/domain/service/incluirDadosTemplateHtml";

export class CriarTemplateUseCase {
  async execution(request: Request): Promise<string | undefined> {
    try {
      log("Captando dados do body");
      const body = request.body;

      if (!body) throw new Error("Falha ao localizar os dados do body");

      log("Validando dados do body");
      if (!validarTemplate(body))
        throw new Error(
          "Os dados do body não corresponde ao dados de um template!",
        );

      log("Criando variáveis com base no body");
      const template: Templates = body.template;
      const tipoTemplates: TiposTemplates = body.tipo;

      log("Captado dados HTML e CSS!");
      let dadosArquivoHtmlBase = await selecionarTemplateHTML(tipoTemplates);

      if (dadosArquivoHtmlBase.html === "" || dadosArquivoHtmlBase.css === "")
        throw new Error("Falha na captação dos dados do template!");

      const htmlAtualizado = incluirDadosTemplateHtml(
        template,
        tipoTemplates,
        dadosArquivoHtmlBase,
      );

      if (!htmlAtualizado) throw new Error("Falha na geração do HTML!");

      return htmlAtualizado;
    } catch (error) {
      console.error(`Falha na geração do template [${error}]`);
    }
  }
}
