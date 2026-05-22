import { DadosTemplate } from "@/subdomains/geracao_templates/types/dadosTemplate";
import { TiposTemplates } from "@/subdomains/geracao_templates/types/tiposTemplates";

export interface ITemplatesCaptarDocumentosAdapterPort {
  captarHtmlCSS(tipoTemplate: TiposTemplates): Promise<DadosTemplate>;
}
