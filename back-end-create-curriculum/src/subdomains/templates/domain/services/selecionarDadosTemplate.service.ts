import fs from "node:fs";
import { TiposTemplates } from "@/subdomains/templates/types/tiposTemplates";
import { DadosTemplate } from "@templates/types/dadosTemplate";
import { ITemplatesRepositoryPort } from "@/subdomains/templates/ports/iTemplatesRepositoryPort";

export const selecionarTemplateHTMLService: ITemplatesRepositoryPort["selecionarTemplateHTMLService"] =
  async (tipoTemplate: TiposTemplates): Promise<DadosTemplate> => {
    try {
      if (!tipoTemplate) throw new Error("Falha ao receber o template");

      let dadosTemplate: DadosTemplate = {
        html: "",
        css: "",
      };

      if (tipoTemplate === "padrao") {
        dadosTemplate.html = fs
          .readFileSync("src/subdomains/templates/padrao/index.html")
          .toString();

        dadosTemplate.css = fs
          .readFileSync("src/subdomains/templates/padrao/style.css")
          .toString();
      } else throw new Error("Falha ao tentar localizar o tipo de template");

      if (dadosTemplate.html === "" || dadosTemplate.css === "")
        throw new Error("Falha ao tentar preencher os dados do template!");

      return dadosTemplate;
    } catch (error) {
      throw new Error(`Falha ao selecionar o template [${error}]`);
    }
  };
