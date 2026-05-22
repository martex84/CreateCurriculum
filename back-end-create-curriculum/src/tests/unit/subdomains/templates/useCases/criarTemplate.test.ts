import { CriarTemplateUseCase } from "@/subdomains/geracao_templates/useCases/criarTemplate.useCase";
import { errors } from "@templates/domain/services/services.errors";
import { ValidationError } from "@/shared/errors/validation-error";
import { validarTemplateService } from "@templates/domain/services/validarTemplate.service";
import * as validarTemplateServiceFunction from "@templates/domain/services/validarTemplate.service";
import { incluirDadosTemplateHtmlService } from "@templates/domain/services/incluirDadosTemplateHtml.service";
import { CaptarDocumentosAdapter } from "@/subdomains/geracao_templates/adapters/captarDocumentos.adapter";
import { ITemplatesServicePort } from "@/subdomains/geracao_templates/ports/iTemplatesServicePort";
import { GenerationError } from "@/shared/errors/generation-error";
import { mensagemError } from "@/subdomains/geracao_templates/useCases/criarTemplate.error";
import { mockDadosTemplate } from "@/tests/mocks/subdomains/templates/domain/entity/template.mock";
import { getTemplatePath } from "@/subdomains/geracao_templates/adapters/config/templatesPath";

describe("CriarTemplateUseCase", () => {
  let iTemplatesServicePort: ITemplatesServicePort;
  let criarTemplateUseCase: CriarTemplateUseCase;
  let captarDocumentosAdapter: CaptarDocumentosAdapter;

  beforeEach(() => {
    captarDocumentosAdapter = new CaptarDocumentosAdapter(getTemplatePath());

    jest.spyOn(captarDocumentosAdapter, "captarHtmlCSS");

    //Criação do mock das funções utilizada pelo Use Case
    iTemplatesServicePort = {
      validarTemplateService: jest.fn(
        validarTemplateService,
      ) as unknown as typeof validarTemplateService,
      incluirDadosTemplateHtmlService: jest.fn(incluirDadosTemplateHtmlService),
    };

    //Instância do Use Case
    criarTemplateUseCase = new CriarTemplateUseCase(
      iTemplatesServicePort,
      captarDocumentosAdapter,
    );
  });

  // -------------------

  test("Verifica se ao passar um template inválido irá ocorrer uma exceção de validação de dados", async () => {
    let dados = mockDadosTemplate({ template: { nome: undefined } });

    //Utiliza o spy na função original
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
    expect(iTemplatesServicePort.validarTemplateService).toHaveBeenCalledWith(
      dados,
    );
    expect(
      iTemplatesServicePort.incluirDadosTemplateHtmlService,
    ).not.toHaveBeenCalled();
    expect(captarDocumentosAdapter.captarHtmlCSS).not.toHaveBeenCalled();

    //Reseta o mock feito pelo spyOn
    jest.resetAllMocks();
  });

  // -------------------

  test("Verifica se ocorre o retorno de um erro ao gerar um arquivo html ou css inválidos", async () => {
    let dados = mockDadosTemplate();

    (captarDocumentosAdapter.captarHtmlCSS as jest.Mock).mockRejectedValue(
      new GenerationError(errors.GERACAO_HTML),
    );

    const useCase = criarTemplateUseCase.execute(dados);

    await expect(useCase).rejects.toThrow(GenerationError);
    await expect(useCase).rejects.toThrow(
      expect.objectContaining({
        message: expect.stringContaining(errors.GERACAO_HTML),
      }),
    );
    expect(iTemplatesServicePort.validarTemplateService).toHaveBeenCalledWith(
      dados,
    );
    expect(
      iTemplatesServicePort.incluirDadosTemplateHtmlService,
    ).not.toHaveBeenCalled();
  });

  // -------------------

  test("Verifica se ocorre o retorno de um erro ao preencher o html com valores inválidos", async () => {
    let dados = mockDadosTemplate();

    (
      iTemplatesServicePort.incluirDadosTemplateHtmlService as jest.Mock
    ).mockRejectedValue(new GenerationError(errors.PREENCHIMENTO_HTML));

    const useCase = criarTemplateUseCase.execute(dados);

    await expect(useCase).rejects.toThrow(GenerationError);
    await expect(useCase).rejects.toThrow(
      expect.objectContaining({
        message: expect.stringContaining(errors.PREENCHIMENTO_HTML),
      }),
    );
    expect(iTemplatesServicePort.validarTemplateService).toHaveBeenCalledWith(
      dados,
    );
    expect(captarDocumentosAdapter.captarHtmlCSS).toHaveBeenCalled();
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
      iTemplatesServicePort.incluirDadosTemplateHtmlService,
    ).not.toHaveBeenCalled();
    expect(captarDocumentosAdapter.captarHtmlCSS).not.toHaveBeenCalled();

    jest.resetAllMocks();
  });
});
