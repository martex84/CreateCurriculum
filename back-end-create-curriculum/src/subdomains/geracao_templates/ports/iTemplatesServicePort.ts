import { TiposTemplates } from "@templates/types/tiposTemplates";
import { Templates } from "@/subdomains/geracao_templates/domain/entity/templates.entity";
import { DadosTemplate } from "@/subdomains/geracao_templates/types/dadosTemplate";

export interface ITemplatesServicePort {
  /**
   * Contrato para validação de estrutura de dados de template.
   * Verifica se o objeto recebido possui todos os campos obrigatórios e tipos corretos.
   * * @param dados - Os dados brutos que serão submetidos à validação.
   * @returns `true` se os dados estiverem em conformidade com o tipo Template, `false` caso contrário.
   */
  validarTemplateService(dados: any): dados is {
    template: Templates;
    tipo: TiposTemplates;
  };

  /**
   *
   * @param dadosUsuario Recebe os dados do usário vindo do template
   * @param tipoTemplate Recebe o tipo de template que irá ser aplicado
   * @param dadosTemplate Recebe os dados do template
   * @returns Retorna a string com o HTML formatado
   */
  incluirDadosTemplateHtmlService(
    dadosUsuario: Templates,
    tipoTemplate: TiposTemplates,
    dadosTemplate: DadosTemplate,
  ): string;
}
