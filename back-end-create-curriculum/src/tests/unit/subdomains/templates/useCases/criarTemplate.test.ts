import { CriarTemplateUseCase } from "@/subdomains/templates/useCases/criarTemplate.useCase";
import { errors } from "@templates/domain/services/services.errors";
import { ValidationError } from "@/shared/errors/validation-error";
import { validarTemplateService } from "@templates/domain/services/validarTemplate.service";
import * as validarTemplateServiceFunction from "@templates/domain/services/validarTemplate.service";
import { incluirDadosTemplateHtmlService } from "@templates/domain/services/incluirDadosTemplateHtml.service";
import { selecionarTemplateHTMLService } from "@/subdomains/templates/domain/services/selecionarTemplateHtml.service";
import { ITemplatesRepositoryPort } from "@/subdomains/templates/ports/iTemplatesRepositoryPort";
import { GenerationError } from "@/shared/errors/generation-error";
import { mensagemError } from "@/subdomains/templates/useCases/criarTemplate.error";
import { mockDadosTemplate } from "@/tests/mocks/subdomains/templates/domain/entity/template.mock";

describe("CriarTemplateUseCase", () => {
  let iTemplatesRepositoryPort: ITemplatesRepositoryPort;
  let criarTemplateUseCase: CriarTemplateUseCase;

  beforeEach(() => {
    //Criação do mock das funções utilizada pelo Use Case
    iTemplatesRepositoryPort = {
      validarTemplateService: jest.fn(
        validarTemplateService,
      ) as unknown as typeof validarTemplateService,
      incluirDadosTemplateHtmlService: jest.fn(incluirDadosTemplateHtmlService),
      selecionarTemplateHTMLService: jest.fn(selecionarTemplateHTMLService),
    };

    //Instância do Use Case
    criarTemplateUseCase = new CriarTemplateUseCase(iTemplatesRepositoryPort);
  });

  // -------------------

  test("Verifica se ao passar um template inválido irá ocorrer uma exceção de validação de dados", async () => {
    let dados = mockDadosTemplate({ template: { nome: undefined } });

    //Cria utiliza o spy na função original
    const validarTemplateServiceSpy = jest.spyOn(
      validarTemplateServiceFunction,
      "validarTemplateService",
    );

    //Atribui um retorno para variável [validarTemplateService]
    validarTemplateServiceSpy.mockImplementation(() => {
      throw new ValidationError(errors.VALIDACAO_DADOS);
    });

    const useCase = criarTemplateUseCase.execute(dados);

    await expect(useCase).rejects.toThrow(ValidationError);
    await expect(useCase).rejects.toThrow(
      expect.objectContaining({
        message: expect.stringContaining(errors.VALIDACAO_DADOS),
      }),
    );
    expect(
      iTemplatesRepositoryPort.validarTemplateService,
    ).toHaveBeenCalledWith(dados);
    expect(
      iTemplatesRepositoryPort.incluirDadosTemplateHtmlService,
    ).not.toHaveBeenCalled();
    expect(
      iTemplatesRepositoryPort.selecionarTemplateHTMLService,
    ).not.toHaveBeenCalled();

    //Reseta o mock feito pelo spyOn
    jest.resetAllMocks();
  });

  // -------------------

  test("Verifica se ocorre o retorno de um erro ao gerar um arquivo html ou css inválidos", async () => {
    let dados = mockDadosTemplate();

    (
      iTemplatesRepositoryPort.selecionarTemplateHTMLService as jest.Mock
    ).mockRejectedValue(new GenerationError(errors.GERACAO_HTML));

    const useCase = criarTemplateUseCase.execute(dados);

    await expect(useCase).rejects.toThrow(GenerationError);
    await expect(useCase).rejects.toThrow(
      expect.objectContaining({
        message: expect.stringContaining(errors.GERACAO_HTML),
      }),
    );
    expect(
      iTemplatesRepositoryPort.validarTemplateService,
    ).toHaveBeenCalledWith(dados);
    expect(
      iTemplatesRepositoryPort.incluirDadosTemplateHtmlService,
    ).not.toHaveBeenCalled();
  });

  // -------------------

  test("Verifica se ocorre o retorno de um erro ao preencher o html com valores inválidos", async () => {
    let dados = mockDadosTemplate();

    (
      iTemplatesRepositoryPort.incluirDadosTemplateHtmlService as jest.Mock
    ).mockRejectedValue(new GenerationError(errors.PREENCHIMENTO_HTML));

    const useCase = criarTemplateUseCase.execute(dados);

    await expect(useCase).rejects.toThrow(GenerationError);
    await expect(useCase).rejects.toThrow(
      expect.objectContaining({
        message: expect.stringContaining(errors.PREENCHIMENTO_HTML),
      }),
    );
    expect(
      iTemplatesRepositoryPort.validarTemplateService,
    ).toHaveBeenCalledWith(dados);
    expect(
      iTemplatesRepositoryPort.selecionarTemplateHTMLService,
    ).toHaveBeenCalled();
  });

  // -------------------

  test("Verifica se ao gerar um erro genério o mesmo é captado pelo useCase", async () => {
    let dados = mockDadosTemplate();

    //Cria utiliza o spy na função original
    const validarTemplateServiceSpy = jest.spyOn(
      validarTemplateServiceFunction,
      "validarTemplateService",
    );

    validarTemplateServiceSpy.mockImplementation(() => {
      throw new Error("Erro Genérico");
    });

    const useCase = criarTemplateUseCase.execute(dados);

    await expect(useCase).rejects.toThrow(Error);
    await expect(useCase).rejects.toThrow(mensagemError.MENSAGEM_GENERICA);
    expect(
      iTemplatesRepositoryPort.incluirDadosTemplateHtmlService,
    ).not.toHaveBeenCalled();
    expect(
      iTemplatesRepositoryPort.selecionarTemplateHTMLService,
    ).not.toHaveBeenCalled();

    jest.resetAllMocks();
  });
});
