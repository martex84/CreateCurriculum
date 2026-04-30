import { Templates } from "@/subdomains/templates/domain/entity/templates.entity";
import { TiposTemplates } from "@/subdomains/templates/types/tiposTemplates";

export interface DadosTemplate {
  template: Partial<Templates>;
  tipo: Partial<TiposTemplates>;
}

export const mockDadosTemplate = (
  override: Partial<DadosTemplate> = {},
): DadosTemplate => {
  return {
    template: {
      contato: {
        numero: "123456789",
        email: "test@example.com",
        linkdin: "linkedin.com/in/test",
        ...override.template?.contato,
      },
      nome: "Test User",
      formacaoAcademica: "Computer Science",
      resumoProfissional: "Experienced developer",
      idiomas: "English, Portuguese",
      competencias: "JavaScript, TypeScript",
      historicoProfissional: "Software Engineer at Company X",
      certificacoes: "AWS Certified",
      ...override.template,
    },
    tipo: "padrao",
    ...override,
  };
};
