import { Templates } from "@/subdomains/templates/domain/entity/templates.entity";
import { CriarTemplateUseCase } from "./criarTemplate.useCase";
import { TiposTemplates } from "@/subdomains/templates/types/tiposTemplates";
import { errors } from "@templates/domain/services/services.errors";
import { ValidationError } from "@/shared/errors/validation-error";
import { validarTemplateService } from "@templates/domain/services/validarTemplate.service";
import { incluirDadosTemplateHtmlService } from "@templates/domain/services/incluirDadosTemplateHtml.service";
import { selecionarTemplateHTMLService } from "@/subdomains/templates/domain/services/selecionarTemplateHtml.service";
import { ITemplatesRepositoryPort } from "@/subdomains/templates/ports/iTemplatesRepositoryPort";
import { DadosTemplate } from "@/subdomains/templates/types/dadosTemplate";
import { GenerationError } from "@/shared/errors/generation-error";

describe("criarTemplate", () => {
  let iTemplatesRepositoryPort: ITemplatesRepositoryPort = {
    validarTemplateService,
    incluirDadosTemplateHtmlService,
    selecionarTemplateHTMLService,
  };

  //Mock para realizar a criação do template
  const mockDadosTemplate = () => {
    const template: Partial<Templates> = {
      contato: {
        numero: "",
        email: "",
        linkdin: "",
      },
      nome: "",
      formacaoAcademica: "",
      resumoProfissional: "",
      idiomas: "",
      competencias: "",
      historicoProfissional: "",
      certificacoes: "",
    };
    const tipo: Partial<TiposTemplates> = "padrao";

    return { template, tipo };
  };

  test("Verificação se ocorre a crição de um template", async () => {
    const criarTemplateUseCase = new CriarTemplateUseCase(
      iTemplatesRepositoryPort,
    );

    const execucao = await criarTemplateUseCase.execute(mockDadosTemplate());

    expect(execucao).not.toBeUndefined();
    expect(typeof execucao).toBe("string");
  });

  test("Verifica se ao passar um template inválido se ocorre uma exceção de validação de dados", async () => {
    let dados = mockDadosTemplate();
    const criarTemplateUseCase = new CriarTemplateUseCase(
      iTemplatesRepositoryPort,
    );

    //Remove um campo do template
    delete dados.template.certificacoes;

    const erro = await criarTemplateUseCase
      .execute(dados)
      .catch((error_) => error_);

    expect(erro).toBeInstanceOf(ValidationError);
    expect(erro.message).toContain(errors.VALIDACAO_DADOS);
  });

  test("Verifica se ocorre o retorno de um erro ao gerar um arquivo html ou css inválidos", async () => {
    let dados = mockDadosTemplate();
    let mockFuncoes = { ...iTemplatesRepositoryPort };

    mockFuncoes.selecionarTemplateHTMLService = () => {
      throw new GenerationError(`${errors.GERACAO_HTML} [Erro Teste]`);
    };

    const criarTemplateUseCase = new CriarTemplateUseCase(mockFuncoes);

    const erro = await criarTemplateUseCase
      .execute(dados)
      .catch((error_) => error_);

    expect(erro).toBeInstanceOf(GenerationError);
    expect(erro.message).toContain(errors.GERACAO_HTML);
  });

  test("Verifica se ocorre o retorno de um erro ao preencher o html com valores inválidos", async () => {
    let dados = mockDadosTemplate();
    let mockFuncoes = { ...iTemplatesRepositoryPort };

    mockFuncoes.incluirDadosTemplateHtmlService = () => {
      throw new GenerationError(`${errors.PREENCHIMENTO_HTML} [Erro Teste]`);
    };

    const criarTemplateUseCase = new CriarTemplateUseCase(mockFuncoes);

    const erro = await criarTemplateUseCase
      .execute(dados)
      .catch((error_) => error_);

    expect(erro).toBeInstanceOf(GenerationError);
    expect(erro.message).toContain(errors.PREENCHIMENTO_HTML);
  });
});
