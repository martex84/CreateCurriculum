import { validarTemplateService } from "@templates/domain/services/validarTemplate.service";
import { Templates } from "@templates/domain/entity/templates.entity";
import { TiposTemplates } from "@/subdomains/templates/types/tiposTemplates";

interface InterfaceDados {
  template: Templates;
  tipo: TiposTemplates;
}

describe("ValidarTemplate", () => {
  let objetoMock: () => InterfaceDados;

  beforeEach(() => {
    objetoMock = () => {
      return {
        template: {
          contato: {
            numero: "123456789",
            email: "test@example.com",
            linkdin: "linkedin.com/in/test",
          },
          nome: "Test User",
          formacaoAcademica: "Computer Science",
          resumoProfissional: "Experienced developer",
          idiomas: "English, Portuguese",
          competencias: "JavaScript, TypeScript",
          historicoProfissional: "Software Engineer at Company X",
          certificacoes: "AWS Certified",
        },
        tipo: "padrao",
      };
    };
  });

  test("Deve validar os dados recebidos, sinalizando sua veracidade", () => {
    const dados = objetoMock();

    const validarTemplate = validarTemplateService(dados);

    expect(validarTemplate).toBe(true);
  });
});
