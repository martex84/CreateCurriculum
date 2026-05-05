import { Templates } from "@/subdomains/templates/domain/entity/templates.entity";
import { TiposTemplates } from "@/subdomains/templates/types/tiposTemplates";

export interface DadosTemplate {
  template: Partial<Templates>;
  tipo: Partial<TiposTemplates>;
}

export const mockDadosTemplate = (
  override: Partial<DadosTemplate> = {},
): DadosTemplate => {
  // 1. Valores padrão para o contato
  const defaultContato = {
    numero: "123456789",
    email: "test@example.com",
    linkdin: "linkedin.com/in/test",
  };

  // 2. Valores padrão para o template
  const defaultTemplate = {
    nome: "Test User",
    formacaoAcademica: "Computer Science",
    resumoProfissional: "Experienced developer",
    idiomas: "English, Portuguese",
    competencias: "JavaScript, TypeScript",
    historicoProfissional: "Software Engineer at Company X",
    certificacoes: "AWS Certified",
    contato: defaultContato,
  };

  // 3. Retorno garantindo que as propriedades obrigatórias existam
  return {
    tipo: override.tipo ?? "padrao",
    template: {
      ...defaultTemplate,
      ...override.template,
      contato: {
        ...defaultContato,
        ...override.template?.contato, // Aqui o spread de undefined é ignorado e os defaults permanecem
      },
    },
  };
};
