import { GenerationError } from "@/shared/errors/generation-error";
import {
  TemplatePadrao,
  Templates,
} from "@geracao_templates/domain/entity/templates.entity";
import { erros } from "@geracao_templates/domain/services/incluirDadosTemplateHtml.error";
import { CaptarDocumentosAdapter } from "@geracao_templates/adapters/captarDocumentos.adapter";
import { DadosTemplate } from "@geracao_templates/types/dadosTemplate";
import {
  DadosTemplate as DadosUsuarioTipo,
  mockDadosTemplate,
} from "@/tests/mocks/subdomains/geracao_templates/domain/entity/template.mock";
import { incluirDadosTemplateHtmlService } from "@geracao_templates/domain/services/incluirDadosTemplateHtml.service";
import { getTemplatePath } from "@geracao_templates/adapters/config/templatesPath";

describe("IncluirDadosTemplateHtml", () => {
  let dadosTemplate: DadosUsuarioTipo;
  let dadosPagina: DadosTemplate;

  beforeEach(async () => {
    dadosTemplate = mockDadosTemplate();

    dadosPagina = await new CaptarDocumentosAdapter(
      getTemplatePath(),
    ).captarHtmlCSS("padrao");
  });

  describe("Verifica a lógica geral da função", () => {
    type errosParametros = "dadosUsuario" | "tipoTemplate" | "dadosTemplate";

    interface ErrosFaltaParametros {
      parametro: errosParametros;
      mensagemErro: string;
    }

    test.each([
      {
        parametro: "dadosUsuario",
        mensagemErro: erros.falhaCapturaDadosUsuario,
      },
      {
        parametro: "tipoTemplate",
        mensagemErro: erros.falhaCapturaTipoTemplate,
      },
      {
        parametro: "dadosTemplate",
        mensagemErro: erros.falhaCapturaDadosTemplate,
      },
    ] as ErrosFaltaParametros[])(
      "Verifica se ocorre o erro relacionado a falta de dados para o parâmetro [$parametro]",
      (dados) => {
        switch (dados.parametro) {
          case "dadosUsuario":
            dadosTemplate.template = undefined as any;
            break;
          case "tipoTemplate":
            dadosTemplate.tipo = undefined as any;
            break;
          case "dadosTemplate":
            dadosPagina = undefined as any;
            break;
        }

        const verificacao = () =>
          incluirDadosTemplateHtmlService(
            dadosTemplate.template as Templates,
            dadosTemplate.tipo,
            dadosPagina,
          );

        expect(verificacao).toThrow(GenerationError);
        expect(verificacao).toThrow(
          expect.objectContaining({
            message: expect.stringContaining(dados.mensagemErro),
          }),
        );
      },
    );

    test.each(["html", "css"])(
      "Verifica se é apresentado um erro ao passar um valor nulo/indefinido para a propriedade [%s]",
      (tipo) => {
        dadosPagina[tipo as keyof DadosTemplate] = undefined as any;

        const verificacao = () =>
          incluirDadosTemplateHtmlService(
            dadosTemplate.template as Templates,
            dadosTemplate.tipo,
            dadosPagina,
          );

        expect(verificacao).toThrow(GenerationError);
        expect(verificacao).toThrow(
          expect.objectContaining({
            message: expect.stringContaining(erros.falhaCapturaHtmlCss),
          }),
        );
      },
    );
  });

  //--------------

  describe("Verifica os erros para o tipo de template padrão", () => {
    interface ErroCampos {
      nomeCampoAtual: keyof TemplatePadrao | TemplatePadrao["contato"];
      nomeSubNivel: keyof TemplatePadrao;
    }

    test.each([
      {
        nomeCampoAtual: "nome",
        nomeSubNivel: "" as string,
      },
      {
        nomeCampoAtual: "email",
        nomeSubNivel: "contato",
      },
    ] as ErroCampos[])(
      "Verifica se é apresentado erro dos campos principais do template para o campo [$nomeCampoAtual] do subnível [$nomeSubNivel], durante a falha na geração do html customizado",
      (campo) => {
        if (campo.nomeSubNivel === "contato") {
          if (!dadosTemplate.template.contato)
            throw new Error("Falha na captura dos dados de contato!");
          dadosTemplate.template.contato[
            campo.nomeCampoAtual as keyof TemplatePadrao["contato"]
          ] = undefined as any;
        } else
          dadosTemplate.template[campo.nomeCampoAtual as keyof TemplatePadrao] =
            undefined as any;

        const verificacao = () =>
          incluirDadosTemplateHtmlService(
            dadosTemplate.template as any,
            dadosTemplate.tipo,
            dadosPagina,
          );

        expect(verificacao).toThrow(GenerationError);
        expect(verificacao).toThrow(
          expect.objectContaining({
            message: expect.stringContaining(
              erros.falhaPreenchimentoHtml(campo.nomeCampoAtual as string),
            ),
          }),
        );
      },
    );
  });
});
